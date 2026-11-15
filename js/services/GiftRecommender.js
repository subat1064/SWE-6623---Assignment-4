import { sampleGifts } from '../data/sampleGifts.js';
import { Gift } from '../models/Gift.js';
export class GiftRecommender {
  constructor(apiService) { 
    this.apiService = apiService; 
  }

  /**
   * Puts together recipient interests.
   * 
   * @param {*} recipient - The data of a recipient.
   * @returns The interests of the recipient.
   */
  createSearchQuery(recipient) { 
    return recipient.interests.join(' '); 
  }

  /**
   * Filters the items by the min and max price of the recipient.
   * 
   * @param {*} items - The recommended items.
   * @param {*} recipient - The data of the recipient.
   * @returns 
   */
  filterProducts(items, recipient) { 
    return items.filter(p => p.price >= recipient.minPrice && p.price <= recipient.maxPrice && (recipient.age === 'all' || p.age === 'all' || p.age === recipient.age)); 
  }

  /**
   * Organizes the products.
   * @param {*} items -  The recommended items.
   * @param {*} recipient - The data of the recipient.
   * @returns 
   */
  rankProducts(items, recipient) { 
    return items.map(item => ({ ...item, matchScore: item.tags.filter(tag => recipient.interests.some(interest => tag.includes(interest) || interest.includes(tag))).length })).sort((a, b) => b.matchScore - a.matchScore || a.price - b.price); 
  }
  
  /**
   * Uses the above methods to find all relevant products for a recipient.
   * @param {*} recipient - The data of the recipient.
   * @param {*} param1 
   * @returns All products that are recommended to the user, using the above methods.
   */
  async generateRecommendations(recipient, { live = false } = {}) {
    const items = live ? await this.apiService.searchProducts(this.createSearchQuery(recipient), recipient) : sampleGifts;
    return this.rankProducts(this.filterProducts(items, recipient), recipient).map(item => new Gift(item));
  }
}
