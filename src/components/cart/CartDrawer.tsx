"use client";

import React, { useEffect, useState } from "react";
import { X, ShoppingBag, ArrowRight, Minus, Plus, Trash2, MessageCircle } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import Link from "next/link";

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const [mounted, setMounted] = useState(false);
    const { items, addItem, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCartStore();

    // Prevent body scroll when drawer is open
    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!mounted) return null;

    const totalPrice = getTotalPrice();
    const totalItems = getTotalItems();

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500 z-[90] ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Drawer Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-[400px] bg-white shadow-[0_0_50px_rgba(0,0,0,0.2)] z-[100] transform transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Header */}
                <div className="p-6 border-b flex items-center justify-between bg-white">
                    <div className="flex items-center gap-3">
                        <ShoppingBag className="w-6 h-6 text-brand-orange" />
                        <h2 className="text-xl font-black text-brand-teal uppercase tracking-tight">
                            Your Bag <span className="text-gray-300 font-medium ml-1 text-sm">({totalItems})</span>
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-brand-teal group"
                    >
                        <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-grow overflow-y-auto">
                    {items.length === 0 ? (
                        <div className="h-full p-8 flex flex-col items-center justify-center text-center gap-6">
                            <div className="relative">
                                <div className="w-24 h-24 bg-brand-tan/20 rounded-full flex items-center justify-center animate-pulse">
                                    <ShoppingBag className="w-10 h-10 text-brand-orange/40" />
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white shadow-lg rounded-full flex items-center justify-center text-brand-orange text-xs font-bold">
                                    ?
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-brand-teal uppercase">Empty Nest!</h3>
                                <p className="text-gray-400 text-sm max-w-[280px] leading-relaxed">
                                    Your culinary journey starts here. Add your favorite Indian recipes to the bag!
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="mt-4 px-10 py-4 bg-brand-orange text-white font-black rounded-full hover:shadow-[0_10px_30px_rgba(242,101,34,0.3)] transition-all hover:scale-105 flex items-center gap-3 group uppercase tracking-widest text-sm"
                            >
                                COLLECT FOOD
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    ) : (
                        <div className="p-6 space-y-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4 group">
                                    <div className="relative w-24 h-28 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0">
                                        {item.images?.[0] ? (
                                            <Image
                                                src={item.images[0]}
                                                alt={item.name}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-200">
                                                <ShoppingBag className="w-8 h-8" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-grow flex flex-col justify-between py-1">
                                        <div>
                                            <div className="flex justify-between items-start gap-2">
                                                <h4 className="text-brand-teal font-black text-sm uppercase leading-tight line-clamp-2">
                                                    {item.name}
                                                </h4>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-gray-300 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">
                                                {item.category}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-100">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-7 h-7 flex items-center justify-center text-brand-teal hover:bg-white hover:shadow-sm rounded-md transition-all"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="w-8 text-center text-xs font-black text-brand-teal">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-7 h-7 flex items-center justify-center text-brand-teal hover:bg-white hover:shadow-sm rounded-md transition-all"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-brand-teal font-black text-base">₹{item.price * item.quantity}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-8 pb-32 md:pb-8 border-t bg-gray-50/50">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em]">Summary</span>
                        <div className="text-right">
                            <span className="text-brand-teal font-black text-2xl block">₹{totalPrice}</span>
                            <span className="text-gray-400 text-[10px]">Taxes calculated at checkout</span>
                        </div>
                    </div>
                    <button
                        onClick={async () => {
                            if (items.length === 0) return;

                            let message = "Hello Star Plus Foods! 👋\n\nI'd like to place an order for the following items:\n\n";

                            items.forEach((item, index) => {
                                message += `${index + 1}. *${item.name}*\n   🔢 Qty: ${item.quantity}\n   💰 Price: ₹${item.price * item.quantity}\n   🔗 Link: ${window.location.origin}/shop/${item.slug}\n\n`;
                            });

                            message += `--------------------------\n🛍️ *Total Items:* ${totalItems}\n💳 *Total Amount:* ₹${totalPrice}\n\nPlease let me know how to proceed. Thank you!`;

                            const { handleWhatsAppCheckout } = await import("@/lib/whatsapp");
                            handleWhatsAppCheckout(message);
                        }}
                        disabled={items.length === 0}
                        className={`w-full py-5 flex items-center justify-center gap-3 font-black rounded-2xl uppercase tracking-[0.2em] text-xs transition-all ${items.length > 0
                            ? "bg-brand-orange text-white shadow-xl shadow-brand-orange/20 hover:-translate-y-1 hover:bg-brand-teal"
                            : "bg-brand-teal/10 text-brand-teal/40 cursor-not-allowed"
                            }`}
                    >
                        Checkout via WhatsApp
                        <MessageCircle className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </>
    );
}
