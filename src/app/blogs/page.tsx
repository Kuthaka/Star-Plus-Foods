"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Calendar,
    User,
    ArrowRight,
    Tag,
    Loader2,
    Search,
    ChevronRight,
    Clock
} from "lucide-react";
import Navbar from "@/components/headers/Navbar";
import Footer from "@/components/Footer";
import TopBanner from "@/components/headers/TopBanner";
import { createClient } from "@/lib/supabase/client";
import { Blog } from "@/types/blog";

import { STATIC_BLOGS } from "@/data/blogs";

export default function BlogsPage() {
    const [blogs, setBlogs] = useState<Blog[]>(STATIC_BLOGS);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = ["All", "Recipes", "Products", "Announcements", "Health"];

    const filteredBlogs = selectedCategory === "All"
        ? blogs
        : blogs.filter(b => b.category === selectedCategory);

    return (
        <div className="flex min-h-screen flex-col font-sans">
            <TopBanner />

            <main className="flex-grow bg-gray-50/50">
                {/* Simple Header - Consistent with Shop/About/Contact */}
                <div className="bg-brand-teal relative overflow-hidden pb-32">
                    <Navbar />
                    <div className="container mx-auto px-4 md:px-12 pt-20 relative z-10 text-center">
                        <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">
                            The <span className="text-brand-orange">Journal</span>
                        </h1>
                        <p className="text-white/60 max-w-2xl mx-auto font-medium text-lg">
                            Exploring the heart of Indian cuisine, product insights, and the spicy stories behind Star Plus 21.
                        </p>
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-yellow opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                </div>

                <div className="container mx-auto px-4 md:px-12 -mt-16 relative z-20 pb-20">

                    {/* Category Filter Bar */}
                    <div className="bg-white rounded-3xl shadow-xl shadow-black/5 p-4 md:p-6 mb-12 flex items-center justify-between border border-gray-100 overflow-x-auto no-scrollbar">
                        <div className="flex items-center gap-3">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedCategory === cat
                                        ? "bg-brand-teal text-white shadow-lg shadow-brand-teal/20"
                                        : "bg-gray-50 text-brand-teal hover:bg-brand-teal/5 border border-transparent hover:border-brand-teal/10"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div className="py-32 flex flex-col items-center justify-center gap-6">
                            <Loader2 className="w-12 h-12 text-brand-teal animate-spin" />
                            <p className="text-[10px] font-black text-brand-teal uppercase tracking-[0.4em]">Brewing Content...</p>
                        </div>
                    ) : filteredBlogs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {filteredBlogs.map((blog) => (
                                <Link
                                    href={`/blogs/${blog.slug}`}
                                    key={blog.id}
                                    className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
                                >
                                    {/* Blog Image */}
                                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                                        {blog.cover_image ? (
                                            <Image
                                                src={blog.cover_image}
                                                alt={blog.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-brand-teal/20">
                                                <Tag className="w-12 h-12" />
                                            </div>
                                        )}
                                        <div className="absolute top-6 left-6">
                                            <span className="bg-brand-orange text-white text-[8px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg shadow-brand-orange/20">
                                                {blog.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 flex flex-col flex-grow">
                                        <div className="flex items-center gap-4 text-[9px] font-black text-brand-teal/40 uppercase tracking-widest mb-4">
                                            <div className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {new Date(blog.created_at).toLocaleDateString()}</div>
                                            <div className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> 5 Min Read</div>
                                        </div>

                                        <h3 className="text-xl font-black text-brand-teal uppercase tracking-tight mb-4 group-hover:text-brand-orange transition-colors line-clamp-2">
                                            {blog.title}
                                        </h3>

                                        <p className="text-sm text-brand-teal/50 font-medium leading-relaxed mb-8 line-clamp-3">
                                            {blog.excerpt}
                                        </p>

                                        <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 bg-brand-teal/10 rounded-full flex items-center justify-center text-[8px] font-black text-brand-teal uppercase">
                                                    {blog.author.charAt(0)}
                                                </div>
                                                <span className="text-[9px] font-black text-brand-teal opacity-60 uppercase tracking-widest">{blog.author}</span>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-brand-teal group-hover:bg-brand-orange group-hover:text-white transition-all transform group-hover:translate-x-1">
                                                <ChevronRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-[3rem] p-32 text-center border font-medium border-dashed border-gray-200">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="w-8 h-8 text-brand-teal/20" />
                            </div>
                            <h3 className="text-xl font-black text-brand-teal/40 uppercase tracking-tight">No Articles Found</h3>
                            <p className="text-brand-teal/20 text-xs mt-2 uppercase tracking-widest">Check back later for fresh spice insights</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
