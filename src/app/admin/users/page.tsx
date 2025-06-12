
import type { NextPage } from "next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus, Search } from "lucide-react";

const AdminUsersPage: NextPage = () => {
  // Placeholder data
  const users = [
    { id: "1", name: "Alice Wonderland", email: "alice@example.com", role: "Administrator" },
    { id: "2", name: "Bob The Builder", email: "bob@example.com", role: "Editor" },
    { id: "3", name: "Charlie Brown", email: "charlie@example.com", role: "Viewer" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">User Management</h2>
          <p className="text-muted-foreground">Manage user accounts and permissions.</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" /> Add New User
        </Button>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>View and manage all registered users.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <Input placeholder="Search users..." className="max-w-sm" />
            <Button variant="outline" size="icon"><Search className="h-4 w-4"/></Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-muted/50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Role</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-background divide-y divide-border">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{user.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button variant="link" className="p-0 h-auto text-primary">Edit</Button>
                      <Button variant="link" className="p-0 h-auto text-destructive ml-2">Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Placeholder for pagination */}
          <div className="mt-4 text-center text-sm text-muted-foreground">Pagination (Coming Soon)</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsersPage;
