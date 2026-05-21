# Raw Data Processing — AI Integration Guide

Your AI can now accept raw data (menu, drinks, happy hours, specials, events) and automatically populate the database.

## How It Works

```
Your AI Chat
    ↓
User provides raw data (CSV, JSON, text)
    ↓
AI calls POST /api/admin/gcr/parse-raw-data
    ↓
Claude AI parses and structures the data
    ↓
AI displays parsed items to user
    ↓
User approves
    ↓
AI calls POST /api/admin/gcr/save-parsed-items
    ↓
Database updated with menu items, happy hours, etc.
    ↓
Data appears on all platforms instantly ✓
```

---

## Endpoint 1: Parse Raw Data

**POST /api/admin/gcr/parse-raw-data**

Takes raw, unstructured data and uses AI to extract structured items.

### Request

```bash
curl -X POST https://cybercheck-api-database.vercel.app/api/admin/gcr/parse-raw-data \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "entity_id": "cosmos-uuid",
    "data_type": "menu",
    "raw_data": "Grilled Cheese, $8.99, crispy bread and cheddar\nBacon Burger, $12.99, half-pound beef"
  }'
```

### Parameters

- **entity_id** (string, required) — UUID of the business/entity
- **data_type** (string, required) — Type of data: `menu`, `drinks`, `happy_hour`, `specials`, `events`
- **raw_data** (string, required) — Unstructured data in any format (CSV, JSON, plain text, etc.)

### Response

```json
{
  "parsed_items": [
    {
      "item_name": "Grilled Cheese",
      "item_description": "crispy bread and cheddar",
      "price": 8.99,
      "category": "Sandwiches"
    },
    {
      "item_name": "Bacon Burger",
      "item_description": "half-pound beef",
      "price": 12.99,
      "category": "Burgers"
    }
  ],
  "count": 2
}
```

---

## Endpoint 2: Save Parsed Items

**POST /api/admin/gcr/save-parsed-items**

Saves the parsed items to the database.

### Request

```bash
curl -X POST https://cybercheck-api-database.vercel.app/api/admin/gcr/save-parsed-items \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "entity_id": "cosmos-uuid",
    "data_type": "menu",
    "items": [
      {
        "item_name": "Grilled Cheese",
        "item_description": "crispy bread and cheddar",
        "price": 8.99,
        "category": "Sandwiches"
      }
    ]
  }'
```

### Response

```json
{
  "saved": 1,
  "errors": [],
  "total": 1
}
```

---

## AI Chat Integration Examples

### Example 1: User Sends Menu Data

**User:** "Add these menu items to Cosmos: Burger $12, Fries $5, Coke $2.50"

**Your AI:**

```javascript
async function processRawMenuData(entityId, rawMenuData) {
  const token = getAdminToken(); // Your stored admin token
  
  // Step 1: Parse the data
  const parseResponse = await fetch(
    'https://cybercheck-api-database.vercel.app/api/admin/gcr/parse-raw-data',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        entity_id: entityId,
        data_type: 'menu',
        raw_data: rawMenuData
      })
    }
  );

  const parsed = await parseResponse.json();

  if (parsed.error) {
    return `Error parsing data: ${parsed.error}`;
  }

  // Step 2: Show user what will be saved
  console.log(`Found ${parsed.parsed_items.length} items:`);
  parsed.parsed_items.forEach(item => {
    console.log(`- ${item.item_name} ($${item.price}) — ${item.item_description}`);
  });

  // Step 3: Save to database
  const saveResponse = await fetch(
    'https://cybercheck-api-database.vercel.app/api/admin/gcr/save-parsed-items',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        entity_id: entityId,
        data_type: 'menu',
        items: parsed.parsed_items
      })
    }
  );

  const saved = await saveResponse.json();

  return `✅ Saved ${saved.saved}/${saved.total} items to the menu`;
}
```

### Example 2: Process CSV Format

**User:** "Here's our happy hour pricing in CSV format:
```
Item,Price,HH_Days
Well Drinks,$3,Mon-Fri
Draft Beer,$2,Mon-Fri
House Wine,$4,Tue-Thu
```"

**Your AI:**

```javascript
const csvData = `
Item,Price,HH_Days
Well Drinks,$3,Mon-Fri
Draft Beer,$2,Mon-Fri
House Wine,$4,Tue-Thu
`;

const result = await processRawData(entityId, 'happy_hour', csvData);
// AI automatically detects column names and structures the data
// Returns: { item_name, price, hh_days }
// Saves to entity_happy_hour_items table
```

### Example 3: Accept Image & OCR

