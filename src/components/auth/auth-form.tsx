
"use client";

import { useState, type FC, type FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

interface AuthFormProps {
  initialMode?: "login" | "register";
}

export const AuthForm: FC<AuthFormProps> = ({ initialMode = "login" }) => {
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const { toast } = useToast();

  // Login states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register states
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Mock login
    console.log("Login attempt:", { email: loginEmail, password: loginPassword });
    toast({ title: "Login Submitted", description: "Login functionality is for demonstration." });
  };

  const handleRegisterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (registerPassword !== registerConfirmPassword) {
      toast({ title: "Error", description: "Passwords do not match.", variant: "destructive" });
      return;
    }
    // Mock registration
    console.log("Registration attempt:", { name: registerName, email: registerEmail, password: registerPassword });
    toast({ title: "Registration Submitted", description: "Registration functionality is for demonstration." });
  };

  const switchToRegister = () => setMode("register");
  const switchToLogin = () => setMode("login");

  return (
    <div className="relative overflow-hidden">
      {/* Login Form */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          mode === "login" ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full absolute"
        }`}
        style={{ width: '100%' }}
      >
        <Card className="border-0 shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl font-bold font-headline text-primary">Login</CardTitle>
            <CardDescription>Access your Larchcode Hub account.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <Label htmlFor="login-email">Email</Label>
                <Input id="login-email" type="email" placeholder="you@example.com" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="login-password">Password</Label>
                <Input id="login-password" type="password" placeholder="••••••••" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Login</Button>
            </form>
          </CardContent>
          <CardFooter className="text-sm flex flex-col items-start space-y-2">
            <p>Don't have an account?{" "}
              <Button variant="link" onClick={switchToRegister} className="p-0 h-auto text-accent">
                Sign Up
              </Button>
            </p>
            <p>
              <Link href="/admin" passHref>
                <Button variant="link" className="p-0 h-auto text-accent">
                  Admin Panel
                </Button>
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>

      {/* Register Form */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          mode === "register" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full absolute top-0"
        }`}
         style={{ width: '100%' }}
      >
        <Card className="border-0 shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl font-bold font-headline text-primary">Create Account</CardTitle>
            <CardDescription>Join Larchcode Hub today.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <Label htmlFor="register-name">Full Name</Label>
                <Input id="register-name" type="text" placeholder="John Doe" value={registerName} onChange={(e) => setRegisterName(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="register-email">Email</Label>
                <Input id="register-email" type="email" placeholder="you@example.com" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="register-password">Password</Label>
                <Input id="register-password" type="password" placeholder="••••••••" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" placeholder="••••••••" value={registerConfirmPassword} onChange={(e) => setRegisterConfirmPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Create Account</Button>
            </form>
          </CardContent>
          <CardFooter className="text-sm flex flex-col items-start space-y-2">
            <p>Already have an account?{" "}
              <Button variant="link" onClick={switchToLogin} className="p-0 h-auto text-accent">
                Login
              </Button>
            </p>
            <p>
              <Link href="/admin" passHref>
                <Button variant="link" className="p-0 h-auto text-accent">
                  Admin Panel
                </Button>
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
