
import { UserProfile } from "@/types/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CommunityProps {
  user: UserProfile;
}

const Community = ({ user }: CommunityProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Community</h1>
        <p className="text-muted-foreground">
          Connect with other learners, faculty, and industry professionals
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Community Forum</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The Community feature is coming soon. Here you'll be able to interact with peers, join special interest groups,
            share posts, and network with professionals in your field.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Community;
