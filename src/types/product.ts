export interface Product {
    id: number; 
    name: string;
    price: number;
    category: string;
    image: string;
    description: string;
    title: string;
     rating: {
    rate: number
    count: number
  }
 
 
}