
import type { FC } from "react";

export const HeroSection: FC = () => {
  return (
    <section 
      id="home" 
      className="relative bg-[url('/team.jpg')] bg-cover bg-center h-[70vh] flex items-start justify-center text-center"
    >
      {/* Lighter overlay: only 30% black */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content container */}
      <div className="container mx-auto px-4 pt-12 relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold font-headline mb-4 text-white">
          Expert Cabro Installation & Landscaping
        </h1>

        <p className="text-base md:text-lg text-gray-100 max-w-2xl mx-auto">
          Your trusted partner for expert cabro installation, innovative landscape design, and meticulous ground preparation services. We create beautiful and durable outdoor environments.
        </p>
      </div>
    </section>
  );
};

