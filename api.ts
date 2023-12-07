import axios from 'axios';

const API_BASE_URL = 'https://fakestoreapi.com';

export const fetchProducts = async (searchQuery?: string) => {
    try {
      const url = `${API_BASE_URL}/products`;
      const response = await axios.get(url);
      let products = response.data;
  
      if (searchQuery) {
        products = products.filter(product => 
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
  
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
};