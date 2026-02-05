import requests, json

response = requests.get('http://localhost:3002/api/gcr/businesses')
data = response.json()

if data.get('success'):
    businesses = data.get('businesses', [])
    
    print('\n📊 CATEGORY DISTRIBUTION:\n')
    
    categories = {}
    for b in businesses:
        cat = b.get('category', 'uncategorized')
        if cat not in categories:
            categories[cat] = []
        categories[cat].append(b.get('name'))
    
    # Expected category page mappings
    pages = {
        'restaurants.html': ['restaurants'],
        'coffee-sweets.html': ['coffee-sweets', 'coffee', 'sweets'],
        'happy-hours.html': ['nightlife'],
        'things-to-do.html': ['things-to-do', 'activities', 'attractions'],
        'other.html': ['other', 'shopping', 'hotels', 'lodging', 'boat-launch', 'entertainment', 'parking']
    }
    
    print('EXPECTED CATEGORY MAPPINGS:\n')
    for page, cats in pages.items():
        total = sum(len(categories.get(cat, [])) for cat in cats)
        print(f'{page}:')
        for cat in cats:
            count = len(categories.get(cat, []))
            if count > 0:
                print(f'  - {cat}: {count}')
        print(f'  TOTAL: {total}\n')
    
    # Check for unmapped categories
    all_mapped = set()
    for cats in pages.values():
        all_mapped.update(cats)
    
    unmapped = set(categories.keys()) - all_mapped
    if unmapped:
        print('⚠️ UNMAPPED CATEGORIES:')
        for cat in unmapped:
            print(f'  - {cat}: {len(categories[cat])}')
