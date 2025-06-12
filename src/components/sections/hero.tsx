import type { FC } from "react";

export const HeroSection: FC = () => {
  // IMPORTANT: For the background image to appear,
  // 1. Save the image you provided as 'hero-background.jpg' (or your chosen filename).
  // 2. Place this image file directly inside the 'public' folder of your project (e.g., public/hero-background.jpg).
  //    If you use a different filename or path within 'public', update the "bg-[url('/your-image-name.jpg')]" class below.
  return (
    <section 
      id="home" 
      className="relative bg-[url('/hero-background.jpg')] bg-cover bg-center py-20 md:py-32 text-center"
    >
      {/* Overlay to improve text readability */}
      <div className="absolute inset-0 bg-black/60"></div> {/* 60% black overlay */}
      
      {/* Content container */}
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-6 text-white">
          Expert Cabro Installation & Landscaping
        </h1>
        <p className="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto"> {/* text-gray-100 for slightly softer white */}
          Your trusted partner for expert cabro installation, innovative landscape design, and meticulous ground preparation services. We create beautiful and durable outdoor environments.
        </p>
      </div>
    </section>
  );
};
