
"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { HeroSection } from "@/components/sections/hero";
import { AboutMissionSection } from "@/components/sections/about-mission";
import { ServicesCarousel } from "@/components/sections/services-carousel";
import { ProductsSection } from "@/components/sections/products";
import { TeamSection } from "@/components/sections/team";
import { ContactFormSection } from "@/components/sections/contact-form";
import { Footer } from "@/components/layout/footer";
import { AuthForm } from "@/components/auth/auth-form";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function HomePage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const openLoginModal = () => {
    setAuthMode("login");
    setIsAuthModalOpen(true);
  };

  const openSignUpModal = () => {
    setAuthMode("register");
    setIsAuthModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onLoginClick={openLoginModal} onSignUpClick={openSignUpModal} />
      <main className="flex-grow">
        <HeroSection />
        <AboutMissionSection />
        <ServicesCarousel />
        <ProductsSection />
        <TeamSection />
        {/* <ProductSuggestion /> Removed */}
        <ContactFormSection />
      </main>
      <Footer />

      <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
        <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
          {/* DialogHeader is part of AuthForm now */}
          {/* <DialogHeader className="p-6 pb-0">
            <DialogTitle className="font-headline text-2xl text-primary">
              {authMode === "login" ? "Login" : "Sign Up"}
            </DialogTitle>
          </DialogHeader> */}
          <AuthForm initialMode={authMode} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
