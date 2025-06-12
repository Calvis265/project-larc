
import Link from "next/link";
import { Twitter, Facebook, Linkedin, MessageSquare, Phone, Mail } from "lucide-react";
import type { FC } from "react";

const SocialLink: FC<{ href: string; icon: React.ReactNode; label: string }> = ({ href, icon, label }) => (
  <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
    className="text-primary-foreground hover:text-accent transition-colors">
    {icon}
  </Link>
);

export const Footer: FC = () => {
  return (
    <footer className="bg-primary text-primary-foreground pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h5 className="text-xl font-bold mb-4 font-headline">Follow Us</h5>
            <div className="flex space-x-6">
              <SocialLink href="https://twitter.com/yourprofile" icon={<Twitter size={28} />} label="X (Twitter)" />
              <SocialLink href="https://www.facebook.com/calvisnyang" icon={<Facebook size={28} />} label="Facebook" />
              <SocialLink href="https://www.linkedin.com/in/calvis-onyango-a21146271/" icon={<Linkedin size={28} />} label="LinkedIn" />
              <SocialLink href="https://wa.me/254757056917" icon={<MessageSquare size={28} />} label="WhatsApp" />
            </div>
          </div>
          <div className="text-left md:text-right">
            <h5 className="text-xl font-bold mb-4 font-headline">Contact Us</h5>
            <a href="tel:+254757056917" className="flex items-center justify-start md:justify-end space-x-2 mb-2 text-lg hover:text-accent transition-colors">
              <Phone size={20} />
              <span>0757 056 917</span>
            </a>
            <a href="mailto:calvisonyango265@gmail.com" className="flex items-center justify-start md:justify-end space-x-2 text-lg hover:text-accent transition-colors">
              <Mail size={20} />
              <span>calvisonyango265@gmail.com</span>
            </a>
          </div>
        </div>
        <hr className="my-8 border-primary-foreground/30" />
        <div className="text-center text-sm text-primary-foreground/80">
          &copy; {new Date().getFullYear()} Larchcode Hub. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};
