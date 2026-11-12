export class Gift {
  constructor(item={}){Object.assign(this,item);}
  getProductDetails(){return {id:this.id,title:this.title,price:this.price,category:this.category,condition:this.condition,quantity:this.quantity,description:this.description};}
}
