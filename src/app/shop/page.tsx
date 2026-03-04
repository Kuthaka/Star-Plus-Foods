"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Filter, SlidersHorizontal, ChevronDown, LayoutGrid, List, ShoppingBag, UtensilsCrossed, Plus, Loader2 } from "lucide-react";
import TopBanner from "@/components/headers/TopBanner";
import Navbar from "@/components/headers/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/client";
import { Product } from "@/types/product";
import { Category } from "@/types/category";
import { useCartStore } from "@/store/useCartStore";


export default function Shop() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("Featured");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const supabase = createClient();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Fetch Categories
                const { data: catData } = await supabase
                    .from("categories")
                    .select("*")
                    .eq("is_listed", true)
                    .order("name", { ascending: true });
                if (catData) setCategories(catData);

                // 2. Fetch Products
                const { data: prodData } = await supabase
                    .from("products")
                    .select("*")
                    .eq("is_listed", true)
                    .order("created_at", { ascending: false });
                if (prodData) setProducts(prodData);
            } catch (err) {
                console.error("Error fetching shop data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredAndSortedProducts = (() => {
        let result = selectedCategory === "All"
            ? [...products]
            : products.filter(p => p.category === selectedCategory);

        if (sortBy === "Price: Low to High") {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === "Price: High to Low") {
            result.sort((a, b) => b.price - a.price);
        }
        return result;
    })();

    const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low"];

    return (
        <div className="flex min-h-screen flex-col font-sans">
            <TopBanner />

            <main className="flex-grow bg-gray-50/50">
                {/* Header/Nav Section */}
                <div className="bg-brand-teal relative overflow-hidden pb-32">
                    <Navbar />

                    {/* Page Header Content */}
                    <div className="container mx-auto px-4 md:px-12 pt-20 relative z-10 text-center">
                        <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">
                            The <span className="text-brand-orange">Shop</span>
                        </h1>
                        <p className="text-white/60 max-w-2xl mx-auto font-medium text-lg">
                            Authentic Indian flavors delivered to your doorstep. Explore our curated menu of street-style favorites.
                        </p>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-yellow opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                </div>

                {/* Filter & Listing Section */}
                <div className="container mx-auto px-4 md:px-12 -mt-16 relative z-20 pb-20">

                    {/* Controls Bar */}
                    <div className="bg-white rounded-3xl shadow-xl shadow-black/5 p-4 md:p-6 mb-12 flex flex-col lg:flex-row items-center justify-between gap-6 border border-gray-100">
                        {/* Category Pills */}
                        <div className="flex items-center gap-3 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 no-scrollbar">
                            <button
                                onClick={() => setSelectedCategory("All")}
                                className={`
                                    px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap
                                    ${selectedCategory === "All"
                                        ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/20 scale-105"
                                        : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-brand-teal"}
                                `}
                            >
                                All
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.name)}
                                    className={`
                                        px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap
                                        ${selectedCategory === cat.name
                                            ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/20 scale-105"
                                            : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-brand-teal"}
                                    `}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>

                        {/* Right side controls */}
                        <div className="flex items-center justify-between w-full lg:w-auto gap-4 md:gap-8">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sort By:</span>
                                <div className="relative">
                                    <button
                                        onClick={() => setIsSortOpen(!isSortOpen)}
                                        className="flex items-center gap-2 text-sm font-black text-brand-teal uppercase tracking-wider min-w-[140px] justify-between"
                                    >
                                        {sortBy} <ChevronDown className={`w-4 h-4 text-brand-orange transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {/* Sort Dropdown */}
                                    {isSortOpen && (
                                        <div className="absolute top-full right-0 mt-4 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[60] py-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                            {sortOptions.map((option) => (
                                                <button
                                                    key={option}
                                                    onClick={() => {
                                                        setSortBy(option);
                                                        setIsSortOpen(false);
                                                    }}
                                                    className={`w-full text-left px-6 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${sortBy === option ? 'text-brand-orange bg-brand-orange/5' : 'text-gray-600 hover:bg-gray-50'}`}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="h-8 w-[1px] bg-gray-100 hidden md:block"></div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`p-2 rounded-xl transition-all ${viewMode === "grid" ? "bg-brand-teal text-white shadow-lg shadow-brand-teal/20" : "bg-gray-100 text-gray-400 hover:bg-gray-200"}`}
                                >
                                    <LayoutGrid className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`p-2 rounded-xl transition-all ${viewMode === "list" ? "bg-brand-teal text-white shadow-lg shadow-brand-teal/20" : "bg-gray-100 text-gray-400 hover:bg-gray-200"}`}
                                >
                                    <List className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Loading State Overlay */}
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <Loader2 className="w-10 h-10 text-brand-teal animate-spin" />
                            <p className="text-[10px] font-black text-brand-teal uppercase tracking-[0.4em]">Optimizing Inventory...</p>
                        </div>
                    )}

                    {/* Active Filters Display */}
                    <div className="flex items-center justify-between mb-8 px-2">
                        <p className="text-sm font-bold text-gray-400">
                            Showing <span className="text-brand-teal">{filteredAndSortedProducts.length}</span> results for <span className="text-brand-orange uppercase">{selectedCategory}</span>
                        </p>
                    </div>

                    {/* Product Listing */}
                    {!loading && (
                        viewMode === "grid" ? (
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
                                {filteredAndSortedProducts.map((product) => (
                                    <div key={product.id} className="group flex flex-col bg-white rounded-2xl md:rounded-3xl p-2 md:p-4 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-50 md:border-transparent hover:border-gray-50 relative">
                                        {/* Image Container */}
                                        <Link href={`/shop/${product.slug}`} className="relative w-full aspect-[4/5] bg-gray-50 rounded-xl md:rounded-2xl overflow-hidden mb-3 md:mb-6 flex items-center justify-center cursor-pointer">
                                            <div className="relative w-full h-full transform transition-transform duration-700 group-hover:scale-110 drop-shadow-xl font-bold uppercase tracking-widest text-[#cfcfcf]/50">
                                                {product.images?.[0] ? (
                                                    <Image
                                                        src={product.images[0]}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <UtensilsCrossed className="w-12 h-12" />
                                                )}
                                            </div>
                                            <div className="absolute inset-0 bg-brand-teal/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 z-30">
                                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-teal hover:bg-brand-orange hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500 shadow-xl">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                                </div>
                                            </div>
                                        </Link>

                                        {/* Info */}
                                        <div className="flex flex-col gap-1 px-2">
                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em]">{product.category}</span>
                                            <Link href={`/shop/${product.slug}`}>
                                                <h4 className="text-brand-teal font-black text-xs md:text-lg uppercase leading-tight group-hover:text-brand-orange transition-colors cursor-pointer line-clamp-2 min-h-[2.5rem] md:min-h-0">
                                                    {product.name}
                                                </h4>
                                            </Link>
                                            <div className="flex items-center gap-1 my-2">
                                                {[1, 2, 3, 4, 5].map((s) => (
                                                    <svg key={s} className={`w-3 h-3 ${s <= 4 ? "text-brand-yellow fill-current" : "text-gray-200 fill-current"}`} viewBox="0 0 20 20">
                                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                    </svg>
                                                ))}
                                                <span className="text-[10px] text-gray-400 font-bold ml-1">(4.9)</span>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex flex-col">
                                                    <span className="text-gray-400 text-[10px] font-bold uppercase mb-1">Price</span>
                                                    <span className="text-brand-teal font-black text-lg md:text-xl">₹{product.price}</span>
                                                </div>
                                                <button
                                                    onClick={() => useCartStore.getState().addItem(product)}
                                                    className="h-8 w-8 md:h-10 md:w-10 bg-brand-teal text-white rounded-lg md:rounded-xl flex items-center justify-center hover:bg-brand-orange transition-all hover:scale-110 shadow-lg shadow-brand-teal/10"
                                                >
                                                    <Plus className="w-4 h-4 md:w-5 md:h-5 text-white" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {filteredAndSortedProducts.map((product) => (
                                    <div key={product.id} className="group flex flex-col md:flex-row bg-white rounded-3xl p-5 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-transparent hover:border-gray-50 items-center gap-6">
                                        <Link href={`/shop/${product.slug}`} className="relative w-40 aspect-[4/5] bg-gray-50 rounded-2xl flex-shrink-0 flex items-center justify-center overflow-hidden cursor-pointer">
                                            <div className="relative w-full h-full transform transition-transform duration-700 group-hover:scale-110 drop-shadow-lg flex items-center justify-center text-[#cfcfcf]/50">
                                                {product.images?.[0] ? (
                                                    <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                                                ) : (
                                                    <UtensilsCrossed className="w-10 h-10" />
                                                )}
                                            </div>
                                        </Link>
                                        <div className="flex-grow text-center md:text-left min-w-0">
                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{product.category}</span>
                                            <Link href={`/shop/${product.slug}`}>
                                                <h4 className="text-brand-teal font-black text-xl uppercase mt-1 mb-2 group-hover:text-brand-orange transition-colors truncate cursor-pointer">{product.name}</h4>
                                            </Link>
                                            <div className="flex items-center justify-center md:justify-start gap-1 mb-3">
                                                {[1, 2, 3, 4, 5].map((s) => (
                                                    <svg key={s} className="w-3 h-3 text-brand-yellow fill-current" viewBox="0 0 20 20">
                                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                    </svg>
                                                ))}
                                                <span className="text-[10px] text-gray-400 font-bold ml-1">(4.9)</span>
                                            </div>
                                            <div className="flex items-center justify-center md:justify-between gap-4">
                                                <span className="text-brand-teal font-black text-2xl whitespace-nowrap">₹{product.price}</span>
                                                <button className="h-10 w-10 bg-brand-teal text-white rounded-xl flex items-center justify-center hover:bg-brand-orange transition-all hover:scale-110">
                                                    <ShoppingBag className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
                    )}

                    {!loading && filteredAndSortedProducts.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
                            <UtensilsCrossed className="w-20 h-20 mb-6" />
                            <h3 className="text-xl font-black text-brand-teal uppercase tracking-widest">Inventory Unavailable</h3>
                            <p className="text-xs font-bold text-gray-400 mt-2 uppercase tracking-widest">No products match the selected criteria.</p>
                        </div>
                    )}

                </div>
            </main>

            <Footer />
        </div>
    );
}
