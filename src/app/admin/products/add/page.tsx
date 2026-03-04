"use client";

import React, { useState, useRef, useEffect } from "react";
import {
    ArrowLeft,
    Upload,
    X,
    Loader2,
    Check,
    UtensilsCrossed,
    Plus,
    Image as ImageIcon,
    AlertCircle
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import ImageCropper from "@/components/admin/products/ImageCropper";
import { uploadToCloudinary } from "@/services/cloudinaryService";
import { Category } from "@/types/category";

export default function AddProductPage() {
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [size, setSize] = useState("");
    const [images, setImages] = useState<(string | null)[]>([null, null, null, null]);
    const [imageFiles, setImageFiles] = useState<(Blob | null)[]>([null, null, null, null]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
        const fetchCats = async () => {
            try {
                const { data, error } = await supabase
                    .from("categories")
                    .select("*")
                    .eq("is_listed", true)
                    .order("name", { ascending: true });

                if (error) throw error;
                if (data) {
                    setDbCategories(data);
                    if (data.length > 0) setCategory(data[0].name);
                }
            } catch (err) {
                console.error("Error fetching categories:", err);
            } finally {
                setFetchingCats(false);
            }
        };
        fetchCats();
    }, []);

    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '') // Remove non-word chars
            .replace(/[\s_]+/g, '-')  // Replace spaces/underscores with -
            .replace(/^-+|-+$/g, ''); // Trim - from start/end
    };

    const handleNameChange = (val: string) => {
        setName(val);
        setSlug(generateSlug(val));
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
            const newImages = [...images];
            const newFiles = [...imageFiles];
            const croppedUrl = URL.createObjectURL(croppedBlob);

            newImages[currentImageIndex] = croppedUrl;
            newFiles[currentImageIndex] = croppedBlob;

            setImages(newImages);
            setImageFiles(newFiles);
        }
        setShowCropper(false);
        setTempImage(null);
        setCurrentImageIndex(null);
    };

    const removeImage = (index: number) => {
        const newImages = [...images];
        const newFiles = [...imageFiles];
        newImages[index] = null;
        newFiles[index] = null;
        setImages(newImages);
        setImageFiles(newFiles);
    };

    const blobToBase64 = (blob: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        // Validation
        if (!name || !price || !itemsInImages().length) {
            setError("Please fill in name, price and at least one image.");
            setIsSubmitting(false);
            return;
        }

        try {
            // 1. Check if slug exists
            const { data: existingProduct } = await supabase
                .from("products")
                .select("id")
                .eq("slug", slug)
                .single();

            if (existingProduct) {
                setError("A product with this URL slug already exists. Please change the name or slug.");
                setIsSubmitting(false);
                return;
            }

            // 2. Upload Images to Cloudinary
            const imageUrls: string[] = [];
            for (let i = 0; i < imageFiles.length; i++) {
                const file = imageFiles[i];
                if (file) {
                    const base64 = await blobToBase64(file);
                    const { url } = await uploadToCloudinary(base64);
                    imageUrls.push(url);
                }
            }

            // 3. Insert Product to Supabase
            const { error: insertError } = await supabase.from("products").insert({
                name,
                slug,
                category: category || "Uncategorized", // Fallback
                price: parseFloat(price),
                size_grams: parseInt(size) || 0,
                images: imageUrls,
                is_listed: true
            });

            if (insertError) throw insertError;

            router.push("/admin/products");
            router.refresh();
        } catch (err: any) {
            setError(err.message || "Failed to add product. Please check your Cloudinary settings.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const itemsInImages = () => images.filter(img => img !== null);

    return (
        <div className="max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-6">
                    <Link
                        href="/admin/products"
                        className="p-4 bg-white rounded-2xl text-brand-teal hover:bg-brand-orange hover:text-white transition-all shadow-sm border border-gray-100 group"
                    >
                        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-brand-teal uppercase tracking-tighter leading-none">Adding New Product</h1>
                        <p className="text-[10px] font-black text-brand-teal/30 uppercase tracking-[0.4em] mt-3">Product Catalog / Create Entry</p>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-4 py-2 px-6 bg-brand-teal/5 rounded-2xl border border-brand-teal/10">
                    <AlertCircle className="w-4 h-4 text-brand-orange" />
                    <span className="text-[10px] font-black text-brand-teal uppercase tracking-widest">Images will be resized to 1082x1280</span>
                </div>
            </div>

            {error && (
                <div className="mb-10 p-6 bg-red-50 rounded-3xl flex items-center gap-6 border-l-4 border-red-500 animate-in slide-in-from-top-4 duration-500">
                    <div className="p-3 bg-white rounded-2xl text-red-500 shadow-sm">
                        <AlertCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="text-sm font-black text-red-600 uppercase tracking-tight">Requirement Missing</h4>
                        <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mt-1 opacity-80">{error}</p>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left: Basic Info */}
                <div className="lg:col-span-7 space-y-10">
                    <div className="bg-white rounded-[3rem] p-10 shadow-[0_20px_60px_rgba(45,90,75,0.05)] border border-gray-100 relative overflow-hidden">
                        <div className="mb-10 flex items-center gap-4">
                            <div className="w-12 h-12 bg-brand-teal rounded-2xl flex items-center justify-center text-white">
                                <UtensilsCrossed className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-black text-brand-teal uppercase tracking-tight">Core Details</h3>
                        </div>

                        <div className="space-y-8">
                            {/* Name */}
                            <div className="space-y-3 group">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Product Name <span className="text-brand-orange">*</span></label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => handleNameChange(e.target.value)}
                                    placeholder="e.g. Star Plus Garam Masala"
                                    className="w-full h-16 bg-[#FEFCE8]/40 border-none rounded-[1.5rem] px-8 text-sm font-bold text-brand-teal focus:ring-4 focus:ring-brand-orange/10 transition-all outline-none"
                                />
                            </div>

                            {/* Slug */}
                            <div className="space-y-3 group">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">URL Slug (Editable)</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        required
                                        value={slug}
                                        onChange={(e) => setSlug(generateSlug(e.target.value))}
                                        placeholder="star-plus-garam-masala"
                                        className="w-full h-16 bg-gray-50/50 border-none rounded-[1.5rem] px-8 text-sm font-bold text-brand-teal/50 focus:ring-4 focus:ring-brand-orange/10 transition-all outline-none"
                                    />
                                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[8px] font-black text-brand-teal/20 uppercase">Auto Generated</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Category */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Category <span className="text-brand-orange">*</span></label>
                                    <div className="relative group">
                                        <select
                                            disabled={fetchingCats}
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="w-full h-16 bg-gray-50/50 border-none rounded-[1.5rem] px-8 text-sm font-bold text-brand-teal focus:ring-4 focus:ring-brand-orange/10 transition-all outline-none appearance-none cursor-pointer disabled:opacity-50"
                                        >
                                            {dbCategories.length > 0 ? (
                                                dbCategories.map(cat => (
                                                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                                                ))
                                            ) : (
                                                <option value="">No Categories Available</option>
                                            )}
                                        </select>
                                        <ArrowLeft className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 -rotate-90 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Size */}
                                <div className="space-y-3 group">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Size (in Grams)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={size}
                                            onChange={(e) => setSize(e.target.value)}
                                            placeholder="500"
                                            className="w-full h-16 bg-[#FEFCE8]/40 border-none rounded-[1.5rem] px-8 text-sm font-bold text-brand-teal focus:ring-4 focus:ring-brand-orange/10 transition-all outline-none pr-16"
                                        />
                                        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-brand-teal/40 uppercase">Grams</span>
                                    </div>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="space-y-3 group">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Unit Price (₹) <span className="text-brand-orange">*</span></label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        required
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="0.00"
                                        step="0.01"
                                        className="w-full h-20 bg-brand-teal text-white border-none rounded-[1.5rem] px-14 text-2xl font-black focus:ring-4 focus:ring-brand-orange/20 transition-all outline-none"
                                    />
                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xl font-black text-white/40">₹</span>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/60">Tax Included</div>
                                </div>
                            </div>
                        </div>

                        {/* Decoration */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-orange opacity-5 rounded-full blur-3xl pointer-events-none" />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="hidden lg:flex w-full h-24 bg-brand-teal text-white rounded-[2.5rem] items-center justify-center gap-4 group hover:bg-brand-orange transition-all duration-700 shadow-[0_30px_100px_rgba(45,90,75,0.2)] hover:shadow-brand-orange/30 disabled:grayscale disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-8 h-8 animate-spin" />
                                <span className="text-lg font-black uppercase tracking-widest">Adding Product...</span>
                            </>
                        ) : (
                            <>
                                <span className="text-lg font-black uppercase tracking-widest">Store Product to Catalog</span>
                                <Plus className="w-8 h-8 group-hover:rotate-90 transition-transform duration-500" />
                            </>
                        )}
                    </button>
                </div>

                {/* Right: Images Section */}
                <div className="lg:col-span-5 space-y-10">
                    <div className="bg-white rounded-[3rem] p-10 shadow-[0_20px_60px_rgba(45,90,75,0.05)] border border-gray-100">
                        <div className="mb-10 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-brand-orange rounded-2xl flex items-center justify-center text-white">
                                    <ImageIcon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-black text-brand-teal uppercase tracking-tight">Portfolio</h3>
                            </div>
                            <span className="text-[10px] font-black text-brand-teal/40 uppercase tracking-widest">
                                {itemsInImages().length} / 4 Used
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            {images.map((img, index) => (
                                <div key={index} className="space-y-3">
                                    <div className={`relative aspect-[1082/1280] rounded-[2rem] overflow-hidden group ${!img ? 'bg-gray-50 border-2 border-dashed border-gray-200 hover:border-brand-orange transition-all' : ''}`}>
                                        {img ? (
                                            <>
                                                <Image src={img} alt={`Preview ${index}`} fill className="object-cover" />
                                                <div className="absolute inset-0 bg-brand-teal/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(index)}
                                                        className="p-3 bg-red-500 text-white rounded-xl shadow-xl transform scale-50 group-hover:scale-100 transition-all duration-500"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => fileInputRefs[index].current?.click()}
                                                className="w-full h-full flex flex-col items-center justify-center gap-3 text-gray-300 group-hover:text-brand-orange"
                                            >
                                                <Upload className="w-8 h-8" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Upload Img {index + 1}</span>
                                            </button>
                                        )}
                                        <input
                                            type="file"
                                            ref={fileInputRefs[index]}
                                            className="hidden"
                                            accept="image/*"
                                            onChange={(e) => handleFileChange(e, index)}
                                        />
                                    </div>
                                    <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest text-center">
                                        {index === 0 ? "Main View" : `Perspective ${index}`}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <ul className="mt-10 space-y-3 opacity-40">
                            <li className="flex items-start gap-4 text-[10px] font-bold text-brand-teal uppercase tracking-widest">
                                <div className="shrink-0 w-4 h-4 rounded-full bg-brand-teal flex items-center justify-center text-[8px] text-white">1</div>
                                Click boxes above to upload and crop images.
                            </li>
                            <li className="flex items-start gap-4 text-[10px] font-bold text-brand-teal uppercase tracking-widest">
                                <div className="shrink-0 w-4 h-4 rounded-full bg-brand-teal flex items-center justify-center text-[8px] text-white">2</div>
                                Primary image (Box 1) is shown in listings.
                            </li>
                        </ul>
                    </div>

                    {/* Mobile Submit */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="lg:hidden w-full h-20 bg-brand-teal text-white rounded-[2rem] flex items-center justify-center gap-4 group hover:bg-brand-orange transition-all duration-700 disabled:grayscale"
                    >
                        {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <span className="text-sm font-black uppercase tracking-widest">Save Product Now</span>}
                    </button>
                </div>
            </form>

            {/* Cropper Modal */}
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
