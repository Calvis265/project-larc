
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

type AuthMode = "login" | "register" | "forgotPassword";

export default function HomePage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  const openAuthModal = (mode: AuthMode) => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onLoginClick={() => openAuthModal("login")} onSignUpClick={() => openAuthModal("register")} />
      <main className="flex-grow">
        <HeroSection />
        <AboutMissionSection />
        <ServicesCarousel />
        <ProductsSection />
        <TeamSection />
        <ContactFormSection />
      </main>
      <Footer />

      <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
        <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
          <DialogHeader className="sr-only">
            <DialogTitle>
              {authMode === "login" ? "Login" 
                : authMode === "register" ? "Create Account" 
                : "Forgot Password"}
            </DialogTitle>
            <DialogDescription>
              {authMode === "login" ? "Access your Larchcode Hub account." 
                : authMode === "register" ? "Join Larchcode Hub today."
                : "Request a password reset for your Larchcode Hub account."}
            </DialogDescription>
          </DialogHeader>
          <AuthForm 
            initialMode={authMode} 
            onModeChange={(newMode) => setAuthMode(newMode)} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
