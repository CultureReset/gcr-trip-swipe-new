import requests, json
from collections import Counter

response = requests.get('http://localhost:3002/api/gcr/businesses')
data = response.json()

if data.get('success'):
    restaurants = [b for b in data['businesses'] if b.get('category') == 'restaurants']
    
    cuisines = []
    for r in restaurants:
        cuisine = r.get('cuisine', '')
        if cuisine:
            cuisines.append(cuisine.lower())
    
    # Count cuisines
    cuisine_counts = Counter(cuisines)
    
    print('Top cuisines in restaurants:')
    for cuisine, count in cuisine_counts.most_common(15):
        print(f'  {cuisine}: {count}')
