
"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, type FC } from "react";

interface HeaderProps {
  onLoginClick: () => void;
  onSignUpClick: () => void;
}

// NavLink without icon
const NavLink: FC<{ href: string; children: React.ReactNode; onClick?: () => void }> = ({
  href,
  children,
  onClick,
}) => (
  <Link href={href} passHref>
    <Button
      variant="ghost"
      className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground font-headline"
      onClick={onClick}
    >
      {children}
    </Button>
  </Link>
);

export const Header: FC<HeaderProps> = ({ onLoginClick, onSignUpClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Team", href: "#team" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
        <Link href="/" passHref>
          <div className="flex items-center space-x-2 cursor-pointer">
            <Image src="/logo.jpg" alt="Larchcode Logo" width={60} height={20} />
            <h1 className="text-2xl font-bold font-headline">Larchcode Hub</h1>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <NavLink key={item.label} href={item.href}>
              {item.label}
            </NavLink>
          ))}
          <Button variant="secondary" onClick={onLoginClick} className="font-headline ml-2">
            Login
          </Button>
          <Button
            onClick={onSignUpClick}
            className="font-headline bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            Sign Up
          </Button>
        </nav>

        {/* Desktop Search */}
        <div className="hidden lg:flex items-center space-x-2">
          <Input
            type="search"
            placeholder="Search"
            className="w-48 bg-background text-foreground placeholder-muted-foreground"
          />
          <Button type="submit" variant="secondary" size="icon">
            <Search className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[250px] sm:w-[300px] bg-primary text-primary-foreground p-6"
            >
              <nav className="flex flex-col space-y-3 mt-6">
                {navItems.map((item) => (
                  <NavLink
                    key={item.label}
                    href={item.href}
                    onClick={handleNavLinkClick}
                  >
                    {item.label}
                  </NavLink>
                ))}
                <Button
                  variant="secondary"
                  onClick={() => {
                    onLoginClick();
                    handleNavLinkClick();
                  }}
                  className="w-full font-headline"
                >
                  Login
                </Button>
                <Button
                  onClick={() => {
                    onSignUpClick();
                    handleNavLinkClick();
                  }}
                  className="w-full font-headline bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Sign Up
                </Button>
                <div className="flex items-center space-x-2 pt-4">
                  <Input
                    type="search"
                    placeholder="Search"
                    className="w-full bg-background text-foreground placeholder-muted-foreground"
                  />
                  <Button type="submit" variant="secondary" size="icon">
                    <Search className="h-5 w-5" />
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
