// app/products/[id]/page.tsx
"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import api from "../../../lib/api";
import Link from "next/link";
import ProtectedClient from "../../../components/ProtectedClient";
import { 
  ArrowLeft, 
  Star, 
  Heart, 
  Share2,
  ChevronRight,
  Check,
  Info,
  Truck,
  Shield,
  RotateCcw,
  Package,
} from "lucide-react";

async function fetchProduct(id: string) {
  const resp = await api.get(`/products/${id}`);
  return resp.data;
}

export default function ProductDetail() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "reviews" | "specifications">("description");

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id)
  });

  if (isLoading) {
    return (
      <ProtectedClient>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading product details...</p>
          </div>
        </div>
      </ProtectedClient>
    );
  }

  if (error) {
    return (
      <ProtectedClient>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Info className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Product Not Found</h2>
            <p className="text-gray-600 mb-6">We couldn't find the product you're looking for.</p>
            <Link 
              href="/products"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Products</span>
            </Link>
          </div>
        </div>
      </ProtectedClient>
    );
  }

  const discountPrice = product.discountPercentage 
    ? product.price - (product.price * product.discountPercentage / 100)
    : product.price;

  return (
    <ProtectedClient>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href="/products" className="hover:text-blue-600 transition-colors">
              Products
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-400">{product.category}</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium truncate">{product.title}</span>
          </div>

          {/* Back Button */}
          <Link 
            href="/products"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Back to Products</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <img 
                  src={product.thumbnail} 
                  alt={product.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Additional Images */}
              {product.images && product.images.length > 0 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.slice(0, 4).map((image: string, index: number) => (
                    <div
                      key={index}
                      className="aspect-square bg-white rounded-lg border-2 border-gray-200 overflow-hidden"
                    >
                      <img 
                        src={image} 
                        alt={`${product.title} ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {product.brand}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                      {product.category}
                    </span>
                    {product.discountPercentage && (
                      <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                        -{product.discountPercentage.toFixed(0)}%
                      </span>
                    )}
                  </div>
                  
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">({product.rating}/5)</span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-4xl font-bold text-gray-900">${discountPrice.toFixed(2)}</span>
                  {product.discountPercentage && (
                    <span className="text-xl text-gray-500 line-through">${product.price.toFixed(2)}</span>
                  )}
                </div>
              </div>

              {/* Stock Status */}
              <div className={`flex items-center space-x-2 p-4 rounded-xl ${
                product.stock > 0 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}>
                <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className={`font-medium ${product.stock > 0 ? 'text-green-800' : 'text-red-800'}`}>
                  {product.availabilityStatus || (product.stock > 0 ? 'In Stock' : 'Out of Stock')}
                </span>
                {product.stock > 0 && (
                  <span className="text-sm text-gray-600">({product.stock} available)</span>
                )}
              </div>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Product Details */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">SKU</span>
                    <span className="font-medium text-gray-900">{product.sku}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weight</span>
                    <span className="font-medium text-gray-900">{product.weight} lbs</span>
                  </div>
                  {product.dimensions && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dimensions</span>
                      <span className="font-medium text-gray-900">
                        {product.dimensions.width}" × {product.dimensions.height}" × {product.dimensions.depth}"
                      </span>
                    </div>
                  )}
                  {product.minimumOrderQuantity && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Min Order</span>
                      <span className="font-medium text-gray-900">{product.minimumOrderQuantity} units</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-16">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Tab Navigation */}
              <div className="border-b border-gray-200">
                <div className="flex">
                  {[
                    { id: "description", label: "Description", icon: Info },
                    { id: "reviews", label: `Reviews (${product.reviews?.length || 0})`, icon: Star },
                    { id: "specifications", label: "Specifications", icon: Package },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors duration-200 border-b-2 ${
                          activeTab === tab.id
                            ? 'text-blue-600 border-blue-600'
                            : 'text-gray-600 border-transparent hover:text-gray-900'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {activeTab === "description" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Product Description</h3>
                      <p className="text-gray-700 leading-relaxed">{product.description}</p>
                    </div>

                    {/* Warranty & Shipping Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {product.warrantyInformation && (
                        <div className="bg-gray-50 rounded-xl p-4">
                          <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                            <Shield className="w-5 h-5 text-blue-600" />
                            <span>Warranty</span>
                          </h4>
                          <p className="text-gray-700">{product.warrantyInformation}</p>
                        </div>
                      )}

                      {product.shippingInformation && (
                        <div className="bg-gray-50 rounded-xl p-4">
                          <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                            <Truck className="w-5 h-5 text-green-600" />
                            <span>Shipping</span>
                          </h4>
                          <p className="text-gray-700">{product.shippingInformation}</p>
                        </div>
                      )}

                      {product.returnPolicy && (
                        <div className="bg-gray-50 rounded-xl p-4">
                          <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                            <RotateCcw className="w-5 h-5 text-purple-600" />
                            <span>Return Policy</span>
                          </h4>
                          <p className="text-gray-700">{product.returnPolicy}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-8">
                    {product.reviews && product.reviews.length > 0 ? (
                      <>
                        {/* Review Summary */}
                        <div className="bg-gray-50 rounded-xl p-6">
                          <div className="flex items-center justify-between mb-6">
                            <div>
                              <h3 className="text-lg font-bold text-gray-900">Customer Reviews</h3>
                              <p className="text-gray-600">Based on {product.reviews.length} reviews</p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center space-x-1 mb-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-5 h-5 ${
                                      i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <p className="text-2xl font-bold text-gray-900">{product.rating}/5</p>
                            </div>
                          </div>
                        </div>

                        {/* Reviews List */}
                        <div className="space-y-6">
                          {product.reviews.map((review: any, index: number) => (
                            <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-3">
                                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                    <span className="text-white font-medium text-sm">
                                      {review.reviewerName[0]}
                                    </span>
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-900">{review.reviewerName}</p>
                                    <div className="flex items-center space-x-1">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`w-4 h-4 ${
                                            i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                          }`}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <span className="text-sm text-gray-600">
                                  {new Date(review.date).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-gray-700">{review.comment}</p>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-12">
                        <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Reviews Yet</h3>
                        <p className="text-gray-600">Be the first to review this product!</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "specifications" && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-gray-900">Product Specifications</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Basic Information</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">Product ID</span>
                            <span className="font-medium text-gray-900">{product.id}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">Brand</span>
                            <span className="font-medium text-gray-900">{product.brand}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">Category</span>
                            <span className="font-medium text-gray-900">{product.category}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">SKU</span>
                            <span className="font-medium text-gray-900">{product.sku}</span>
                          </div>
                          <div className="flex justify-between py-2">
                            <span className="text-gray-600">Stock</span>
                            <span className="font-medium text-gray-900">{product.stock} units</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Physical Specifications</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">Weight</span>
                            <span className="font-medium text-gray-900">{product.weight} lbs</span>
                          </div>
                          {product.dimensions && (
                            <>
                              <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-600">Width</span>
                                <span className="font-medium text-gray-900">{product.dimensions.width}"</span>
                              </div>
                              <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-600">Height</span>
                                <span className="font-medium text-gray-900">{product.dimensions.height}"</span>
                              </div>
                              <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-600">Depth</span>
                                <span className="font-medium text-gray-900">{product.dimensions.depth}"</span>
                              </div>
                            </>
                          )}
                          {product.minimumOrderQuantity && (
                            <div className="flex justify-between py-2">
                              <span className="text-gray-600">Min Order Qty</span>
                              <span className="font-medium text-gray-900">{product.minimumOrderQuantity}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Meta Information */}
                    {product.meta && (
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Additional Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Created</span>
                            <span className="font-medium text-gray-900">
                              {new Date(product.meta.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Last Updated</span>
                            <span className="font-medium text-gray-900">
                              {new Date(product.meta.updatedAt).toLocaleDateString()}
                            </span>
                          </div>
                          {product.meta.barcode && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Barcode</span>
                              <span className="font-medium text-gray-900">{product.meta.barcode}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedClient>
  );
}