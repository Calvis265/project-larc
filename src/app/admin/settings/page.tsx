
import type { NextPage } from "next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const AdminSettingsPage: NextPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Site Settings</h2>
        <p className="text-muted-foreground">Configure global settings for the application.</p>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="siteName">Site Name</Label>
            <Input id="siteName" defaultValue="Larchcode Hub" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="siteUrl">Site URL</Label>
            <Input id="siteUrl" defaultValue="https://www.larchcode.com" />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="maintenanceMode" />
            <Label htmlFor="maintenanceMode">Enable Maintenance Mode</Label>
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

       <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Appearance Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="primaryColor">Primary Color</Label>
            <Input id="primaryColor" type="color" defaultValue="#622C8F" className="w-24 h-10 p-1" />
          </div>
           <div className="flex items-center space-x-2">
            <Switch id="darkModeDefault" defaultChecked />
            <Label htmlFor="darkModeDefault">Enable Dark Mode by Default</Label>
          </div>
          <Button>Save Appearance</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettingsPage;
