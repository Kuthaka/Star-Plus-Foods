"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Search, User, ShoppingBag } from "lucide-react";
import Tooltip from "@/components/ui/Tooltip";
import CartDrawer from "@/components/cart/CartDrawer";

/**
 * Navbar component with a "Magnet Merge" scroll animation.
 * The Logo and Icons glide into the central pill to form a compact capsule.
 */
export default function Navbar() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Threshold for the animation to begin
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Global Higher Z-index Cart Drawer */}
            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />

            {/* Main Header Container */}
            <header
                className={`
                    fixed left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
                    ${isScrolled ? "top-4" : "top-10 md:top-12"}
                `}
            >
                <div className="container mx-auto px-4 md:px-12 relative h-20 flex items-center justify-center">

                    {/* 
                        Pill Background:
                        Initially hidden (w-0), expands to a large capsule on scroll.
                        Width increased for a premium wide-screen feel.
                    */}
                    <div className={`
                        absolute transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                        bg-white/95 backdrop-blur-2xl border border-gray-100 shadow-[0_12px_40px_rgba(0,0,0,0.12)] rounded-full
                        ${isScrolled ? "opacity-100 w-[600px] lg:w-[850px] h-[64px]" : "opacity-0 w-0 h-0"}
                    `} />

                    {/* 
                        Logo: Initial far-left. 
                        Docking: Glides into the left side of the white pill.
                    */}
                    <div
                        className={`
                            absolute transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] z-20
                            ${isScrolled
                                ? "left-1/2 -translate-x-[260px] lg:-translate-x-[380px] w-10 h-10"
                                : "left-4 md:left-12 translate-x-0 w-16 h-16 md:w-24 md:h-24"}
                        `}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        <div className="relative w-full h-full">
                            <Image
                                src="/star/logo-bg.png"
                                alt="Star Plus Foods Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>

                    {/* 
                        Nav Links: Always centered.
                        Initially has its own pill background, which fades out as the master pill takes over.
                    */}
                    <nav
                        className={`
                            relative z-10 flex items-center transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]
                            ${isScrolled
                                ? "bg-transparent border-none shadow-none px-0"
                                : "bg-brand-tan/60 backdrop-blur-md px-10 py-3 rounded-full border border-white/20 shadow-sm hover:bg-brand-tan/80"}
                        `}
                    >
                        <div className="flex items-center gap-4 md:gap-8">
                            <a href="#" className="text-brand-orange font-black text-[10px] md:text-sm uppercase tracking-widest hover:scale-110 transition-transform">Home</a>
                            <a href="#" className="text-gray-700 font-bold text-[10px] md:text-sm uppercase tracking-widest hover:text-brand-orange transition-colors">Shop</a>
                            <a href="#" className="text-gray-700 font-bold text-[10px] md:text-sm uppercase tracking-widest hover:text-brand-orange transition-colors">Blogs</a>
                            <a href="#" className="text-gray-700 font-bold text-[10px] md:text-sm uppercase tracking-widest hover:text-brand-orange transition-colors">About</a>
                            <a href="#" className="text-gray-700 font-bold text-[10px] md:text-sm uppercase tracking-widest hover:text-brand-orange transition-colors">Contact</a>
                        </div>
                    </nav>

                    {/* 
                        Icons: Initial far-right.
                        Docking: Glides into the right side of the white pill.
                    */}
                    <div
                        className={`
                            absolute transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] z-20
                            ${isScrolled
                                ? "right-1/2 translate-x-[260px] lg:translate-x-[380px] gap-3 md:gap-4 scale-90"
                                : "right-4 md:right-12 translate-x-0 gap-4 md:gap-6 scale-100"}
                        `}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        <div className="flex items-center gap-4 md:gap-6">
                            <Tooltip text="Search">
                                <Search className="w-5 h-5 cursor-pointer hover:text-brand-orange transition-transform hover:scale-110" />
                            </Tooltip>
                            <Tooltip text="User">
                                <User className="w-5 h-5 cursor-pointer hover:text-brand-orange transition-transform hover:scale-110" />
                            </Tooltip>
                            <Tooltip text="Cart">
                                <div className="relative group cursor-pointer" onClick={() => setIsCartOpen(true)}>
                                    <ShoppingBag className="w-5 h-5 hover:text-brand-orange transition-transform group-hover:scale-110" />
                                    <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full font-black shadow-sm">
                                        0
                                    </span>
                                </div>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </header>

            {/* Visual Spacer to start the hero content below the navbar */}
            <div className="h-10 md:h-12 pointer-events-none" aria-hidden="true" />
        </>
    );
}
