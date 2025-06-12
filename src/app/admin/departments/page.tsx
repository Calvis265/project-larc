
"use client";

import type { NextPage } from "next";
import { useState, useEffect, type FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { PlusCircle, Edit3, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Department {
  id: string;
  name: string;
  head: string;
  members: number;
}

const LOCAL_STORAGE_KEY = "larchcodeHubDepartments";

const initialDepartmentsData: Department[] = [
  { id: "1", name: "ICT Department", head: "John Smith", members: 5 },
  { id: "2", name: "Human Resources (HR)", head: "Alice Johnson", members: 3 },
  { id: "3", name: "CEO Office", head: "Loice Mugwe", members: 2 },
  { id: "4", name: "Finance Department", head: "Robert Brown", members: 4 },
];

const AdminDepartmentsPage: NextPage = () => {
  const { toast } = useToast();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState<Department | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Form states
  const [deptName, setDeptName] = useState("");
  const [deptHead, setDeptHead] = useState("");
  const [deptMembers, setDeptMembers] = useState<number | string>(""); // Allow string for input

  useEffect(() => {
    setIsMounted(true);
    try {
      const storedDepartments = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedDepartments) {
        setDepartments(JSON.parse(storedDepartments));
      } else {
        setDepartments(initialDepartmentsData);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialDepartmentsData));
      }
    } catch (error) {
      console.error("Failed to load departments from localStorage", error);
      setDepartments(initialDepartmentsData);
    }
  }, []);

  useEffect(() => {
    if (isMounted && departments.length >= 0) { // Save even if empty
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(departments));
      } catch (error) {
        console.error("Failed to save departments to localStorage", error);
      }
    }
  }, [departments, isMounted]);

  const resetForm = () => {
    setDeptName("");
    setDeptHead("");
    setDeptMembers("");
    setCurrentDepartment(null);
  };

  const handleAddDepartment = (e: FormEvent) => {
    e.preventDefault();
    const membersCount = parseInt(String(deptMembers), 10);
    if (isNaN(membersCount) || membersCount < 0) {
      toast({ title: "Invalid Input", description: "Number of members must be a non-negative number.", variant: "destructive" });
      return;
    }
    const newDepartment: Department = {
      id: String(Date.now()),
      name: deptName,
      head: deptHead,
      members: membersCount,
    };
    setDepartments(prev => [newDepartment, ...prev]);
    toast({ title: "Department Added", description: `"${newDepartment.name}" has been added.` });
    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleEditDepartment = (e: FormEvent) => {
    e.preventDefault();
    if (!currentDepartment) return;
    const membersCount = parseInt(String(deptMembers), 10);
    if (isNaN(membersCount) || membersCount < 0) {
      toast({ title: "Invalid Input", description: "Number of members must be a non-negative number.", variant: "destructive" });
      return;
    }
    const updatedDepartment = { ...currentDepartment, name: deptName, head: deptHead, members: membersCount };
    setDepartments(prev => prev.map(d => d.id === updatedDepartment.id ? updatedDepartment : d));
    toast({ title: "Department Updated", description: `"${updatedDepartment.name}" has been updated.` });
    resetForm();
    setIsEditDialogOpen(false);
  };

  const openEditDialog = (department: Department) => {
    setCurrentDepartment(department);
    setDeptName(department.name);
    setDeptHead(department.head);
    setDeptMembers(department.members);
    setIsEditDialogOpen(true);
  };

  const handleDeleteDepartment = (departmentId: string) => {
    const departmentToDelete = departments.find(d => d.id === departmentId);
    setDepartments(prev => prev.filter(d => d.id !== departmentId));
    toast({ title: "Department Deleted", description: `Department "${departmentToDelete?.name || ''}" has been deleted.`, variant: "destructive" });
  };

  if (!isMounted) {
    return null; // Avoid rendering until localStorage is potentially loaded
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Departments</h2>
          <p className="text-muted-foreground">Manage company departments and roles.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={(isOpen) => { setIsAddDialogOpen(isOpen); if (!isOpen) resetForm(); }}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsAddDialogOpen(true); }}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Department
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
              <DialogTitle>Add New Department</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddDepartment} className="space-y-4 py-4">
              <div>
                <Label htmlFor="deptName">Department Name</Label>
                <Input id="deptName" value={deptName} onChange={e => setDeptName(e.target.value)} placeholder="e.g., Marketing" required />
              </div>
              <div>
                <Label htmlFor="deptHead">Department Head</Label>
                <Input id="deptHead" value={deptHead} onChange={e => setDeptHead(e.target.value)} placeholder="e.g., Jane Doe" required />
              </div>
              <div>
                <Label htmlFor="deptMembers">Number of Members</Label>
                <Input id="deptMembers" type="number" value={deptMembers} onChange={e => setDeptMembers(e.target.value)} placeholder="e.g., 5" required min="0" />
              </div>
              <DialogFooter>
                <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
                <Button type="submit">Add Department</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {departments.map((dept) => (
          <Card key={dept.id} className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>{dept.name}</CardTitle>
              <CardDescription>Headed by: {dept.head}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Members: {dept.members}</p>
              <div className="mt-4 flex gap-2 flex-wrap">
                <Button variant="outline" size="sm" onClick={() => openEditDialog(dept)}>
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
                        This action cannot be undone. This will permanently delete the department
                        "{dept.name}".
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteDepartment(dept.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {departments.length === 0 && (
         <p className="text-center text-muted-foreground py-8">No departments found. Add some!</p>
      )}

      <Dialog open={isEditDialogOpen} onOpenChange={(isOpen) => { setIsEditDialogOpen(isOpen); if(!isOpen) resetForm(); }}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Edit Department</DialogTitle>
          </DialogHeader>
          {currentDepartment && (
            <form onSubmit={handleEditDepartment} className="space-y-4 py-4">
               <div>
                <Label htmlFor="editDeptName">Department Name</Label>
                <Input id="editDeptName" value={deptName} onChange={e => setDeptName(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="editDeptHead">Department Head</Label>
                <Input id="editDeptHead" value={deptHead} onChange={e => setDeptHead(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="editDeptMembers">Number of Members</Label>
                <Input id="editDeptMembers" type="number" value={deptMembers} onChange={e => setDeptMembers(e.target.value)} required min="0" />
              </div>
              <DialogFooter>
                <DialogClose asChild><Button type="button" variant="outline" onClick={resetForm}>Cancel</Button></DialogClose>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
      
      <Card className="mt-6 shadow-sm">
        <CardHeader>
            <CardTitle>Developer Note (LocalStorage Prototyping)</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground">
                Department data is currently managed using the browser's <strong>localStorage</strong>. This means changes will persist in your current browser but are not shared and will be lost if you clear your browser data.
                For a production application, this would be integrated with a backend database.
            </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDepartmentsPage;

    