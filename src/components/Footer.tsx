"use client";

import React from "react";
import Image from "next/image";
import { Facebook, Instagram, Send } from "lucide-react";

export default function Footer() {
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
                        <li><a href="#" className="hover:text-brand-yellow transition-colors font-medium">Home</a></li>
                        <li><a href="#" className="hover:text-brand-yellow transition-colors font-medium">Shop</a></li>
                        <li><a href="#" className="hover:text-brand-yellow transition-colors font-medium">Contact Us</a></li>
                    </ul>
                </div>

                {/* Quick Links 2 */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-white/30 mb-2">Account</h4>
                    <ul className="flex flex-col gap-3">
                        <li><a href="#" className="hover:text-brand-yellow transition-colors font-medium">My Account</a></li>
                        <li><a href="#" className="hover:text-brand-yellow transition-colors font-medium">Track Order</a></li>
                        <li><a href="#" className="hover:text-brand-yellow transition-colors font-medium">Shopping Cart</a></li>
                    </ul>
                </div>

                {/* Quick Links 3 */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-white/30 mb-2">Policies</h4>
                    <ul className="flex flex-col gap-3">
                        <li><a href="#" className="hover:text-brand-yellow transition-colors font-medium">Shipping Policy</a></li>
                        <li><a href="#" className="hover:text-brand-yellow transition-colors font-medium">Return & Refund Policies</a></li>
                        <li><a href="#" className="hover:text-brand-yellow transition-colors font-medium">Terms of Use</a></li>
                    </ul>
                </div>

                {/* Contact & Socials */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-white/30 mb-2">Connect</h4>
                    <ul className="flex flex-col gap-2">
                        <li><a href="mailto:pronto@starplusfoods.com" className="text-sm font-bold hover:text-brand-yellow transition-colors">pronto@starplusfoods.com</a></li>
                        <li><a href="tel:+918480005280" className="text-sm font-bold hover:text-brand-yellow transition-colors">+91 84800 05280</a></li>
                    </ul>
                    <div className="flex gap-4 mt-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110">
                            <Facebook className="w-5 h-5" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110">
                            <Instagram className="w-5 h-5" />
                        </a>
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
