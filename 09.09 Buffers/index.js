import ProductApi from "./ProductApi.js"

const api = new ProductApi('http://localhost:3000');

async function main() {
  await api.getProducts();
  
  const newProduct = await api.addProduct({ name: 'Продукт', price: 999 });
  
  await api.updateProduct(newProduct.id, { ...newProduct, price: 888 });
  
  await api.deleteProduct(newProduct.id);
}

main().catch(console.error);