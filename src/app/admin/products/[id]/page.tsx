"use client";

import React, { useState, useEffect, useRef } from "react";
import {
    ArrowLeft,
    Edit,
    Trash2,
    Save,
    X,
    Eye,
    EyeOff,
    Loader2,
    Check,
    AlertCircle,
    UtensilsCrossed,
    Package,
    IndianRupee,
    Scale,
    Layers,
    Image as ImageIcon,
    ChevronLeft,
    ChevronRight,
    Upload
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Product } from "@/types/product";
import ImageCropper from "@/components/admin/products/ImageCropper";
import { uploadToCloudinary } from "@/services/cloudinaryService";
import { Category } from "@/types/category";

export default function ProductDetailsPage() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [showConfirmUnlist, setShowConfirmUnlist] = useState(false);
    const [activeImage, setActiveImage] = useState(0);
    const [error, setError] = useState<string | null>(null);

    // Edit Form State
    const [editName, setEditName] = useState("");
    const [editSlug, setEditSlug] = useState("");
    const [editCategory, setEditCategory] = useState("");
    const [editPrice, setEditPrice] = useState("");
    const [editSize, setEditSize] = useState("");
    const [editImages, setEditImages] = useState<(string | null)[]>([null, null, null, null]);
    const [editFiles, setEditFiles] = useState<(Blob | null)[]>([null, null, null, null]);
    const [dbCategories, setDbCategories] = useState<Category[]>([]);
    const [fetchingCats, setFetchingCats] = useState(true);

    // Cropper State
    const [showCropper, setShowCropper] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);
    const [tempImage, setTempImage] = useState<string | null>(null);

    const router = useRouter();
    const supabase = createClient();
    const fileInputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

    useEffect(() => {
        fetchProduct();
        fetchCategories();
    }, [id]);

    const fetchCategories = async () => {
        try {
            const { data } = await supabase
                .from("categories")
                .select("*")
                .eq("is_listed", true)
                .order("name", { ascending: true });
            if (data) setDbCategories(data);
        } catch (err) {
            console.error("Error fetching categories:", err);
        } finally {
            setFetchingCats(false);
        }
    };

    const fetchProduct = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .eq("id", id)
                .single();

            if (error) throw error;
            setProduct(data);

            // Sync edit state
            setEditName(data.name);
            setEditSlug(data.slug || "");
            setEditCategory(data.category);
            setEditPrice(data.price.toString());
            setEditSize(data.size_grams.toString());

            const prodImages = [...(data.images || [])];
            const filledImages = [null, null, null, null];
            prodImages.forEach((img, i) => { if (i < 4) filledImages[i] = img; });
            setEditImages(filledImages);
        } catch (error) {
            console.error("Error fetching product:", error);
            setError("Could not find this product.");
        } finally {
            setLoading(false);
        }
    };

    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '') // Remove non-word chars
            .replace(/[\s_]+/g, '-')  // Replace spaces/underscores with -
            .replace(/^-+|-+$/g, ''); // Trim - from start/end
    };

    const handleNameChange = (val: string) => {
        setEditName(val);
        setEditSlug(generateSlug(val));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setTempImage(reader.result as string);
                setCurrentImageIndex(index);
                setShowCropper(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCropComplete = (croppedBlob: Blob) => {
        if (currentImageIndex !== null) {
            const newImages = [...editImages];
            const newFiles = [...editFiles];
            const croppedUrl = URL.createObjectURL(croppedBlob);

            newImages[currentImageIndex] = croppedUrl;
            newFiles[currentImageIndex] = croppedBlob;

            setEditImages(newImages);
            setEditFiles(newFiles);
        }
        setShowCropper(false);
        setTempImage(null);
        setCurrentImageIndex(null);
    };

    const blobToBase64 = (blob: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUpdating(true);
        setError(null);

        try {
            // 1. Check if slug exists (excluding current product)
            const { data: existingProduct } = await supabase
                .from("products")
                .select("id")
                .eq("slug", editSlug)
                .neq("id", id)
                .single();

            if (existingProduct) {
                setError("A product with this URL slug already exists. Please change the name or slug.");
                setIsUpdating(false);
                return;
            }

            // 2. Upload new images to Cloudinary if any
            const finalImageUrls: string[] = [];
            for (let i = 0; i < 4; i++) {
                if (editFiles[i]) {
                    const base64 = await blobToBase64(editFiles[i]!);
                    const { url } = await uploadToCloudinary(base64);
                    finalImageUrls[i] = url;
                } else if (editImages[i] && !editImages[i]?.startsWith("blob:")) {
                    finalImageUrls[i] = editImages[i]!;
                }
            }

            const cleanImageUrls = finalImageUrls.filter(url => url !== undefined && url !== null);

            // 3. Update Product
            const { error: updateError } = await supabase
                .from("products")
                .update({
                    name: editName,
                    slug: editSlug,
                    category: editCategory,
                    price: parseFloat(editPrice),
                    size_grams: parseInt(editSize),
                    images: cleanImageUrls
                })
                .eq("id", id);

            if (updateError) throw updateError;

            setIsEditing(false);
            fetchProduct();
            router.refresh();
        } catch (err: any) {
            setError(err.message || "Failed to update product. Please check your Cloudinary settings.");
        } finally {
            setIsUpdating(false);
        }
    };

    const toggleListing = async () => {
        if (!product) return;
        setIsUpdating(true);
        try {
            const { error } = await supabase
                .from("products")
                .update({ is_listed: !product.is_listed })
                .eq("id", id);

            if (error) throw error;
            fetchProduct();
            setShowConfirmUnlist(false);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center gap-6">
                <Loader2 className="w-12 h-12 text-brand-teal animate-spin" />
                <p className="text-[10px] font-black text-brand-teal uppercase tracking-[0.4em]">Retrieving Product Data...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-black text-brand-teal uppercase tracking-tight">Product Not Found</h2>
                <Link href="/admin/products" className="text-brand-orange font-bold uppercase tracking-widest mt-4 inline-block hover:underline">Return to Inventory</Link>
            </div>
        );
    }

    return (
        <div className="max-w-[1400px] mx-auto animate-in fade-in duration-700 pb-20">
            {/* Navigation & Actions Top Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div className="flex items-center gap-6">
                    <Link
                        href="/admin/products"
                        className="p-4 bg-white rounded-2xl text-brand-teal hover:bg-brand-orange hover:text-white transition-all shadow-sm border border-gray-100 group"
                    >
                        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-brand-teal uppercase tracking-tighter leading-none">{isEditing ? "Editing Asset" : product.name}</h1>
                        <p className="text-[10px] font-black text-brand-teal/30 uppercase tracking-[0.4em] mt-3">Product Catalog / ID: {product.id.substring(0, 8)}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {!isEditing ? (
                        <>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="inline-flex items-center gap-3 bg-white border border-gray-100 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-brand-teal hover:bg-gray-50 transition-all shadow-sm"
                            >
                                <Edit className="w-4 h-4" />
                                Edit Product
                            </button>
                            <button
                                onClick={() => setShowConfirmUnlist(true)}
                                className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl ${product.is_listed ? 'bg-red-500 text-white shadow-red-500/10 hover:bg-red-600' : 'bg-green-500 text-white shadow-green-500/10 hover:bg-green-600'}`}
                            >
                                {product.is_listed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                {product.is_listed ? 'Unlist Item' : 'Restore Listing'}
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsEditing(false)}
                            className="inline-flex items-center gap-3 bg-white border border-gray-100 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-gray-400 hover:bg-gray-50 transition-all shadow-sm"
                        >
                            <X className="w-4 h-4" />
                            Discard Changes
                        </button>
                    )}
                </div>
            </div>

            {error && (
                <div className="mb-10 p-4 bg-red-50 rounded-2xl flex items-center gap-4 border border-red-100">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest">{error}</p>
                </div>
            )}

            {isEditing ? (
                /* Edit Form Mode */
                <form onSubmit={handleUpdate} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Form Controls */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="bg-white rounded-[3rem] p-10 shadow-[0_20px_60px_rgba(45,90,75,0.05)] border border-gray-100">
                            <h3 className="text-xl font-black text-brand-teal uppercase tracking-tight mb-10 flex items-center gap-4">
                                <div className="w-10 h-10 bg-brand-teal/5 rounded-xl flex items-center justify-center text-brand-teal">
                                    <Package className="w-5 h-5" />
                                </div>
                                Attribute Management
                            </h3>

                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Product Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={editName}
                                        onChange={(e) => handleNameChange(e.target.value)}
                                        className="w-full h-16 bg-[#FEFCE8]/40 border-none rounded-2xl px-8 text-sm font-bold text-brand-teal focus:ring-4 focus:ring-brand-orange/10 outline-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">URL Slug (Editable)</label>
                                    <input
                                        type="text"
                                        required
                                        value={editSlug}
                                        onChange={(e) => setEditSlug(generateSlug(e.target.value))}
                                        className="w-full h-16 bg-gray-50/50 border-none rounded-2xl px-8 text-sm font-bold text-brand-teal/50 focus:ring-4 focus:ring-brand-orange/10 outline-none"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Category Mapping</label>
                                        <select
                                            disabled={fetchingCats}
                                            value={editCategory}
                                            onChange={(e) => setEditCategory(e.target.value)}
                                            className="w-full h-16 bg-gray-50/50 border-none rounded-2xl px-8 text-sm font-bold text-brand-teal outline-none disabled:opacity-50"
                                        >
                                            {dbCategories.length > 0 ? (
                                                dbCategories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)
                                            ) : (
                                                <option value="">{editCategory || "No Categories"}</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Net Weight (Grams)</label>
                                        <input
                                            type="number"
                                            value={editSize}
                                            onChange={(e) => setEditSize(e.target.value)}
                                            className="w-full h-16 bg-[#FEFCE8]/40 border-none rounded-2xl px-8 text-sm font-bold text-brand-teal outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Price Strategy (₹)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={editPrice}
                                            onChange={(e) => setEditPrice(e.target.value)}
                                            className="w-full h-20 bg-brand-teal text-white border-none rounded-2xl px-14 text-2xl font-black outline-none"
                                        />
                                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xl font-black text-white/40">₹</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isUpdating}
                            className="w-full h-24 bg-brand-orange text-white rounded-[2.5rem] flex items-center justify-center gap-4 group hover:bg-brand-teal transition-all duration-700 shadow-2xl shadow-brand-orange/20 disabled:grayscale"
                        >
                            {isUpdating ? (
                                <Loader2 className="w-8 h-8 animate-spin" />
                            ) : (
                                <>
                                    <Save className="w-6 h-6" />
                                    <span className="text-xl font-black uppercase tracking-widest">Commit Database Updates</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* Image Editing */}
                    <div className="lg:col-span-5">
                        <div className="bg-white rounded-[3rem] p-10 shadow-[0_20px_60px_rgba(45,90,75,0.05)] border border-gray-100">
                            <h3 className="text-xl font-black text-brand-teal uppercase tracking-tight mb-10 flex items-center gap-4">
                                <div className="w-10 h-10 bg-brand-orange/5 rounded-xl flex items-center justify-center text-brand-orange">
                                    <ImageIcon className="w-5 h-5" />
                                </div>
                                Visual Portfolio
                            </h3>

                            <div className="grid grid-cols-2 gap-6">
                                {editImages.map((img, idx) => (
                                    <div key={idx} className="relative aspect-[1082/1280] rounded-[2rem] overflow-hidden group bg-gray-50 border-2 border-dashed border-gray-100">
                                        {img ? (
                                            <>
                                                <Image src={img} alt={`Preview ${idx}`} fill className="object-cover" />
                                                <div className="absolute inset-0 bg-brand-teal/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => { const ni = [...editImages]; ni[idx] = null; setEditImages(ni); }}
                                                        className="p-3 bg-red-500 text-white rounded-xl shadow-xl transform scale-50 group-hover:scale-100 transition-all duration-300"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => fileInputRefs[idx].current?.click()}
                                                className="w-full h-full flex flex-col items-center justify-center gap-3 text-gray-300 hover:text-brand-orange transition-colors"
                                            >
                                                <Upload className="w-6 h-6" />
                                                <span className="text-[8px] font-black uppercase tracking-widest">Swap Img {idx + 1}</span>
                                            </button>
                                        )}
                                        <input type="file" ref={fileInputRefs[idx]} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, idx)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </form>
            ) : (
                /* Detail View Mode */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left: Interactive Media Gallery */}
                    <div className="lg:col-span-6 space-y-6">
                        <div className="relative aspect-[1082/1280] rounded-[3.5rem] overflow-hidden bg-white shadow-2xl border border-gray-100">
                            {product.images?.[activeImage] ? (
                                <Image
                                    src={product.images[activeImage]}
                                    alt={product.name}
                                    fill
                                    className="object-cover animate-in fade-in zoom-in-95 duration-1000"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-200">
                                    <UtensilsCrossed className="w-32 h-32 opacity-20" />
                                </div>
                            )}

                            {/* Listing Status Badge Overlay */}
                            <div className={`absolute top-10 right-10 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl z-20 ${product.is_listed ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                {product.is_listed ? 'Public Listing' : 'Hidden from Shop'}
                            </div>

                            {/* Gallery Navigation Overlay */}
                            {product.images?.length > 1 && (
                                <div className="absolute inset-x-0 bottom-10 flex justify-center gap-4 z-20">
                                    {product.images.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImage(idx)}
                                            className={`h-2 transition-all duration-500 rounded-full ${activeImage === idx ? 'w-12 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Selector */}
                        <div className="grid grid-cols-4 gap-4">
                            {product.images?.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`relative aspect-square rounded-[1.5rem] overflow-hidden border-4 transition-all duration-300 ${activeImage === idx ? 'border-brand-orange scale-95 shadow-lg' : 'border-transparent hover:border-gray-200 opacity-60 hover:opacity-100'}`}
                                >
                                    <Image src={img} alt="" fill className="object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Technical Specs & Analytics */}
                    <div className="lg:col-span-6 space-y-8">
                        {/* Primary Badge & ID */}
                        <div className="flex items-center gap-4">
                            <div className="px-5 py-2 bg-brand-orange text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                                {product.category}
                            </div>
                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">SKU-STAR-{product.id.substring(0, 8).toUpperCase()}</span>
                        </div>

                        {/* Title & Price */}
                        <div>
                            <h2 className="text-5xl md:text-6xl font-black text-brand-teal uppercase tracking-tighter leading-tight mb-4">{product.name}</h2>
                            <div className="flex items-baseline gap-4">
                                <span className="text-5xl font-black text-brand-orange tracking-tighter">₹{product.price}</span>
                                <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Global MSRP (Tax incl.)</span>
                            </div>
                        </div>

                        <div className="h-px bg-gray-100 w-full" />

                        {/* Specs Grid */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm flex items-center gap-6">
                                <div className="w-14 h-14 bg-[#FEFCE8] rounded-2xl flex items-center justify-center text-brand-teal">
                                    <Scale className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Net Sizing</p>
                                    <p className="text-lg font-black text-brand-teal">{product.size_grams} Grams</p>
                                </div>
                            </div>
                            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm flex items-center gap-6">
                                <div className="w-14 h-14 bg-[#F0F7F4] rounded-2xl flex items-center justify-center text-brand-teal">
                                    <Layers className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Inventory Group</p>
                                    <p className="text-lg font-black text-brand-teal">{product.category}</p>
                                </div>
                            </div>
                        </div>

                        {/* Descriptive Block */}
                        <div className="bg-brand-teal rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
                            <h4 className="text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                                System Health Check
                            </h4>
                            <p className="text-white/60 text-xs font-medium leading-relaxed uppercase tracking-wider mb-8">
                                Product is currently synchronized with the global marketplace. No pending updates detected.
                            </p>

                            <div className="flex items-center justify-between pt-6 border-t border-white/10">
                                <div className="flex flex-col">
                                    <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.3em]">Created on</span>
                                    <span className="text-[10px] font-bold">{new Date(product.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                </div>
                                <div className="flex flex-col text-right">
                                    <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.3em]">Last Updated</span>
                                    <span className="text-[10px] font-bold">{new Date(product.updated_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                </div>
                            </div>

                            {/* Decorative Icon */}
                            <UtensilsCrossed className="absolute -bottom-10 -right-10 w-40 h-40 text-white/5 transform rotate-12 transition-transform duration-500 group-hover:scale-110" />
                        </div>
                    </div>
                </div>
            )}

            {/* Unlist Confirmation Modal */}
            {showConfirmUnlist && (
                <div className="fixed inset-0 z-[200] bg-brand-teal/60 backdrop-blur-md flex items-center justify-center p-6">
                    <div className="bg-white rounded-[3rem] p-10 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="w-20 h-20 bg-red-50 rounded-3xl mb-8 flex items-center justify-center text-red-500 mx-auto">
                            <AlertCircle className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-black text-brand-teal uppercase tracking-tight text-center mb-4">
                            {product.is_listed ? "Unlist from Shop?" : "Restore to Shop?"}
                        </h3>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest leading-loose text-center mb-10 px-4">
                            {product.is_listed
                                ? "This will hide the product from the public website. Customers will no longer be able to purchase it."
                                : "This will make the product visible to all customers and enable purchasing functionality."}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => setShowConfirmUnlist(false)}
                                className="flex-grow py-5 bg-gray-50 text-gray-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all"
                            >
                                Cancel Action
                            </button>
                            <button
                                onClick={toggleListing}
                                disabled={isUpdating}
                                className={`flex-grow py-5 rounded-2xl font-black text-xs uppercase tracking-widest text-white transition-all shadow-xl flex items-center justify-center gap-3 ${product.is_listed ? 'bg-red-500 shadow-red-500/10 hover:bg-red-600' : 'bg-green-500 shadow-green-500/10 hover:bg-green-600'}`}
                            >
                                {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : (product.is_listed ? "Yes, Unlist Now" : "Yes, Restore Now")}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Cropper Modal for Edit Mode */}
            {showCropper && tempImage && (
                <ImageCropper
                    image={tempImage}
                    onCancel={() => { setShowCropper(false); setTempImage(null); }}
                    onCropComplete={handleCropComplete}
                />
            )}
        </div>
    );
}
