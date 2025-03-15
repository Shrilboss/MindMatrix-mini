
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon, Zap } from 'lucide-react';

interface Activity {
  icon: LucideIcon;
  text: string;
  timestamp: string;
}

interface Program {
  title: string;
  participants?: number;
  status: 'live' | 'scheduled';
  time?: string;
  link: string;
}

interface ActivityCardsProps {
  recentActivities: Activity[];
  upcomingPrograms: Program[];
}

const ActivityCards = ({ recentActivities, upcomingPrograms }: ActivityCardsProps) => {
  return (
    <div className="space-y-4">
      {/* Recent Activities Card */}
      <Card className="bg-blue-50 dark:bg-blue-950/20">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm">Recent Activities</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3">
            {recentActivities.slice(0, 2).map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="bg-primary/10 p-1.5 rounded-full">
                  <activity.icon className="h-3.5 w-3.5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium">{activity.text}</p>
                  <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Live Programs Card */}
      <Card className="bg-purple-50 dark:bg-purple-950/20">
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-sm">Live Programs</CardTitle>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3">
            {upcomingPrograms.map((program, index) => (
              <div key={index} className="rounded-lg border p-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-medium flex items-center">
                      {program.title}
                      {program.status === 'live' && (
                        <span className="ml-1.5 inline-flex items-center rounded-full bg-green-100 px-1.5 py-0.5 text-[10px] font-medium text-green-800">
                          <span className="mr-0.5 h-1 w-1 rounded-full bg-green-500"></span>
                          LIVE
                        </span>
                      )}
                    </h4>
                    <p className="text-[10px] text-muted-foreground">
                      {program.status === 'live' 
                        ? `${program.participants} participants joined` 
                        : program.time
                      }
                    </p>
                  </div>
                  <Button 
                    variant={program.status === 'live' ? "default" : "outline"} 
                    size="sm" 
                    className="h-6 text-[10px]"
                    asChild
                  >
                    <a href={program.link}>
                      {program.status === 'live' ? (
                        <><Zap className="h-3 w-3 mr-1" /> Join Now</>
                      ) : 'Remind Me'}
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityCards;
