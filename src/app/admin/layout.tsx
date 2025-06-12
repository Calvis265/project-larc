
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
import { Home, Users, Settings, Building2, ListChecks, Image as ImageIcon, LogOut, Loader2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const adminAuth = localStorage.getItem("isAdminAuthenticated");
      if (adminAuth === "true") {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    } else {
        setIsLoading(false); 
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && !isLoading) {
      if (!isAuthenticated && pathname !== "/admin/login") {
        router.replace("/admin/login");
      } else if (isAuthenticated && pathname === "/admin/login") {
        router.replace("/admin");
      }
    }
  }, [isLoading, isAuthenticated, pathname, router]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("isAdminAuthenticated");
    }
    setIsAuthenticated(false);
    router.push("/admin/login");
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2 text-muted-foreground">Loading Admin Area...</p>
      </div>
    );
  }

  if (pathname === "/admin/login") {
    // For the login page, render children directly without the admin layout
    // This check combined with the useEffect ensures that if not authenticated,
    // other admin pages won't render this layout but will be redirected.
    return <>{children}</>;
  }
  
  if (!isAuthenticated) {
    // This state should ideally be brief as the useEffect will redirect.
    // Or, if somehow the redirect hasn't fired, this prevents rendering protected content.
    return (
         <div className="flex h-screen items-center justify-center bg-background">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2 text-muted-foreground">Redirecting to login...</p>
        </div>
    );
  }

  // If authenticated and not on the login page, render the full admin layout
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
             pathname.startsWith('/admin/') ? pathname.split('/admin/')[1].charAt(0).toUpperCase() + pathname.split('/admin/')[1].slice(1).replace('-', ' ') + " Management" :
             'Admin Area'}
          </h1>
          {/* Placeholder for user profile / logout */}
        </header>
        <main className="flex-1 p-6 bg-muted/40">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
