# CSV Import Testing Guide

## 🎯 Test CSV Import with Cobalt Data

This guide walks you through testing the CSV import system with the Cobalt master data file.

---

## ✅ Pre-Test Checklist

Before testing, verify:

1. **Files Exist:**
   - ✅ `cobalt_master_all_data_with_events.csv` (90KB, 356 rows)
   - ✅ `js/csv-import-system.js` (533 lines)
   - ✅ `js/csv-import-manager.js` (334 lines)
   - ✅ `admin-dashboard.html` (with Import CSV button)

2. **CSV Structure Verified:**
   - ✅ RecordType column (BUSINESS, HOURS, SERVICE_WINDOW, MENU_SECTION, MENU_ITEM, OPTION_GROUP, OPTION, EVENT, POLICY)
   - ✅ BusinessID: `cobalt_orange_beach_al`
   - ✅ 52 columns total
   - ✅ All required fields present

---

## 🧪 Test Scenarios

### Test 1: REPLACE Mode (Full Import)

**Purpose:** Import all Cobalt data and replace existing data

**Steps:**
1. Open `admin-dashboard.html` in browser
2. Go to "Businesses" tab
3. Click "📤 Import CSV" button
4. Select `cobalt_master_all_data_with_events.csv`
5. Select **REPLACE** mode
6. Click "Start Import"

**Expected Results:**
- ✅ Success message: "Import completed successfully"
- ✅ Shows "1 businesses affected"
- ✅ Shows "Items Added: X" (number of menu items, specials, events)
- ✅ Shows "Duplicates Skipped: 0" (first import)
- ✅ Cobalt appears in business list
- ✅ Image preserved if it existed before

**What to Check:**
- Business info loaded correctly (name, address, phone)
- Hours parsed correctly (Sunday-Thursday 11:00-20:30, etc.)
- Service windows created (Happy Hour 16:00-18:00, Sunset Menu 16:00-19:00, Brunch)
- Menu sections exist (Appetizers, Seafood, Burgers, etc.)
- Menu items have prices and descriptions
- Option groups attached to items (Cooking Style: Grilled/Blackened/Fried)
- Options have price modifiers

---

### Test 2: MERGE Mode (Add Without Duplicates)

**Purpose:** Import again to test duplicate detection

**Steps:**
1. In admin dashboard, click "📤 Import CSV" again
2. Select same `cobalt_master_all_data_with_events.csv`
3. Select **MERGE** mode
4. Click "Start Import"

**Expected Results:**
- ✅ Success message shown
- ✅ "Duplicates Skipped: X" (should be high since same data)
- ✅ "Items Added: 0" (or very few if any new unique items)
- ✅ No duplicate menu items appear
- ✅ Business data unchanged

**What to Check:**
- No duplicate items in menus
- Business still has same data (not doubled)
- Duplicate detection working by ID and name

---

### Test 3: UPDATE Mode (Specific Sections)

**Purpose:** Test updating only menus while keeping other data

**Steps:**
1. Manually edit a business in dashboard (add fake event or special)
2. Click "📤 Import CSV"
3. Select `cobalt_master_all_data_with_events.csv`
4. Select **UPDATE SPECIFIC** mode
5. Check ONLY "Menus" checkbox
6. Click "Start Import"

**Expected Results:**
- ✅ Menus replaced with CSV data
- ✅ Events/specials you added manually still exist (not replaced)
- ✅ Other sections (hours, policies) unchanged

**What to Check:**
- Only selected sections updated
- Unselected sections preserved

---

## 🔍 Data Verification Checklist

After import, verify in the Business Details view:

### Business Info
- [ ] Name: "Cobalt the Restaurant"
- [ ] Location: "Orange Beach"
- [ ] Address: "28099 Perdido Beach Blvd, Orange Beach, AL 36561"
- [ ] Phone: "251-923-5300"
- [ ] Tags: waterfront, coastal cuisine, boat slips, bay view, brunch, happy hour, sunset specials, live music

### Hours
- [ ] Sunday-Thursday: 11:00-20:30
- [ ] Friday-Saturday: 11:00-21:00
- [ ] Sunday Brunch: 11:00-14:00

### Service Windows (for "Available Now" badges)
- [ ] Happy Hour: Daily 16:00-18:00
- [ ] Sunset Menu: Daily 16:00-19:00
- [ ] Sunday Brunch: Sunday 11:00-14:00

### Menus
Check that these menu types exist:
- [ ] Brunch
- [ ] Lunch
- [ ] Dinner
- [ ] Sunset (Sunset Menu specials)
- [ ] Cocktails
- [ ] Wine
- [ ] Beer

### Menu Sections
Verify sections like:
- [ ] Appetizers
- [ ] Seafood
- [ ] Burgers & Sandwiches
- [ ] Entrees
- [ ] Sides
- [ ] Desserts

### Menu Items
Sample items to verify:
- [ ] Items have names
- [ ] Items have prices (or "Market Price")
- [ ] Items have descriptions
- [ ] Items have categories (appetizer, entree, seafood, etc.)

### Option Groups
Check that items with options have:
- [ ] Cooking Style (Grilled/Blackened/Fried)
- [ ] Oyster Quantity (Half Dozen/Dozen)
- [ ] Sauce Choice (Cocktail/Tartar)
- [ ] Sandwich Sides

### Options
- [ ] Each option group has multiple options
- [ ] Options show price modifiers (e.g., "+$0", "+$2")

