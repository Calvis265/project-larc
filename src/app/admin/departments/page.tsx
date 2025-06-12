
import type { NextPage } from "next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const AdminDepartmentsPage: NextPage = () => {
  // Placeholder data
  const departments = [
    { id: "1", name: "ICT Department", head: "John Smith", members: 5 },
    { id: "2", name: "Human Resources (HR)", head: "Alice Johnson", members: 3 },
    { id: "3", name: "CEO Office", head: "Loice Mugwe", members: 2 },
    { id: "4", name: "Finance Department", head: "Robert Brown", members: 4 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Departments</h2>
          <p className="text-muted-foreground">Manage company departments and roles.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Department
        </Button>
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
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm">View Details</Button>
                <Button variant="ghost" size="sm" className="text-primary">Edit</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
       {/* Placeholder for a more detailed table or list view */}
        <Card className="mt-6 shadow-sm">
            <CardHeader>
                <CardTitle>All Departments List</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">A more detailed list or table of departments would go here, with options for sorting, filtering, etc. (Coming Soon)</p>
            </CardContent>
        </Card>
    </div>
  );
};

export default AdminDepartmentsPage;
