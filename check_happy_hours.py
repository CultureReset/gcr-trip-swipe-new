import requests, json

response = requests.get('http://localhost:3002/api/gcr/businesses')
data = response.json()

if data.get('success'):
    businesses = data.get('businesses', [])
    
    # Businesses with happy hour data
    with_happy_hour = []
    for b in businesses:
        has_hh = (
            b.get('happyHourSpecials') or
            b.get('happy_hour') or
            b.get('happyHour') or
            b.get('has_happy_hour') or
            (b.get('happyHours') and len(b.get('happyHours', [])) > 0) or
            (b.get('menu') and isinstance(b.get('menu'), dict) and b.get('menu').get('happyhour'))
        )
        if has_hh:
            with_happy_hour.append(b.get('name'))
    
    print(f'🍻 Businesses with ACTUAL happy hour data: {len(with_happy_hour)}')
    print(f'📍 Nightlife category businesses: {len([b for b in businesses if b.get("category") == "nightlife"])}')
    print()
    print('Businesses with happy hours:')
    for name in with_happy_hour[:15]:
        print(f'  - {name}')
    if len(with_happy_hour) > 15:
        print(f'  ... and {len(with_happy_hour) - 15} more')
