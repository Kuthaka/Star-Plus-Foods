"use client";

import React from "react";
import Image from "next/image";
import {
    UtensilsCrossed,
    Heart,
    ShieldCheck,
    Zap,
    Users,
    Award,
    Star
} from "lucide-react";
import Navbar from "@/components/headers/Navbar";
import Footer from "@/components/Footer";
import TopBanner from "@/components/headers/TopBanner";

export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col font-sans">
            <TopBanner />

            <main className="flex-grow bg-gray-50/50">
                {/* Simple Header - Matching Shop UI */}
                <div className="bg-brand-teal relative overflow-hidden pb-32">
                    <Navbar />
                    <div className="container mx-auto px-4 md:px-12 pt-20 relative z-10 text-center">
                        <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">
                            Our <span className="text-brand-orange">Story</span>
                        </h1>
                        <p className="text-white/60 max-w-2xl mx-auto font-medium text-lg">
                            Authentic Indian flavors born from traditional street kitchens, delivered with modern excellence.
                        </p>
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-yellow opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                </div>

                <div className="container mx-auto px-4 md:px-12 -mt-16 relative z-20 pb-20">
                    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-black/5 p-8 md:p-16 border border-gray-100 overflow-hidden">

                        {/* Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <span className="text-brand-orange text-xs font-black uppercase tracking-[0.4em]">Legacy of Flavor</span>
                                    <h2 className="text-4xl md:text-5xl font-black text-brand-teal uppercase tracking-tighter leading-tight">
                                        Preserving Authentic <br />Food Tradition.
                                    </h2>
                                    <p className="text-lg text-brand-teal/60 font-medium leading-relaxed">
                                        Born from the vibrant street kitchens of India, Star Plus brings the soul of authentic recipes
                                        directly to your dinner table. We aren't just making food; we're preserving tradition.
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="text-3xl font-black text-brand-orange tracking-tighter">25+</h4>
                                        <p className="text-[10px] font-black text-brand-teal uppercase tracking-widest mt-1">Recipes</p>
                                    </div>
                                    <div>
                                        <h4 className="text-3xl font-black text-brand-orange tracking-tighter">100%</h4>
                                        <p className="text-[10px] font-black text-brand-teal uppercase tracking-widest mt-1">Natural</p>
                                    </div>
                                </div>
                            </div>
                            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/star/hero-png.png"
                                    alt="Spices"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* Values Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-20 border-t border-gray-100">
                            {[
                                { icon: Heart, title: "Passion", desc: "Crafting every meal with the same love as a home-cooked recipe." },
                                { icon: ShieldCheck, title: "Purity", desc: "No artificial preservatives or MSG. Just clean, wholesome food." },
                                { icon: Award, title: "Quality", desc: "Premium ingredients meeting the highest global safety standards." }
                            ].map((v, i) => (
                                <div key={i} className="space-y-4">
                                    <div className="w-12 h-12 bg-brand-orange/5 text-brand-orange rounded-xl flex items-center justify-center">
                                        <v.icon className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-lg font-black text-brand-teal uppercase tracking-tight">{v.title}</h4>
                                    <p className="text-sm text-brand-teal/50 font-medium leading-relaxed">{v.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
