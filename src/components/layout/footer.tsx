
import Link from "next/link";
import { Twitter, Facebook, Linkedin, MessageSquare, Phone, Mail, MapPin, ShieldCheck } from "lucide-react";
import type { FC } from "react";

const SocialLink: FC<{ href: string; icon: React.ReactNode; label: string }> = ({ href, icon, label }) => (
  <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
    className="text-primary-foreground/80 hover:text-accent transition-colors">
    {icon}
  </Link>
);

const FooterLink: FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <li>
    <Link href={href} className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
      {children}
    </Link>
  </li>
);

export const Footer: FC = () => {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: Brand and Social */}
          <div>
            <h3 className="text-2xl font-bold mb-4 font-headline text-primary-foreground">Larchcode Hub</h3>
            <p className="text-sm text-primary-foreground/80 mb-6">
              Your experts in professional cabro installation, landscape design, and complete ground preparation services.
            </p>
            <div className="flex space-x-5">
              <SocialLink href="https://twitter.com/yourprofile" icon={<Twitter size={24} />} label="X (Twitter)" />
              <SocialLink href="https://www.facebook.com/calvisnyang" icon={<Facebook size={24} />} label="Facebook" />
              <SocialLink href="https://www.linkedin.com/in/calvis-onyango-a21146271/" icon={<Linkedin size={24} />} label="LinkedIn" />
              <SocialLink href="https://wa.me/254757056917" icon={<MessageSquare size={24} />} label="WhatsApp" />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h5 className="text-lg font-semibold mb-4 font-headline text-primary-foreground/90">Quick Links</h5>
            <ul className="space-y-2">
              <FooterLink href="/#home">Home</FooterLink>
              <FooterLink href="/#about">About Us</FooterLink>
              <FooterLink href="/#services">Services</FooterLink>
              <FooterLink href="/#portfolio">Portfolio</FooterLink>
              <FooterLink href="/#contact">Contact Us</FooterLink>
              <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
              <FooterLink href="/terms-of-service">Terms of Service</FooterLink>
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div>
            <h5 className="text-lg font-semibold mb-4 font-headline text-primary-foreground/90">Get in Touch</h5>
            <ul className="space-y-3">
              <li>
                <a href="tel:+254757056917" className="flex items-center space-x-3 text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  <Phone size={18} />
                  <span>0757 056 917</span>
                </a>
              </li>
              <li>
                <a href="mailto:calvisonyango265@gmail.com" className="flex items-center space-x-3 text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  <Mail size={18} />
                  <span>calvisonyango265@gmail.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-center space-x-3 text-sm text-primary-foreground/80">
                  <MapPin size={18} />
                  <span>Nairobi, Kenya (Placeholder)</span>
                </div>
              </li>
               <li>
                <Link href="/admin" className="flex items-center space-x-3 text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  <ShieldCheck size={18} />
                  <span>Admin Panel</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-primary-foreground/20" />

        <div className="text-center text-xs text-primary-foreground/70">
          &copy; {new Date().getFullYear()} Larchcode Hub. All Rights Reserved. Cabro & Landscaping Experts.
        </div>
      </div>
    </footer>
  );
};
