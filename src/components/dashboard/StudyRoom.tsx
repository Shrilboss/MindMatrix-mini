
import { UserProfile } from "@/types/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StudyRoomProps {
  user: UserProfile;
}

const StudyRoom = ({ user }: StudyRoomProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Study Room</h1>
        <p className="text-muted-foreground">
          Focus on your learning in a distraction-free environment
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Study Room</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The Study Room feature is coming soon. Here you'll be able to access focused study environments,
            collaborative sessions, and distraction-free learning spaces.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyRoom;
