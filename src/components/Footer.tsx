"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Facebook, Instagram, Youtube, Mail, Phone, MessageCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { SiteSettings } from "@/types/settings";

export default function Footer() {
    const [settings, setSettings] = useState<SiteSettings | null>(null);
    const supabase = createClient();

    useEffect(() => {
        const fetchSettings = async () => {
            const { data } = await supabase
                .from("settings")
                .select("*")
                .eq("id", 1)
                .single();
            if (data) setSettings(data);
        };
        fetchSettings();
    }, []);

    // Fallbacks
    const displayEmail = settings?.email || "pronto@starplusfoods.com";
    const displayMobile = settings?.mobile_number || "+91 84800 05280";

    return (
        <footer className="w-full bg-[#5c190d] text-white">
            {/* Decorative Top Bar */}
            <div className="flex h-1.5 w-full">
                <div className="flex-1 bg-brand-orange"></div>
                <div className="flex-1 bg-brand-teal"></div>
                <div className="flex-1 bg-brand-yellow"></div>
                <div className="flex-1 bg-[#4a140b]"></div>
            </div>

            {/* Newsletter Section */}
            <div className="bg-[#802511] py-8">
                <div className="container mx-auto px-4 md:px-12 flex flex-col md:flex-row items-center justify-center gap-8">
                    {/* Mascot Illustration - Scaled Down */}
                    <div className="relative w-32 h-32 md:w-40 md:h-40">
                        <Image
                            src="/star/hero-png.png"
                            alt="Star Plus Mascot"
                            fill
                            className="object-contain"
                        />
                    </div>

                    {/* Newsletter Content */}
                    <div className="flex flex-col gap-4 max-w-xl flex-grow">
                        <div className="space-y-0.5">
                            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-brand-yellow drop-shadow-sm" style={{ fontFamily: 'var(--font-heading)' }}>
                                Newsletter
                            </h2>
                            <p className="text-white/70 font-medium text-sm md:text-base">
                                You'll be the First ONE to know about our Exciting Offers
                            </p>
                        </div>

                        {/* Input Box */}
                        <div className="relative flex items-center max-w-md w-full">
                            <input
                                type="email"
                                placeholder="Enter Your Email Address"
                                className="w-full bg-transparent border-2 border-white/20 rounded-full py-4 px-8 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-yellow/50 transition-colors pr-40"
                            />
                            <button className="absolute right-1 top-1 bottom-1 bg-brand-yellow hover:bg-[#ffb400] text-[#5c190d] font-black px-8 rounded-full text-sm uppercase tracking-widest transition-all">
                                Subscribe Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Links Section */}
            <div className="container mx-auto px-4 md:px-12 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
                {/* Brand Column */}
                <div className="lg:col-span-1 flex flex-col gap-3">
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-black leading-none tracking-tighter">STAR</h2>
                        <h2 className="text-3xl font-black leading-none tracking-widest -mt-1 ml-4 text-brand-yellow">PLUS</h2>
                        <h3 className="text-[10px] font-bold tracking-[0.4em] mt-1 uppercase text-white/40">FOODS</h3>
                    </div>
                </div>

                {/* Quick Links 1 */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-white/30 mb-2">Navigation</h4>
                    <ul className="flex flex-col gap-3">
                        <li><a href="/" className="hover:text-brand-yellow transition-colors font-medium text-sm uppercase tracking-widest">Home</a></li>
                        <li><a href="/shop" className="hover:text-brand-yellow transition-colors font-medium text-sm uppercase tracking-widest">Shop</a></li>
                        <li><a href="#" className="hover:text-brand-yellow transition-colors font-medium text-sm uppercase tracking-widest">Contact Us</a></li>
                    </ul>
                </div>

                {/* Quick Links 2 */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-white/30 mb-2">Account</h4>
                    <ul className="flex flex-col gap-3">
                        <li><a href="#" className="hover:text-brand-yellow transition-colors font-medium text-sm uppercase tracking-widest">My Account</a></li>
                        <li><a href="#" className="hover:text-brand-yellow transition-colors font-medium text-sm uppercase tracking-widest">Track Order</a></li>
                        <li><a href="#" className="hover:text-brand-yellow transition-colors font-medium text-sm uppercase tracking-widest">Shopping Cart</a></li>
                    </ul>
                </div>

                {/* Quick Links 3 */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-white/30 mb-2">Policies</h4>
                    <ul className="flex flex-col gap-3">
                        <li><a href="#" className="hover:text-brand-yellow transition-colors font-medium text-sm uppercase tracking-widest">Shipping Policy</a></li>
                        <li><a href="#" className="hover:text-brand-yellow transition-colors font-medium text-sm uppercase tracking-widest">Return & Refund</a></li>
                        <li><a href="#" className="hover:text-brand-yellow transition-colors font-medium text-sm uppercase tracking-widest">Terms of Use</a></li>
                    </ul>
                </div>

                {/* Contact & Socials */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-white/30 mb-2">Connect</h4>
                    <ul className="flex flex-col gap-3">
                        <li className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-brand-yellow" />
                            <a href={`mailto:${displayEmail}`} className="text-sm font-bold hover:text-brand-yellow transition-colors truncate">{displayEmail}</a>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone className="w-4 h-4 text-brand-yellow" />
                            <a href={`tel:${displayMobile.replace(/\s/g, '')}`} className="text-sm font-bold hover:text-brand-yellow transition-colors">{displayMobile}</a>
                        </li>
                    </ul>
                    <div className="flex flex-wrap gap-3 mt-4">
                        {settings?.instagram_url && (
                            <a href={settings.instagram_url} target="_blank" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-yellow hover:text-brand-teal transition-all hover:scale-110 shadow-lg">
                                <Instagram className="w-5 h-5" />
                            </a>
                        )}
                        {settings?.facebook_url && (
                            <a href={settings.facebook_url} target="_blank" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-yellow hover:text-brand-teal transition-all hover:scale-110 shadow-lg">
                                <Facebook className="w-5 h-5" />
                            </a>
                        )}
                        {settings?.youtube_url && (
                            <a href={settings.youtube_url} target="_blank" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-yellow hover:text-brand-teal transition-all hover:scale-110 shadow-lg">
                                <Youtube className="w-5 h-5" />
                            </a>
                        )}
                        {settings?.whatsapp_number && (
                            <a href={`https://wa.me/${settings.whatsapp_number.replace(/\D/g, '')}`} target="_blank" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-500 transition-all hover:scale-110 shadow-lg">
                                <MessageCircle className="w-5 h-5" />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="bg-[#4a140b] py-4 text-center border-t border-white/5">
                <p className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase text-white/30">
                    &copy; 2024 STAR PLUS FOODS. ALL RIGHTS RESERVED.
                </p>
            </div>
        </footer>
    );
}
