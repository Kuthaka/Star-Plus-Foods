"use server";

import cloudinary from "@/config/cloudinary";

export async function uploadToCloudinary(base64Image: string) {
    try {
        const result = await cloudinary.uploader.upload(base64Image, {
            folder: "star-plus-products",
        });
        return { url: result.secure_url, public_id: result.public_id };
    } catch (error: any) {
        console.error("Cloudinary Upload Error:", error);
        throw new Error(error.message || "Failed to upload image to Cloudinary");
    }
}
