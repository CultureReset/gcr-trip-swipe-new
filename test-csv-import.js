#!/usr/bin/env node

/**
 * Test CSV Import to Supabase
 * This script tests the bulk upload endpoint
 */

const http = require('http');

console.log('🧪 Testing CSV Import to Supabase...\n');

// First, fetch current data from Supabase to test with
async function getCurrentData() {
  return new Promise((resolve, reject) => {
    http.get('http://localhost:3002/api/gcr/businesses', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed.businesses);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

// Test bulk upload
async function testBulkUpload(businesses) {
  // Take first 5 businesses as test (including Cobalt if present)
  const testData = businesses.slice(0, 5);

  console.log(`📤 Testing bulk upload with ${testData.length} businesses:`);
  testData.forEach((b, i) => console.log(`   ${i+1}. ${b.name}`));
  console.log();

  const postData = JSON.stringify({
    businesses: testData,
    mode: 'merge'
  });

  return new Promise((resolve, reject) => {
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
        try {
          const result = JSON.parse(data);
          if (res.statusCode === 200) {
            console.log('✅ Bulk upload SUCCESS!');
            console.log(`   Saved: ${result.count} businesses`);
            console.log(`   Mode: ${result.mode}`);
            console.log(`   Message: ${result.message}\n`);
            resolve(result);
          } else {
            console.error('❌ Bulk upload FAILED');
            console.error(`   Status: ${res.statusCode}`);
            console.error(`   Error: ${result.error}\n`);
            reject(new Error(result.error));
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

// Verify data is accessible
async function verifyData() {
  console.log('🔍 Verifying data is accessible...');

  const businesses = await getCurrentData();
  console.log(`✅ API returns ${businesses.length} businesses`);

  // Check for Cobalt
  const cobalt = businesses.find(b => b.name.toLowerCase().includes('cobalt'));
  if (cobalt) {
    console.log(`✅ Found Cobalt: "${cobalt.name}"`);
    console.log(`   - Happy hour items: ${cobalt.happy_hour?.items?.length || 0}`);
    console.log(`   - Menu items: ${cobalt.menu?.length || 0}`);
    console.log(`   - Drinks: ${cobalt.drinks?.length || 0}`);
    console.log(`   - Events: ${cobalt.events?.length || 0}`);
    console.log(`   - Specials: ${cobalt.specials?.length || 0}`);
  } else {
    console.log('⚠️  Cobalt not found in data');
  }

  return businesses;
}

// Run tests
(async function() {
  try {
    // Step 1: Get current data
    console.log('Step 1: Fetching current data from Supabase...\n');
    const businesses = await getCurrentData();
    console.log(`✅ Fetched ${businesses.length} businesses\n`);

    // Step 2: Test bulk upload
    console.log('Step 2: Testing bulk upload endpoint...\n');
    await testBulkUpload(businesses);

    // Step 3: Verify data
    console.log('Step 3: Verifying data persisted...\n');
    await verifyData();

    console.log('\n🎉 ALL TESTS PASSED!\n');
    console.log('Next steps:');
    console.log('1. Open http://localhost:3456/happy-hours.html');
    console.log('2. Open http://localhost:3456/specials.html');
    console.log('3. Open http://localhost:3456/events.html');
    console.log('4. Verify Cobalt appears with all data\n');

  } catch (error) {
    console.error('\n❌ TEST FAILED:', error.message);
    process.exit(1);
  }
})();
