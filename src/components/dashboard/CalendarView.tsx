
import { UserProfile } from "@/types/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CalendarViewProps {
  user: UserProfile;
}

const CalendarView = ({ user }: CalendarViewProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">My Calendar</h1>
        <p className="text-muted-foreground">
          Manage your schedule and upcoming events
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The Calendar feature is coming soon. Here you'll be able to view and manage your program schedules,
            live sessions, upcoming events, and assessment dates.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarView;
