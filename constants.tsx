
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Alphonso Mango',
    price: 499,
    category: 'Fruits',
    image: 'https://picsum.photos/seed/mango/400/400',
    unit: '1 kg',
    description: 'Sweet and juicy seasonal mangoes.'
  },
  {
    id: '2',
    name: 'Fresh Strawberries',
    price: 150,
    category: 'Fruits',
    image: 'https://picsum.photos/seed/strawberry/400/400',
    unit: '250g',
    description: 'Bright red, sweet strawberries.'
  },
  {
    id: '3',
    name: 'Broccoli',
    price: 80,
    category: 'Vegetables',
    image: 'https://picsum.photos/seed/broccoli/400/400',
    unit: '1 pc',
    description: 'Nutritious green broccoli head.'
  },
  {
    id: '4',
    name: 'Organic Tomatoes',
    price: 40,
    category: 'Vegetables',
    image: 'https://picsum.photos/seed/tomato/400/400',
    unit: '1 kg',
    description: 'Farm-fresh organic tomatoes.'
  },
  {
    id: '5',
    name: 'Full Cream Milk',
    price: 65,
    category: 'Dairy',
    image: 'https://picsum.photos/seed/milk/400/400',
    unit: '1 L',
    description: 'Pasteurized high-quality milk.'
  },
  {
    id: '6',
    name: 'Gouda Cheese',
    price: 350,
    category: 'Dairy',
    image: 'https://picsum.photos/seed/cheese/400/400',
    unit: '200g',
    description: 'Aged Dutch gouda cheese.'
  },
  {
    id: '7',
    name: 'Sourdough Bread',
    price: 120,
    category: 'Bakery',
    image: 'https://picsum.photos/seed/bread/400/400',
    unit: '1 pc',
    description: 'Freshly baked artisan sourdough.'
  },
  {
    id: '8',
    name: 'Chocolate Croissant',
    price: 90,
    category: 'Bakery',
    image: 'https://picsum.photos/seed/croissant/400/400',
    unit: '1 pc',
    description: 'Buttery flaky pastry with dark chocolate.'
  },
  {
    id: '9',
    name: 'Fresh Orange Juice',
    price: 180,
    category: 'Beverages',
    image: 'https://picsum.photos/seed/juice/400/400',
    unit: '500ml',
    description: '100% pure cold-pressed orange juice.'
  },
  {
    id: '10',
    name: 'Greek Yogurt',
    price: 140,
    category: 'Dairy',
    image: 'https://picsum.photos/seed/yogurt/400/400',
    unit: '400g',
    description: 'Thick and creamy unsweetened Greek yogurt.'
  },
  {
    id: '11',
    name: 'Potato Chips',
    price: 50,
    category: 'Snacks',
    image: 'https://picsum.photos/seed/chips/400/400',
    unit: '100g',
    description: 'Crunchy salted classic potato chips.'
  },
  {
    id: '12',
    name: 'Hass Avocado',
    price: 220,
    category: 'Fruits',
    image: 'https://picsum.photos/seed/avocado/400/400',
    unit: '1 pc',
    description: 'Perfectly ripe Hass avocado.'
  }
];

export const CATEGORIES: string[] = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Beverages', 'Snacks'];
