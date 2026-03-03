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
                className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${isOpen ? 'opacity-40 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Drawer Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-[400px] bg-white shadow-2xl z-50 transform transition-transform duration-500 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Header */}
                <div className="p-6 border-b flex items-center justify-between bg-brand-tan/10">
                    <div className="flex items-center gap-3">
                        <ShoppingBag className="w-6 h-6 text-brand-orange" />
                        <h2 className="text-xl font-black text-brand-teal uppercase tracking-wide">
                            Your Cart
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-brand-orange/10 rounded-full transition-colors text-brand-teal"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-grow overflow-y-auto p-8 flex flex-col items-center justify-center text-center gap-4">
                    <div className="w-24 h-24 bg-brand-tan/30 rounded-full flex items-center justify-center mb-4">
                        <ShoppingBag className="w-10 h-10 text-brand-orange/40" />
                    </div>
                    <h3 className="text-xl font-bold text-brand-teal">Your cart is empty</h3>
                    <p className="text-gray-500 text-sm max-w-[250px]">
                        Looks like you haven't added anything to your cart yet.
                    </p>
                    <button
                        onClick={onClose}
                        className="mt-4 px-8 py-3 bg-brand-orange text-white font-black rounded-full hover:bg-brand-orange/90 transition-all hover:gap-4 flex items-center gap-2 group"
                    >
                        START SHOPPING
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Footer */}
                <div className="p-6 border-t bg-gray-50">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-gray-500 font-medium">Subtotal</span>
                        <span className="text-brand-teal font-black text-xl">₹0.00</span>
                    </div>
                    <button
                        disabled
                        className="w-full py-4 bg-brand-orange/30 text-white font-black rounded-xl cursor-not-allowed uppercase tracking-widest"
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </>
    );
}
