
"use client";

import { useState, type FC, type FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

type AuthMode = "login" | "register" | "forgotPassword";

interface AuthFormProps {
  initialMode?: AuthMode;
  onModeChange?: (newMode: AuthMode) => void;
}

export const AuthForm: FC<AuthFormProps> = ({ initialMode = "login", onModeChange }) => {
  const [mode, setModeState] = useState<AuthMode>(initialMode);
  const { toast } = useToast();

  // Login states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  // Register states
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);

  // Forgot Password states
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [isForgotPasswordLoading, setIsForgotPasswordLoading] = useState(false);

  const setMode = (newMode: AuthMode) => {
    setModeState(newMode);
    onModeChange?.(newMode);
  };

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoginLoading(true);
    // Mock login
    console.log("Login attempt:", { email: loginEmail, password: loginPassword });
    setTimeout(() => {
        toast({ title: "Login Submitted", description: "Login functionality is for demonstration." });
        setIsLoginLoading(false);
    }, 500);
  };

  const handleRegisterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (registerPassword !== registerConfirmPassword) {
      toast({ title: "Error", description: "Passwords do not match.", variant: "destructive" });
      return;
    }
    setIsRegisterLoading(true);
    // Mock registration
    console.log("Registration attempt:", { name: registerName, email: registerEmail, password: registerPassword });
    setTimeout(() => {
        toast({ title: "Registration Submitted", description: "Registration functionality is for demonstration." });
        setIsRegisterLoading(false);
    }, 500);
  };

  const handleForgotPasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsForgotPasswordLoading(true);
    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotPasswordEmail }),
      });
      const result = await response.json();
      if (response.ok) {
        toast({ title: "Request Submitted", description: result.message });
        setMode("login"); // Switch back to login form
      } else {
        toast({ title: "Error", description: result.message || "Failed to submit request.", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Could not submit request. Please try again.", variant: "destructive" });
    } finally {
      setIsForgotPasswordLoading(false);
    }
  };

  const switchToRegister = () => setMode("register");
  const switchToLogin = () => setMode("login");
  const switchToForgotPassword = () => setMode("forgotPassword");

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
                <Input id="login-email" type="email" placeholder="you@example.com" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required disabled={isLoginLoading} />
              </div>
              <div>
                <Label htmlFor="login-password">Password</Label>
                <Input id="login-password" type="password" placeholder="••••••••" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required disabled={isLoginLoading} />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoginLoading}>
                {isLoginLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Login"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-sm flex flex-col items-start space-y-2">
            <p>
              <Button variant="link" onClick={switchToForgotPassword} className="p-0 h-auto text-accent">
                Forgot Password?
              </Button>
            </p>
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
                <Input id="register-name" type="text" placeholder="John Doe" value={registerName} onChange={(e) => setRegisterName(e.target.value)} required disabled={isRegisterLoading} />
              </div>
              <div>
                <Label htmlFor="register-email">Email</Label>
                <Input id="register-email" type="email" placeholder="you@example.com" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} required disabled={isRegisterLoading} />
              </div>
              <div>
                <Label htmlFor="register-password">Password</Label>
                <Input id="register-password" type="password" placeholder="••••••••" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} required disabled={isRegisterLoading} />
              </div>
              <div>
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" placeholder="••••••••" value={registerConfirmPassword} onChange={(e) => setRegisterConfirmPassword(e.target.value)} required disabled={isRegisterLoading} />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isRegisterLoading}>
                {isRegisterLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create Account"}
              </Button>
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

      {/* Forgot Password Form */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          mode === "forgotPassword" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full absolute top-0"
        }`}
        style={{ width: '100%' }}
      >
        <Card className="border-0 shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl font-bold font-headline text-primary">Forgot Password</CardTitle>
            <CardDescription>Enter your email to receive a reset link.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
              <div>
                <Label htmlFor="forgot-password-email">Email</Label>
                <Input id="forgot-password-email" type="email" placeholder="you@example.com" value={forgotPasswordEmail} onChange={(e) => setForgotPasswordEmail(e.target.value)} required disabled={isForgotPasswordLoading} />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isForgotPasswordLoading}>
                {isForgotPasswordLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Send Reset Link"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-sm">
            <Button variant="link" onClick={switchToLogin} className="p-0 h-auto text-accent">
              Back to Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
