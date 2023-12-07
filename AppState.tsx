type ProductDetails = {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
    description: string;
    mode: string;
  };
type AppState = {
    inventory: ProductDetails[];
};
