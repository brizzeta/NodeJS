import fetch from "node-fetch";

export default class ProductApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.buffer = [];
  }

  async getProducts() {
    const response = await fetch(`${this.baseUrl}/products`);
    const data = await response.json();
    this.buffer = data;
    console.log('Буфер:', this.buffer);
    return data;
  }

  async addProduct(product) {
    const response = await fetch(`${this.baseUrl}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    const newProduct = await response.json();
    this.buffer.push(newProduct);
    console.log('Буфер додавання:', this.buffer);
    return newProduct;
  }

  async updateProduct(id, updatedProduct) {
    const response = await fetch(`${this.baseUrl}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct)
    });
    const updated = await response.json();
    const index = this.buffer.findIndex(p => p.id === id);
    if (index !== -1) {
      this.buffer[index] = updated;
    }
    console.log('Буфер оновлення:', this.buffer);
    return updated;
  }

  async deleteProduct(id) {
    await fetch(`${this.baseUrl}/products/${id}`, { method: 'DELETE' });
    this.buffer = this.buffer.filter(p => p.id !== id);
    console.log('Буфер видалення:', this.buffer);
  }
}