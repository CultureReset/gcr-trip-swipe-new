// Grok AI-Powered Search for Gulf Coast Radar
// Uses xAI Grok to understand natural language queries and search Supabase data

class GrokSearch {
  constructor() {
    this.apiKey = window.AI_CONFIG?.grokApiKey || '';
    this.endpoint = 'https://api.x.ai/v1/chat/completions';
  }

  // Parse query with Grok AI to extract keywords and intent
  async parseQuery(query) {
    if (!this.apiKey) {
      console.warn('Grok API key not configured');
      return null;
    }

    try {
      const systemPrompt = `You are helping search a Gulf Coast business directory (restaurants, charter boats, activities, services).
Extract ALL relevant search terms from the user's question including:
- Food items, dishes, menu items
- Service types (deep sea fishing, charter boats, tours, activities, etc.)
- Features (waterfront, gluten-free, outdoor seating, kid-friendly, etc.)
- Timing (today, tomorrow, now, specific dates)
- Group size/capacity (number of people)
- Duration (hours, half-day, full-day)
- Price requirements (cheap, budget, expensive, price range)
- Availability queries (is this asking about availability?)
- Special requirements (all-you-can-eat, buffet, private charter, etc.)

Return JSON: {
  "keywords": ["all", "relevant", "search", "terms"],
  "timing": "today/tomorrow/now/specific date/null",
  "groupSize": number or null,
  "duration": "number of hours or description",
  "priceRange": "cheap/budget/moderate/expensive/null",
  "checkingAvailability": true/false,
  "requirements": ["special requirements"]
}`;

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'grok-beta',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: query }
          ],
          temperature: 0.1,
          max_tokens: 150
        }),
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (!response.ok) {
        console.error('Grok API error:', response.status);
        return null;
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content;

      if (!aiResponse) return null;

      // Parse JSON response
      const parsed = JSON.parse(aiResponse);
      console.log('🤖 Grok parsed query:', parsed);
      return parsed;
    } catch (error) {
      console.error('Grok parsing error:', error.message);
      return null;
    }
  }

  // Search businesses with AI-enhanced scoring
  async searchBusinesses(query, businesses) {
    console.log('🔍 Grok AI Search:', query);

    // Get AI understanding of the query
    const grokParsed = await this.parseQuery(query);

    const queryLower = query.toLowerCase();
    const stopwords = ['i', 'im', 'i\'m', 'looking', 'for', 'a', 'an', 'the', 'to', 'go', 'get', 'need', 'want', 'find', 'list', 'of', 'show', 'me', 'some', 'any', 'can', 'you', 'tell', 'place', 'that', 'has', 'on', 'with', 'where', 'is', 'are', 'there'];
    const queryWords = queryLower.split(/\s+/).filter(w => w.length > 2 && !stopwords.includes(w));

    const results = [];

    businesses.forEach(business => {
      let score = 0;
      const matchedTerms = [];
      const matchedItems = [];

      // PRIMARY: Use AI keywords for intelligent matching
      if (grokParsed && grokParsed.keywords) {
        const keywords = Array.isArray(grokParsed.keywords) ? grokParsed.keywords : [grokParsed.keywords];

        keywords.forEach(keyword => {
          const keyLower = keyword.toLowerCase();

          // Check menu items (for restaurants)
          if (business.menu && Array.isArray(business.menu)) {
            business.menu.forEach(item => {
              const itemName = item.name || item.item || '';
              const itemDesc = item.description || item.desc || '';

              if (itemName.toLowerCase().includes(keyLower) ||
                  itemDesc.toLowerCase().includes(keyLower)) {
                score += 50;
                matchedTerms.push(`AI matched menu: ${itemName}`);
                if (!matchedItems.find(m => m.name === itemName)) {
                  matchedItems.push({ ...item, type: 'menu' });
                }
              }
            });
          }

          // Check services/activities
          if (business.services && Array.isArray(business.services)) {
            business.services.forEach(service => {
              const serviceName = service.name || service.service || '';
              const serviceDesc = service.description || service.desc || '';

              if (serviceName.toLowerCase().includes(keyLower) ||
                  serviceDesc.toLowerCase().includes(keyLower)) {
                score += 50;
                matchedTerms.push(`AI matched service: ${serviceName}`);
                if (!matchedItems.find(m => m.name === serviceName)) {
                  matchedItems.push({ ...service, type: 'service' });
                }
              }
            });
          }

          // Check tags/features
          if (business.tags && Array.isArray(business.tags)) {
            business.tags.forEach(tag => {
              if (tag.toLowerCase().includes(keyLower)) {
                score += 30;
                matchedTerms.push(`Matched tag: ${tag}`);
              }
            });
          }

          // Check dietary/special features
          if (business.dietary && Array.isArray(business.dietary)) {
            business.dietary.forEach(diet => {
              if (diet.toLowerCase().includes(keyLower)) {
                score += 40;
                matchedTerms.push(`Dietary: ${diet}`);
              }
            });
          }

          // Check amenities
          if (business.amenities && Array.isArray(business.amenities)) {
            business.amenities.forEach(amenity => {
              if (amenity.toLowerCase().includes(keyLower)) {
                score += 35;
                matchedTerms.push(`Amenity: ${amenity}`);
              }
            });
          }
        });
      }

      // SECONDARY: Fallback word matching
      queryWords.forEach(word => {
        // Business name (high value)
        if (business.name && business.name.toLowerCase().includes(word)) {
          score += 50;
          matchedTerms.push(`Name contains "${word}"`);
        }

        // Category
        if (business.category && business.category.toLowerCase().includes(word)) {
          score += 30;
          matchedTerms.push(`Category: ${business.category}`);
        }

        // Cuisine
        if (business.cuisine && business.cuisine.toLowerCase().includes(word)) {
          score += 30;
          matchedTerms.push(`Cuisine: ${business.cuisine}`);
        }

        // Description
        if (business.description && business.description.toLowerCase().includes(word)) {
          score += 20;
        }

        // Address/Location (for waterfront, beachfront, etc.)
        if (business.address && business.address.toLowerCase().includes(word)) {
          score += 25;
          matchedTerms.push(`Location feature: ${word}`);
        }
      });

      // Add to results if score > 0
      if (score > 0) {
        results.push({
          business,
          score,
          matchedTerms,
          matchedItems,
          grokParsed
        });
      }
    });

    // Sort by score (highest first)
    results.sort((a, b) => b.score - a.score);

    console.log(`✅ Found ${results.length} results`);
    return {
      results: results.slice(0, 20), // Top 20 results
      grokParsed,
      totalFound: results.length
    };
  }

  // Format results for display
  formatResults(searchResults) {
    const { results, grokParsed } = searchResults;

    let html = '';

    // Show AI understanding
    if (grokParsed && grokParsed.keywords) {
      html += `<div style="background: #f0f9ff; padding: 12px; border-radius: 8px; margin-bottom: 20px;">
        <strong>🤖 AI Understanding:</strong> Looking for: ${grokParsed.keywords.join(', ')}
        ${grokParsed.timing ? ` | When: ${grokParsed.timing}` : ''}
      </div>`;
    }

    // Display results
    results.forEach(({ business, score, matchedItems, matchedTerms }) => {
      html += `<div class="search-result-card" style="background: white; border-radius: 12px; padding: 20px; margin-bottom: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <h3 style="margin: 0 0 8px 0; color: #1a1a1a;">
          <a href="profile.html?id=${business.id}" style="color: #1a1a1a; text-decoration: none;">
            ${business.name}
          </a>
        </h3>
        <p style="color: #666; margin: 0 0 8px 0; font-size: 14px;">
          ${business.category || business.cuisine || ''} ${business.address ? `• ${business.address}` : ''}
        </p>

        ${matchedItems.length > 0 ? `
          <div style="background: #f9fafb; padding: 12px; border-radius: 8px; margin-top: 12px;">
            <strong style="font-size: 13px; color: #666;">Matched Items:</strong>
            <ul style="margin: 8px 0 0 20px; padding: 0;">
              ${matchedItems.slice(0, 3).map(item => `
                <li style="font-size: 14px; color: #333; margin-bottom: 4px;">
                  <strong>${item.name}</strong>
                  ${item.price ? ` - ${item.price}` : ''}
                  ${item.description ? `<br><span style="font-size: 12px; color: #666;">${item.description.substring(0, 100)}...</span>` : ''}
                </li>
              `).join('')}
            </ul>
          </div>
        ` : ''}

        <div style="margin-top: 12px; font-size: 12px; color: #999;">
          Match score: ${score} | ${matchedTerms.slice(0, 3).join(' • ')}
        </div>
      </div>`;
    });

    if (results.length === 0) {
      html = '<div style="text-align: center; padding: 40px; color: #666;">No results found. Try a different search.</div>';
    }

    return html;
  }
}

// Initialize global instance
window.grokSearch = new GrokSearch();
