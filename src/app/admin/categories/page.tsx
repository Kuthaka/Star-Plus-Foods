"use client";

import React, { useState, useEffect } from "react";
import {
    Plus,
    Trash2,
    Eye,
    EyeOff,
    Loader2,
    Check,
    X,
    FolderPlus,
    Tag,
    AlertCircle,
    Search,
    ChevronLeft,
    ChevronRight,
    ExternalLink
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Category } from "@/types/category";

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState<string | null>(null);

    const supabase = createClient();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("categories")
                .select("*")
                .order("name", { ascending: true });

            if (error) throw error;
            setCategories(data || []);
        } catch (error) {
            console.error("Error fetching categories:", error);
            setError("Failed to load categories.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategoryName.trim()) return;

        setIsSubmitting(true);
        setError(null);
        try {
            const { error } = await supabase
                .from("categories")
                .insert([{ name: newCategoryName.trim(), is_listed: true }]);

            if (error) throw error;

            setNewCategoryName("");
            setIsAdding(false);
            fetchCategories();
        } catch (err: any) {
            setError(err.message || "Unique category name required.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleListing = async (category: Category) => {
        try {
            const { error } = await supabase
                .from("categories")
                .update({ is_listed: !category.is_listed })
                .eq("id", category.id);

            if (error) throw error;
            setCategories(prev => prev.map(c =>
                c.id === category.id ? { ...c, is_listed: !c.is_listed } : c
            ));
        } catch (err: any) {
            setError(err.message);
        }
    };

    const deleteCategory = async (id: string) => {
        if (!confirm("Are you sure? This might affect products in this category.")) return;
        try {
            const { error } = await supabase
                .from("categories")
                .delete()
                .eq("id", id);

            if (error) throw error;
            fetchCategories();
        } catch (err: any) {
            setError(err.message);
        }
    };

    const filteredCategories = categories.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-700 max-w-5xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-brand-teal uppercase tracking-tighter">Category Management</h1>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em] mt-2">Classify and organize your products</p>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="inline-flex items-center justify-center gap-3 bg-brand-orange text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-teal transition-all duration-500 shadow-xl shadow-brand-orange/20"
                >
                    <Plus className="w-4 h-4" />
                    New Category
                </button>
            </div>

            {error && (
                <div className="p-4 bg-red-50 rounded-2xl flex items-center gap-4 border border-red-100 animate-in slide-in-from-top-2 duration-300">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest">{error}</p>
                </div>
            )}

            {/* Add Category Form/Modal Backdrop */}
            {isAdding && (
                <div className="fixed inset-0 z-[200] bg-brand-teal/60 backdrop-blur-md flex items-center justify-center p-6">
                    <div className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-[#FEFCE8] rounded-2xl flex items-center justify-center text-brand-orange">
                                <Tag className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-black text-brand-teal uppercase tracking-tight">Create Category</h3>
                        </div>

                        <form onSubmit={handleAddCategory} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Name</label>
                                <input
                                    autoFocus
                                    type="text"
                                    required
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                    placeholder="e.g. Spices, Masalas"
                                    className="w-full h-16 bg-gray-50/50 border-none rounded-[1.25rem] px-8 text-sm font-bold text-brand-teal focus:ring-4 focus:ring-brand-orange/10 outline-none"
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => { setIsAdding(false); setNewCategoryName(""); }}
                                    className="flex-grow py-5 bg-gray-50 text-gray-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-grow py-5 bg-brand-orange text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-teal transition-all shadow-xl shadow-brand-orange/10 flex items-center justify-center gap-3"
                                >
                                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Category"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* List Section */}
            <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(45,90,75,0.05)] border border-gray-100 overflow-hidden">
                <div className="p-6 lg:p-10 border-b border-gray-50 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="relative w-full md:max-w-md group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-orange transition-colors" />
                        <input
                            type="text"
                            placeholder="Find category..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-14 bg-gray-50/50 border-none rounded-2xl pl-14 pr-6 text-sm font-bold text-brand-teal focus:ring-4 focus:ring-brand-orange/5 outline-none transition-all"
                        />
                    </div>
                    <div className="text-[10px] font-black text-brand-teal/40 uppercase tracking-widest whitespace-nowrap">
                        Total {categories.length} Categories
                    </div>
                </div>

                {loading ? (
                    <div className="p-20 flex flex-col items-center gap-4">
                        <Loader2 className="w-10 h-10 text-brand-teal animate-spin opacity-20" />
                        <span className="text-[10px] font-black text-brand-teal/20 uppercase tracking-[0.4em]">Syncing Labels...</span>
                    </div>
                ) : filteredCategories.length > 0 ? (
                    <div className="overflow-x-auto overflow-y-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50">
                                <tr>
                                    <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Identity</th>
                                    <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Visibility</th>
                                    <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Operations</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredCategories.map((cat) => (
                                    <tr key={cat.id} className="group hover:bg-gray-50/50 transition-colors">
                                        <td className="px-10 py-6">
                                            <Link href={`/admin/categories/${cat.id}`} className="flex items-center gap-4 group/item">
                                                <div className="w-10 h-10 bg-brand-teal/5 text-brand-teal rounded-xl flex items-center justify-center font-black group-hover/item:bg-brand-orange group-hover/item:text-white transition-colors">
                                                    {cat.name.charAt(0)}
                                                </div>
                                                <span className="font-black text-sm text-brand-teal uppercase tracking-tight group-hover/item:text-brand-orange transition-colors">{cat.name}</span>
                                            </Link>
                                        </td>
                                        <td className="px-10 py-6">
                                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-widest ${cat.is_listed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                                <div className={`w-1.5 h-1.5 rounded-full ${cat.is_listed ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                                                {cat.is_listed ? 'Public' : 'Hidden'}
                                            </div>
                                        </td>
                                        <td className="px-10 py-6 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                <button
                                                    onClick={() => toggleListing(cat)}
                                                    className={`p-3 rounded-xl transition-all transform hover:-translate-y-1 ${cat.is_listed ? 'bg-red-50 text-red-400 hover:bg-red-500 hover:text-white' : 'bg-green-50 text-green-400 hover:bg-green-500 hover:text-white'}`}
                                                    title={cat.is_listed ? "Hide" : "Show"}
                                                >
                                                    {cat.is_listed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                                <Link
                                                    href={`/admin/categories/${cat.id}`}
                                                    className="p-3 bg-gray-50 text-brand-teal rounded-xl hover:bg-brand-orange hover:text-white transition-all transform hover:-translate-y-1"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => deleteCategory(cat.id)}
                                                    className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-red-500 hover:text-white transition-all transform hover:-translate-y-1"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-20 text-center">
                        <Tag className="w-12 h-12 text-gray-200 mx-auto mb-6" />
                        <h4 className="text-sm font-black text-brand-teal uppercase tracking-tight">No labels found</h4>
                    </div>
                )}
            </div>
        </div>
    );
}
