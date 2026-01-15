
export type Category = 'All' | 'Fruits' | 'Vegetables' | 'Dairy' | 'Bakery' | 'Beverages' | 'Snacks';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  unit: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderDetails {
  fullName: string;
  address: string;
  phone: string;
  paymentMethod: string;
}
