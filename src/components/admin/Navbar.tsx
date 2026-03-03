"use client";

import React from "react";
import { Search, Bell, ChevronDown, Globe, Menu, LayoutGrid } from "lucide-react";
import Link from "next/link";

interface NavbarProps {
    isCollapsed: boolean;
    onMenuClick: () => void;
}

export default function AdminNavbar({ isCollapsed, onMenuClick }: NavbarProps) {
    return (
        <header className={`
            h-20 bg-white border-b border-gray-100 fixed top-0 right-0 z-[90] flex items-center justify-between px-4 md:px-10 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
            ${isCollapsed ? "lg:left-20" : "lg:left-72"}
            left-0
        `}>
            <div className="flex items-center gap-4">
                {/* Desktop/Mobile Menu Trigger */}
                <button
                    onClick={onMenuClick}
                    className="p-2.5 bg-gray-50 rounded-2xl text-brand-teal hover:bg-brand-orange hover:text-white transition-all shadow-sm group"
                >
                    <Menu className={`w-6 h-6 transition-transform duration-300 ${isCollapsed ? "rotate-90" : ""}`} />
                </button>

                {/* Search Bar - Hidden on small mobile */}
                <div className="flex-grow max-w-md relative group hidden sm:block ml-2">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-orange transition-colors" />
                    <input
                        type="text"
                        placeholder="Search dashboard..."
                        className="w-full bg-gray-50 border-none rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-brand-orange/20 transition-all outline-none"
                    />
                </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3 md:gap-6">
                {/* View Website - Hidden on mobile */}
                <Link
                    href="/"
                    className="hidden md:flex items-center gap-2 text-[10px] font-black text-gray-400 hover:text-brand-teal transition-colors uppercase tracking-[0.2em] px-5 py-2.5 bg-gray-50 rounded-xl"
                >
                    <Globe className="w-3.5 h-3.5" />
                    Live Site
                </Link>

                {/* Notifications */}
                <button className="relative p-2.5 bg-gray-50 rounded-2xl text-gray-400 hover:text-brand-orange hover:bg-brand-orange/5 transition-all group">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-brand-orange rounded-full border-2 border-white animate-pulse"></span>
                </button>

                {/* Vertical Divider - Hidden on mobile */}
                <div className="h-8 w-[1px] bg-gray-100 hidden sm:block"></div>

                {/* User Profile */}
                <button className="flex items-center gap-3 md:gap-4 group">
                    <div className="hidden md:flex flex-col text-right">
                        <span className="text-sm font-black text-brand-teal uppercase tracking-tight">Admin User</span>
                        <span className="text-[10px] font-bold text-brand-orange uppercase tracking-widest leading-none mt-1">Super Admin</span>
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-brand-teal text-white flex items-center justify-center font-black text-lg shadow-lg shadow-brand-teal/10 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300 relative overflow-hidden">
                        <span className="relative z-10">A</span>
                        <div className="absolute inset-0 bg-brand-orange opacity-0 group-hover:opacity-10 transition-opacity" />
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-brand-teal group-hover:translate-y-0.5 transition-all hidden sm:block" />
                </button>
            </div>
        </header>
    );
}
