#!/usr/bin/env node

const fs = require('fs');
const http = require('http');

console.log('🚀 Importing Cobalt CSV to Supabase with correct schema...\n');

// Parse CSV
const csv = fs.readFileSync('./cobalt_master_all_data_with_events.csv', 'utf8');
const lines = csv.split('\n');
const headers = lines[0].split(',');

const business = {
  id: 'cobalt_orange_beach_al',
  business_id: 'cobalt_orange_beach_al',
  place_id: 'ChIJs5Kz5JwHmogRyeMoXBx1gX8', // existing Cobalt ID
  name: 'Cobalt the Restaurant',
  category: 'restaurants',
  address: '28099 Perdido Beach Blvd, Orange Beach, AL 36561, USA',
  phone: '(251) 923-5300',
  website: 'http://www.cobaltrestaurant.net/',
  description: 'Contemporary coastal cuisine; located under Perdido Pass Bridge',
  menu: [],
  drinks: [],
  happy_hour: {
    days: 'Daily 4 PM–6 PM',
    items: [],
    title: 'Happy Hour'
  },
  specials: [],
  events: []
};

console.log('📊 Parsing CSV...');

// Parse menu items and other records
for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  if (!line.trim()) continue;

  const parts = line.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g) || [];
  const recordType = parts[0]?.replace(/"/g, '');

  if (recordType === 'MENU_ITEM') {
    const itemName = parts[25]?.replace(/"/g, '');
    const itemDesc = parts[26]?.replace(/"/g, '');
    const price = parts[27]?.replace(/"/g, '');
    const tags = parts[31]?.replace(/"/g, '');

    if (itemName) {
      business.menu.push({
        name: itemName,
        description: itemDesc || '',
        price: price ? `$${price}` : 'Market',
        category: tags || 'Entrees',
        dietary: []
      });
    }
  }

  if (recordType === 'SERVICE_WINDOW') {
    const windowName = parts[16]?.replace(/"/g, '');
    const isSpecial = parts[17]?.replace(/"/g, '') === 'TRUE';
    const specialType = parts[18]?.replace(/"/g, '');
    const days = parts[13]?.replace(/"/g, '');
    const startTime = parts[14]?.replace(/"/g, '');
    const endTime = parts[15]?.replace(/"/g, '');

    if (specialType === 'sunset_specials') {
      business.specials.push({
        name: '🌅 ' + windowName,
        description: 'Special early dinner pricing during golden hour',
        day: days || 'Daily',
        time: `${startTime} – ${endTime}`
      });
    } else if (specialType === 'happy_hour') {
      // Happy hour items will be added separately
    }
  }

  if (recordType === 'EVENT') {
    const eventTitle = parts[46]?.replace(/"/g, '');
    const eventDesc = parts[51]?.replace(/"/g, '');

    if (eventTitle) {
      business.events.push({
        name: eventTitle,
        description: eventDesc || '',
        image: null
      });
    }
  }
}

console.log(`✅ Parsed business with:`);
console.log(`   - ${business.menu.length} menu items`);
console.log(`   - ${business.specials.length} specials`);
console.log(`   - ${business.events.length} events\n`);

// Upload to Supabase
console.log('📤 Uploading to Supabase...');

const postData = JSON.stringify({
  businesses: [business],
  mode: 'merge'
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
      console.log('\n✅ SUCCESS!');
      console.log(`   Saved: ${result.count} business`);
      console.log(`   Mode: ${result.mode}`);
      console.log('\n🎉 Cobalt data now in Supabase!');
      console.log('\nOpen http://localhost:3456/TEST-COBALT-DISPLAY.html to verify\n');
    } else {
      console.error('\n❌ FAILED:', res.statusCode);
      console.error(data);
    }
  });
});

req.on('error', (error) => {
  console.error('\n❌ Error:', error.message);
});

req.write(postData);
req.end();
