import requests, json

response = requests.get('http://localhost:3002/api/gcr/businesses')
data = response.json()

if data.get('success'):
    businesses = data.get('businesses', [])
    
    print('\n📊 BUSINESSES PER PAGE:\n')
    
    # Restaurants page
    restaurants = [b for b in businesses if b.get('category') == 'restaurants']
    print(f'🍽️  Restaurants page: {len(restaurants)}')
    
    # Coffee & Sweets page
    coffee_sweets = [b for b in businesses if b.get('category') in ['coffee-sweets', 'coffee', 'sweets']]
    print(f'☕  Coffee & Sweets page: {len(coffee_sweets)}')
    for cat in ['coffee-sweets', 'coffee', 'sweets']:
        count = len([b for b in businesses if b.get('category') == cat])
        if count > 0:
            print(f'    - {cat}: {count}')
    
    # Happy Hours page
    nightlife = [b for b in businesses if b.get('category') == 'nightlife']
    print(f'🍻  Happy Hours page: {len(nightlife)}')
    
    # Things to Do page
    things_to_do = [b for b in businesses if b.get('category') in ['things-to-do', 'activities', 'attractions']]
    print(f'🎯  Things to Do page: {len(things_to_do)}')
    for cat in ['things-to-do', 'activities', 'attractions']:
        count = len([b for b in businesses if b.get('category') == cat])
        if count > 0:
            print(f'    - {cat}: {count}')
    
    # Other page
    other = [b for b in businesses if b.get('category') in ['other', 'shopping', 'hotels', 'lodging', 'boat-launch', 'entertainment', 'parking']]
    print(f'📍  Other page: {len(other)}')
    for cat in ['other', 'shopping', 'hotels', 'lodging', 'boat-launch', 'entertainment', 'parking']:
        count = len([b for b in businesses if b.get('category') == cat])
        if count > 0:
            print(f'    - {cat}: {count}')
    
    # Total
    total = len(restaurants) + len(coffee_sweets) + len(nightlife) + len(things_to_do) + len(other)
    print(f'\n📊  TOTAL ACROSS ALL PAGES: {total} / {len(businesses)}')
    
    if total != len(businesses):
        print(f'\n⚠️  MISSING {len(businesses) - total} businesses!')
