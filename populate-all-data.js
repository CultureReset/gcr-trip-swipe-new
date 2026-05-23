#!/usr/bin/env node
/**
 * Populate all missing data in Supabase
 * - Events: Match by slug to entity_id
 * - Specials: Already have entity_id, just upload
 * - Happy Hours: Extract from nested structure
 */
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const url = 'https://mkepugvdlktfsossumox.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rZXB1Z3ZkbGt0ZnNvc3N1bW94Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTQyMjQwMSwiZXhwIjoyMDk0OTk4NDAxfQ.uWxvQQKDxbaAz0FgcfwOhH3mtq92uXPOc4luQnw48DI';

const db = createClient(url, key);
const dataDir = '/Users/owner/gcr-entities-clean';

// Load entities to create slug -> id mapping
async function loadEntitySlugMap() {
  console.log('\n📋 Building entity slug map...');
  const { data: entities, error } = await db.from('entity').select('id, slug').limit(10000);
  if (error) {
    console.log(`❌ Error loading entities: ${error.message}`);
    process.exit(1);
  }
  const map = {};
  entities.forEach(e => {
    if (e.slug) map[e.slug] = e.id;
  });
  console.log(`✓ Loaded ${entities.length} entities, ${Object.keys(map).length} with slugs`);
  return map;
}

async function uploadEvents(slugMap) {
  console.log('\n📤 Uploading EVENTS...');
  try {
    const rawEvents = JSON.parse(fs.readFileSync(path.join(dataDir, 'ALL-EVENTS.json'), 'utf8'));
    console.log(`   Found ${rawEvents.length} events in file`);

    // Clear existing events
    await db.from('entity_events').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    // Process events: match by venue_location slug if available, or create slug from venue
    const processed = [];
    let matched = 0;

    for (const evt of rawEvents) {
      const row = { ...evt };

      // Try to match entity_id using slug if not present
      if (!row.entity_id && evt.venue_location) {
        // Create a slug-like version of venue_location for matching
        const venueSlug = evt.venue_location
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');

        // Check for direct match
        if (slugMap[venueSlug]) {
          row.entity_id = slugMap[venueSlug];
          matched++;
        } else {
          // Try partial matching with slug map keys
          for (const [slug, id] of Object.entries(slugMap)) {
            if (slug.includes(venueSlug) || venueSlug.includes(slug)) {
              row.entity_id = id;
              matched++;
              break;
            }
          }
        }
      }

      processed.push(row);
    }

    console.log(`   ✓ Matched ${matched}/${rawEvents.length} events to entities`);

    // Upload in batches
    const BATCH = 500;
    let uploaded = 0;
    for (let i = 0; i < processed.length; i += BATCH) {
      const batch = processed.slice(i, i + BATCH);
      const { error, data } = await db.from('entity_events').insert(batch).select();
      if (error) {
        console.log(`   ❌ Batch ${Math.floor(i/BATCH)+1}: ${error.message}`);
      } else {
        uploaded += batch.length;
        console.log(`   ✓ Uploaded ${i+1}-${Math.min(i+BATCH, processed.length)}`);
      }
    }

    console.log(`✅ EVENTS: ${uploaded} uploaded (${matched} matched to entities)`);
  } catch (e) {
    console.log(`❌ EVENTS: ${e.message}`);
  }
}

async function uploadSpecials() {
  console.log('\n📤 Uploading SPECIALS...');
  try {
    const rawSpecials = JSON.parse(fs.readFileSync(path.join(dataDir, 'ALL-SPECIALS.json'), 'utf8'));
    console.log(`   Found ${rawSpecials.length} specials in file`);

    // Clear existing specials
    await db.from('entity_specials').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    // Filter out nested 'entity' field and clean data
    const processed = rawSpecials.map(s => {
      const row = { ...s };
      delete row.entity; // Remove nested entity object
      return row;
    });

    // Upload in batches
    const BATCH = 500;
    let uploaded = 0;
    for (let i = 0; i < processed.length; i += BATCH) {
      const batch = processed.slice(i, i + BATCH);
      const { error } = await db.from('entity_specials').insert(batch).select();
      if (error) {
        console.log(`   ❌ Batch ${Math.floor(i/BATCH)+1}: ${error.message}`);
      } else {
        uploaded += batch.length;
        console.log(`   ✓ Uploaded ${i+1}-${Math.min(i+BATCH, processed.length)}`);
      }
    }

    console.log(`✅ SPECIALS: ${uploaded}/${rawSpecials.length}`);
  } catch (e) {
    console.log(`❌ SPECIALS: ${e.message}`);
  }
}

async function uploadHappyHours() {
  console.log('\n📤 Uploading HAPPY HOURS...');
  try {
    const rawData = JSON.parse(fs.readFileSync(path.join(dataDir, 'ALL-HAPPY-HOURS.json'), 'utf8'));
    console.log(`   Found ${rawData.length} businesses in file`);

    // Clear existing happy hours
    await db.from('entity_happy_hours').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    // Extract happy hour records from hh_sections
    const processed = [];
    for (const business of rawData) {
      if (business.hh_sections && Array.isArray(business.hh_sections)) {
        for (const section of business.hh_sections) {
          processed.push({
            id: section.id || crypto.randomUUID(),
            entity_id: section.entity_id,
            day: section.day || section.day_of_week,
            start_time: section.start || section.start_time || business.hh_start,
            end_time: section.end || section.end_time || business.hh_end,
            description: section.description || business.hh_description,
            days: business.hh_days,
          });
        }
      }
    }

    console.log(`   Extracted ${processed.length} happy hour records`);

    if (processed.length === 0) {
      console.log(`⚠️  No happy hour data found in hh_sections`);
      return;
    }

    // Upload in batches
    const BATCH = 500;
    let uploaded = 0;
    for (let i = 0; i < processed.length; i += BATCH) {
      const batch = processed.slice(i, i + BATCH);
      const { error } = await db.from('entity_happy_hours').insert(batch).select();
      if (error) {
        console.log(`   ❌ Batch ${Math.floor(i/BATCH)+1}: ${error.message}`);
      } else {
        uploaded += batch.length;
        console.log(`   ✓ Uploaded ${i+1}-${Math.min(i+BATCH, processed.length)}`);
      }
    }

    console.log(`✅ HAPPY HOURS: ${uploaded}/${processed.length}`);
  } catch (e) {
    console.log(`❌ HAPPY HOURS: ${e.message}`);
  }
}

async function verifyData() {
  console.log('\n✅ VERIFYING DATA IN DATABASE...');
  try {
    const [events, specials, happyHours, entities] = await Promise.all([
      db.from('entity_events').select('count', { count: 'exact' }),
      db.from('entity_specials').select('count', { count: 'exact' }),
      db.from('entity_happy_hours').select('count', { count: 'exact' }),
      db.from('entity').select('count', { count: 'exact' }),
    ]);

    console.log(`   entity:              ${entities.count} records`);
    console.log(`   entity_events:       ${events.count} records`);
    console.log(`   entity_specials:     ${specials.count} records`);
    console.log(`   entity_happy_hours:  ${happyHours.count} records`);
  } catch (e) {
    console.log(`❌ Verification failed: ${e.message}`);
  }
}

async function main() {
  console.log('🔥 POPULATING ALL DATA\n');

  const slugMap = await loadEntitySlugMap();
  await uploadEvents(slugMap);
  await uploadSpecials();
  await uploadHappyHours();
  await verifyData();

  console.log('\n✅ COMPLETE!\n');
}

main().catch(console.error);
