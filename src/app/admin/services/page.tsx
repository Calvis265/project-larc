
"use client";

import type { NextPage } from "next";
import { useState, useEffect, type FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Edit3, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import NextImage from "next/image";

interface Service {
  id: string;
  src: string;
  alt: string;
}

const LOCAL_STORAGE_KEY = "larchcodeHubServices";

const initialServicesData: Service[] = [
  { id: "1", src: "https://placehold.co/1200x600.png", alt: "Professional Cabro Installation" },
  { id: "2", src: "https://placehold.co/1200x600.png", alt: "Creative Landscape Design" },
  { id: "3", src: "https://placehold.co/1200x600.png", alt: "Ground Tilling and Preparation" },
  { id: "4", src: "https://placehold.co/1200x600.png", alt: "Site Clearing and Levelling" },
  { id: "5", src: "https://placehold.co/1200x600.png", alt: "Grass Planting and Seeding" },
  { id: "6", src: "https://placehold.co/1200x600.png", alt: "Ongoing Landscape Maintenance" },
];

const AdminServicesPage: NextPage = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const [serviceSrc, setServiceSrc] = useState("");
  const [serviceAlt, setServiceAlt] = useState("");

  useEffect(() => {
    setIsMounted(true);
    try {
      const storedServices = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedServices) {
        setServices(JSON.parse(storedServices));
      } else {
        setServices(initialServicesData);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialServicesData));
      }
    } catch (error) {
      console.error("Failed to load services from localStorage", error);
      setServices(initialServicesData); 
    }
  }, []);

  useEffect(() => {
    if (isMounted && services.length > 0) { 
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(services));
      } catch (error) {
        console.error("Failed to save services to localStorage", error);
      }
    }
  }, [services, isMounted]);


  const resetForm = () => {
    setServiceSrc("");
    setServiceAlt("");
    setCurrentService(null);
  };

  const handleAddService = (e: FormEvent) => {
    e.preventDefault();
    const newService: Service = {
      id: String(Date.now()), 
      src: serviceSrc,
      alt: serviceAlt,
    };
    setServices(prev => [newService, ...prev]);
    toast({ title: "Service Added", description: `"${newService.alt}" has been added.` });
    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleEditService = (e: FormEvent) => {
    e.preventDefault();
    if (!currentService) return;
    const updatedService = { ...currentService, src: serviceSrc, alt: serviceAlt };
    setServices(prev => prev.map(s => s.id === updatedService.id ? updatedService : s));
    toast({ title: "Service Updated", description: `"${updatedService.alt}" has been updated.` });
    resetForm();
    setIsEditDialogOpen(false);
  };

  const openEditDialog = (service: Service) => {
    setCurrentService(service);
    setServiceSrc(service.src);
    setServiceAlt(service.alt);
    setIsEditDialogOpen(true);
  };

  const handleDeleteService = (serviceId: string) => {
    const serviceToDelete = services.find(s => s.id === serviceId);
    setServices(prev => prev.filter(s => s.id !== serviceId));
    toast({ title: "Service Deleted", description: `Service "${serviceToDelete?.alt || ''}" has been deleted.`, variant: "destructive" });
  };

  if (!isMounted) {
    return null; 
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Manage Services</h2>
          <p className="text-muted-foreground">Add, edit, or delete services displayed on your website.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsAddDialogOpen(true); }}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Service
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddService} className="space-y-4 py-4">
              <div>
                <Label htmlFor="serviceSrc">Image URL</Label>
                <Input id="serviceSrc" value={serviceSrc} onChange={e => setServiceSrc(e.target.value)} placeholder="https://placehold.co/1200x600.png" required />
              </div>
              <div>
                <Label htmlFor="serviceAlt">Alternative Text (Name)</Label>
                <Input id="serviceAlt" value={serviceAlt} onChange={e => setServiceAlt(e.target.value)} placeholder="e.g., Professional Cabro Installation" required />
              </div>
              <DialogFooter>
                <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
                <Button type="submit">Add Service</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>All Services</CardTitle>
          <CardDescription>These services are displayed in the services carousel on your homepage. Data is currently stored in browser localStorage for prototyping.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Name (Alt Text)</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell>
                      <NextImage src={service.src} alt={service.alt} width={60} height={30} className="object-cover rounded" />
                    </TableCell>
                    <TableCell className="font-medium">{service.alt}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(service)}>
                        <Edit3 className="mr-1 h-3 w-3" /> Edit
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="mr-1 h-3 w-3" /> Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the service
                              "{service.alt}".
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteService(service.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
           {services.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No services found. Add some!</p>
           )}
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
          </DialogHeader>
          {currentService && (
            <form onSubmit={handleEditService} className="space-y-4 py-4">
              <div>
                <Label htmlFor="editServiceSrc">Image URL</Label>
                <Input id="editServiceSrc" value={serviceSrc} onChange={e => setServiceSrc(e.target.value)} placeholder="https://placehold.co/1200x600.png" required />
              </div>
              <div>
                <Label htmlFor="editServiceAlt">Alternative Text (Name)</Label>
                <Input id="editServiceAlt" value={serviceAlt} onChange={e => setServiceAlt(e.target.value)} placeholder="e.g., Professional Cabro Installation" required />
              </div>
              <DialogFooter>
                <DialogClose asChild><Button type="button" variant="outline" onClick={resetForm}>Cancel</Button></DialogClose>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Card className="mt-6">
        <CardHeader>
            <CardTitle>Developer Note (LocalStorage Prototyping)</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground">
                Service data is currently managed using the browser's <strong>localStorage</strong>. This means changes will persist in your current browser but are not shared and will be lost if you clear your browser data.
                For a production application, you would integrate this with a backend database
                to store and retrieve service data. The "Services Carousel" on the homepage now also attempts to load data from localStorage.
            </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminServicesPage;
