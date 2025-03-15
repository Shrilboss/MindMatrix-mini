
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  ChevronUp, 
  ChevronDown, 
  Trophy, 
  Calendar, 
  Plus,
  Target,
  CheckCircle2
} from 'lucide-react';

interface Milestone {
  date: string;
  title: string;
  description: string;
  isCompleted: boolean;
  impact?: string;
}

interface MilestoneTrackerProps {
  milestones: Milestone[];
  nextMilestone: {
    title: string;
    daysLeft: number;
    requiredHours: number;
  };
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const MilestoneTracker = ({ 
  milestones, 
  nextMilestone, 
  isExpanded, 
  setIsExpanded 
}: MilestoneTrackerProps) => {
  return (
    <Collapsible
      open={isExpanded}
      onOpenChange={setIsExpanded}
      className="w-full"
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between py-4">
          <div>
            <CardTitle className="text-xl">Your Milestone Journey</CardTitle>
            <CardDescription>Track your achievements and upcoming challenges</CardDescription>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
        </CardHeader>
          
        <CollapsibleContent>
          <CardContent className="space-y-6 pb-8">
            {/* Next Milestone */}
            <div className="p-4 border rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100">
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-amber-800">Next Milestone: {nextMilestone.title}</h3>
                  <p className="text-sm text-amber-700 mt-1">
                    {nextMilestone.daysLeft} days left • {nextMilestone.requiredHours} hours of focused learning needed
                  </p>
                  <div className="mt-2">
                    <Button variant="outline" size="sm" className="bg-white/50 border-amber-200 text-amber-700 hover:bg-white/70 hover:text-amber-800">
                      Plan Your Schedule
                    </Button>
                  </div>
                </div>
              </div>
            </div>
              
            {/* Milestone Timeline */}
            <div className="pt-2">
              <h4 className="font-medium mb-4 flex items-center text-lg">
                <Trophy className="h-5 w-5 mr-2 text-primary" />
                Your Achievement Timeline
              </h4>
              <div className="space-y-4 relative before:absolute before:inset-y-0 before:left-3 before:w-0.5 before:bg-muted">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start gap-4 pl-6 relative before:absolute before:left-3 before:top-1.5 before:h-2 before:w-2 before:rounded-full"
                    style={{ 
                      ['--before-bg' as any]: milestone.isCompleted ? 'var(--color-primary)' : 'var(--color-muted)', 
                      ['before:bg' as any]: 'var(--before-bg)' 
                    }}
                  >
                    <div className={`text-xs font-medium py-1 px-2 rounded ${
                      milestone.isCompleted 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-muted/50 text-muted-foreground'
                    }`}>
                      {milestone.date}
                    </div>
                    <div>
                      <p className={`text-sm ${milestone.isCompleted ? 'font-medium' : ''}`}>
                        {milestone.title}
                        {milestone.isCompleted && <CheckCircle2 className="h-3.5 w-3.5 inline-block ml-1.5 text-green-500" />}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">{milestone.description}</p>
                      {milestone.impact && (
                        <p className="text-xs text-green-600 mt-1 font-medium">{milestone.impact}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
                
              <div className="mt-6 text-center">
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Set a Personal Milestone
                </Button>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default MilestoneTracker;
