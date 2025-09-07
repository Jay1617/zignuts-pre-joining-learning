// app/page.tsx
"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";
import ProductCard from "../components/ProductCard";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

async function fetchFeaturedProducts() {
  // Get only 8 products for homepage
  const resp = await api.get<{ products: Product[] }>("/products?limit=8");
  return resp.data.products;
}

export default function HomePage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: fetchFeaturedProducts
  });

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Welcome to MyShop</h1>
        <p className="text-lg mb-6">
          The best place to shop your favorite products
        </p>
        <Link
          href="/products"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100"
        >
          Shop Now
        </Link>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>

        {isLoading ? (
          <div className="text-center py-10">Loading featured products...</div>
        ) : error ? (
          <div className="text-red-600">Failed to load products</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {data?.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Link
            href="/products"
            className="bg-blue-600 text-white px-5 py-3 rounded hover:bg-blue-700"
          >
            View All Products →
          </Link>
        </div>
      </section>
    </div>
  );
}
