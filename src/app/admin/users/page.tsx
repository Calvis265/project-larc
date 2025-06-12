
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, Edit3, Trash2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const USER_ROLES = ["Administrator", "Editor", "Viewer", "Contributor"];
const LOCAL_STORAGE_KEY = "larchcodeHubUsers";

const initialUsersData: User[] = [
  { id: "1", name: "Alice Wonderland", email: "alice@example.com", role: "Administrator" },
  { id: "2", name: "Bob The Builder", email: "bob@example.com", role: "Editor" },
  { id: "3", name: "Charlie Brown", email: "charlie@example.com", role: "Viewer" },
];

const AdminUsersPage: NextPage = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Form states
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    setIsMounted(true);
    try {
      const storedUsers = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      } else {
        setUsers(initialUsersData);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialUsersData));
      }
    } catch (error) {
      console.error("Failed to load users from localStorage", error);
      setUsers(initialUsersData);
    }
  }, []);

  useEffect(() => {
    if (isMounted && users.length >=0) { // Save even if empty
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
      } catch (error) {
        console.error("Failed to save users to localStorage", error);
      }
    }
  }, [users, isMounted]);

  const resetForm = () => {
    setUserName("");
    setUserEmail("");
    setUserRole("");
    setCurrentUser(null);
  };

  const handleAddUser = (e: FormEvent) => {
    e.preventDefault();
    if (!USER_ROLES.includes(userRole)) {
        toast({ title: "Invalid Role", description: "Please select a valid role.", variant: "destructive"});
        return;
    }
    const newUser: User = {
      id: String(Date.now()),
      name: userName,
      email: userEmail,
      role: userRole,
    };
    setUsers(prev => [newUser, ...prev]);
    toast({ title: "User Added", description: `User "${newUser.name}" has been added.` });
    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleEditUser = (e: FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
     if (!USER_ROLES.includes(userRole)) {
        toast({ title: "Invalid Role", description: "Please select a valid role.", variant: "destructive"});
        return;
    }
    const updatedUser = { ...currentUser, name: userName, email: userEmail, role: userRole };
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    toast({ title: "User Updated", description: `User "${updatedUser.name}" has been updated.` });
    resetForm();
    setIsEditDialogOpen(false);
  };

  const openEditDialog = (user: User) => {
    setCurrentUser(user);
    setUserName(user.name);
    setUserEmail(user.email);
    setUserRole(user.role);
    setIsEditDialogOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    const userToDelete = users.find(u => u.id === userId);
    setUsers(prev => prev.filter(u => u.id !== userId));
    toast({ title: "User Deleted", description: `User "${userToDelete?.name || ''}" has been deleted.`, variant: "destructive" });
  };
  
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isMounted) {
    return null; 
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">User Management</h2>
          <p className="text-muted-foreground">Manage user accounts and permissions.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={(isOpen) => { setIsAddDialogOpen(isOpen); if (!isOpen) resetForm(); }}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setUserRole(USER_ROLES[0] || ""); setIsAddDialogOpen(true); }}>
              <UserPlus className="mr-2 h-4 w-4" /> Add New User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddUser} className="space-y-4 py-4">
              <div>
                <Label htmlFor="userName">Full Name</Label>
                <Input id="userName" value={userName} onChange={e => setUserName(e.target.value)} placeholder="e.g., John Doe" required />
              </div>
              <div>
                <Label htmlFor="userEmail">Email Address</Label>
                <Input id="userEmail" type="email" value={userEmail} onChange={e => setUserEmail(e.target.value)} placeholder="e.g., john.doe@example.com" required />
              </div>
              <div>
                <Label htmlFor="userRole">Role</Label>
                <Select value={userRole} onValueChange={setUserRole}>
                  <SelectTrigger id="userRole">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {USER_ROLES.map(role => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
                <Button type="submit">Add User</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>View, manage, and search all registered users.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <Input 
              placeholder="Search users by name, email, or role..." 
              className="max-w-sm" 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <Button variant="outline" size="icon" onClick={() => setSearchTerm("")} disabled={!searchTerm}>
              {searchTerm ? <Trash2 className="h-4 w-4" /> : <Search className="h-4 w-4"/>}
            </Button>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(user)}>
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
                              This action cannot be undone. This will permanently delete the user
                              "{user.name}".
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteUser(user.id)}>
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
          {filteredUsers.length === 0 && (
             <p className="text-center text-muted-foreground py-8">
                {users.length > 0 && searchTerm ? "No users match your search." : "No users found. Add some!"}
             </p>
           )}
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={(isOpen) => { setIsEditDialogOpen(isOpen); if(!isOpen) resetForm(); }}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          {currentUser && (
            <form onSubmit={handleEditUser} className="space-y-4 py-4">
               <div>
                <Label htmlFor="editUserName">Full Name</Label>
                <Input id="editUserName" value={userName} onChange={e => setUserName(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="editUserEmail">Email Address</Label>
                <Input id="editUserEmail" type="email" value={userEmail} onChange={e => setUserEmail(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="editUserRole">Role</Label>
                <Select value={userRole} onValueChange={setUserRole}>
                  <SelectTrigger id="editUserRole">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {USER_ROLES.map(role => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                User data is currently managed using the browser's <strong>localStorage</strong>. This means changes will persist in your current browser but are not shared and will be lost if you clear your browser data.
                For a production application, this would be integrated with a backend database and proper authentication.
            </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsersPage;
    