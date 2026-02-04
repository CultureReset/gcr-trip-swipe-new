#!/usr/bin/env node

const fs = require('fs');
const http = require('http');

console.log('🚀 Importing Cobalt CSV with schema transformation...\n');

// Read CSV
const csvContent = fs.readFileSync('./cobalt_master_all_data_with_events.csv', 'utf8');

// Parse CSV using CORRECT parser from upload-to-supabase.js
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current);
  return result;
}

function parseCSV(csvText) {
  const lines = csvText.split('\n');
  const businesses = new Map();

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    const values = parseCSVLine(line);
    const recordType = values[0];
    const businessId = values[1];

    if (!businesses.has(businessId)) {
      businesses.set(businessId, {
        id: businessId,
        name: values[2],
        location: values[3],
        state: values[4],
        address: values[6],
        phone: values[7],
        website: values[9],
        description: values[10],
        tags: values[11] ? values[11].split(',').map(t => t.trim()) : [],
        category: 'restaurants',
        menus: {},
        specials: [],
        events: [],
        happyHourSpecials: []
      });
    }

    const business = businesses.get(businessId);

    // SERVICE_WINDOW
    if (recordType === 'SERVICE_WINDOW') {
      const days = values[13] || 'Daily';
      const startTime = values[14];
      const endTime = values[15];
      const windowName = values[16];
      const isSpecial = values[17] === 'TRUE';
      const specialType = values[18];

      if (specialType === 'sunset_specials') {
        // Store sunset schedule info
        if (!business.sunsetSchedule) {
          business.sunsetSchedule = {
            name: windowName,
            days: days,
            time: `${startTime} – ${endTime}`
          };
        }
      } else if (specialType === 'happy_hour') {
        // Store happy hour schedule
        if (!business.happyHourSchedule) {
          business.happyHourSchedule = {
            days: days,
            startTime: startTime,
            endTime: endTime,
            schedule: `${days} ${startTime} – ${endTime}`
          };
        }
      } else if (specialType === 'brunch') {
        // Store brunch schedule for specials (don't create menu)
        if (!business.brunchSchedule) {
          business.brunchSchedule = {
            days: days,
            startTime: startTime,
            endTime: endTime,
            schedule: `${days} ${startTime} – ${endTime}`
          };
        }
      }
    }

    // EVENT - Skip for now, no real events yet
    // if (recordType === 'EVENT') {
    //   business.events.push({
    //     name: values[46],
    //     description: values[51] || ''
    //   });
    // }

    // POLICY
    if (recordType === 'POLICY') {
      const policyType = values[41];
      const ageMax = values[42];
      const notes = values[43];

      if (policyType === 'KidsMenuAgeLimit') {
        business.kidsMenuAgeLimit = notes || `Ages ${ageMax} and under`;
      }
    }

    // MENU_ITEM
    if (recordType === 'MENU_ITEM') {
      const mealPeriod = values[20] || 'DINNER';
      const sectionName = values[22];
      const itemName = values[25];
      const itemDescription = values[26];
      const price = values[27];

      // SUNSET and BRUNCH items go to specials[], not menu
      if (mealPeriod.toLowerCase() === 'sunset') {
        const schedule = business.sunsetSchedule || { days: 'Daily', time: 'Sunset Hours' };
        business.specials.push({
          name: '🌅 ' + itemName,
          description: itemDescription || 'Sunset special pricing',
          price: price,
          day: schedule.days,
          time: schedule.time,
          image: '',
          dietary: []
        });
      } else if (mealPeriod.toLowerCase() === 'brunch') {
        const schedule = business.brunchSchedule || { days: 'Sunday', schedule: '11:00 – 14:00' };
        business.specials.push({
          name: '🍳 ' + itemName,
          description: itemDescription || 'Sunday brunch special',
          price: price,
          day: schedule.days,
          time: schedule.schedule,
          image: '',
          dietary: []
        });
      } else {
        // Regular menu items
        if (!business.menus[mealPeriod.toLowerCase()]) {
          business.menus[mealPeriod.toLowerCase()] = {
            name: mealPeriod,
            sections: {}
          };

          // Add schedule if this is happy hour
          if (mealPeriod.toLowerCase() === 'happyhour' && business.happyHourSchedule) {
            business.menus[mealPeriod.toLowerCase()].schedule = business.happyHourSchedule.schedule;
            business.menus[mealPeriod.toLowerCase()].days = business.happyHourSchedule.days;
            business.menus[mealPeriod.toLowerCase()].startTime = business.happyHourSchedule.startTime;
            business.menus[mealPeriod.toLowerCase()].endTime = business.happyHourSchedule.endTime;
          }

          // Add age restriction if this is kids menu
          if (mealPeriod.toLowerCase() === 'kids' && business.kidsMenuAgeLimit) {
            business.menus[mealPeriod.toLowerCase()].ageRestriction = business.kidsMenuAgeLimit;
          }
        }

        const sectionKey = sectionName ? sectionName.toLowerCase().replace(/\s+/g, '_') : 'other';
        if (!business.menus[mealPeriod.toLowerCase()].sections[sectionKey]) {
          business.menus[mealPeriod.toLowerCase()].sections[sectionKey] = {
            name: sectionName || 'Other',
            items: []
          };
        }

        business.menus[mealPeriod.toLowerCase()].sections[sectionKey].items.push({
          name: itemName,
          description: itemDescription,
          price: price,
          image: '', // Empty by default, can be added in admin dashboard
          dietary: [] // Empty by default, can be added in admin dashboard
        });
      }
    }
  }

  // POST-PROCESSING: Apply schedules and age restrictions after all parsing
  businesses.forEach(business => {
    // Apply happy hour schedule if exists
    if (business.happyHourSchedule && business.menus.happyhour) {
      business.menus.happyhour.schedule = business.happyHourSchedule.schedule;
      business.menus.happyhour.days = business.happyHourSchedule.days;
      business.menus.happyhour.startTime = business.happyHourSchedule.startTime;
      business.menus.happyhour.endTime = business.happyHourSchedule.endTime;
    }

    // Apply kids menu age restriction if exists
    if (business.kidsMenuAgeLimit && business.menus.kids) {
      business.menus.kids.ageRestriction = business.kidsMenuAgeLimit;
    }

    // Apply sunset schedule to specials if exists
    if (business.sunsetSchedule && business.specials.length > 0) {
      business.specials.forEach(special => {
        if (special.name.includes('🌅')) {
          special.day = business.sunsetSchedule.days;
          special.time = business.sunsetSchedule.time;
        }
      });
    }
  });

  return Array.from(businesses.values());
}

