"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    ShoppingBag,
    Users,
    BarChart3,
    Settings,
    Bell,
    LogOut,
    UtensilsCrossed,
    PieChart,
    X
} from "lucide-react";

const MENU_ITEMS = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { name: "Products", icon: UtensilsCrossed, path: "/admin/products" },
    { name: "Orders", icon: ShoppingBag, path: "/admin/orders" },
    { name: "Customers", icon: Users, path: "/admin/customers" },
    { name: "Analytics", icon: PieChart, path: "/admin/analytics" },
    { name: "Marketing", icon: BarChart3, path: "/admin/marketing" },
    { name: "Notifications", icon: Bell, path: "/admin/notifications" },
    { name: "Settings", icon: Settings, path: "/admin/settings" },
];

interface SidebarProps {
    isCollapsed: boolean;
    isMobileOpen: boolean;
    onClose: () => void;
}

export default function AdminSidebar({ isCollapsed, isMobileOpen, onClose }: SidebarProps) {
    const pathname = usePathname();

    // On mobile, we never show the collapsed state, only the full drawer
    const isActuallyCollapsed = isCollapsed && !isMobileOpen;

    return (
        <>
            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-brand-teal/40 backdrop-blur-sm z-[95] lg:hidden transition-opacity duration-300"
                    onClick={onClose}
                />
            )}

            <aside className={`
                bg-brand-teal h-screen fixed left-0 top-0 text-white flex flex-col z-[100] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                ${isMobileOpen ? "w-72 translate-x-0" : "-translate-x-full lg:translate-x-0"}
                ${isActuallyCollapsed ? "lg:w-20" : "lg:w-72"}
            `}>
                {/* Logo Section */}
                <div className={`p-6 border-b border-white/10 flex items-center ${isActuallyCollapsed ? "justify-center" : "justify-between"}`}>
                    <Link href="/admin" className="flex items-center group" onClick={onClose}>
                        <div className={`flex flex-col ${isActuallyCollapsed ? "hidden" : "flex"}`}>
                            <h2 className="text-xl font-black leading-none tracking-tighter group-hover:text-brand-orange transition-colors">STAR</h2>
                            <h2 className="text-2xl font-black leading-none tracking-widest -mt-1 ml-4 text-brand-orange">PLUS</h2>
                        </div>
                        {isActuallyCollapsed && (
                            <div className="w-10 h-10 bg-brand-orange rounded-xl flex items-center justify-center font-black text-xl shadow-lg shadow-brand-orange/20 animate-in zoom-in-50 duration-300">
                                S
                            </div>
                        )}
                    </Link>
                    {!isActuallyCollapsed && (
                        <button onClick={onClose} className="lg:hidden p-2 hover:bg-white/10 rounded-xl transition-colors">
                            <X className="w-6 h-6 text-white" />
                        </button>
                    )}
                </div>

                {/* Navigation Links */}
                <nav className="flex-grow py-8 px-3 space-y-2 overflow-y-auto no-scrollbar">
                    {MENU_ITEMS.map((item) => {
                        const active = pathname === item.path;
                        return (
                            <Link
                                key={item.name}
                                href={item.path}
                                onClick={onClose}
                                className={`
                                    flex items-center gap-4 py-4 rounded-2xl transition-all duration-300 group relative
                                    ${isActuallyCollapsed ? "justify-center px-0" : "px-6"}
                                    ${active
                                        ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/20"
                                        : "text-white/60 hover:bg-white/5 hover:text-white"}
                                `}
                            >
                                <item.icon className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${active ? "scale-110" : "group-hover:scale-110"}`} />
                                {!isActuallyCollapsed && (
                                    <span className="font-bold text-xs uppercase tracking-widest whitespace-nowrap overflow-hidden animate-in fade-in slide-in-from-left-2 duration-300">
                                        {item.name}
                                    </span>
                                )}

                                {/* Tooltip for Collapsed State */}
                                {isActuallyCollapsed && (
                                    <div className="absolute left-full ml-4 px-3 py-2 bg-brand-teal text-white text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-[110] whitespace-nowrap shadow-xl border border-white/10">
                                        {item.name}
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Section */}
                <div className={`p-4 border-t border-white/10 ${isActuallyCollapsed ? "flex justify-center" : ""}`}>
                    <button className={`
                        flex items-center gap-4 py-4 rounded-2xl text-white/60 hover:bg-white/5 hover:text-white transition-all group
                        ${isActuallyCollapsed ? "px-0 justify-center w-full" : "px-6 w-full"}
                    `}>
                        <LogOut className="w-5 h-5 flex-shrink-0 group-hover:text-brand-orange transition-colors" />
                        {!isActuallyCollapsed && (
                            <span className="font-bold text-xs uppercase tracking-widest">Logout</span>
                        )}
                    </button>
                </div>
            </aside>
        </>
    );
}
