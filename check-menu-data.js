#!/usr/bin/env node

const http = require('http');

http.get('http://localhost:3002/api/gcr/businesses', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const parsed = JSON.parse(data);
    const cobalt = parsed.businesses.find(b => b.name.includes('Cobalt'));

    console.log('=== COBALT DATA IN SUPABASE ===\n');

    if (!cobalt || !cobalt.menu) {
      console.log('❌ No menu data found!');
      process.exit(1);
    }

    let totalItems = 0;
    const menuObj = cobalt.menu;

    console.log('Meal Periods:', Object.keys(menuObj).length);
    console.log('');

    Object.keys(menuObj).forEach(mealPeriod => {
      const meal = menuObj[mealPeriod];
      console.log(`📋 ${meal.name || mealPeriod}:`);

      if (meal.sections) {
        let mealTotal = 0;
        Object.keys(meal.sections).forEach(sectionKey => {
          const section = meal.sections[sectionKey];
          const itemCount = section.items ? section.items.length : 0;
          mealTotal += itemCount;
          console.log(`   - ${section.name}: ${itemCount} items`);
        });
        totalItems += mealTotal;
        console.log(`   Total: ${mealTotal} items`);
      } else {
        console.log('   No sections');
      }
      console.log('');
    });

    console.log(`\n🎯 TOTAL: ${totalItems} items across ${Object.keys(menuObj).length} meal periods`);
  });
});
