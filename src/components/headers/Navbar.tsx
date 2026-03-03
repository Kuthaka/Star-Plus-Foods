"use client";

import Image from "next/image";
import { Search, User, ShoppingBag } from "lucide-react";

export default function Navbar() {
    return (
        <header className="container mx-auto px-4 md:px-8 flex items-center justify-between relative z-20">
            {/* Logo */}
            <div className="w-16 md:w-24 relative h-16 md:h-24">
                <Image
                    src="/star/logo-bg.png"
                    alt="Star Plus Foods Logo"
                    fill
                    className="object-contain"
                />
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-8 bg-brand-tan/60 backdrop-blur-md px-10 py-3 rounded-full border border-white/20">
                <a href="#" className="text-brand-orange font-bold text-sm uppercase tracking-wider">Home</a>
                <a href="#" className="text-gray-700 font-semibold text-sm uppercase tracking-wider hover:text-brand-orange transition-colors">Shop</a>
                <a href="#" className="text-gray-700 font-semibold text-sm uppercase tracking-wider hover:text-brand-orange transition-colors">Blogs</a>
                <a href="#" className="text-gray-700 font-semibold text-sm uppercase tracking-wider hover:text-brand-orange transition-colors">About Us</a>
                <a href="#" className="text-gray-700 font-semibold text-sm uppercase tracking-wider hover:text-brand-orange transition-colors">Contact</a>
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-4 md:gap-6 text-gray-800">
                <Search className="w-5 h-5 cursor-pointer hover:text-brand-orange transition-colors" />
                <User className="w-5 h-5 cursor-pointer hover:text-brand-orange transition-colors" />
                <ShoppingBag className="w-5 h-5 cursor-pointer hover:text-brand-orange transition-colors" />
            </div>
        </header>
    );
}
