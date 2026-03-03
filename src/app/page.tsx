"use client";

import Image from "next/image";
import { Timer, Heart, Plane, ShieldCheck } from "lucide-react";
import TopBanner from "@/components/headers/TopBanner";
import Navbar from "@/components/headers/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      {/* Top Banner */}
      <TopBanner />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="hero-gradient relative min-h-[85vh] flex flex-col pt-0 overflow-hidden">
          {/* Header/Nav inside Hero for that seamless look */}
          <Navbar />

          <div className="container mx-auto px-4 md:px-12 flex-grow flex flex-col md:flex-row items-center justify-center gap-12 pt-8 pb-16 relative z-10">
            {/* Left side vertical text - decreased size and moved down */}
            <div className="hidden xl:block absolute left-8 top-48 opacity-10 pointer-events-none flex items-center">
              <h1 className="text-6xl font-black vertical-text tracking-[0.2em] text-white whitespace-nowrap uppercase">STAR PLUS</h1>
            </div>

            {/* Product Image */}
            <div className="relative w-full max-w-[320px] md:max-w-[450px] aspect-[4/5] drop-shadow-2xl hover:scale-105 transition-transform duration-500">
              <Image
                src="https://res.cloudinary.com/drmroxs00/image/upload/v1772532862/1-removebg_w2b9ls.png"
                alt="Smoky Butter Chicken Box"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Content */}
            <div className="text-center md:text-left max-w-xl flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 justify-center md:justify-start">
                <span className="w-8 h-[2px] bg-brand-orange"></span>
                <span className="text-brand-teal/60 font-medium">READY IN NO TIME</span>
              </div>

              <h2 className="text-4xl md:text-6xl font-black text-brand-teal leading-[1.1]">
                Your Favorite Foods <br />
                <span className="text-brand-orange">READY IN MINUTES.</span>
              </h2>

              <p className="text-brand-teal/80 text-lg md:text-xl font-medium leading-relaxed">
                Recipes From the Master Chefs of <br className="hidden md:block" /> Nameless Streets of India
              </p>

              <button className="bg-brand-orange hover:bg-brand-orange/90 text-white font-black px-10 py-5 rounded-full text-lg tracking-widest shadow-xl shadow-brand-orange/20 transition-all hover:-translate-y-1 mt-4">
                YES, I'M HUNGRY
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-brand-teal py-16 text-white overflow-hidden">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 lg:px-20">
            {/* Feature 1 */}
            <div className="flex flex-col items-center gap-4 text-center">
              <Timer className="w-10 h-10 text-brand-yellow" />
              <h3 className="text-brand-yellow font-bold tracking-widest text-sm md:text-base uppercase">Ready in 2 Mins</h3>
            </div>

            <div className="hidden md:block w-32 h-[1px] border-t border-dashed border-white/20"></div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center gap-4 text-center">
              <Heart className="w-10 h-10 text-brand-yellow" />
              <h3 className="text-brand-yellow font-bold tracking-widest text-sm md:text-base uppercase">Flavors from Streets</h3>
            </div>

            <div className="hidden md:block w-32 h-[1px] border-t border-dashed border-white/20"></div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center gap-4 text-center">
              <Plane className="w-10 h-10 text-brand-yellow" />
              <h3 className="text-brand-yellow font-bold tracking-widest text-sm md:text-base uppercase">Travel Partner</h3>
            </div>

            <div className="hidden md:block w-32 h-[1px] border-t border-dashed border-white/20"></div>

            {/* Feature 4 */}
            <div className="flex flex-col items-center gap-4 text-center">
              <ShieldCheck className="w-10 h-10 text-brand-yellow" />
              <h3 className="text-brand-yellow font-bold tracking-widest text-sm md:text-base uppercase">Hygienic Packaging</h3>
            </div>
          </div>
        </section>

        {/* CHEF'S SPECIAL SECTION */}
        <section className="relative overflow-hidden">
          {/* Section Header */}
          <div className="bg-brand-teal text-white py-10 text-center">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Chef's Special</h2>
          </div>

          {/* Special Dishes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full">
            {/* Item 1: Spicy Dhaba Chicken */}
            <div className="bg-[#1e3b3e] h-[400px] flex flex-col items-center justify-center p-8 mandala-pattern group cursor-pointer overflow-hidden relative">
              <div className="relative w-56 h-56 transition-transform duration-500 group-hover:scale-110 drop-shadow-2xl">
                <Image src="https://res.cloudinary.com/drmroxs00/image/upload/v1772532862/1-removebg_w2b9ls.png" alt="Spicy Dhaba Chicken" fill className="object-contain" />
              </div>
              <h3 className="text-white font-black text-xl tracking-wider uppercase mt-8 text-center">Spicy Dhaba Chicken</h3>
            </div>

            {/* Item 2: Jhannat Dal Fry */}
            <div className="bg-[#ff6138] h-[400px] flex flex-col items-center justify-center p-8 mandala-pattern group cursor-pointer overflow-hidden relative">
              <div className="relative w-56 h-56 transition-transform duration-500 group-hover:scale-110 drop-shadow-2xl">
                <Image src="https://res.cloudinary.com/drmroxs00/image/upload/v1772532862/1-removebg_w2b9ls.png" alt="Jhannat Dal Fry" fill className="object-contain" />
              </div>
              <h3 className="text-white font-black text-xl tracking-wider uppercase mt-8 text-center">Jhannat Dal Fry</h3>
            </div>

            {/* Item 3: Smoky Butter Chicken */}
            <div className="bg-[#ffb400] h-[400px] flex flex-col items-center justify-center p-8 mandala-pattern group cursor-pointer overflow-hidden relative">
              <div className="relative w-56 h-56 transition-transform duration-500 group-hover:scale-110 drop-shadow-2xl">
                <Image src="https://res.cloudinary.com/drmroxs00/image/upload/v1772532862/1-removebg_w2b9ls.png" alt="Smoky Butter Chicken" fill className="object-contain" />
              </div>
              <h3 className="text-white font-black text-xl tracking-wider uppercase mt-8 text-center">Smoky Butter Chicken</h3>
            </div>

            {/* Item 4: Shahi Dal Makhni */}
            <div className="bg-[#ac5e2e] h-[400px] flex flex-col items-center justify-center p-8 mandala-pattern group cursor-pointer overflow-hidden relative">
              <div className="relative w-56 h-56 transition-transform duration-500 group-hover:scale-110 drop-shadow-2xl">
                <Image src="https://res.cloudinary.com/drmroxs00/image/upload/v1772532862/1-removebg_w2b9ls.png" alt="Shahi Dal Makhni" fill className="object-contain" />
              </div>
              <h3 className="text-white font-black text-xl tracking-wider uppercase mt-8 text-center">Shahi Dal Makhni</h3>
            </div>
          </div>
        </section>

        {/* COMPLIMENTS EVERYTHING SECTION */}
        <section className="swirl-pattern py-16 px-4 md:px-20 border-y border-gray-200">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex flex-col gap-2 text-center md:text-left">
              <h2 className="text-5xl md:text-7xl font-black text-gray-500 leading-none">COMPLIMENTS EVERYTHING</h2>
              <p className="text-brand-teal font-black text-2xl md:text-3xl tracking-wider">JEERA RICE</p>
            </div>
            <div className="relative w-64 h-64 md:w-80 md:h-80 drop-shadow-2xl">
              <Image src="https://res.cloudinary.com/drmroxs00/image/upload/v1772532862/1-removebg_w2b9ls.png" alt="Jeera Rice" fill className="object-contain" />
            </div>
          </div>
        </section>

        {/* COMBO SECTION */}
        <section className="grid grid-cols-1 md:grid-cols-2">
          {/* Curry Combos */}
          <div className="bg-[#b4cbe9] py-16 px-8 flex flex-col md:flex-row items-center justify-center gap-8 mandala-pattern group cursor-pointer">
            <div className="text-center md:text-left">
              <h2 className="text-6xl md:text-7xl font-black text-white leading-none">CURRY</h2>
              <h3 className="text-6xl md:text-7xl font-black text-white leading-none">COMBOS</h3>
            </div>
            <div className="relative w-64 h-64 md:w-80 md:h-80 transition-transform duration-500 group-hover:scale-105">
              <Image src="https://res.cloudinary.com/drmroxs00/image/upload/v1772532862/1-removebg_w2b9ls.png" alt="Curry Combos" fill className="object-contain" />
            </div>
          </div>

          {/* Meal Combos */}
          <div className="bg-[#b6d56d] py-16 px-8 flex flex-col md:flex-row items-center justify-center gap-8 mandala-pattern group cursor-pointer">
            <div className="text-center md:text-left">
              <h2 className="text-6xl md:text-7xl font-black text-white leading-none">MEAL</h2>
              <h3 className="text-6xl md:text-7xl font-black text-white leading-none">COMBOS</h3>
            </div>
            <div className="relative w-64 h-64 md:w-80 md:h-80 transition-transform duration-500 group-hover:scale-105">
              <Image src="https://res.cloudinary.com/drmroxs00/image/upload/v1772532862/1-removebg_w2b9ls.png" alt="Meal Combos" fill className="object-contain" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
