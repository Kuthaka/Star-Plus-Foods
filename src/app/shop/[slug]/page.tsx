"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
    Star,
    Minus,
    Plus,
    ShoppingBag,
    Heart,
    Share2,
    ChevronRight,
    ArrowLeft,
    Timer,
    ShieldCheck,
    Truck,
    UtensilsCrossed,
    Loader2
} from "lucide-react";
import Navbar from "@/components/headers/Navbar";
import Footer from "@/components/Footer";
import TopBanner from "@/components/headers/TopBanner";
import { createClient } from "@/lib/supabase/client";
import { Product } from "@/types/product";

export default function ProductDetails() {
    const { slug } = useParams();
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

    const supabase = createClient();

    useEffect(() => {
        if (slug) {
            fetchProductData();
        }
    }, [slug]);

    const fetchProductData = async () => {
        setLoading(true);
        try {
            // 1. Fetch main product by SLUG
            console.log("Fetching for slug:", slug);
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .eq("slug", slug)
                .single();

            console.log("Supabase Data:", data);
            console.log("Supabase Error:", error);

            if (error) {
                // If not found by slug, maybe try ID as fallback or just 404
                throw error;
            }
            setProduct(data);

            // 2. Fetch related products (same category)
            const { data: related } = await supabase
                .from("products")
                .select("*")
                .eq("category", data.category)
                .neq("id", data.id)
                .limit(4);

            setRelatedProducts(related || []);
        } catch (err) {
            console.error("Error fetching product:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-white">
                <Loader2 className="w-12 h-12 text-brand-orange animate-spin" />
                <p className="text-[10px] font-black text-brand-teal uppercase tracking-[0.4em]">Preparing your meal details...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
                <UtensilsCrossed className="w-20 h-20 text-gray-200 mb-6 drop-shadow-sm" />
                <h2 className="text-3xl font-black text-brand-teal uppercase">Product Not Found</h2>
                <button onClick={() => router.push("/shop")} className="mt-8 bg-brand-orange text-white px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-xl">Return to Shop</button>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col font-sans bg-white">
            <TopBanner />
            <Navbar />

            <main className="flex-grow pt-24 pb-32">
                <div className="container mx-auto px-4 md:px-12">
                    {/* Breadcrumbs & Navigation */}
                    <div className="flex items-center justify-between mb-12">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 text-xs font-black text-brand-teal/40 hover:text-brand-orange transition-colors uppercase tracking-widest"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Return Back
                        </button>
                        <div className="hidden md:flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-300">
                            <span>Home</span>
                            <ChevronRight className="w-3 h-3 text-gray-200" />
                            <span>Shop</span>
                            <ChevronRight className="w-3 h-3 text-gray-200" />
                            <span className="text-brand-orange">{product.category}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                        {/* Left: Image Showcase */}
                        <div className="lg:col-span-7">
                            <div className="sticky top-8 space-y-6">
                                {/* Main Display */}
                                <div className="relative aspect-[1082/1280] rounded-[3rem] overflow-hidden bg-gray-50 border border-gray-100 group shadow-[0_40px_100px_rgba(45,90,75,0.05)]">
                                    {product.images?.[activeImage] ? (
                                        <Image
                                            src={product.images[activeImage]}
                                            alt={product.name}
                                            fill
                                            priority
                                            className="object-cover transform group-hover:scale-110 transition-transform duration-1000"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-200">
                                            <UtensilsCrossed className="w-24 h-24" />
                                        </div>
                                    )}

                                    {/* Abstract background blobs for premium feel */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
                                </div>

                                {/* Thumbnails */}
                                {product.images && product.images.length > 1 && (
                                    <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-2">
                                        {product.images.map((img, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setActiveImage(idx)}
                                                className={`
                                                    relative w-24 aspect-[1082/1280] rounded-2xl overflow-hidden border-2 transition-all p-2
                                                    ${activeImage === idx ? 'border-brand-orange bg-white shadow-xl shadow-brand-orange/10 scale-110' : 'border-transparent bg-gray-50 hover:bg-gray-100 opacity-60 hover:opacity-100'}
                                                `}
                                            >
                                                <Image src={img} alt="" fill className="object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right: Product Details */}
                        <div className="lg:col-span-5 space-y-10">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-4 px-4 py-2 bg-[#FEFCE8] text-brand-orange rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
                                    <UtensilsCrossed className="w-3 h-3" />
                                    {product.category}
                                </div>
                                <h1 className="text-4xl md:text-5xl font-black text-brand-teal uppercase tracking-tight leading-[1.1]">
                                    {product.name}
                                </h1>

                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star key={s} className="w-4 h-4 text-brand-yellow fill-current" />
                                        ))}
                                    </div>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">(2.4k Customer Reviews)</span>
                                </div>
                            </div>

                            <div className="flex items-baseline gap-4">
                                <span className="text-5xl font-black text-brand-teal tracking-tighter">₹{product.price}</span>
                                <span className="text-lg font-bold text-gray-300 line-through">₹{Math.round(product.price * 1.5)}</span>
                            </div>

                            <p className="text-brand-teal/60 text-lg leading-relaxed font-medium">
                                Traditionally prepared {product.name} with authentic Indian spices. Perfect for a quick, delicious and satisfying meal in under 2 minutes. Experience the taste of original street recipes at home.
                            </p>

                            <div className="py-8 border-y border-gray-100 grid grid-cols-2 gap-8">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Weight / Size</span>
                                    <p className="text-sm font-black text-brand-teal uppercase">{product.size_grams}g Net Weight</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Serves</span>
                                    <p className="text-sm font-black text-brand-teal uppercase">1-2 People</p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-6">
                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    {/* Quantity Toggle */}
                                    <div className="flex items-center justify-between bg-gray-50 p-2 rounded-2xl w-full sm:w-auto min-w-[140px]">
                                        <button
                                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                            className="w-10 h-10 flex items-center justify-center bg-white text-brand-teal rounded-xl hover:bg-brand-orange hover:text-white transition-all shadow-sm"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="text-sm font-black text-brand-teal w-12 text-center">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(q => q + 1)}
                                            className="w-10 h-10 flex items-center justify-center bg-white text-brand-teal rounded-xl hover:bg-brand-orange hover:text-white transition-all shadow-sm"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <button className="flex-grow w-full bg-brand-orange text-white h-16 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-brand-orange/20 flex items-center justify-center gap-4 hover:bg-brand-teal transition-all transform hover:-translate-y-1">
                                        <ShoppingBag className="w-5 h-5 font-bold" />
                                        Add to Cart
                                    </button>
                                </div>

                                <button className="w-full bg-brand-teal text-white h-16 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-brand-teal/10 flex items-center justify-center gap-4 hover:bg-brand-orange transition-all transform hover:-translate-y-1">
                                    Checkout Now
                                </button>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-brand-orange">
                                        <Timer className="w-5 h-5" />
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-brand-teal/60">Ready in<br />2 Mins</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-brand-orange">
                                        <ShieldCheck className="w-5 h-5" />
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-brand-teal/60">100%<br />Natural</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-brand-orange">
                                        <Truck className="w-5 h-5" />
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-brand-teal/60">Express<br />Shipping</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Related Products Section */}
                    {relatedProducts.length > 0 && (
                        <div className="mt-40">
                            <div className="flex items-center justify-between mb-12">
                                <h3 className="text-3xl font-black text-brand-teal uppercase tracking-tight">You Might Also Like</h3>
                                <div className="w-24 h-[2px] bg-brand-orange"></div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {relatedProducts.map((p) => (
                                    <div
                                        key={p.id}
                                        onClick={() => {
                                            router.push(`/shop/${p.slug}`);
                                            setActiveImage(0);
                                        }}
                                        className="group cursor-pointer bg-white rounded-3xl p-4 border border-transparent hover:border-gray-50 hover:shadow-2xl transition-all duration-500"
                                    >
                                        <div className="relative aspect-[4/5] bg-gray-50 rounded-2xl overflow-hidden mb-6 flex items-center justify-center">
                                            {p.images?.[0] ? (
                                                <Image src={p.images[0]} alt={p.name} fill className="object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                            ) : (
                                                <UtensilsCrossed className="w-10 h-10 text-gray-200" />
                                            )}
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{p.category}</span>
                                        <h4 className="text-brand-teal font-black text-lg uppercase tracking-tight mt-1 group-hover:text-brand-orange transition-colors">{p.name}</h4>
                                        <p className="text-xl font-black text-brand-teal mt-4">₹{p.price}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
