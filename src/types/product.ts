export type Product = {
    id: string;
    name: string;
    category: string;
    price: number;
    size_grams: number;
    images: string[];
    is_listed: boolean;
    created_at: string;
    updated_at: string;
};

export type Category = "Curries" | "Rice" | "Sides" | "Combos" | "Drinks" | "Powders" | "Masalas";

export const CATEGORIES: Category[] = ["Curries", "Rice", "Sides", "Combos", "Drinks", "Powders", "Masalas"];
