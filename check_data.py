import json, sys, requests

response = requests.get('http://localhost:3002/api/gcr/businesses')
data = response.json()

if data.get('success'):
    businesses = data.get('businesses', [])
    
    print('\n📋 TOP RESTAURANTS WITH MENU DATA:\n')
    
    restaurants_with_menus = []
    for b in businesses:
        if b.get('category') == 'restaurants' and b.get('menu'):
            menu_items = 0
            menu = b.get('menu', {})
            
            for section in menu.values():
                if isinstance(section, dict) and 'sections' in section:
                    for subsection in section.get('sections', {}).values():
                        if isinstance(subsection, dict):
                            menu_items += len(subsection.get('items', []))
            
            if menu_items > 0:
                restaurants_with_menus.append({
                    'name': b.get('name'),
                    'menu_items': menu_items,
                    'rating': b.get('rating')
                })
    
    for i, r in enumerate(sorted(restaurants_with_menus, key=lambda x: x['menu_items'], reverse=True)[:10], 1):
        print(f"{i}. {r['name']}")
        print(f"   Menu Items: {r['menu_items']} | Rating: {r.get('rating', 'N/A')}")
        print()
    
    print(f'Total restaurants with menus: {len(restaurants_with_menus)} out of 152')
