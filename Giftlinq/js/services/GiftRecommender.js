import {sampleGifts} from '../data/sampleGifts.js';
import {Gift} from '../models/Gift.js';
export class GiftRecommender {
  constructor(apiService){this.apiService=apiService;}
  createSearchQuery(recipient){return recipient.interests.join(' ');}
  filterProducts(items,recipient){return items.filter(p=>p.price>=recipient.minPrice&&p.price<=recipient.maxPrice&&(recipient.age==='all'||p.age==='all'||p.age===recipient.age));}
  rankProducts(items,recipient){return items.map(item=>({...item,matchScore:item.tags.filter(tag=>recipient.interests.some(interest=>tag.includes(interest)||interest.includes(tag))).length})).sort((a,b)=>b.matchScore-a.matchScore||a.price-b.price);}
  async generateRecommendations(recipient,{live=false}={}){const items=live?await this.apiService.searchProducts(this.createSearchQuery(recipient),recipient):sampleGifts;
    return this.rankProducts(this.filterProducts(items,recipient),recipient).map(item=>new Gift(item));}
}