console.log('📊 Parsing CSV...');
const parsed = parseCSV(csvContent);
console.log(`✅ Parsed ${parsed.length} business(es)\n`);

if (parsed.length === 0) {
  console.error('❌ No businesses parsed!');
  process.exit(1);
}

const biz = parsed[0];
console.log(`📋 Business: ${biz.name}`);
console.log(`   Menus: ${Object.keys(biz.menus).length}`);
console.log(`   Specials: ${biz.specials.length}`);
console.log(`   Events: ${biz.events.length}\n`);

// TRANSFORM to Supabase schema - PRESERVE meal periods and sections
function transformToSupabaseSchema(business) {
  return {
    id: 'cobalt_orange_beach_al',
    business_id: 'cobalt_orange_beach_al',
    place_id: 'ChIJs5Kz5JwHmogRyeMoXBx1gX8',
    name: business.name,
    category: business.category || 'restaurants',
    address: business.address,
    phone: business.phone,
    website: business.website,
    description: business.description,
    tags: business.tags,
    // KEEP the nested structure: menus.lunch.sections.appetizers.items[]
    menu: business.menus,  // Supabase column is 'menu' but stores nested menus object
    specials: business.specials || [],
    events: business.events || []
  };
}

console.log('🔄 Transforming to Supabase schema...');
const transformed = transformToSupabaseSchema(biz);
console.log(`✅ Transformed with ${Object.keys(biz.menus).length} meal periods\n`);

// Upload
console.log('📤 Uploading to Supabase...\n');

const postData = JSON.stringify({
  businesses: [transformed],
  mode: "replace"
});

const options = {
  hostname: 'localhost',
  port: 3002,
  path: '/api/gcr/businesses/bulk',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    if (res.statusCode === 200) {
      const result = JSON.parse(data);
      console.log('✅ SUCCESS!');
      console.log(`   Uploaded: ${result.count} business`);
      console.log(`   Mode: ${result.mode}\n`);
      console.log('🎉 Full Cobalt menu now in Supabase!');
      console.log('\n📱 Test it:');
      console.log('   http://localhost:3456/TEST-COBALT-DISPLAY.html\n');
    } else {
      console.error('❌ FAILED:', res.statusCode);
      console.error(data);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Error:', error.message);
});

req.write(postData);
req.end();
