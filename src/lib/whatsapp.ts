import { createClient } from "./supabase/client";

export const getWhatsAppCheckoutLink = async (message: string) => {
    const supabase = createClient();
    const { data } = await supabase
        .from("settings")
        .select("whatsapp_number")
        .eq("id", 1)
        .single();

    const phoneNumber = data?.whatsapp_number?.replace(/\s+/g, '') || "";
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
};

export const handleWhatsAppCheckout = async (message: string) => {
    const link = await getWhatsAppCheckoutLink(message);
    window.open(link, '_blank');
};
