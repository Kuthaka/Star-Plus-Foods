"use client";

import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { X, Check, Crop } from "lucide-react";

interface ImageCropperProps {
    image: string;
    onCropComplete: (croppedImage: Blob) => void;
    onCancel: () => void;
}

export default function ImageCropper({ image, onCropComplete, onCancel }: ImageCropperProps) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

    const onCropChange = (crop: any) => setCrop(crop);
    const onZoomChange = (zoom: any) => setZoom(zoom);

    const onCropCompleteInternal = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const createImage = (url: string): Promise<HTMLImageElement> =>
        new Promise((resolve, reject) => {
            const image = new window.Image();
            image.addEventListener("load", () => resolve(image));
            image.addEventListener("error", (error) => reject(error));
            image.setAttribute("crossOrigin", "anonymous");
            image.src = url;
        });

    const getCroppedImg = async (imageSrc: string, pixelCrop: any): Promise<Blob> => {
        const image = await createImage(imageSrc);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) throw new Error("No 2d context");

        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    reject(new Error("Canvas is empty"));
                    return;
                }
                resolve(blob);
            }, "image/jpeg");
        });
    };

    const handleDone = async () => {
        try {
            const croppedBlob = await getCroppedImg(image, croppedAreaPixels);
            onCropComplete(croppedBlob);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="fixed inset-0 z-[200] bg-brand-teal/90 backdrop-blur-xl flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-4xl bg-white rounded-[3rem] overflow-hidden shadow-2xl relative flex flex-col h-[80vh]">
                <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-black text-brand-teal uppercase tracking-tight">Crop Product Image</h3>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Aspect Ratio: 1082 x 1280 (Portrait)</p>
                    </div>
                    <button onClick={onCancel} className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-red-500 transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-grow relative bg-gray-900">
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={1082 / 1280}
                        onCropChange={onCropChange}
                        onZoomChange={onZoomChange}
                        onCropComplete={onCropCompleteInternal}
                        classes={{
                            containerClassName: "rounded-none",
                            mediaClassName: "max-h-full",
                        }}
                    />
                </div>

                <div className="p-8 bg-white border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6 w-full md:w-1/2">
                        <span className="text-[10px] font-black text-brand-teal uppercase tracking-widest shrink-0">Zoom Level</span>
                        <input
                            type="range"
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Zoom"
                            onChange={(e: any) => onZoomChange(e.target.value)}
                            className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-brand-orange"
                        />
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <button
                            onClick={onCancel}
                            className="flex-grow md:flex-grow-0 px-8 py-4 bg-gray-50 text-gray-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDone}
                            className="flex-grow md:flex-grow-0 px-10 py-4 bg-brand-orange text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-teal transition-all shadow-xl shadow-brand-orange/20 flex items-center justify-center gap-3"
                        >
                            <Check className="w-5 h-5" />
                            Apply Crop
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
