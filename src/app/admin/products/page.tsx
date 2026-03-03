"use client";

import React, { useState, useEffect } from "react";
import {
    Search,
    Plus,
    Filter,
    ChevronDown,
    MoreVertical,
    Eye,
    Edit,
    Trash2,
    ExternalLink,
    ChevronLeft,
    ChevronRight,
    ArrowUpDown,
    UtensilsCrossed
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Product, CATEGORIES } from "@/types/product";

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("newest");
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    const supabase = createClient();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setProducts(data || []);
        } catch (error) {
            console.error("Error fetching products:", error);
            // Fallback for development if table doesn't exist yet
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    // Filter and Sort Logic
    const filteredProducts = products
        .filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            if (sortBy === "price-low") return a.price - b.price;
            if (sortBy === "price-high") return b.price - a.price;
            if (sortBy === "name-asc") return a.name.localeCompare(b.name);
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-brand-teal uppercase tracking-tighter">Product Inventory</h1>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em] mt-2">Manage your catalog items & visibility</p>
                </div>
                <Link
                    href="/admin/products/add"
                    className="inline-flex items-center justify-center gap-3 bg-brand-orange text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-teal transition-all duration-500 shadow-xl shadow-brand-orange/20"
                >
                    <Plus className="w-4 h-4" />
                    Add New Product
                </Link>
            </div>

            {/* Controls Bar */}
            <div className="bg-white rounded-[2.5rem] p-4 lg:p-6 shadow-[0_20px_60px_rgba(45,90,75,0.05)] border border-gray-100 flex flex-col xl:flex-row items-center gap-6">
                {/* Search */}
                <div className="relative w-full xl:max-w-md group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-orange transition-colors" />
                    <input
                        type="text"
                        placeholder="Search products by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-14 bg-gray-50/50 border-none rounded-2xl pl-14 pr-6 text-sm font-bold text-brand-teal focus:ring-4 focus:ring-brand-orange/5 transition-all outline-none"
                    />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto">
                    <div className="relative group">
                        <Filter className="absolute left-5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="h-12 pl-12 pr-10 bg-gray-50/50 border-none rounded-xl text-[10px] font-black uppercase tracking-widest text-brand-teal focus:ring-4 focus:ring-brand-orange/5 transition-all outline-none appearance-none cursor-pointer"
                        >
                            <option value="All">All Categories</option>
                            {CATEGORIES.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                    </div>

                    <div className="relative group">
                        <ArrowUpDown className="absolute left-5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="h-12 pl-12 pr-10 bg-gray-50/50 border-none rounded-xl text-[10px] font-black uppercase tracking-widest text-brand-teal focus:ring-4 focus:ring-brand-orange/5 transition-all outline-none appearance-none cursor-pointer"
                        >
                            <option value="newest">Sort By: Newest</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="name-asc">Alphabetical: A-Z</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Products Grid/Empty State */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="bg-white rounded-[2.5rem] p-6 h-[400px] animate-pulse border border-gray-100 flex flex-col gap-4">
                            <div className="w-full aspect-[1082/1280] bg-gray-100 rounded-3xl" />
                            <div className="h-4 w-2/3 bg-gray-100 rounded-lg" />
                            <div className="h-3 w-1/3 bg-gray-50 rounded-lg" />
                        </div>
                    ))}
                </div>
            ) : paginatedProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {paginatedProducts.map((product) => (
                        <div key={product.id} className="group bg-white rounded-[2.5rem] p-4 shadow-[0_20px_60px_rgba(45,90,75,0.05)] border border-white hover:border-brand-orange/20 transition-all duration-500 overflow-hidden flex flex-col">
                            {/* Image Container */}
                            <div className="relative aspect-[1082/1280] rounded-[2rem] overflow-hidden mb-6 bg-gray-100">
                                {product.images?.[0] ? (
                                    <Image
                                        src={product.images[0]}
                                        alt={product.name}
                                        fill
                                        className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                                        <UtensilsCrossed className="w-12 h-12 mb-2" />
                                        <span className="text-[10px] font-black uppercase">No Image</span>
                                    </div>
                                )}

                                {/* Absolute Badges */}
                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                    <div className="bg-brand-teal text-white px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest shadow-xl">
                                        {product.category}
                                    </div>
                                    <div className={`px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest shadow-xl ${product.is_listed ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                        {product.is_listed ? 'Listed' : 'Unlisted'}
                                    </div>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="px-2 flex-grow">
                                <h3 className="text-sm font-black text-brand-teal uppercase tracking-tight mb-1 group-hover:text-brand-orange transition-colors">{product.name}</h3>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.size_grams}g Net Weight</p>

                                <div className="mt-4 flex items-center justify-between">
                                    <div className="text-xl font-black text-brand-teal tracking-tighter">
                                        ₹{product.price}
                                    </div>
                                    <Link
                                        href={`/admin/products/${product.id}`}
                                        className="p-3 bg-gray-50 rounded-xl text-brand-teal hover:bg-brand-orange hover:text-white transition-all transform hover:-translate-y-1"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-[3rem] p-20 text-center shadow-sm border border-gray-100 border-dashed">
                    <div className="w-24 h-24 bg-brand-teal/5 rounded-[2rem] mx-auto mb-8 flex items-center justify-center text-brand-teal">
                        <UtensilsCrossed className="w-10 h-10 opacity-20" />
                    </div>
                    <h3 className="text-2xl font-black text-brand-teal uppercase tracking-tight mb-3">No Products Found</h3>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest leading-loose max-w-sm mx-auto">
                        Your inventory is currently empty or no items match your search filters.
                    </p>
                    <Link
                        href="/admin/products/add"
                        className="inline-flex items-center gap-3 bg-brand-teal text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-orange mt-10 transition-all shadow-xl shadow-brand-teal/10"
                    >
                        <Plus className="w-4 h-4" />
                        Create First Product
                    </Link>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 py-8">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-4 bg-white rounded-2xl text-brand-teal disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-2">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`
                                    w-12 h-12 rounded-2xl font-black text-xs transition-all
                                    ${currentPage === i + 1
                                        ? "bg-brand-teal text-white shadow-xl shadow-brand-teal/20"
                                        : "bg-white text-brand-teal hover:bg-gray-50 shadow-sm"}
                                `}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-4 bg-white rounded-2xl text-brand-teal disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    );
}
