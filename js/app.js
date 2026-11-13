import { StorageService } from './services/StorageService.js';
import { RecipientManager } from './services/RecipientManager.js';
import { GiftRecommender } from './services/GiftRecommender.js';
import { EbayAPIService } from './services/EbayAPIService.js';
import { UIController } from './ui/UIController.js';
const storage = new StorageService();
const recipientManager = new RecipientManager();
const recommender = new GiftRecommender(new EbayAPIService());
new UIController({ storage, recipientManager, recommender }).initialize();
