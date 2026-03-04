export type Blog = {
    id: string | number;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    cover_image: string;
    category: "Recipes" | "Products" | "Announcements" | "Health";
    author: string;
    created_at: string;
    is_published: boolean;
};
