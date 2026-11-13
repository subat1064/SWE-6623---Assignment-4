import { Recipient } from '../models/Recipient.js';
const $ = id => document.getElementById(id);
export class UIController {
  constructor({ storage, recipientManager, recommender }) { Object.assign(this, { storage, recipientManager, recommender }); }
  initialize() {
    $('gift-form').addEventListener('submit', e => this.handleSearch(e));
    $('save-profile').addEventListener('click', () => this.saveRecipient());
    $('remember').checked = this.storage.persist;
    $('remember').addEventListener('change', e => {
      try {
        this.storage.setPersistence(e.target.checked);
        this.showMessage(e.target.checked ? 'Saving enabled for this device.' : 'Persistent storage disabled and removed.', 'success');
      } catch (err) {
        e.target.checked = false;
        this.showMessage(err.message, 'danger');
      }
    });
    $('clear-data').addEventListener('click', () => {
      if (confirm('Clear all saved Giftlinq gifts, searches, and tab-only profiles?')) {
        this.storage.clearAll();
        this.recipientManager.clear();
        $('remember').checked = false;
        this.renderSaved();
        this.renderProfiles();
        this.renderSearches();
        this.showMessage('Giftlinq data cleared.', 'success');
      }
    });
    this.renderSaved();
    this.renderProfiles();
    this.renderSearches();
  }

  showMessage(message, type = 'info') {
    $('notice').className = 'alert alert-' + type;
    $('notice').textContent = message;
  }

  readRecipient() {
    const nickname = $('nickname').value.trim();
    if (nickname && (/[@\d]/.test(nickname) || nickname.length > 40)) throw new Error('Use a generic nickname without numbers or contact details.');
    const interests = $('interests').value.toLowerCase().split(',').map(x => x.trim()).filter(Boolean);
    // Allow simple category words only: no emails, URLs, digits, or contact details.
    if (!interests.length || interests.length > 5 || interests.some(x => !(/^[a-z][a-z -]{1,23}$/.test(x)))) {
      throw new Error('Enter 1–5 general interest topics using letters only (e.g., gaming, books).');
    }
    const minPrice = Number($('min-price').value), maxPrice = Number($('max-price').value);
    if (!$('min-price').value || !$('max-price').value || !Number.isFinite(minPrice) || !Number.isFinite(maxPrice) || minPrice < 0 || maxPrice < minPrice || maxPrice > 10000) {
      throw new Error('Enter a valid budget between $0 and $10,000.');
    }
    return new Recipient({ nickname, age: $('age').value, relationship: $('relationship').value, interests, minPrice, maxPrice });
  }
  
  async handleSearch(event) {
    event.preventDefault();
    try {
      const recipient = this.readRecipient();
      const gifts = await this.recommender.generateRecommendations(recipient);
      this.displayRecommendations(gifts);
      this.storage.saveSearch(recipient);
      this.renderSearches();
      this.showMessage('Showing ' + gifts.length + ' demo gift ideas (not live listings).', 'success');
    } catch (error) {
      this.showMessage(error.message, 'danger');
    }
  }

  displayRecommendations(gifts) {
    const root = $('results');
    root.replaceChildren();
    $('count').textContent = gifts.length + ' results';
    if (!gifts.length) {
      root.textContent = 'No gifts match. Try a different budget or age group.';
      return;
    }
    for (const gift of gifts) {
      const card = document.createElement('article');
      card.className = 'gift';
      const title = document.createElement('h3');
      title.textContent = gift.title;
      const detail = document.createElement('p');
      detail.textContent = `$${gift.price.toFixed(2)} · ${gift.category} · ${gift.condition} · ${gift.quantity} available (sample) · ${gift.description}`;
      const chip = document.createElement('span');
      chip.className = 'chip';
      chip.textContent = gift.matchScore + ' matching interest(s)';
      const button = this.button('Save gift', 'btn btn-sm btn-outline-primary', () => {
        try {
          this.storage.saveGift(gift.getProductDetails());
          this.renderSaved(); this.showMessage('Gift added to saved list.', 'success');
        } catch (err) {
          this.showMessage(err.message, 'danger');
        }
      });
      card.append(title, detail, chip, button); root.append(card);
    }
  }

  button(label, classes, handler) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = classes;
    button.textContent = label;
    button.addEventListener('click', handler);
    return button;
  }

  renderSaved() {
    const root = $('saved-gifts');
    root.replaceChildren();
    const gifts = this.storage.getSavedGifts();
    if (!gifts.length) {
      root.textContent = 'No gifts saved yet.';
      return;
    }
    for (const gift of gifts) {
      const row = document.createElement('div');
      row.className = 'mini-row';
      const text = document.createElement('span');
      text.textContent = (gift.purchased ? '✓ ' : '') + gift.title + ' — $' + Number(gift.price).toFixed(2);
      row.append(text, this.button(gift.purchased ? 'Undo purchased' : 'Mark purchased', 'btn btn-sm btn-outline-secondary', () => {
        this.storage.togglePurchased(gift.id);
        this.renderSaved();
      }),
        this.button('Remove', 'btn btn-sm btn-outline-danger', () => {
          this.storage.removeGift(gift.id);
          this.renderSaved();
        }));
      root.append(row);
    }
  }

  saveRecipient() {
    try {
      this.recipientManager.addRecipient(this.readRecipient());
      this.renderProfiles();
      this.showMessage('Profile saved in this tab only; not written to browser storage.', 'success');
    } catch (error) {
      this.showMessage(error.message, 'danger');
    }
  }

  renderProfiles() {
    const root = $('profiles');
    root.replaceChildren();
    const profiles = this.recipientManager.getRecipients();
    if (!profiles.length) {
      root.textContent = 'No tab-only profiles.';
      return;
    }
    for (const p of profiles) {
      const row = document.createElement('div');
      row.className = 'mini-row';
      const text = document.createElement('span');
      text.textContent = (p.nickname || 'Unnamed') + ' — ' + p.interests.join(', ');
      row.append(text, this.button('Load', 'btn btn-sm btn-outline-secondary', () => this.loadRecipient(p)), this.button('Delete', 'btn btn-sm btn-outline-danger', () => {
        this.recipientManager.deleteRecipient(p.id);
        this.renderProfiles();
      }));
      root.append(row);
    }
  }

  loadRecipient(p) {
    $('nickname').value = p.nickname;
    $('age').value = p.age;
    $('relationship').value = p.relationship;
    $('interests').value = p.interests.join(', ');
    $('min-price').value = p.minPrice;
    $('max-price').value = p.maxPrice;
  }

  renderSearches() {
    const root = $('searches');
    root.replaceChildren();
    const searches = this.storage.getSearches();
    if (!searches.length) {
      root.textContent = 'No searches yet.';
      return;
    }
    for (const s of searches) {
      const row = document.createElement('div');
      row.className = 'mini-row';
      const text = document.createElement('span');
      text.textContent = s.topics.join(', ') + ' · $' + s.minPrice + '–$' + s.maxPrice;
      row.append(text);
      root.append(row);
    }
  }

  displaySavedGifts() {
    this.renderSaved();
  }
}