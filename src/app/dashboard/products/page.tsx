"use client"

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Modal from "@/components/Modal";
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  MoreVertical, 
  Star,
  Upload,
  FileText,
  Image as ImageIcon,
  DollarSign,
  Package,
  AlertCircle
} from "lucide-react";
import { useAuth } from '@/contexts/AuthContext'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import DashboardLayout from '@/components/DashboardLayout'

export default function MyProductsPage() {
  const { user } = useAuth()
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    totalLicenses: "",
    image: "",
    digitalProduct: "",
    thumbnail: ""
  });

  // Sample data
  const products = [
    {
      id: 1,
      title: "Premium E-book Template",
      description: "Professional e-book template with modern design and customizable layouts",
      price: "29.99",
      category: "E-book",
      status: "active",
      totalLicenses: 100,
      soldLicenses: 45,
      revenue: 1349.55,
      rating: 4.8,
      reviews: 23,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Digital Art Collection",
      description: "High-quality digital art collection with 50 unique designs",
      price: "49.99",
      category: "PNG",
      status: "active",
      totalLicenses: 50,
      soldLicenses: 32,
      revenue: 1599.68,
      rating: 4.9,
      reviews: 18,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Video Tutorial Series",
      description: "Complete video tutorial series on web development",
      price: "79.99",
      category: "MP4",
      status: "draft",
      totalLicenses: 75,
      soldLicenses: 0,
      revenue: 0,
      rating: 0,
      reviews: 0,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = () => {
    // Handle form submission
    console.log("New product:", newProduct);
    setIsAddProductModalOpen(false);
    setNewProduct({
      title: "",
      description: "",
      price: "",
      category: "",
      totalLicenses: "",
      image: "",
      digitalProduct: "",
      thumbnail: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setNewProduct(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
      case "paused":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800";
    }
  };

  return (
    <ProtectedRoute requireAuth={true}>
      <DashboardLayout>
        
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                My Products
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage your digital products and track their performance
              </p>
            </div>
            <Button 
              onClick={() => setIsAddProductModalOpen(true)}
              className="bg-flyverr-primary hover:bg-flyverr-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Product
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Products</p>
                    <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{products.length}</p>
                  </div>
                  <div className="p-3 bg-blue-500/10 dark:bg-blue-400/20 rounded-lg">
                    <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">Active Products</p>
                    <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                      {products.filter(p => p.status === "active").length}
                    </p>
                  </div>
                  <div className="p-3 bg-green-500/10 dark:bg-green-400/20 rounded-lg">
                    <Star className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Total Revenue</p>
                    <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                      ${products.reduce((sum, p) => sum + p.revenue, 0).toFixed(2)}
                    </p>
                  </div>
                  <div className="p-3 bg-purple-500/10 dark:bg-purple-400/20 rounded-lg">
                    <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Total Sales</p>
                    <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                      {products.reduce((sum, p) => sum + p.soldLicenses, 0)}
                    </p>
                  </div>
                  <div className="p-3 bg-orange-500/10 dark:bg-orange-400/20 rounded-lg">
                    <FileText className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:bg-white dark:focus:bg-gray-700"
                    />
                  </div>
                </div>
                <div className="sm:w-48">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-flyverr-primary dark:focus:ring-flyverr-secondary focus:border-transparent"
                  >
                    <option value="all">All Categories</option>
                    <option value="e-book">E-book</option>
                    <option value="png">PNG</option>
                    <option value="mp4">MP4</option>
                    <option value="zip">ZIP</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Products Table */}
          {filteredProducts.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                My Products
              </h2>
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-b border-gray-200 dark:border-gray-600">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                            Product
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                            Upload Status
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                            Category
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                            Price
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                            Licenses Sold
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                            Royalties
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                            Revenue
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                            Rating
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredProducts.map((product) => (
                          <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-12 w-12">
                                  <img 
                                    className="h-12 w-12 rounded-lg object-cover border border-gray-200 dark:border-gray-600 shadow-sm" 
                                    src={product.image} 
                                    alt={product.title}
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                    {product.title}
                                  </div>
                                  <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 max-w-xs">
                                    {product.description}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge className={`${getStatusColor(product.status)} font-medium`}>
                                {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                                {product.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                ${product.price}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-3">
                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                  {product.soldLicenses}/{product.totalLicenses}
                                </span>
                                <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                  <div 
                                    className="bg-gradient-to-r from-flyverr-primary to-flyverr-secondary h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${(product.soldLicenses / product.totalLicenses) * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                                ${Math.round(product.revenue * 0.1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                                ${product.revenue}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                  {product.rating}
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                                  ({product.reviews})
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-500"
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-500"
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 border-gray-200 dark:border-gray-700 shadow-lg">
              <CardContent className="p-12 text-center">
                <div className="mx-auto w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                  <Package className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm mx-auto">
                  {searchTerm || selectedCategory !== "all" 
                    ? "Try adjusting your search or filter criteria"
                    : "Get started by adding your first digital product"
                  }
                </p>
                {!searchTerm && selectedCategory === "all" && (
                  <Button 
                    onClick={() => setIsAddProductModalOpen(true)}
                    className="bg-flyverr-primary hover:bg-flyverr-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Product
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* Add Product Modal */}
          {isAddProductModalOpen && (
            <Modal size="lg">
              <div className="space-y-6">
                {/* Header */}
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Add New Product
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Upload your digital product and set up your listing
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={(e) => { e.preventDefault(); handleAddProduct(); }} className="space-y-6">
                  {/* Digital Product Upload */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Upload Digital Product *
                    </Label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-flyverr-primary dark:hover:border-flyverr-secondary transition-colors duration-200 bg-gray-50 dark:bg-gray-800/50">
                      <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Drop your file here, or{" "}
                          <span className="text-flyverr-primary dark:text-flyverr-secondary font-medium cursor-pointer hover:underline">
                            browse
                          </span>
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          PDF, ZIP, MP4, PNG, JPG up to 100MB
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Product Title *
                      </Label>
                      <Input
                        type="text"
                        placeholder="Enter product title"
                        value={newProduct.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Category *
                      </Label>
                      <select
                        value={newProduct.category}
                        onChange={(e) => handleInputChange("category", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-flyverr-primary dark:focus:ring-flyverr-secondary focus:border-transparent"
                      >
                        <option value="">Select category</option>
                        <option value="e-book">E-book</option>
                        <option value="png">PNG</option>
                        <option value="jpg">JPG</option>
                        <option value="mp4">MP4</option>
                        <option value="zip">ZIP</option>
                        <option value="pdf">PDF</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Description *
                    </Label>
                    <Textarea
                      placeholder="Describe your product..."
                      value={newProduct.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      rows={4}
                      className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Price ($) *
                      </Label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={newProduct.price}
                        onChange={(e) => handleInputChange("price", e.target.value)}
                        min="0"
                        step="0.01"
                        className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Quantity (Max: 100) *
                      </Label>
                      <Input
                        type="number"
                        placeholder="1"
                        value={newProduct.totalLicenses}
                        onChange={(e) => handleInputChange("totalLicenses", e.target.value)}
                        min="1"
                        max="100"
                        className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Royalty Rate (%)
                      </Label>
                      <Input
                        type="number"
                        placeholder="10"
                        defaultValue="10"
                        min="0"
                        max="100"
                        className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  {/* Thumbnail Upload */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Thumbnail Image *
                    </Label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-flyverr-primary dark:hover:border-flyverr-secondary transition-colors duration-200 bg-gray-50 dark:bg-gray-800/50">
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Drop your thumbnail here, or{" "}
                          <span className="text-flyverr-primary dark:text-flyverr-secondary font-medium cursor-pointer hover:underline">
                            browse
                          </span>
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          PNG, JPG up to 5MB (Recommended: 800x600)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Admin Approval Notice */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <div className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                          Admin Approval Required
                        </h4>
                        <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                          Your product will be reviewed by our team within 24-48 hours. You'll be notified once it's approved and live on the marketplace.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsAddProductModalOpen(false)}
                      className="flex-1 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-500"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-flyverr-primary hover:bg-flyverr-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      Submit for Review
                    </Button>
                  </div>
                </form>
              </div>
            </Modal>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
} 