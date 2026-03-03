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

        {/* E-COMMERCE PRODUCT LISTING SECTION */}
        <section className="bg-white py-20 px-4 md:px-12">
          <div className="container mx-auto">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
              <div className="space-y-2">
                <h2 className="text-brand-orange font-black tracking-widest text-sm uppercase">Quick & Tasty</h2>
                <h3 className="text-4xl md:text-5xl font-black text-brand-teal uppercase leading-tight">
                  Our Best Sellers
                </h3>
              </div>
              <div className="flex items-center gap-6 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
                {["All", "Curries", "Rice", "Sides", "Combos"].map((cat, i) => (
                  <button key={i} className={`text-sm font-black uppercase tracking-widest whitespace-nowrap transition-colors ${i === 0 ? "text-brand-orange border-b-2 border-brand-orange" : "text-gray-400 hover:text-brand-teal"}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-y-12">
              {[
                { name: "Smoky Butter Chicken", price: "249", category: "Chef's Special", badge: "Hot" },
                { name: "Jhannat Dal Fry", price: "189", category: "Quick Meal", badge: "Best Seller" },
                { name: "Jeera Rice", price: "129", category: "Side Dish", badge: "" },
                { name: "Dhaba Chicken Combo", price: "349", category: "Combos", badge: "New" },
                { name: "Shahi Paneer", price: "229", category: "Classic", badge: "" },
                { name: "Mix Veg Curry", price: "199", category: "Classic", badge: "" },
                { name: "Dal Makhni", price: "219", category: "Chef's Special", badge: "Low Fat" },
                { name: "Meal Combo Box", price: "399", category: "Combos", badge: "Popular" }
              ].map((product, idx) => (
                <div key={idx} className="group flex flex-col bg-white rounded-3xl p-4 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-transparent hover:border-gray-50 relative">
                  {/* Product Badge */}
                  {product.badge && (
                    <span className="absolute top-6 left-6 z-20 bg-brand-orange text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                      {product.badge}
                    </span>
                  )}

                  {/* Image Container */}
                  <div className="relative w-full aspect-square bg-gray-50 rounded-2xl overflow-hidden mb-6 flex items-center justify-center p-8">
                    <div className="relative w-full h-full transform transition-transform duration-700 group-hover:scale-110 drop-shadow-xl">
                      <Image
                        src="https://res.cloudinary.com/drmroxs00/image/upload/v1772532862/1-removebg_w2b9ls.png"
                        alt={product.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-col gap-1 px-2">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em]">
                      {product.category}
                    </span>
                    <h4 className="text-brand-teal font-black text-lg uppercase leading-tight group-hover:text-brand-orange transition-colors">
                      {product.name}
                    </h4>

                    {/* Rating placeholder */}
                    <div className="flex items-center gap-1 my-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <svg key={s} className="w-3 h-3 text-brand-yellow fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                      <span className="text-[10px] text-gray-400 font-bold ml-1">(4.9)</span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex flex-col">
                        <span className="text-gray-400 text-[10px] font-bold uppercase leading-none mb-1">Price</span>
                        <span className="text-brand-teal font-black text-xl">₹{product.price}</span>
                      </div>
                      <button className="h-10 w-10 bg-brand-teal text-white rounded-xl flex items-center justify-center hover:bg-brand-orange transition-all hover:scale-110 shadow-lg shadow-brand-teal/10">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            <div className="mt-20 text-center">
              <button className="group relative px-12 py-5 bg-brand-teal text-white font-black rounded-full overflow-hidden transition-all hover:pr-16">
                <span className="relative z-10 tracking-[0.2em] text-xs uppercase">View All Menu</span>
                <span className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all text-xl">→</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
