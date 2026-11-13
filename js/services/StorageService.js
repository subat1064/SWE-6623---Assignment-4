// Consent-gated localStorage. Never store passwords, tokens, names or profiles.
export class StorageService {
  constructor() {
    this.prefix = 'giftlinq_v3_'; 
    this.allowed = new Set(['gifts', 'searches']); 
    this.memory = new Map(); 
    this.persist = false;
    try { 
      this.persist = localStorage.getItem(this.prefix + 'consent') === 'yes'; 
    } catch { 
      this.persist = false; 
    }
  }

  setPersistence(enabled) {
    this.persist = Boolean(enabled);
    try {
      if (this.persist) { 
        localStorage.setItem(this.prefix + 'consent', 'yes'); 
        for (const key of this.allowed) localStorage.setItem(this.prefix + key, JSON.stringify(this.getData(key))); 
      }
      else { 
        for (const key of this.allowed) localStorage.removeItem(this.prefix + key); 
        localStorage.removeItem(this.prefix + 'consent'); 
      }
    } catch { 
      this.persist = false; 
      throw new Error('Browser storage is unavailable. Data will remain in this tab only.'); 
    }
  }

  getData(key) {
    this.assertKey(key); 
    if (this.memory.has(key)) return structuredClone(this.memory.get(key));
    if (this.persist) { 
      try { 
        const raw = localStorage.getItem(this.prefix + key); 
        if (raw) { 
          const data = JSON.parse(raw); 
          if (Array.isArray(data)) return data; 
        } 
      } catch { } 
    }
    return [];
  }

  saveData(key, items) {
    this.assertKey(key); 
    if (!Array.isArray(items)) throw new Error('Invalid saved data'); 
    this.memory.set(key, structuredClone(items));
    if (this.persist) { 
      try { 
        localStorage.setItem(this.prefix + key, JSON.stringify(items)); 
      } catch { 
        throw new Error('Could not save data on this device.'); 
      } 
    }
  }

  assertKey(key) { 
    if (!this.allowed.has(key)) throw new Error('Unsupported data type'); 
  }

  saveGift(gift) {
    const gifts = this.getSavedGifts(); 
    const safe = { id: String(gift.id).slice(0, 80), title: String(gift.title).slice(0, 120), price: Number(gift.price), purchased: false };
    if (!gifts.some(g => g.id === safe.id)) { 
      gifts.push(safe); this.saveData('gifts', gifts.slice(-50)); 
    } 
    return this.getSavedGifts();
  }

  getSavedGifts() { 
    return this.getData('gifts'); 
  }

  removeGift(id) { 
    this.saveData('gifts', this.getSavedGifts().filter(g => g.id !== id)); 
  }

  togglePurchased(id) { 
    this.saveData('gifts', this.getSavedGifts().map(g => g.id === id ? { ...g, purchased: !g.purchased } : g)); 
  }

  saveSearch(search) {
    const safe = { topics: search.interests.slice(0, 5), minPrice: search.minPrice, maxPrice: search.maxPrice };
    const searches = this.getData('searches'); 
    searches.unshift(safe); 
    this.saveData('searches', searches.slice(0, 10));
  }

  getSearches() { 
    return this.getData('searches'); 
  }
  
  clearAll() {
    this.memory.clear(); 
    try {
      for (const key of this.allowed) localStorage.removeItem(this.prefix + key); localStorage.removeItem(this.prefix + 'consent');
      // Also remove known older Giftlinq storage keys from earlier prototypes.
      for (let i = localStorage.length - 1; i >= 0; i--) { 
        const key = localStorage.key(i); 
        if (key && /^giftlinq_v[12]_/.test(key)) localStorage.removeItem(key); 
      }
    } catch { } 
    this.persist = false;
  }
}
