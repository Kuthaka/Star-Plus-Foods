"use client";

import Image from "next/image";
import { Search, User, ShoppingBag, Timer, Heart, Plane, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Top Banner */}
      <div className="bg-brand-teal text-white text-[10px] md:text-xs py-2 text-center font-medium tracking-wide">
        Free Shipping across India on Orders above Rs 500/-
      </div>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="hero-gradient relative min-h-[85vh] flex flex-col pt-4 overflow-hidden">
          {/* Header/Nav inside Hero for that seamless look */}
          <header className="container mx-auto px-4 md:px-8 flex items-center justify-between relative z-20">
            {/* Logo */}
            <div className="w-16 md:w-24 relative h-16 md:h-24">
              <Image
                src="/star/logo-bg.png"
                alt="Soul Tari Logo"
                fill
                className="object-contain"
              />
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-8 bg-brand-tan/60 backdrop-blur-md px-10 py-3 rounded-full border border-white/20">
              <a href="#" className="text-brand-orange font-bold text-sm uppercase tracking-wider">Home</a>
              <a href="#" className="text-gray-700 font-semibold text-sm uppercase tracking-wider hover:text-brand-orange transition-colors">Shop</a>
              <a href="#" className="text-gray-700 font-semibold text-sm uppercase tracking-wider hover:text-brand-orange transition-colors">Curry Combos</a>
              <a href="#" className="text-gray-700 font-semibold text-sm uppercase tracking-wider hover:text-brand-orange transition-colors">Meal Combos</a>
              <a href="#" className="text-gray-700 font-semibold text-sm uppercase tracking-wider hover:text-brand-orange transition-colors">Contact Us</a>
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-4 md:gap-6 text-gray-800">
              <Search className="w-5 h-5 cursor-pointer hover:text-brand-orange transition-colors" />
              <User className="w-5 h-5 cursor-pointer hover:text-brand-orange transition-colors" />
              <ShoppingBag className="w-5 h-5 cursor-pointer hover:text-brand-orange transition-colors" />
            </div>
          </header>

          <div className="container mx-auto px-4 md:px-12 flex-grow flex flex-col md:flex-row items-center justify-center gap-12 pt-8 pb-16 relative z-10">
            {/* Left side vertical text */}
            <div className="hidden xl:block absolute left-8 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
              <h1 className="text-8xl font-black vertical-text tracking-[0.2em] text-white">SOULTARI</h1>
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
      </main>
    </div>
  );
}
