"use client";

import React, { useState, useEffect } from "react";
import {
    Settings as SettingsIcon,
    Save,
    MessageCircle,
    Phone,
    Mail,
    Instagram,
    Facebook,
    Youtube,
    MapPin,
    Globe,
    Loader2,
    Check,
    AlertCircle,
    Share2,
    Info,
    ShieldCheck
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { SiteSettings } from "@/types/settings";

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState<SiteSettings | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const supabase = createClient();

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("settings")
                .select("*")
                .eq("id", 1)
                .single();

            if (error && error.code !== "PGRST116") throw error; // PGRST116 means no row found

            if (data) {
                setSettings(data);
            } else {
                // Initialize with defaults if row doesn't exist
                const defaultSettings: Partial<SiteSettings> = {
                    id: 1,
                    site_name: "STAR PLUS FOODS",
                    whatsapp_number: "",
                    mobile_number: "",
                    email: "",
                    instagram_url: "",
                    facebook_url: "",
                    youtube_url: "",
                    address: ""
                };
                setSettings(defaultSettings as SiteSettings);
            }
        } catch (err) {
            console.error("Error fetching settings:", err);
            setMessage({ type: 'error', text: "Failed to load settings. Please check your database." });
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!settings) return;

        setIsSaving(true);
        setMessage(null);

        try {
            const { error } = await supabase
                .from("settings")
                .upsert(settings, { onConflict: 'id' });

            if (error) throw error;
            setMessage({ type: 'success', text: "Global settings updated successfully!" });

            // Auto hide success message
            setTimeout(() => setMessage(null), 5000);
        } catch (err: any) {
            console.error("Error updating settings:", err);
            setMessage({ type: 'error', text: err.message || "Failed to update settings." });
        } finally {
            setIsSaving(false);
        }
    };

    const handleChange = (key: keyof SiteSettings, value: string) => {
        setSettings(prev => prev ? { ...prev, [key]: value } : null);
    };

    if (loading) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center gap-6">
                <Loader2 className="w-12 h-12 text-brand-teal animate-spin" />
                <p className="text-[10px] font-black text-brand-teal uppercase tracking-[0.4em]">Synchronizing Site Parameters...</p>
            </div>
        );
    }

    if (!settings) return null;

    return (
        <div className="max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-brand-teal rounded-3xl flex items-center justify-center text-white shadow-xl shadow-brand-teal/20">
                        <SettingsIcon className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-brand-teal uppercase tracking-tighter leading-none">Global Configurations</h1>
                        <p className="text-[10px] font-black text-brand-teal/30 uppercase tracking-[0.4em] mt-3">Infrastructure / Site Identity & Contact</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 py-2 px-6 bg-brand-teal/5 rounded-2xl border border-brand-teal/10">
                    <ShieldCheck className="w-4 h-4 text-brand-orange" />
                    <span className="text-[10px] font-black text-brand-teal uppercase tracking-widest text-center">Changes reflect in real-time<br />on the public storefront</span>
                </div>
            </div>

            {/* Status Messages */}
            {message && (
                <div className={`mb-10 p-6 rounded-[2rem] flex items-center gap-6 border-l-4 animate-in slide-in-from-top-4 duration-500 ${message.type === 'success' ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
                    }`}>
                    <div className={`p-3 bg-white rounded-2xl shadow-sm ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                        {message.type === 'success' ? <Check className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                    </div>
                    <div>
                        <h4 className={`text-sm font-black uppercase tracking-tight ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                            {message.type === 'success' ? 'Operation Success' : 'Database Error'}
                        </h4>
                        <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 opacity-80 ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                            {message.text}
                        </p>
                    </div>
                </div>
            )}

            <form onSubmit={handleUpdate} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Column: Core Identity & Contact */}
                <div className="lg:col-span-12 space-y-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                        {/* Site Identity Section */}
                        <div className="bg-white rounded-[3rem] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col justify-between">
                            <div>
                                <div className="mb-10 flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#F0F7F4] rounded-2xl flex items-center justify-center text-brand-teal">
                                        <Globe className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-black text-brand-teal uppercase tracking-tight">Identity Matrix</h3>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2 group">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Platform Name</label>
                                        <input
                                            type="text"
                                            value={settings.site_name}
                                            onChange={(e) => handleChange("site_name", e.target.value)}
                                            className="w-full h-16 bg-gray-50/50 border-none rounded-[1.25rem] px-8 text-sm font-bold text-brand-teal focus:ring-4 focus:ring-brand-orange/5 transition-all outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2 group">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Company Physical Address</label>
                                        <textarea
                                            rows={3}
                                            value={settings.address}
                                            onChange={(e) => handleChange("address", e.target.value)}
                                            placeholder="Building, Street, City, State, ZIP"
                                            className="w-full bg-[#FEFCE8]/40 border-none rounded-[1.25rem] py-6 px-8 text-sm font-bold text-brand-teal focus:ring-4 focus:ring-brand-orange/5 transition-all outline-none resize-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex items-center gap-4 p-4 bg-blue-50/50 rounded-2xl">
                                <Info className="w-4 h-4 text-blue-500 shrink-0" />
                                <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">Address is used in both navbar and footer structures.</span>
                            </div>
                        </div>

                        {/* Contact Channels Section */}
                        <div className="bg-white rounded-[3rem] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-gray-100">
                            <div className="mb-10 flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#FFF7ED] rounded-2xl flex items-center justify-center text-brand-orange">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-black text-brand-teal uppercase tracking-tight">Communications</h3>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2 group">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                                            <MessageCircle className="w-3 h-3 text-green-500" /> WhatsApp Direct
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="+91 00000 00000"
                                            value={settings.whatsapp_number}
                                            onChange={(e) => handleChange("whatsapp_number", e.target.value)}
                                            className="w-full h-16 bg-gray-50/50 border-none rounded-[1.25rem] px-8 text-sm font-bold text-brand-teal focus:ring-4 focus:ring-brand-orange/5 transition-all outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2 group">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Voice Support</label>
                                        <input
                                            type="text"
                                            placeholder="+91 00000 00000"
                                            value={settings.mobile_number}
                                            onChange={(e) => handleChange("mobile_number", e.target.value)}
                                            className="w-full h-16 bg-gray-50/50 border-none rounded-[1.25rem] px-8 text-sm font-bold text-brand-teal focus:ring-4 focus:ring-brand-orange/5 transition-all outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 group">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Enterprise Email</label>
                                    <input
                                        type="email"
                                        placeholder="support@starplusfoods.com"
                                        value={settings.email}
                                        onChange={(e) => handleChange("email", e.target.value)}
                                        className="w-full h-16 bg-[#FEFCE8]/40 border-none rounded-[1.25rem] px-8 text-sm font-bold text-brand-teal focus:ring-4 focus:ring-brand-orange/5 transition-all outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social Ecosystem Section */}
                    <div className="bg-white rounded-[3rem] p-10 shadow-[0_20px_60px_rgba(45,90,75,0.05)] border border-gray-100">
                        <div className="mb-10 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-brand-teal rounded-2xl flex items-center justify-center text-white">
                                    <Share2 className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-black text-brand-teal uppercase tracking-tight">Social Ecosystem</h3>
                            </div>
                            <div className="text-[8px] font-black text-brand-teal/20 uppercase tracking-[0.3em] bg-gray-50 px-4 py-2 rounded-full border border-gray-100">Synchronized with Public Feed</div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                                    <Instagram className="w-4 h-4 text-[#E4405F]" /> Instagram Link
                                </label>
                                <input
                                    type="url"
                                    placeholder="https://instagram.com/..."
                                    value={settings.instagram_url}
                                    onChange={(e) => handleChange("instagram_url", e.target.value)}
                                    className="w-full h-16 bg-gray-50 border-none rounded-2xl px-6 text-xs font-bold text-brand-teal outline-none focus:ring-4 focus:ring-[#E4405F]/5"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                                    <Facebook className="w-4 h-4 text-[#1877F2]" /> Facebook Business
                                </label>
                                <input
                                    type="url"
                                    placeholder="https://facebook.com/..."
                                    value={settings.facebook_url}
                                    onChange={(e) => handleChange("facebook_url", e.target.value)}
                                    className="w-full h-16 bg-gray-50 border-none rounded-2xl px-6 text-xs font-bold text-brand-teal outline-none focus:ring-4 focus:ring-[#1877F2]/5"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                                    <Youtube className="w-4 h-4 text-[#FF0000]" /> YouTube Channel
                                </label>
                                <input
                                    type="url"
                                    placeholder="https://youtube.com/..."
                                    value={settings.youtube_url}
                                    onChange={(e) => handleChange("youtube_url", e.target.value)}
                                    className="w-full h-16 bg-gray-50 border-none rounded-2xl px-6 text-xs font-bold text-brand-teal outline-none focus:ring-4 focus:ring-[#FF0000]/5"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Section */}
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="flex-grow w-full h-24 bg-brand-teal text-white rounded-[2.5rem] flex items-center justify-center gap-4 group hover:bg-brand-orange transition-all duration-700 shadow-[0_30px_100px_rgba(45,90,75,0.2)] hover:shadow-brand-orange/30 disabled:grayscale disabled:cursor-not-allowed"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="w-8 h-8 animate-spin" />
                                    <span className="text-lg font-black uppercase tracking-widest">Committing Updates...</span>
                                </>
                            ) : (
                                <>
                                    <Save className="w-8 h-8 group-hover:scale-110 transition-transform duration-500" />
                                    <span className="text-xl font-black uppercase tracking-widest">Store Global Settings</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
