"use client";

import React, { useEffect } from "react";
import { X, ShoppingBag, ArrowRight } from "lucide-react";

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

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
                            Your Bag <span className="text-gray-300 font-medium ml-1 text-sm">(0)</span>
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
                <div className="flex-grow overflow-y-auto p-8 flex flex-col items-center justify-center text-center gap-6">
                    <div className="relative">
                        <div className="w-24 h-24 bg-brand-tan/20 rounded-full flex items-center justify-center animate-pulse">
                            <ShoppingBag className="w-10 h-10 text-brand-orange/40" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white shadow-lg rounded-full flex items-center justify-center text-brand-orange">
                            ?
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-black text-brand-teal">Empty Nest!</h3>
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

                {/* Footer */}
                <div className="p-8 border-t bg-gray-50/50">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em]">Summary</span>
                        <div className="text-right">
                            <span className="text-brand-teal font-black text-2xl block">₹0.00</span>
                            <span className="text-gray-400 text-[10px]">Taxes calculated at checkout</span>
                        </div>
                    </div>
                    <button
                        disabled
                        className="w-full py-5 bg-brand-teal/10 text-brand-teal/40 font-black rounded-2xl cursor-not-allowed uppercase tracking-[0.2em] text-xs transition-colors"
                    >
                        Checkout Securely
                    </button>
                </div>
            </div>
        </>
    );
}
