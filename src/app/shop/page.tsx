"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Filter, SlidersHorizontal, ChevronDown, LayoutGrid, List, ShoppingBag } from "lucide-react";
import TopBanner from "@/components/headers/TopBanner";
import Navbar from "@/components/headers/Navbar";
import Footer from "@/components/Footer";

const PRODUCTS = [
    { id: 1, name: "Smoky Butter Chicken", price: "249", category: "Curries", badge: "Hot", rating: 4.9 },
    { id: 2, name: "Jhannat Dal Fry", price: "189", category: "Curries", badge: "Best Seller", rating: 4.8 },
    { id: 3, name: "Jeera Rice", price: "129", category: "Rice", badge: "", rating: 4.7 },
    { id: 4, name: "Dhaba Chicken Combo", price: "349", category: "Combos", badge: "New", rating: 5.0 },
    { id: 5, name: "Shahi Paneer", price: "229", category: "Curries", badge: "", rating: 4.6 },
    { id: 6, name: "Mix Veg Curry", price: "199", category: "Curries", badge: "", rating: 4.5 },
    { id: 7, name: "Dal Makhni", price: "219", category: "Curries", badge: "Low Fat", rating: 4.9 },
    { id: 8, name: "Meal Combo Box", price: "399", category: "Combos", badge: "Popular", rating: 4.8 },
    { id: 9, name: "Garlic Naan (2pcs)", price: "89", category: "Sides", badge: "", rating: 4.7 },
    { id: 10, name: "Tandoori Roti", price: "49", category: "Sides", badge: "", rating: 4.6 },
    { id: 11, name: "Mango Lassi", price: "99", category: "Drinks", badge: "Cool", rating: 4.9 },
    { id: 12, name: "Gulab Jamun (2pcs)", price: "79", category: "Desserts", badge: "Sweet", rating: 5.0 }
];

const CATEGORIES = ["All", "Curries", "Rice", "Sides", "Combos", "Drinks"];

export default function Shop() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("Featured");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [isSortOpen, setIsSortOpen] = useState(false);

    const filteredAndSortedProducts = (() => {
        let result = selectedCategory === "All"
            ? [...PRODUCTS]
            : PRODUCTS.filter(p => p.category === selectedCategory);

        if (sortBy === "Price: Low to High") {
            result.sort((a, b) => Number(a.price) - Number(b.price));
        } else if (sortBy === "Price: High to Low") {
            result.sort((a, b) => Number(b.price) - Number(a.price));
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
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`
                                        px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap
                                        ${selectedCategory === cat
                                            ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/20 scale-105"
                                            : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-brand-teal"}
                                    `}
                                >
                                    {cat}
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

                    {/* Active Filters Display */}
                    <div className="flex items-center justify-between mb-8 px-2">
                        <p className="text-sm font-bold text-gray-400">
                            Showing <span className="text-brand-teal">{filteredAndSortedProducts.length}</span> results for <span className="text-brand-orange uppercase">{selectedCategory}</span>
                        </p>
                    </div>

                    {/* Product Listing */}
                    {viewMode === "grid" ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {filteredAndSortedProducts.map((product) => (
                                <div key={product.id} className="group flex flex-col bg-white rounded-3xl p-4 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-transparent hover:border-gray-50 relative">
                                    {/* Product Badge */}
                                    {product.badge && (
                                        <span className="absolute top-6 left-6 z-20 bg-brand-orange text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter blur-none">
                                            {product.badge}
                                        </span>
                                    )}

                                    {/* Image Container */}
                                    <div className="relative w-full aspect-square bg-gray-50 rounded-2xl overflow-hidden mb-6 flex items-center justify-center p-8">
                                        <div className="relative w-full h-full transform transition-transform duration-700 group-hover:scale-110 drop-shadow-xl">
                                            <Image
                                                src="https://res.cloudinary.com/drmroxs00/image/upload/v1772532862/1-removebg_w2b9ls.png"
                                                alt={product.name}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <div className="absolute inset-0 bg-brand-teal/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 z-30">
                                            <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-teal hover:bg-brand-orange hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500 shadow-xl">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="flex flex-col gap-1 px-2">
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em]">{product.category}</span>
                                        <h4 className="text-brand-teal font-black text-lg uppercase leading-tight group-hover:text-brand-orange transition-colors">{product.name}</h4>
                                        <div className="flex items-center gap-1 my-2">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <svg key={s} className={`w-3 h-3 ${s <= Math.floor(product.rating) ? "text-brand-yellow fill-current" : "text-gray-200 fill-current"}`} viewBox="0 0 20 20">
                                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                </svg>
                                            ))}
                                            <span className="text-[10px] text-gray-400 font-bold ml-1">({product.rating})</span>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex flex-col">
                                                <span className="text-gray-400 text-[10px] font-bold uppercase mb-1">Price</span>
                                                <span className="text-brand-teal font-black text-xl">₹{product.price}</span>
                                            </div>
                                            <button className="h-10 w-10 bg-brand-teal text-white rounded-xl flex items-center justify-center hover:bg-brand-orange transition-all hover:scale-110">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
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
                                    <div className="relative w-40 h-40 bg-gray-50 rounded-2xl flex-shrink-0 flex items-center justify-center p-5 overflow-hidden">
                                        <div className="relative w-full h-full transform transition-transform duration-700 group-hover:scale-110 drop-shadow-lg">
                                            <Image src="https://res.cloudinary.com/drmroxs00/image/upload/v1772532862/1-removebg_w2b9ls.png" alt={product.name} fill className="object-contain" />
                                        </div>
                                        {product.badge && <span className="absolute top-3 left-3 bg-brand-orange text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase">{product.badge}</span>}
                                    </div>
                                    <div className="flex-grow text-center md:text-left min-w-0">
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{product.category}</span>
                                        <h4 className="text-brand-teal font-black text-xl uppercase mt-1 mb-2 group-hover:text-brand-orange transition-colors truncate">{product.name}</h4>
                                        <div className="flex items-center justify-center md:justify-start gap-1 mb-3">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <svg key={s} className={`w-3 h-3 ${s <= Math.floor(product.rating) ? "text-brand-yellow fill-current" : "text-gray-200 fill-current"}`} viewBox="0 0 20 20">
                                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                </svg>
                                            ))}
                                            <span className="text-[10px] text-gray-400 font-bold ml-1">({product.rating})</span>
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
                    )}

                    {/* Pagination */}
                    <div className="mt-20 flex items-center justify-center gap-2">
                        {[1, 2, 3].map((num) => (
                            <button key={num} className={`w-12 h-12 rounded-2xl font-black text-sm flex items-center justify-center transition-all ${num === 1 ? "bg-brand-teal text-white shadow-lg shadow-brand-teal/20" : "bg-white text-gray-400 hover:bg-gray-100"}`}>
                                {num}
                            </button>
                        ))}
                        <button className="w-12 h-12 bg-white rounded-2xl font-black text-brand-teal flex items-center justify-center hover:bg-gray-100 transition-all">→</button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