### Specials (Price Deals)
- [ ] Happy Hour items appear in Specials
- [ ] Sunset Menu items appear in Specials
- [ ] Schedule shows times/days

### Events (Entertainment)
- [ ] Live music events listed (if any in CSV)
- [ ] Event details include day, time, description
- [ ] Recurring events marked correctly

### Policies
- [ ] Age restrictions for kids meals (if any)
- [ ] Other policies (if any in CSV)

---

## 🐛 Common Issues & Solutions

### Issue: "No businesses found"
**Solution:** Check BusinessID in CSV matches expected format

### Issue: "Items not appearing"
**Solution:** Verify MenuID and SectionName are correctly mapped

### Issue: "Duplicate items after MERGE"
**Solution:** Check that items have unique IDs or names

### Issue: "Option groups not showing"
**Solution:** Verify OPTION_GROUP rows exist before OPTION rows for same group

### Issue: "Service windows not working"
**Solution:** Check SERVICE_WINDOW rows have valid times and WindowName

### Issue: "Specials vs Events confusion"
**Solution:**
- Price deals (Wine Wednesday, Taco Tuesday) = SPECIALS
- Entertainment (Live Jazz, Trivia) = EVENTS

---

## 📊 Expected Import Statistics

For Cobalt CSV (356 rows):

**Approximate Breakdown:**
- 1 BUSINESS record
- ~4 HOURS records
- ~3 SERVICE_WINDOW records
- ~20 OPTION_GROUP records
- ~50 OPTION records
- ~10 MENU_SECTION records
- ~200+ MENU_ITEM records
- ~5 EVENT records
- ~5 POLICY records

**After Import:**
- Businesses Affected: 1
- Items Added: 200+ (menu items, options, events, policies)
- Duplicates Skipped: 0 (first import), ~200 (second import in MERGE mode)

---

## 🎨 Visual Verification

### In Admin Dashboard:
1. Go to Businesses tab
2. Find "Cobalt the Restaurant"
3. Click "View Details"
4. Check all sections populated

### In User-Facing Site:
1. Open GCR main page
2. Filter by "Orange Beach"
3. Find Cobalt listing
4. Click to view profile
5. Verify all menu sections show
6. Check "Available Now" badges appear during service windows
7. Verify specials page shows Happy Hour and Sunset Menu

---

## ✅ Test Completion Checklist

- [ ] Test 1: REPLACE mode import successful
- [ ] Test 2: MERGE mode detects duplicates
- [ ] Test 3: UPDATE mode only changes selected sections
- [ ] Business info displays correctly
- [ ] All menus imported (breakfast, brunch, lunch, dinner, sunset, cocktails, wine, beer)
- [ ] Menu sections organized correctly
- [ ] Menu items have prices and descriptions
- [ ] Option groups work correctly
- [ ] Options show price modifiers
- [ ] Specials page shows price deals
- [ ] Events page shows entertainment
- [ ] Service windows enable "Available Now" badges
- [ ] No errors in browser console
- [ ] No duplicate items after MERGE
- [ ] Image preservation works in REPLACE mode

---

## 🚀 Next Steps After Successful Test

1. **Create Sample CSV Template:**
   - Use Cobalt CSV as reference
   - Create blank template for other businesses
   - Document each record type with examples

2. **Document Business Onboarding Flow:**
   - How to collect data from businesses
   - How to format CSV properly
   - How to import and verify

3. **Build CSV Validation Tool:**
   - Pre-import validation
   - Check for required fields
   - Verify relationships (OPTION → OPTION_GROUP → MENU_ITEM)
   - AI assistant validation (already built!)

4. **Bulk Import Testing:**
   - Import 5+ businesses at once
   - Test performance with large files
   - Verify localStorage capacity

---

## 📝 Report Template

After testing, document results:

```
CSV Import Test Results - [Date]

Test Environment:
- Browser: [Chrome/Safari/Firefox]
- File: cobalt_master_all_data_with_events.csv
- File Size: 90KB, 356 rows

Test 1 - REPLACE Mode:
Status: [PASS/FAIL]
Import Time: [X seconds]
Items Added: [X]
Errors: [None / List errors]

Test 2 - MERGE Mode:
Status: [PASS/FAIL]
Duplicates Skipped: [X]
Errors: [None / List errors]

Test 3 - UPDATE Mode:
Status: [PASS/FAIL]
Sections Updated: [menus]
Sections Preserved: [events, specials, hours]
Errors: [None / List errors]

Data Verification:
✅/❌ Business info correct
✅/❌ Hours parsed correctly
✅/❌ Menus organized properly
✅/❌ Option groups working
✅/❌ Specials vs Events distinction correct
✅/❌ No duplicates

Issues Found:
[List any issues]

Recommendations:
[Suggestions for improvements]
```

---

## 💡 Tips

1. **Start Small:** Test with REPLACE mode first to see full import
2. **Check Console:** Open browser DevTools → Console to see detailed logs
3. **Use AI Assistant:** Ask the dashboard AI for help if errors occur
4. **Backup First:** Export existing data before testing (just in case)
5. **Test in Order:** REPLACE → MERGE → UPDATE to see all behaviors

---

## 🆘 Need Help?

If you encounter issues:

1. **Check Browser Console** for JavaScript errors
2. **Ask AI Assistant** in dashboard for troubleshooting
3. **Verify CSV Format** matches expected structure
4. **Review CSV Parser Logs** in console for detailed processing info
5. **Check localStorage** hasn't hit 5-10MB limit

---

**Ready to test? Open admin-dashboard.html and start with Test 1! 🚀**
