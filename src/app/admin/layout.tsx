
"use client";

import { useEffect, useState, type FC, type ReactNode } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Home, Users, Settings, Building2, ListChecks, Image as ImageIcon, LogOut, Loader2, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("isAdminAuthenticated") === "true";
    }
    return false; // Default for SSR or if window not available yet
  });
  const [initialAuthChecked, setInitialAuthChecked] = useState(false);


  useEffect(() => {
    // This effect ensures we re-check auth status after mount
    // and sets initialAuthChecked to true to remove the main loader.
    if (typeof window !== "undefined") {
      const adminAuth = localStorage.getItem("isAdminAuthenticated") === "true";
      setIsAuthenticated(adminAuth);
    }
    setInitialAuthChecked(true);
  }, []);

  useEffect(() => {
    // Auth guard: Redirects based on authentication status once initial check is complete.
    if (initialAuthChecked && typeof window !== "undefined") {
      if (!isAuthenticated && pathname !== "/admin/login") {
        router.replace("/admin/login");
      } else if (isAuthenticated && pathname === "/admin/login") {
        // If authenticated and somehow on login page, redirect to admin dashboard
        router.replace("/admin");
      }
    }
  }, [initialAuthChecked, isAuthenticated, pathname, router]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("isAdminAuthenticated");
    }
    setIsAuthenticated(false); // Update state immediately
    router.push("/admin/login"); // Redirect to login
  };

  if (!initialAuthChecked) {
    // Show a loader until the initial authentication check is complete
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2 text-muted-foreground">Initializing Admin Area...</p>
      </div>
    );
  }

  if (pathname === "/admin/login") {
    // For the login page, render children directly without the admin layout
    // This check, combined with the useEffect guard, handles rendering the login page.
    return <>{children}</>;
  }
  
  if (!isAuthenticated) {
    // This state should ideally be brief as the useEffect guard will redirect.
    // Or, if the redirect hasn't fired, this prevents rendering protected content.
    // It can also be a brief state if initialAuthChecked is true but isAuthenticated is false.
    return (
         <div className="flex h-screen items-center justify-center bg-background">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2 text-muted-foreground">Redirecting to login...</p>
        </div>
    );
  }

  // If initial check is done and user is authenticated (and not on login page), render the full admin layout
  return (
    <SidebarProvider defaultOpen>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <Link href="/admin" className="flex items-center gap-2">
              <Image src="https://placehold.co/80x30.png" alt="Larchcode Logo" width={80} height={30} data-ai-hint="logo simple" />
              <span className="text-lg font-semibold text-sidebar-foreground">Admin Panel</span>
            </Link>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/admin'} tooltip="Dashboard">
                <Link href="/admin">
                  <Home />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/admin/users'} tooltip="User Management">
                <Link href="/admin/users">
                  <Users />
                  <span>User Management</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/admin/departments'} tooltip="Departments">
                <Link href="/admin/departments">
                  <Building2 />
                  <span>Departments</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/admin/services'} tooltip="Manage Services">
                <Link href="/admin/services">
                  <ImageIcon />
                  <span>Manage Services</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/admin/settings'} tooltip="Site Settings">
                <Link href="/admin/settings">
                  <Settings />
                  <span>Site Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4 space-y-2">
           <Button variant="outline" size="sm" onClick={handleLogout} className="w-full bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90">
             <LogOut className="mr-2 h-4 w-4" />
             Logout
           </Button>
          <p className="text-xs text-sidebar-foreground/70">
            &copy; {new Date().getFullYear()} Larchcode Hub
          </p>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b">
          <SidebarTrigger className="md:hidden" />
          <h1 className="text-xl font-semibold text-foreground">
            {pathname === '/admin' ? 'Admin Dashboard' : 
             pathname.startsWith('/admin/') ? 
               (pathname.split('/admin/')[1].charAt(0).toUpperCase() + pathname.split('/admin/')[1].slice(1).replace(/-/g, ' ') + " Management")
               .replace(/\b(Login|login)\b Management/, "Login") // Avoid "Login Management"
             :
             'Admin Area'}
          </h1>
        </header>
        <main className="flex-1 p-6 bg-muted/40">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
