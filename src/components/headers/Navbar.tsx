"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
    const [showBottomNav, setShowBottomNav] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsScrolled(currentScrollY > 20);

            // Bottom Nav Visibility Logic for Mobile
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setShowBottomNav(false);
            } else {
                setShowBottomNav(true);
            }
            setLastScrollY(currentScrollY);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const isActive = (path: string) => pathname === path;

    return (
        <>
            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />

            {/* Top Navbar Container */}
            <header
                className={`
                    fixed left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
                    ${isScrolled ? "top-4" : "top-6 md:top-12"}
                `}
            >
                <div className="container mx-auto px-4 md:px-12 relative h-20 flex items-center justify-center">

                    {/* Primary Capsule Backdrop (Desktop Scrolled) */}
                    <div className={`
                        absolute transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                        bg-white/95 backdrop-blur-2xl border border-gray-200/50 rounded-full hidden md:block
                        ${isScrolled
                            ? "opacity-100 w-[500px] lg:w-[720px] h-[64px] shadow-xl"
                            : "opacity-0 w-0 h-0 shadow-none"}
                    `} />

                    {/* Mobile Top Pill Backdrop - improved spacing */}
                    <div className={`
                        absolute inset-x-6 h-14 bg-white/95 backdrop-blur-2xl border border-gray-200/50 rounded-full shadow-lg md:hidden transition-all duration-500
                        ${isScrolled ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-4 pointer-events-none scale-95"}
                    `} />

                    {/* Logo Section */}
                    <Link
                        href="/"
                        className={`
                            absolute transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] z-20
                            ${isScrolled
                                ? "left-1/2 -translate-x-[38vw] md:-translate-x-[220px] lg:-translate-x-[320px] w-8 h-8 md:w-10 md:h-10"
                                : "left-4 md:left-12 translate-x-0 w-16 h-16 md:w-24 md:h-24"}
                        `}
                    >
                        <div className="relative w-full h-full">
                            <Image src="/star/logo-bg.png" alt="Logo" fill className="object-contain" priority />
                        </div>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <nav className={`
                        hidden md:flex relative z-10 items-center transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]
                        ${isScrolled
                            ? "bg-transparent border-none shadow-none px-0"
                            : "bg-brand-tan/60 backdrop-blur-md px-10 py-3 rounded-full border border-white/20 shadow-sm"}
                    `}>
                        <div className="flex items-center gap-8 text-brand-teal">
                            {[
                                { name: "Home", path: "/" },
                                { name: "Shop", path: "/shop" },
                                { name: "Blogs", path: "/blogs" },
                                { name: "About", path: "/about" },
                                { name: "Contact", path: "/contact" }
                            ].map((link) => (
                                <Link
                                    key={link.path}
                                    href={link.path}
                                    className={`font-black text-sm uppercase tracking-widest transition-all hover:scale-110 ${isActive(link.path) ? "text-brand-orange" : ""}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </nav>

                    {/* Utility Icons (Search, Cart) */}
                    <div className={`
                        absolute transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] z-20
                        ${isScrolled
                            ? "right-1/2 translate-x-[38vw] md:translate-x-[220px] lg:translate-x-[320px] scale-90 text-brand-teal"
                            : `right-4 md:right-12 translate-x-0 scale-100 ${(pathname === "/shop" || pathname.startsWith("/about") || pathname.startsWith("/contact") || pathname.startsWith("/blogs")) ? "text-white md:text-white" : "text-brand-teal"}`}
                    `}>
                        <div className="flex items-center gap-5 md:gap-8">
                            <Search className="w-5 h-5 cursor-pointer hover:text-brand-orange" />
                            <div className="relative group cursor-pointer" onClick={() => setIsCartOpen(true)}>
                                <ShoppingBag className="w-5 h-5 hover:text-brand-orange" />
                                <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full font-black shadow-sm">0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Bottom Navigation Bar */}
            <nav
                className={`
                    md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-[440px] transition-all duration-500 ease-out
                    ${showBottomNav ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"}
                `}
            >
                <div className="bg-white/90 backdrop-blur-2xl border border-gray-100 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-2">
                    <div className="flex items-center justify-around gap-1">
                        {[
                            { name: "Home", path: "/" },
                            { name: "Shop", path: "/shop" },
                            { name: "Blogs", path: "/blogs" },
                            { name: "About", path: "/about" },
                            { name: "Contact", path: "/contact" }
                        ].map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={`flex flex-col items-center py-2 px-4 rounded-full transition-all ${isActive(link.path) ? "bg-brand-teal text-white scale-105 shadow-lg" : "text-brand-teal/40 hover:text-brand-teal"}`}
                            >
                                <span className="text-[10px] font-black uppercase tracking-tighter">{link.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>

            <div className="h-4 pointer-events-none" aria-hidden="true" />
        </>
    );
}
