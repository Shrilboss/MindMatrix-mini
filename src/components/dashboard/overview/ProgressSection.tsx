
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChartContainer } from '@/components/ui/chart';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts';
import { ChevronUp, ChevronDown, TrendingUp, Trophy, Calendar, Plus } from 'lucide-react';

interface ProgressData {
  month: string;
  hours: number;
  tasks: number;
}

interface ProgressSectionProps {
  progressData: ProgressData[];
  chartConfig: any;
  isProgressExpanded: boolean;
  setIsProgressExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProgressSection = ({ 
  progressData, 
  chartConfig, 
  isProgressExpanded, 
  setIsProgressExpanded 
}: ProgressSectionProps) => {
  return (
    <Collapsible
      open={isProgressExpanded}
      onOpenChange={setIsProgressExpanded}
      className="w-full"
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between py-4">
          <div>
            <CardTitle className="text-xl">Your Progress</CardTitle>
            <CardDescription>Performance trajectory since joining MindMatrix</CardDescription>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              {isProgressExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
        </CardHeader>
          
        <CollapsibleContent>
          <CardContent className="space-y-8 pb-8">
            {/* Reduced Chart Height */}
            <div className="h-[130px]">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="hours" 
                      name="Hours Studied"
                      stroke="var(--color-hours)" 
                      activeDot={{ r: 8 }} 
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="tasks" 
                      name="Tasks Completed"
                      stroke="var(--color-tasks)" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
              
            {/* Status Cards - Now below the graph with clear separation */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-100 dark:border-green-800">
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-300">You're on track for a 15% skill improvement this month</p>
                    <p className="text-sm text-green-700 dark:text-green-400 mt-1">Keep up the great work! Your consistent study habits are paying off.</p>
                  </div>
                </div>
              </div>
                
              <div className="p-4 border rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-100 dark:border-blue-800">
                <div className="flex items-start gap-3">
                  <Trophy className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-800 dark:text-blue-300">You're #10 in Bangalore's rankings</p>
                    <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">Top 5 get special industry invites! Just 5 hours more study time to reach top 5.</p>
                  </div>
                </div>
              </div>
            </div>
              
            {/* Milestones - Clear section below status cards */}
            <div className="pt-2">
              <h4 className="font-medium mb-4 flex items-center text-lg">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                Key Milestones
              </h4>
              <div className="space-y-4 relative before:absolute before:inset-y-0 before:left-3 before:w-0.5 before:bg-muted">
                <div className="flex items-start gap-4 pl-6 relative before:absolute before:left-3 before:top-1.5 before:h-2 before:w-2 before:bg-primary before:rounded-full">
                  <div className="bg-primary/10 text-primary text-xs font-medium py-1 px-2 rounded">May 2022</div>
                  <p className="text-sm">Started B.Tech</p>
                </div>
                <div className="flex items-start gap-4 pl-6 relative before:absolute before:left-3 before:top-1.5 before:h-2 before:w-2 before:bg-primary before:rounded-full">
                  <div className="bg-primary/10 text-primary text-xs font-medium py-1 px-2 rounded">Jan 2023</div>
                  <p className="text-sm">Completed Data Science Course</p>
                </div>
                <div className="flex items-start gap-4 pl-6 relative before:absolute before:left-3 before:top-1.5 before:h-2 before:w-2 before:bg-green-500 before:rounded-full">
                  <div className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 text-xs font-medium py-1 px-2 rounded">Mar 2023</div>
                  <p className="text-sm font-medium text-green-700 dark:text-green-400">Reached Skill Level 50% in AI Fundamentals</p>
                </div>
              </div>
                
              <div className="mt-6 text-center">
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Ready for your next milestone? Check out advanced courses!
                </Button>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default ProgressSection;
