"use client";

import React, { useState, useEffect } from "react";
import {
    Phone,
    Mail,
    MessageCircle,
    Send,
    Loader2,
    CheckCircle2,
    MapPin
} from "lucide-react";
import Navbar from "@/components/headers/Navbar";
import Footer from "@/components/Footer";
import TopBanner from "@/components/headers/TopBanner";
import { createClient } from "@/lib/supabase/client";
import { SiteSettings } from "@/types/settings";

export default function ContactPage() {
    const [settings, setSettings] = useState<SiteSettings | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const supabase = createClient();

    useEffect(() => {
        const fetchSettings = async () => {
            const { data } = await supabase.from("settings").select("*").eq("id", 1).single();
            if (data) setSettings(data);
        };
        fetchSettings();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setTimeout(() => setIsSuccess(false), 5000);
        }, 1500);
    };

    return (
        <div className="flex min-h-screen flex-col font-sans">
            <TopBanner />

            <main className="flex-grow bg-gray-50/50">
                {/* Simple Header - Matching Shop UI */}
                <div className="bg-brand-teal relative overflow-hidden pb-32">
                    <Navbar />
                    <div className="container mx-auto px-4 md:px-12 pt-20 relative z-10 text-center">
                        <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">
                            Contact <span className="text-brand-orange">Us</span>
                        </h1>
                        <p className="text-white/60 max-w-2xl mx-auto font-medium text-lg">
                            Have questions or want to partner with us? Reach out and we'll get back to you shortly.
                        </p>
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-yellow opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                </div>

                <div className="container mx-auto px-4 md:px-12 -mt-16 relative z-20 pb-20">
                    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-black/5 p-8 md:p-12 border border-gray-100 overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                            {/* Contact Details */}
                            <div className="lg:col-span-5 space-y-10">
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-black text-brand-teal uppercase tracking-tight">Direct Support</h3>
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-brand-orange/5 text-brand-orange rounded-xl flex items-center justify-center">
                                                <Phone className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Call Us</p>
                                                <p className="text-brand-teal font-bold">{settings?.mobile_number || "+91 84800 05280"}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-brand-teal/5 text-brand-teal rounded-xl flex items-center justify-center">
                                                <Mail className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Us</p>
                                                <p className="text-brand-teal font-bold">{settings?.email || "pronto@starplusfoods.com"}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-green-50 text-green-500 rounded-xl flex items-center justify-center">
                                                <MessageCircle className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">WhatsApp</p>
                                                <p className="text-brand-teal font-bold">{settings?.whatsapp_number || "Direct Chat"}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-8 border-t border-gray-100">
                                    <h3 className="text-2xl font-black text-brand-teal uppercase tracking-tight flex items-center gap-3">
                                        <MapPin className="w-6 h-6 text-brand-orange" /> Head Office
                                    </h3>
                                    <p className="text-brand-teal/60 font-medium leading-relaxed">
                                        {settings?.address || "Star Plus Foods, Industrial Estate, Cuttack, Odisha - 753010"}
                                    </p>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="lg:col-span-7">
                                <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50/50 p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-sm">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Full Name</label>
                                            <input type="text" required className="w-full h-14 bg-white border border-gray-100 rounded-xl px-6 text-sm font-bold text-brand-teal outline-none focus:ring-4 focus:ring-brand-orange/5" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Email Address</label>
                                            <input type="email" required className="w-full h-14 bg-white border border-gray-100 rounded-xl px-6 text-sm font-bold text-brand-teal outline-none focus:ring-4 focus:ring-brand-orange/5" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Message</label>
                                        <textarea required rows={5} className="w-full bg-white border border-gray-100 rounded-2xl p-6 text-sm font-bold text-brand-teal outline-none focus:ring-4 focus:ring-brand-orange/5 resize-none" />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || isSuccess}
                                        className={`w-full h-16 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${isSuccess ? 'bg-green-500 text-white' : 'bg-brand-orange text-white hover:bg-brand-teal'
                                            }`}
                                    >
                                        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : isSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                                        {isSuccess ? "Message Sent!" : "Send Message"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
