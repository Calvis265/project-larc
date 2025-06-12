
"use client";

import { useState, type FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";

const ADMIN_USERNAME = "calvis.onyango.caltech";
const ADMIN_PASSWORD = "@calvis24";

export default function AdminLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("isAdminAuthenticated") === "true") {
        router.replace("/admin");
      } else {
        setIsCheckingAuth(false);
      }
    } else {
        setIsCheckingAuth(false);
    }
  }, [router]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // For debugging: Log the entered values and expected values
    console.log("Attempting login with:");
    console.log("Entered Username:", `"${username}"`);
    console.log("Expected Username:", `"${ADMIN_USERNAME}"`);
    console.log("Entered Password:", `"${password}"`);
    console.log("Expected Password:", `"${ADMIN_PASSWORD}"`);

    // Simulate network delay
    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        if (typeof window !== "undefined") {
            localStorage.setItem("isAdminAuthenticated", "true");
        }
        toast({ title: "Login Successful", description: "Redirecting to admin panel..." });
        router.push("/admin");
      } else {
        setError("Invalid username or password.");
        toast({ title: "Login Failed", description: "Invalid username or password.", variant: "destructive" });
        setIsLoading(false);
      }
    }, 500);
  };

  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-2 text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Image src="https://placehold.co/120x50.png" alt="Larchcode Logo" width={120} height={50} data-ai-hint="logo simple" />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">Admin Panel Login</CardTitle>
          <CardDescription>Enter your credentials to access the admin area.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="calvis.onyango.caltech"
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-sm text-center justify-center">
           <Link href="/" className="text-primary hover:underline">
                ← Back to Homepage
           </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
