export class Recipient {
  constructor({id, nickname='',age='all',relationship='',interests=[],minPrice=0,maxPrice=100}={}) {
    this.id=id||('r'+Date.now().toString(36)+Math.random().toString(36).slice(2,7));
    this.nickname=nickname;this.age=age;this.relationship=relationship;
    this.interests=[...interests];this.minPrice=Number(minPrice);this.maxPrice=Number(maxPrice);
  }
  updateDetails(changes){Object.assign(this,changes);return this;}
}
