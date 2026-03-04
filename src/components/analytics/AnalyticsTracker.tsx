"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AnalyticsTracker() {
    const pathname = usePathname();
    const supabase = createClient();
    const hasIncrementedSession = useRef(false);

    useEffect(() => {
        // 1. Increment Total Website Hits (once per session/refresh for simplicity)
        if (!hasIncrementedSession.current) {
            const incrementTotalHits = async () => {
                try {
                    // Update settings table with ID 1
                    await supabase.rpc('increment_total_visits');
                } catch (error) {
                    console.error("Error incrementing total visits:", error);
                }
            };
            incrementTotalHits();
            hasIncrementedSession.current = true;
        }

        // 2. Increment Product View Count if on a product page
        const productMatch = pathname.match(/^\/shop\/([^\/]+)$/);
        if (productMatch) {
            const slug = productMatch[1];
            const incrementProductView = async () => {
                try {
                    await supabase.rpc('increment_product_view', { item_slug: slug });
                } catch (error) {
                    console.error("Error incrementing product view:", error);
                }
            };
            incrementProductView();
        }
    }, [pathname, supabase]);

    return null;
}
