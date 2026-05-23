# COMPLETE INVENTORY — WHERE EVERYTHING IS

## REPOSITORIES

### 1. `launching-GCR copy/` — MAIN FRONTEND
- **Location**: `/Users/owner/launching-GCR copy/`
- **Status**: Active, deployed to launching-gcr.vercel.app
- **What it has**: 
  - `js/gcr-api.js` — fetches from API
  - `js/gcr-auth.js` — authentication
  - `js/gcr-saves.js` — save user data
  - `home.html`, `restaurants.html`, `events.html`, `specials.html`, `happy-hours.html`
- **Problem**: Only fetching 50 businesses, no featured set

### 2. `gcr-api-new/` — BACKEND API
- **Location**: `/Users/owner/gcr-api-new/`
- **Status**: Active, deployed to gcr-api-gules.vercel.app
- **What it has**:
  - `routes/gcr.js` — all API endpoints
  - `db.js` — Supabase connection
  - DB: mkepugvdlktfsossumox (unified database)
- **Data**:
  - 2,602 entities (businesses)
  - 83 events
  - 25 specials
  - 27 happy hours
  - Cache: 5 minutes (fixed)

### 3. Other repos (IGNORE THESE):
- `gcr-webapp/` — old version
- `gcr-public-new/` — old version
- `CLEAN-PLATFORM-BUILD/` — old version
- `cybercheck-*` — unrelated

## DATABASES

### SINGLE SOURCE OF TRUTH:
- **mkepugvdlktfsossumox** (Supabase)
  - Tables: entity, entity_events, entity_specials, entity_happy_hours
  - ✅ All data populated

### IGNORE:
- xbptmkpbiqzvxptjkfoi (old GCR database)
- Other databases — don't use them

## DATA FILES
- `/Users/owner/gcr-entities-clean/` — clean JSON files used for upload
  - ALL-ENTITIES.json
  - ALL-EVENTS.json
  - ALL-SPECIALS.json
  - ALL-HAPPY-HOURS.json

## SCRIPTS
- `/Users/owner/gcr-api-new/populate-all-data.js` — populates database
- `/Users/owner/populate-all-data.js` — copy of above

## WHAT'S CURRENTLY LIVE

**Website**: launching-gcr.vercel.app
- Fetches from: gcr-api-gules.vercel.app
- Database: mkepugvdlktfsossumox
- Currently shows:
  - 50 restaurants (limited in code)
  - 83 events ✓
  - 25 specials ✓
  - 9 happy hours ✓

## WHAT NEEDS FIXING

1. **Entities limit**: Change line 213 of gcr-api.js from `?limit=50` to `?limit=1000`
2. **Featured businesses**: None are marked featured
3. **Gulf Music Live scraper**: Not integrated yet (where is it?)

---
**CLEAN APPROACH**: Only use launching-GCR copy + gcr-api-new + mkepugvdlktfsossumox database. Delete/ignore everything else.
