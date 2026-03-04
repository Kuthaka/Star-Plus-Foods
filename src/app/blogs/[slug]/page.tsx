"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
    Calendar,
    User,
    ChevronLeft,
    Tag,
    Loader2,
    Clock,
    Share2,
    Instagram,
    Facebook,
    MessageCircle
} from "lucide-react";
import Navbar from "@/components/headers/Navbar";
import Footer from "@/components/Footer";
import TopBanner from "@/components/headers/TopBanner";
import { Blog } from "@/types/blog";

import { STATIC_BLOGS } from "@/data/blogs";

export default function BlogDetailPage() {
    const params = useParams();
    const slug = params.slug as string;

    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const foundBlog = STATIC_BLOGS.find(b => b.slug === slug);
        if (foundBlog) {
            setBlog(foundBlog);
            const related = STATIC_BLOGS.filter(b => b.category === foundBlog.category && b.id !== foundBlog.id).slice(0, 3);
            setRelatedBlogs(related);
        }
        setLoading(false);
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white">
                <Loader2 className="w-12 h-12 text-brand-teal animate-spin" />
                <p className="text-[10px] font-black text-brand-teal uppercase tracking-[0.4em] mt-6">Unfolding the Story...</p>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen flex flex-col font-sans">
                <TopBanner />
                <Navbar />
                <main className="flex-grow flex flex-col items-center justify-center py-32 bg-gray-50 uppercase text-brand-teal">
                    <h1 className="text-4xl font-black tracking-tighter mb-4">Post Not Found</h1>
                    <Link href="/blogs" className="flex items-center gap-2 text-[10px] font-black tracking-widest text-brand-orange">
                        <ChevronLeft className="w-4 h-4" /> Go Back to Journal
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col font-sans">
            <TopBanner />

            <main className="flex-grow bg-white">
                {/* Visual Header Section */}
                <div className="bg-brand-teal relative overflow-hidden pb-48">
                    <Navbar />
                    <div className="container mx-auto px-4 md:px-12 pt-20 relative z-10">
                        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                            <div className="flex items-center gap-4 mb-8">
                                <Link href="/blogs" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-all text-white backdrop-blur-md">
                                    <ChevronLeft className="w-5 h-5" />
                                </Link>
                                <span className="bg-brand-orange text-white text-[9px] font-black uppercase tracking-widest px-5 py-2.5 rounded-full shadow-lg">
                                    {blog.category}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-tight mb-8">
                                {blog.title}
                            </h1>
                            <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] font-black text-white/40 uppercase tracking-widest">
                                <div className="flex items-center gap-2"><User className="w-4 h-4 text-brand-orange" /> {blog.author}</div>
                                <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-brand-orange" /> {new Date(blog.created_at).toLocaleDateString()}</div>
                                <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-brand-orange" /> 5 Min Read</div>
                            </div>
                        </div>
                    </div>
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-brand-orange/5 to-transparent pointer-events-none"></div>
                    <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-brand-orange opacity-10 rounded-full blur-[120px]"></div>
                </div>

                {/* Article Content Layout */}
                <div className="container mx-auto px-4 md:px-12 -mt-32 relative z-20 pb-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                        {/* Main Pillar: Content */}
                        <div className="lg:col-span-8">
                            <div className="bg-white rounded-[4rem] shadow-2xl shadow-black/[0.03] border border-gray-100 p-8 md:p-20 overflow-hidden">

                                {/* Featured Image Inside Article */}
                                {blog.cover_image && (
                                    <div className="relative aspect-[21/10] rounded-[2rem] overflow-hidden mb-16 shadow-xl">
                                        <Image
                                            src={blog.cover_image}
                                            alt={blog.title}
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    </div>
                                )}

                                {/* Content Body */}
                                <article className="prose prose-xl prose-teal max-w-none">
                                    <div
                                        className="text-brand-teal/80 text-lg md:text-xl font-medium leading-[1.8] whitespace-pre-wrap selection:bg-brand-orange selection:text-white"
                                        dangerouslySetInnerHTML={{ __html: blog.content }}
                                    />
                                </article>

                                {/* Footer of Article */}
                                <div className="mt-20 pt-12 border-t border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-brand-teal rounded-2xl flex items-center justify-center text-white text-lg font-black uppercase">
                                            {blog.author.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Story By</p>
                                            <h4 className="text-xl font-black text-brand-teal tracking-tight leading-none uppercase">{blog.author}</h4>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest mr-2">Share The Spice</span>
                                        <button className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-brand-teal hover:bg-[#1877F2] hover:text-white transition-all"><Facebook className="w-5 h-5" /></button>
                                        <button className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-brand-teal hover:bg-[#E4405F] hover:text-white transition-all"><Instagram className="w-5 h-5" /></button>
                                        <button className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-brand-teal hover:bg-[#25D366] hover:text-white transition-all"><MessageCircle className="w-5 h-5" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar: Related Posts */}
                        <div className="lg:col-span-4 space-y-12">
                            {relatedBlogs.length > 0 && (
                                <div className="sticky top-32 space-y-10">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-xl font-black text-brand-teal uppercase tracking-tight">More Stories</h4>
                                        <div className="w-10 h-0.5 bg-brand-orange"></div>
                                    </div>

                                    <div className="space-y-8">
                                        {relatedBlogs.map((rel) => (
                                            <Link
                                                href={`/blogs/${rel.slug}`}
                                                key={rel.id}
                                                className="group flex gap-5 items-center"
                                            >
                                                <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 bg-gray-100">
                                                    <Image
                                                        src={rel.cover_image}
                                                        alt={rel.title}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <span className="text-[8px] font-black text-brand-orange uppercase tracking-widest">{rel.category}</span>
                                                    <h5 className="text-[13px] font-black text-brand-teal uppercase tracking-tight leading-tight line-clamp-2 group-hover:text-brand-orange transition-colors">
                                                        {rel.title}
                                                    </h5>
                                                    <p className="text-[10px] font-bold text-gray-400">{new Date(rel.created_at).toLocaleDateString()}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>

                                    <div className="p-8 bg-brand-teal/5 rounded-[3rem] border border-brand-teal/10 text-center">
                                        <h4 className="font-black text-brand-teal uppercase text-lg mb-4">Newsletter</h4>
                                        <p className="text-[10px] font-bold text-brand-teal/60 uppercase tracking-widest leading-relaxed mb-6">Join the spicy circle and get recipe updates directly.</p>
                                        <input
                                            type="email"
                                            placeholder="Your Email"
                                            className="w-full h-12 bg-white rounded-full px-6 text-[10px] font-black uppercase tracking-widest text-brand-teal outline-none border border-transparent focus:border-brand-orange transition-all mb-4"
                                        />
                                        <button className="w-full h-12 bg-brand-orange text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-brand-orange/20 hover:bg-brand-teal transition-all">Subscribe Now</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
