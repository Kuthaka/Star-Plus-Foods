"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function TopBanner() {
    const [originalText, setOriginalText] = useState("Free Shipping across India on Orders above Rs 500/-");
    const [displayText, setDisplayText] = useState("");
    const [isTyping, setIsTyping] = useState(true);
    const [charIndex, setCharIndex] = useState(0);
    const [pause, setPause] = useState(false);

    const supabase = createClient();

    useEffect(() => {
        const fetchSettings = async () => {
            const { data } = await supabase
                .from("settings")
                .select("top_banner_text")
                .eq("id", 1)
                .single();

            if (data?.top_banner_text) {
                setOriginalText(data.top_banner_text);
            }
        };
        fetchSettings();
    }, []);

    useEffect(() => {
        if (pause) return;
        const typeSpeed = isTyping ? 70 : 40;

        const timeout = setTimeout(() => {
            if (isTyping) {
                if (charIndex < originalText.length) {
                    setDisplayText(originalText.substring(0, charIndex + 1));
                    setCharIndex(prev => prev + 1);
                } else {
                    setPause(true);
                    setTimeout(() => {
                        setPause(false);
                        setIsTyping(false);
                    }, 2500);
                }
            } else {
                if (charIndex > 0) {
                    setDisplayText(originalText.substring(0, charIndex - 1));
                    setCharIndex(prev => prev - 1);
                } else {
                    setIsTyping(true);
                }
            }
        }, typeSpeed);

        return () => clearTimeout(timeout);
    }, [charIndex, isTyping, originalText, pause]);

    return (
        <div className="bg-brand-teal text-white text-[10px] md:text-xs py-2 text-center font-medium tracking-wide min-h-[32px] flex items-center justify-center">
            {displayText}
        </div>
    );
}
