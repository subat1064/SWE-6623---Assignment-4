import { Recipient } from '../models/Recipient.js';
// Profiles are deliberately kept in RAM, never in localStorage.
export class RecipientManager {
  constructor() { 
    this.profiles = []; 
  }

  getRecipients() { 
    return this.profiles.map(p => new Recipient(p)); 
  }

  addRecipient(data) { 
    if (this.profiles.length >= 20) throw new Error('Limit: 20 profiles per tab'); 
    const r = new Recipient(data); 
    this.profiles.push(r); return r; 
  }

  editRecipient(id, changes) { 
    const p = this.profiles.find(p => p.id === id); 
    if (p) p.updateDetails(changes); 
    return p || null; 
  }
  
  deleteRecipient(id) { 
    this.profiles = this.profiles.filter(p => p.id !== id); 
  }
  
  clear() { 
    this.profiles = []; 
  }
}
