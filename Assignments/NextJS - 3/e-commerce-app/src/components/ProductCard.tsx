// src/components/ProductCard.tsx
import Link from "next/link";
import { Star, Heart, ShoppingCart, Eye } from "lucide-react";
import { useState } from "react";

type Props = {
  product: any;
};

export default function ProductCard({ product }: Props) {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Generate random rating for demo (replace with actual product rating)
  const rating = Math.floor(Math.random() * 2) + 4; // 4-5 stars
  const reviewCount = Math.floor(Math.random() * 1000) + 50;

  // Calculate discount percentage for demo
  const originalPrice = Math.floor(product.price * 1.3);
  const discountPercent = Math.floor(
    ((originalPrice - product.price) / originalPrice) * 100
  );

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-50">
        {/* Product Image */}
        <div className="aspect-square relative">
          {product.thumbnail && (
            <>
              <img
                src={product.thumbnail}
                alt={product.title}
                className={`w-full h-full object-cover transition-all duration-500 ${
                  imageLoaded ? "scale-100" : "scale-110"
                } group-hover:scale-110`}
                onLoad={() => setImageLoaded(true)}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Brand and Category */}
        <div className="flex items-center justify-between text-xs">
          <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">
            {product.brand}
          </span>
          <span className="text-gray-500 uppercase tracking-wide">
            {product.category}
          </span>
        </div>

        {/* Product Title */}
        <h3 className="font-semibold text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-200">
          {product.title}
        </h3>

        {/* Price Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">
              ${product.price}
            </span>
          </div>

          <Link
            href={`/products/${product.id}`}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline transition-colors duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
