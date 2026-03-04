"use client";

import React, { useState, useEffect } from "react";
import {
    ArrowLeft,
    Edit,
    Eye,
    EyeOff,
    Loader2,
    Check,
    X,
    Package,
    Tag,
    AlertCircle,
    ChevronRight,
    UtensilsCrossed,
    Layers,
    Save
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Category } from "@/types/category";
import { Product } from "@/types/product";

export default function CategoryDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const supabase = createClient();

    const [category, setCategory] = useState<Category | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    const fetchData = async () => {
        setLoading(true);
        try {
            // 1. Fetch Category
            const { data: catData, error: catError } = await supabase
                .from("categories")
                .select("*")
                .eq("id", id)
                .single();

            if (catError) throw catError;
            setCategory(catData);
            setEditName(catData.name);

            // 2. Fetch Products for this Category
            const { data: prodData, error: prodError } = await supabase
                .from("products")
                .select("*")
                .eq("category", catData.name)
                .order("created_at", { ascending: false });

            if (prodError) throw prodError;
            setProducts(prodData || []);
        } catch (err: any) {
            console.error("Error fetching data:", err);
            setError(err.message || "Failed to load category details.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editName.trim() || !category) return;

        setIsUpdating(true);
        setError(null);
        try {
            const { error: updateError } = await supabase
                .from("categories")
                .update({ name: editName.trim() })
                .eq("id", category.id);

            if (updateError) throw updateError;

            // If name changed, we might need to update products, 
            // but usually we'd use foreign keys. Since we used strings for now:
            if (editName.trim() !== category.name) {
                await supabase
                    .from("products")
                    .update({ category: editName.trim() })
                    .eq("category", category.name);
            }

            setIsEditing(false);
            fetchData();
            router.refresh();
        } catch (err: any) {
            setError(err.message || "Update failed.");
        } finally {
            setIsUpdating(false);
        }
    };

    const toggleListing = async () => {
        if (!category) return;
        try {
            const { error: updateError } = await supabase
                .from("categories")
                .update({ is_listed: !category.is_listed })
                .eq("id", category.id);

            if (updateError) throw updateError;
            setCategory({ ...category, is_listed: !category.is_listed });
        } catch (err: any) {
            setError(err.message);
        }
    };

    if (loading) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center gap-6">
                <Loader2 className="w-12 h-12 text-brand-teal animate-spin" />
                <p className="text-[10px] font-black text-brand-teal uppercase tracking-[0.4em]">Retrieving Category Blueprint...</p>
            </div>
        );
    }

    if (!category) {
        return (
            <div className="text-center py-20">
                <Tag className="w-20 h-20 text-gray-200 mx-auto mb-8 opacity-20" />
                <h2 className="text-2xl font-black text-brand-teal uppercase tracking-tight">Category Not Found</h2>
                <Link href="/admin/categories" className="text-brand-orange font-bold uppercase tracking-widest mt-6 inline-block hover:underline">Return to Management</Link>
            </div>
        );
    }

    return (
        <div className="max-w-[1400px] mx-auto animate-in fade-in duration-700 pb-20">
            {/* Top Navigation */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div className="flex items-center gap-6">
                    <Link
                        href="/admin/categories"
                        className="p-4 bg-white rounded-2xl text-brand-teal hover:bg-brand-orange hover:text-white transition-all shadow-sm border border-gray-100 group"
                    >
                        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-brand-teal uppercase tracking-tighter leading-none">{category.name}</h1>
                        <p className="text-[10px] font-black text-brand-teal/30 uppercase tracking-[0.4em] mt-3">Category Analysis / ID: {category.id.substring(0, 8)}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsEditing(true)}
                        className="inline-flex items-center gap-3 bg-white border border-gray-100 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-brand-teal hover:bg-gray-50 transition-all shadow-sm"
                    >
                        <Edit className="w-4 h-4" />
                        Edit Name
                    </button>
                    <button
                        onClick={toggleListing}
                        className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl ${category.is_listed ? 'bg-red-500 text-white shadow-red-500/10 hover:bg-red-600' : 'bg-green-500 text-white shadow-green-500/10 hover:bg-green-600'}`}
                    >
                        {category.is_listed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        {category.is_listed ? 'Hide Globally' : 'Make Public'}
                    </button>
                </div>
            </div>

            {error && (
                <div className="mb-10 p-4 bg-red-50 rounded-2xl flex items-center gap-4 border border-red-100">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest">{error}</p>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Statistics & Overview Left */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-brand-teal rounded-[3rem] p-10 text-white relative overflow-hidden group">
                        <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-3">
                            <Layers className="w-5 h-5" />
                            Inventory Health
                        </h3>

                        <div className="space-y-6 relative z-10">
                            <div>
                                <p className="text-[8px] font-black text-white/40 uppercase tracking-[0.3em] mb-1">Total Products Attached</p>
                                <p className="text-4xl font-black tracking-tighter">{products.length} Items</p>
                            </div>

                            <div className="pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[8px] font-black text-white/40 uppercase tracking-[0.3em] mb-1">Listing Status</p>
                                    <p className={`text-[10px] font-black uppercase ${category.is_listed ? 'text-green-400' : 'text-red-400'}`}>
                                        {category.is_listed ? 'Public Asset' : 'Archived Asset'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[8px] font-black text-white/40 uppercase tracking-[0.3em] mb-1">Created Date</p>
                                    <p className="text-[10px] font-black uppercase">{new Date(category.created_at).toLocaleDateString('en-GB')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Decoration */}
                        <Tag className="absolute -bottom-10 -right-10 w-40 h-40 text-black/10 transform -rotate-12 transition-transform duration-700 group-hover:scale-110" />
                    </div>

                    <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-6">Classification Notes</p>
                        <p className="text-sm font-bold text-brand-teal/60 leading-relaxed uppercase tracking-widest">
                            Editing the category name will automatically update all {products.length} linked products to maintain catalog integrity.
                        </p>
                    </div>
                </div>

                {/* Linked Products Right */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="bg-white rounded-[3rem] p-10 shadow-[0_20px_60px_rgba(45,90,75,0.05)] border border-gray-100 min-h-[500px]">
                        <div className="flex items-center justify-between mb-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#FEFCE8] rounded-2xl flex items-center justify-center text-brand-orange">
                                    <Package className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-black text-brand-teal uppercase tracking-tight">Assigned Catalog</h3>
                            </div>
                            <span className="text-[10px] font-black text-brand-teal/40 uppercase tracking-widest">{products.length} Linked Assets</span>
                        </div>

                        {products.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {products.map((product) => (
                                    <Link
                                        key={product.id}
                                        href={`/admin/products/${product.id}`}
                                        className="group bg-gray-50/50 rounded-[2rem] p-4 flex items-center gap-6 border border-transparent hover:border-brand-orange/20 hover:bg-white hover:shadow-xl transition-all duration-500"
                                    >
                                        <div className="relative w-20 h-24 rounded-2xl overflow-hidden bg-gray-200 shrink-0">
                                            {product.images?.[0] ? (
                                                <Image src={product.images[0]} alt="" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                    <UtensilsCrossed className="w-6 h-6" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-grow">
                                            <h4 className="text-xs font-black text-brand-teal uppercase tracking-tight mb-1 group-hover:text-brand-orange transition-colors">{product.name}</h4>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">₹{product.price} / {product.size_grams}g</p>
                                            <div className="mt-3 flex items-center gap-2">
                                                <div className={`w-1.5 h-1.5 rounded-full ${product.is_listed ? 'bg-green-500' : 'bg-red-500'}`} />
                                                <span className="text-[8px] font-black uppercase text-gray-400">{product.is_listed ? 'Listed' : 'Hidden'}</span>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-200 group-hover:text-brand-orange transition-colors" />
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
                                <UtensilsCrossed className="w-16 h-16 mb-4" />
                                <p className="text-xs font-black uppercase tracking-[0.2em]">No products currently classified</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Edit Name Modal */}
            {isEditing && (
                <div className="fixed inset-0 z-[200] bg-brand-teal/60 backdrop-blur-md flex items-center justify-center p-6">
                    <div className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-brand-teal text-white rounded-2xl flex items-center justify-center">
                                <Edit className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-black text-brand-teal uppercase tracking-tight">Edit Metadata</h3>
                        </div>

                        <form onSubmit={handleUpdateCategory} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Display Name</label>
                                <input
                                    autoFocus
                                    type="text"
                                    required
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    className="w-full h-16 bg-[#FEFCE8]/40 border-none rounded-[1.25rem] px-8 text-sm font-bold text-brand-teal focus:ring-4 focus:ring-brand-orange/10 outline-none"
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => { setIsEditing(false); setEditName(category.name); }}
                                    className="flex-grow py-5 bg-gray-50 text-gray-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isUpdating}
                                    className="flex-grow py-5 bg-brand-orange text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-teal transition-all shadow-xl shadow-brand-orange/10 flex items-center justify-center gap-3"
                                >
                                    {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                                        <>
                                            <Save className="w-4 h-4" />
                                            Apply Changes
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
