// Integration boundary for the planned eBay Browse API.
// No OAuth token or client secret may be placed in a public GitHub Pages app.
// Live calls are intentionally disabled until a secure token service exists.
export class EbayAPIService {
 async searchProducts(query, filters = {}) {
    const params = new URLSearchParams({
        q: query
    });

    if (filters.minPrice !== undefined) {
        params.set("minPrice", filters.minPrice);
    }

    if (filters.maxPrice !== undefined) {
        params.set("maxPrice", filters.maxPrice);
    }

    const response = await fetch(
        `http://localhost:3000/api/ebay/search?${params.toString()}`
    );

    if (!response.ok) {
        this.handleAPIError(response);
    }

    const data = await response.json();
return this.parseProductResponse(data);
}

  async getProductDetails(itemId) { 
    void itemId; throw new Error('Live eBay product details are not configured.'); 
  }

  handleAPIError(response) { 
    throw new Error('eBay request failed: ' + response.status); 
  }
  
  // Future fetch/JSON mapping method; only accepts non-sensitive catalog response data.
  parseProductResponse(json) { 
    return (json.itemSummaries || []).map(item => ({ 
      id: item.itemId, title: item.title, price: Number(item.price?.value), quantity: undefined, condition: item.condition || 'Unknown', description: item.shortDescription || '', category: 'eBay', age: 'all', tags: [] 
    })); 
  }
}
