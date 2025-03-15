
import { UserProfile } from "@/types/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SettingsProps {
  user: UserProfile;
}

const Settings = ({ user }: SettingsProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and settings
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The Settings feature is coming soon. Here you'll be able to update your profile information,
            notification preferences, privacy settings, and other account configurations.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
