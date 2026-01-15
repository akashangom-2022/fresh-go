
import React from 'react';
import { Product, CartItem } from '../types';

interface ProductCardProps {
  product: Product;
  quantityInCart: number;
  onAdd: (product: Product) => void;
  onRemove: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, quantityInCart, onAdd, onRemove }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-3 flex flex-col hover:shadow-md transition-shadow">
      <div className="relative aspect-square overflow-hidden rounded-lg mb-3">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2 bg-white/90 px-1.5 py-0.5 rounded text-[10px] font-bold text-gray-600 uppercase tracking-tight">
          {product.category}
        </div>
      </div>
      
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">{product.name}</h3>
        <p className="text-xs text-gray-500 mb-2">{product.unit}</p>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-900">₹{product.price}</span>
        </div>

        {quantityInCart > 0 ? (
          <div className="flex items-center bg-green-600 text-white rounded-lg px-2 py-1 shadow-sm">
            <button 
              onClick={() => onRemove(product.id)}
              className="px-1 hover:bg-green-700 rounded transition-colors"
            >
              -
            </button>
            <span className="mx-2 text-xs font-bold">{quantityInCart}</span>
            <button 
              onClick={() => onAdd(product)}
              className="px-1 hover:bg-green-700 rounded transition-colors"
            >
              +
            </button>
          </div>
        ) : (
          <button 
            onClick={() => onAdd(product)}
            className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all"
          >
            ADD
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
