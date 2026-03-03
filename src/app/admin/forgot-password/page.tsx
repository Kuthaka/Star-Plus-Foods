"use client";

import React, { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Mail, Loader2, ArrowRight, ShieldCheck, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const supabase = createClient();

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            setIsLoading(false);
            return;
        }

        try {
            // Check if user exists by attempting a sign in with an empty password
            // This is a common way to check existence without exposing too much, 
            // though Supabase might return 'Invalid login credentials' for both for security.
            // However, we want to try the reset and then handle the outcome.
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/admin/reset-password`,
            });

            if (error) {
                if (error.message.toLowerCase().includes("not found")) {
                    throw new Error("This email is not registered as an administrator.");
                }
                throw error;
            }

            setIsSuccess(true);
        } catch (err: any) {
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen bg-[#F0F7F4] flex flex-col items-center justify-center p-6 lg:p-10 font-sans selection:bg-brand-orange/20 overflow-hidden text-left">
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

                {/* Card */}
                <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 lg:p-10 shadow-[0_30px_100px_rgba(45,90,75,0.15)] border border-white/50 relative overflow-hidden">
                    <div className="relative z-10">
                        {isSuccess ? (
                            <div className="text-center animate-in fade-in zoom-in duration-500">
                                <div className="w-20 h-20 bg-green-50 rounded-3xl mx-auto mb-6 flex items-center justify-center text-green-500 shadow-xl shadow-green-500/10">
                                    <CheckCircle2 className="w-10 h-10" />
                                </div>
                                <h2 className="text-xl font-black text-brand-teal uppercase tracking-tight mb-4">Email Sent!</h2>
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest leading-loose mb-8 px-4">
                                    We've sent a password reset link to <span className="text-brand-teal">{email}</span>. Please check your inbox.
                                </p>
                                <Link
                                    href="/admin/login"
                                    className="inline-flex items-center gap-2 text-xs font-black text-brand-orange hover:gap-3 transition-all uppercase tracking-[0.2em]"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to Login
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div className="mb-6 text-center">
                                    <h2 className="text-xl font-black text-brand-teal uppercase tracking-tight mb-2">Reset Password</h2>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-loose px-6">
                                        Enter your email below and we'll send you a link to reset your password.
                                    </p>
                                </div>

                                {error && (
                                    <div className="mb-6 p-4 bg-red-50 rounded-2xl flex items-center gap-4 animate-in slide-in-from-top-2 duration-300">
                                        <div className="p-2 bg-white rounded-xl text-red-500 shadow-sm">
                                            <AlertCircle className="w-4 h-4" />
                                        </div>
                                        <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest leading-tight">{error}</p>
                                    </div>
                                )}

                                <form onSubmit={handleReset} className="space-y-6">
                                    <div className="space-y-1.5 group">
                                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Admin Email</label>
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

                                    <div className="space-y-4">
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
                                                        Send Reset Link
                                                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                                    </>
                                                )}
                                            </div>
                                        </button>

                                        <div className="text-center pt-2">
                                            <Link
                                                href="/admin/login"
                                                className="text-[9px] font-black text-brand-teal hover:text-brand-orange transition-colors uppercase tracking-widest flex items-center justify-center gap-2 group/back"
                                            >
                                                <ArrowLeft className="w-3 h-3 group-hover/back:-translate-x-1 transition-transform" />
                                                Return to Login
                                            </Link>
                                        </div>
                                    </div>
                                </form>
                            </>
                        )}
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
