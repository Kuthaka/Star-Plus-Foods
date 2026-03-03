"use client";

import React, { useState, useEffect } from "react";
import {
    Search,
    Bell,
    ChevronDown,
    Globe,
    Menu,
    User,
    LogOut,
    Settings,
    ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface NavbarProps {
    isCollapsed: boolean;
    onMenuClick: () => void;
}

export default function AdminNavbar({ isCollapsed, onMenuClick }: NavbarProps) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) setUserEmail(user.email || null);
        };
        getUser();
    }, [supabase.auth]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/admin/login");
        router.refresh();
    };

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

                {/* User Profile with Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-3 md:gap-4 group"
                    >
                        <div className="hidden md:flex flex-col text-right">
                            <span className="text-sm font-black text-brand-teal uppercase tracking-tight">Admin User</span>
                            <span className="text-[10px] font-bold text-brand-orange uppercase tracking-widest leading-none mt-1">Super Admin</span>
                        </div>
                        <div className={`
                            w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-brand-teal text-white flex items-center justify-center font-black text-lg transition-all duration-300 relative overflow-hidden
                            ${isProfileOpen ? "ring-4 ring-brand-orange/10 scale-105" : "group-hover:scale-105 shadow-lg shadow-brand-teal/10"}
                        `}>
                            <span className="relative z-10 text-xl font-black">{userEmail?.[0].toUpperCase() || "A"}</span>
                            <div className="absolute inset-0 bg-brand-orange opacity-0 group-hover:opacity-10 transition-opacity" />
                        </div>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 hidden sm:block ${isProfileOpen ? "rotate-180 text-brand-teal" : "group-hover:text-brand-teal"}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isProfileOpen && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)} />
                            <div className="absolute top-full right-0 mt-4 w-64 bg-white rounded-3xl shadow-2xl border border-gray-50 py-3 z-50 animate-in fade-in slide-in-from-top-4 duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
                                <div className="px-6 py-4 border-b border-gray-50 mb-2">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Signed in as</p>
                                    <p className="text-sm font-black text-brand-teal uppercase tracking-tighter truncate">{userEmail || "Loading..."}</p>
                                </div>
                                <div className="px-2">
                                    <button className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-gray-500 hover:bg-gray-50 hover:text-brand-teal transition-all group text-left">
                                        <div className="p-2 bg-gray-50 rounded-xl group-hover:bg-white transition-colors">
                                            <User className="w-4 h-4" />
                                        </div>
                                        <span className="text-xs font-bold uppercase tracking-widest">My Profile</span>
                                    </button>
                                    <button className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-gray-500 hover:bg-gray-50 hover:text-brand-teal transition-all group text-left">
                                        <div className="p-2 bg-gray-50 rounded-xl group-hover:bg-white transition-colors">
                                            <ShieldCheck className="w-4 h-4" />
                                        </div>
                                        <span className="text-xs font-bold uppercase tracking-widest">Security</span>
                                    </button>
                                    <button className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-gray-500 hover:bg-gray-50 hover:text-brand-teal transition-all group text-left">
                                        <div className="p-2 bg-gray-50 rounded-xl group-hover:bg-white transition-colors">
                                            <Settings className="w-4 h-4" />
                                        </div>
                                        <span className="text-xs font-bold uppercase tracking-widest">Account Settings</span>
                                    </button>
                                </div>
                                <div className="px-2 mt-2 pt-2 border-t border-gray-50">
                                    <button
                                        onClick={handleSignOut}
                                        className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all group text-left"
                                    >
                                        <div className="p-2 bg-red-50 rounded-xl group-hover:bg-white transition-colors">
                                            <LogOut className="w-4 h-4" />
                                        </div>
                                        <span className="text-xs font-bold uppercase tracking-widest">Sign Out</span>
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