**User:** *[Sends photo of menu board]*

**Your AI:**

```javascript
async function processMenuImage(entityId, imageUrl) {
  // 1. Use Claude's vision to extract text from image
  const imageText = await extractTextFromImage(imageUrl);
  
  // 2. Pass extracted text to parse endpoint
  const result = await processRawData(entityId, 'menu', imageText);
  
  // 3. Save automatically
  return result;
  // Result: All menu items from the photo saved to database
}
```

---

## Data Format Reference

### Menu Items

Raw format:
```
Burger, $12.99, Angus beef with lettuce and tomato
Fries, $5.99, Golden crispy fries
Caesar Salad, $10.99, Romaine, parmesan, croutons
```

Parsed structure:
```json
{
  "item_name": "Burger",
  "item_description": "Angus beef with lettuce and tomato",
  "price": 12.99,
  "category": "Entrees"
}
```

### Drinks

Raw format:
```
Stella Artois, $6, Belgian lager
Modelo, $5, Mexican lager
Pinot Grigio, $8, Italian white wine
```

Parsed structure:
```json
{
  "item_name": "Stella Artois",
  "item_description": "Belgian lager",
  "price": 6,
  "style": "Lager",
  "brewery": "Stella Artois"
}
```

### Happy Hour

Raw format:
```
Mon-Fri 5-7PM: All wells $3, draft beer $2, house wine $4
```

Parsed structure:
```json
{
  "item_name": "Well Drinks",
  "price": 3,
  "hh_days": "Mon-Fri",
  "hh_start": "5:00 PM",
  "hh_end": "7:00 PM"
}
```

### Specials

Raw format:
```
Monday: Burger Monday - 50% off burgers
Tuesday: Taco Tuesday - Buy 2 get 1 free
```

Parsed structure:
```json
{
  "item_name": "Burger Monday",
  "item_description": "50% off burgers",
  "days_of_week": "Monday"
}
```

### Events

Raw format:
```
Live Music - Saturday 8PM - Jazz trio at the bar
Happy Hour Special - Fri 5-7PM - $3 wells and draft
```

Parsed structure:
```json
{
  "item_name": "Live Music",
  "item_description": "Jazz trio at the bar",
  "event_date": "2026-05-24",
  "start_time": "8:00 PM"
}
```

---

## Complete Workflow: Dashboard + AI Chat

### Dashboard (for humans):

1. Open admin dashboard
2. Open entity editor
3. Click "Raw Data" tab
4. Select data type (menu, drinks, happy hour, etc.)
5. Paste raw data
6. Click "Process with AI"
7. Review parsed items
8. Click "Save All"
9. Data appears on all platforms ✓

### AI Chat (for your AI):

1. User provides raw data in chat
2. AI calls `/api/admin/gcr/parse-raw-data`
3. AI shows user: "Found X items, saving to database..."
4. AI calls `/api/admin/gcr/save-parsed-items`
5. AI responds: "✅ Added to [Business Name] menu"
6. Data appears on all platforms ✓

---

## Error Handling

### Parse Errors

```json
{
  "error": "Could not extract JSON from AI response"
}
```

Solution: Try clearer raw data format or break into smaller chunks

### Save Errors

```json
{
  "saved": 5,
  "errors": ["Item 3: Invalid price format", "Item 7: Description too long"],
  "total": 7
}
```

Solution: Fix the items with errors and retry, or ignore errors and continue

### Auth Errors

```json
{
  "error": "Unauthorized"
}
```

Solution: Check that admin token is valid and included in Authorization header

---

## Testing Without Your AI

To test locally:

```bash
# 1. Get admin token from login
TOKEN=$(curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"...","password":"..."}' | jq -r '.token')

# 2. Parse data
curl -X POST http://localhost:3000/api/admin/gcr/parse-raw-data \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "entity_id": "test-123",
    "data_type": "menu",
    "raw_data": "Burger $12\nFries $5"
  }'

# 3. Save items
curl -X POST http://localhost:3000/api/admin/gcr/save-parsed-items \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "entity_id": "test-123",
    "data_type": "menu",
    "items": [{"item_name":"Burger","price":12}]
  }'
```

---

## Summary

Your AI can now:
- ✅ Accept raw data in any format
- ✅ Use Claude AI to intelligently parse it
- ✅ Automatically populate menu items, drinks, happy hours, specials, events
- ✅ Show data instantly on all platforms

This enables a natural, conversational interface:
- **User:** "Add our menu from the PDF"
- **AI:** Extracts text → Parses items → Saves → ✅ Done

🚀 Full database control for your AI through simple conversation
