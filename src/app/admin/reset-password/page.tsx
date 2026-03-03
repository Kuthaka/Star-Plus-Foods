"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Lock, Loader2, ArrowRight, ShieldCheck, AlertCircle, Eye, EyeOff, CheckCircle2 } from "lucide-react";

export default function ResetPasswordPage() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isValidating, setIsValidating] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        // Watch for password recovery session
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === "PASSWORD_RECOVERY" || session) {
                setIsValidating(false);
            } else if (event === "SIGNED_OUT" && isValidating) {
                // If we've checked and there's no reset session, go home
                setTimeout(() => {
                    if (!session) {
                        router.push("/admin/login");
                    }
                }, 2000);
            }
        });

        // Fallback check
        const checkInitialSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setIsValidating(false);
            } else {
                // Give it a small window for the hash to be parsed
                setTimeout(async () => {
                    const { data: { session: retrySession } } = await supabase.auth.getSession();
                    if (!retrySession) {
                        router.push("/admin/login");
                    } else {
                        setIsValidating(false);
                    }
                }, 1500);
            }
        };
        checkInitialSession();

        return () => subscription.unsubscribe();
    }, [supabase.auth, router]);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setIsLoading(false);
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            setIsLoading(false);
            return;
        }

        try {
            const { error } = await supabase.auth.updateUser({
                password: password,
            });

            if (error) throw error;

            setIsSuccess(true);
            setTimeout(() => {
                router.push("/admin/login");
                router.refresh();
            }, 2500);
        } catch (err: any) {
            setError(err.message || "Failed to update password. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isValidating) {
        return (
            <div className="h-screen bg-[#F0F7F4] flex flex-col items-center justify-center font-sans">
                <div className="flex flex-col items-center gap-4 animate-pulse">
                    <Loader2 className="w-10 h-10 text-brand-teal animate-spin" />
                    <p className="text-xs font-black text-brand-teal uppercase tracking-[0.3em]">Validating Reset Link...</p>
                </div>
            </div>
        );
    }

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
                                <h2 className="text-xl font-black text-brand-teal uppercase tracking-tight mb-4">Password Reset!</h2>
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest leading-loose mb-8 px-4">
                                    Your password has been updated successfully. Redirecting to login...
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="mb-6 text-center">
                                    <h2 className="text-xl font-black text-brand-teal uppercase tracking-tight mb-2">New Password</h2>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-loose px-6 text-center">
                                        Choose a secure new password for your administration account.
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

                                <form onSubmit={handleReset} className="space-y-4">
                                    {/* New Password Field */}
                                    <div className="space-y-1.5 group">
                                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">New Password</label>
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

                                    {/* Confirm Password Field */}
                                    <div className="space-y-1.5 group">
                                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Confirm Password</label>
                                        <div className="relative">
                                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-orange transition-colors" />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                required
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                placeholder="••••••••"
                                                className="w-full h-14 bg-[#FEFCE8]/80 border-none rounded-2xl pl-14 pr-14 text-sm font-bold text-brand-teal focus:ring-4 focus:ring-brand-orange/10 transition-all outline-none"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full h-14 bg-brand-teal text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] relative overflow-hidden group hover:bg-brand-orange transition-all duration-500 shadow-xl shadow-brand-teal/10 hover:shadow-brand-orange/20 disabled:grayscale disabled:cursor-not-allowed mt-4"
                                    >
                                        <div className="relative z-10 flex items-center justify-center gap-3">
                                            {isLoading ? (
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                            ) : (
                                                <>
                                                    Update Password
                                                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </div>
                                    </button>
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
