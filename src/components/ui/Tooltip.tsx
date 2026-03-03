"use client";

import React, { useState } from "react";

interface TooltipProps {
    text: string;
    children: React.ReactNode;
}

export default function Tooltip({ text, children }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div
            className="relative flex items-center"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-brand-teal text-white text-[10px] rounded shadow-lg whitespace-nowrap z-50 transition-all duration-300 transform scale-100 opacity-100">
                    {text}
                    {/* Arrow */}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 border-b-brand-teal"></div>
                </div>
            )}
        </div>
    );
}
