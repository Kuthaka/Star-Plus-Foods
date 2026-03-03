"use client";

import React, { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/Sidebar";
import AdminNavbar from "@/components/admin/Navbar";
import { usePathname } from "next/navigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const publicPages = ["/admin/login", "/admin/forgot-password", "/admin/reset-password"];
    const isPublicPage = publicPages.includes(pathname);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Auto-collapse on smaller desktop/tablet screens
    useEffect(() => {
        if (isPublicPage) return;

        const handleResize = () => {
            if (window.innerWidth < 1280) {
                setIsCollapsed(true);
            } else {
                setIsCollapsed(false);
            }
        };
        handleResize(); // Initial check
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isPublicPage]);

    const toggleSidebar = () => {
        if (window.innerWidth < 1024) {
            setIsMobileOpen(!isMobileOpen);
        } else {
            setIsCollapsed(!isCollapsed);
        }
    };

    // If it's the login page, don't show the dashboard shell
    if (isPublicPage) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-[#F0F7F4] flex font-sans overflow-x-hidden">
            {/* Sidebar Component */}
            <AdminSidebar
                isCollapsed={isCollapsed}
                isMobileOpen={isMobileOpen}
                onClose={() => setIsMobileOpen(false)}
            />

            {/* Main Content Area */}
            <div className={`
                flex-grow flex flex-col w-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                ${isCollapsed ? "lg:ml-20" : "lg:ml-72"}
            `}>
                {/* Navbar Component */}
                <AdminNavbar
                    isCollapsed={isCollapsed}
                    onMenuClick={toggleSidebar}
                />

                {/* Page Content */}
                <main className="flex-grow pt-24 lg:pt-28 px-4 md:px-10 pb-12 w-full">
                    <div className="max-w-[1600px] mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
