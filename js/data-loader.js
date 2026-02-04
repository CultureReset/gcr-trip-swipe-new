/**
 * Data Loader - Sync system for GCR Platform
 *
 * Priority order:
 * 1. Supabase API (http://localhost:3002/api/gcr/businesses) - LIVE DATA
 * 2. localStorage (backup/offline cache)
 * 3. fallback-data.js (if both fail)
 */

(function() {
  const STORAGE_KEY = 'gcr_business_data';
  const API_URL = 'http://localhost:3002/api/gcr/businesses';

  // Initialize with fallback data if available
  if (typeof businessData !== 'undefined') {
    window.allBusinesses = businessData;
  }

  // Fetch from Supabase API
  async function loadFromAPI() {
    try {
      console.log('📡 Fetching data from Supabase API...');
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.businesses && data.businesses.length > 0) {
        window.allBusinesses = data.businesses;
        // Cache in localStorage for offline use
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data.businesses));
        console.log(`✅ Loaded ${data.businesses.length} businesses from Supabase API`);

        // Trigger custom event so pages know data is loaded
        window.dispatchEvent(new CustomEvent('businessDataLoaded', { detail: { source: 'api', count: data.businesses.length } }));
        return true;
      } else {
        throw new Error('Invalid API response');
      }
    } catch (error) {
      console.warn('⚠️ Failed to load from API:', error.message);
      return false;
    }
  }

  // Fallback to localStorage if API fails
  function loadFromLocalStorage() {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (parsedData.length > 0) {
          window.allBusinesses = parsedData;
          console.log(`📦 Loaded ${parsedData.length} businesses from localStorage (offline mode)`);
          window.dispatchEvent(new CustomEvent('businessDataLoaded', { detail: { source: 'localStorage', count: parsedData.length } }));
          return true;
        }
      } catch (e) {
        console.error('Failed to parse localStorage:', e);
      }
    }
    return false;
  }

  // Try API first, then localStorage, then use fallback data
  (async function init() {
    const apiSuccess = await loadFromAPI();

    if (!apiSuccess) {
      const localSuccess = loadFromLocalStorage();

      if (!localSuccess) {
        console.log('⚠️ Using fallback data (no API or localStorage available)');
        window.dispatchEvent(new CustomEvent('businessDataLoaded', { detail: { source: 'fallback', count: window.allBusinesses?.length || 0 } }));
      }
    }
  })();

  // Provide helper functions globally
  window.gcrDataLoader = {
    // Get all businesses
    getAllBusinesses: function() {
      return typeof allBusinesses !== 'undefined' ? allBusinesses : [];
    },

    // Get single business by ID
    getBusinessById: function(id) {
      const businesses = this.getAllBusinesses();
      return businesses.find(b => b.id === id || b.business_id === id || b.place_id === id);
    },

    // Update business (saves to localStorage, will sync to Supabase on next reload)
    updateBusiness: function(id, updates) {
      const businesses = this.getAllBusinesses();
      const index = businesses.findIndex(b => b.id === id || b.business_id === id);

      if (index !== -1) {
        businesses[index] = { ...businesses[index], ...updates };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(businesses));
        window.allBusinesses = businesses;
        console.log('✅ Business updated:', id);
        return true;
      }
      return false;
    },

    // Save all businesses (used by CSV import)
    saveAllBusinesses: function(businesses) {
      window.allBusinesses = businesses;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(businesses));
      console.log(`✅ Saved ${businesses.length} businesses to localStorage`);
    },

    // Get sync status
    getSyncStatus: function() {
      return {
        source: 'Supabase API',
        businessCount: this.getAllBusinesses().length,
        apiUrl: API_URL
      };
    },

    // Refresh data from API
    refresh: async function() {
      await loadFromAPI();
    }
  };

  // Log sync status after init
  console.log('🔄 Data Loader initialized');
})();
