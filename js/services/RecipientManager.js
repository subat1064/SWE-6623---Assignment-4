import { Recipient } from '../models/Recipient.js';
// Profiles are deliberately kept in RAM, never in localStorage.
export class RecipientManager {
  constructor() { 
    this.profiles = []; 
  }

  /**
   * @returns The currently saved recipients.
   */
  getRecipients() { 
    return this.profiles.map(p => new Recipient(p)); 
  }

  /**
   * Makes a new recipient.
   * 
   * @param {*} data - id, nickname, age, relationship, interests, minPrice, maxPrice 
   * @returns The new recipient.
   */
  addRecipient(data) { 
    if (this.profiles.length >= 20) throw new Error('Limit: 20 profiles per tab'); 
    const r = new Recipient(data); 
    this.profiles.push(r); return r; 
  }

  /**
   * Allows changing the details of a recipient
   * 
   * @param {number} id - Unique ID of this recipient.
   * @param {*} changes - The entirety of their data to update.
   * @returns 
   */
  editRecipient(id, changes) { 
    const p = this.profiles.find(p => p.id === id); 
    if (p) p.updateDetails(changes); 
    return p || null; 
  }
  
  /**
   * Deletes a recipient from the list.
   * 
   * @param {number} id - Unique ID of the recipient.
   */
  deleteRecipient(id) { 
    this.profiles = this.profiles.filter(p => p.id !== id); 
  }
  
  /**
   * Deltes all recipient profiles.
   */
  clear() { 
    this.profiles = []; 
  }
}
