// app/products/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api";
import ProductCard from "../../components/ProductCard";
import Pagination from "../../components/Pagination";
import ProtectedClient from "../../components/ProtectedClient";
import { Search, Filter, SortAsc, Grid3X3, List, RefreshCw, X, ChevronDown } from "lucide-react";

type ProductsResponse = {
  products: any[];
  total: number;
  skip: number;
  limit: number;
};

async function fetchProducts({ page, limit, search, sortBy, sortOrder, category }: any) {
  const skip = (page - 1) * limit;

  // Build query params
  let endpoint = "/products";
  let params: any = { limit, skip };

  if (search) {
    endpoint = "/products/search";
    params.q = search;
  }

  if (category && category !== "all") {
    endpoint = `/products/category/${category}`;
  }

  if (sortBy) {
    params.sortBy = sortBy;
    params.order = sortOrder;
  }

  const resp = await api.get<ProductsResponse>(endpoint, { params });
  return { products: resp.data.products, total: resp.data.total };
}

async function fetchCategories() {
  const resp = await api.get<string[]>("/products/category-list");
  return resp.data;
}

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<null | "price" | "rating" | "title">(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [category, setCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  // Fetch products
  const { data, isLoading, error, isFetching, refetch } = useQuery({
    queryKey: ["products", page, limit, search, sortBy, sortOrder, category],
    queryFn: () => fetchProducts({ page, limit, search, sortBy, sortOrder, category }),
    placeholderData: (prev) => prev
  });

  // Fetch categories
  const { data: categories } = useQuery({ queryKey: ["categories"], queryFn: fetchCategories });

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [search, sortBy, sortOrder, category]);

  const clearFilters = () => {
    setSearch("");
    setSortBy(null);
    setSortOrder("asc");
    setCategory("all");
    setPage(1);
  };

  const hasActiveFilters = search || sortBy || category !== "all";

  return (
    <ProtectedClient>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Products</h1>
                <p className="mt-2 text-gray-600">Discover amazing products tailored for you</p>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                <button
                  onClick={() => refetch()}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Refresh</span>
                </button>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${viewMode === "grid" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-50"} transition-colors duration-200`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${viewMode === "list" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-50"} transition-colors duration-200`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-8">
            <div className="p-6">
              {/* Search Bar */}
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 bg-gray-50/50 focus:bg-white"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Filter Toggle */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 sm:w-auto w-full justify-center sm:justify-start"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
                </button>

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                    <span>Clear Filters</span>
                  </button>
                )}

                {data && (
                  <div className="text-sm text-gray-600">
                    {isFetching ? (
                      <span className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <span>Updating...</span>
                      </span>
                    ) : (
                      <span>{data.total} products found</span>
                    )}
                  </div>
                )}
              </div>

              {/* Filters Panel */}
              {showFilters && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Category Filter */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Category</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 bg-white"
                      >
                        <option value="all">All Categories</option>
                        {categories?.map((c) => (
                          <option key={c} value={c}>
                            {c.charAt(0).toUpperCase() + c.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Sort By */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Sort By</label>
                      <select
                        value={sortBy ?? ""}
                        onChange={(e) => setSortBy(e.target.value ? (e.target.value as any) : null)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 bg-white"
                      >
                        <option value="">Default</option>
                        <option value="price">Price</option>
                        <option value="rating">Rating</option>
                        <option value="title">Name</option>
                      </select>
                    </div>

                    {/* Sort Order */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Order</label>
                      <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value as any)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 bg-white"
                      >
                        <option value="asc">Low to High</option>
                        <option value="desc">High to Low</option>
                      </select>
                    </div>

                    
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 font-medium">Loading amazing products...</p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-red-800 mb-2">Failed to load products</h3>
              <p className="text-red-600 mb-4">Something went wrong while fetching products.</p>
              <button
                onClick={() => refetch()}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              {data && data.products.length > 0 ? (
                <>
                  <div className={`${
                    viewMode === "grid" 
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                      : "space-y-4"
                  }`}>
                    {data.products.map((product) => (
                      <div 
                        key={product.id} 
                        className={`animate-fadeInUp ${viewMode === "list" ? "bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden" : ""}`}
                        style={{animationDelay: `${data.products.indexOf(product) * 50}ms`}}
                      >
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>

                  <div className="mt-12">
                    <Pagination
                      page={page}
                      pageSize={limit}
                      total={data.total}
                      onPageChange={(p: number) => setPage(p)}
                    />
                  </div>
                </>
              ) : (
                <div className="bg-gray-100 rounded-2xl p-12 text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-600 mb-6">
                    {hasActiveFilters 
                      ? "Try adjusting your filters to see more results." 
                      : "No products available at the moment."}
                  </p>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </ProtectedClient>
  );
}