import products from '../data/cat.json';

async function getProducts() {
  return new Promise((resolve) => {
    setTimeout(() => { resolve(products); }, 3000);
  });
}

export default getProducts;
