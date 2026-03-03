"use client";

import React, { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Mail, Lock, Loader2, ArrowRight, ShieldCheck, AlertCircle, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            router.push("/admin");
            router.refresh();
        } catch (err: any) {
            setError(err.message || "Failed to sign in. Please check your credentials.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen bg-[#F0F7F4] flex flex-col items-center justify-center p-6 lg:p-10 font-sans selection:bg-brand-orange/20 overflow-hidden">
            <div className="w-full max-w-[480px] animate-in fade-in slide-in-from-bottom-8 duration-700">
                {/* Logo Section */}
                <div className="flex flex-col items-center mb-6 group">
                    <div className="relative w-40 h-20 mb-3 transform group-hover:scale-110 transition-transform duration-500">
                        <Image
                            src="/star/logo-bg.png"
                            alt="Star Plus Logo"
                            fill
                            className="object-contain drop-shadow-2xl"
                            priority
                        />
                    </div>
                    <p className="text-[10px] font-black text-brand-teal uppercase tracking-[0.5em] opacity-40">Admin Management Portal</p>
                </div>

                {/* Login Card */}
                <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 lg:p-10 shadow-[0_30px_100px_rgba(45,90,75,0.15)] border border-white/50 relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="mb-6 text-center">
                            <h2 className="text-xl font-black text-brand-teal uppercase tracking-tight mb-2">Admin Login</h2>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-loose">Secure access for Star Plus Foods</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 rounded-2xl flex items-center gap-4 animate-in slide-in-from-top-2 duration-300">
                                <div className="p-2 bg-white rounded-xl text-red-500 shadow-sm">
                                    <AlertCircle className="w-4 h-4" />
                                </div>
                                <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest leading-tight">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-4">
                            {/* Email Field */}
                            <div className="space-y-1.5 group">
                                <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-orange transition-colors" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin@starplus.com"
                                        className="w-full h-14 bg-[#FEFCE8]/80 border-none rounded-2xl pl-14 pr-6 text-sm font-bold text-brand-teal focus:ring-4 focus:ring-brand-orange/10 transition-all outline-none"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-1.5 group">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Password</label>
                                    <Link href="/admin/forgot-password" className="text-[9px] font-black text-brand-orange hover:underline uppercase tracking-widest">Forgot?</Link>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-orange transition-colors" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full h-14 bg-[#FEFCE8]/80 border-none rounded-2xl pl-14 pr-14 text-sm font-bold text-brand-teal focus:ring-4 focus:ring-brand-orange/10 transition-all outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-teal transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-14 bg-brand-teal text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] relative overflow-hidden group hover:bg-brand-orange transition-all duration-500 shadow-xl shadow-brand-teal/10 hover:shadow-brand-orange/20 disabled:grayscale disabled:cursor-not-allowed"
                            >
                                <div className="relative z-10 flex items-center justify-center gap-3">
                                    {isLoading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            Sign In to Portal
                                            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </div>
                            </button>
                        </form>
                    </div>

                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 mandala-pattern w-full h-full opacity-5 pointer-events-none transform -rotate-12 translate-x-1/2 -translate-y-1/4" />
                </div>

                {/* Footer Info */}
                <div className="mt-6 flex items-center justify-center gap-3 opacity-30">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-teal" />
                    <p className="text-[9px] font-black text-brand-teal uppercase tracking-[0.3em]">End-to-End Encrypted Portal</p>
                </div>
            </div>
        </div>
    );
}
