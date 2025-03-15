
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TrendingUp, Award } from 'lucide-react';

interface SkillProgressData {
  date: string;
  score: number;
  target: number;
}

interface PersonalGrowthChartProps {
  skillProgressData: SkillProgressData[];
  skillName: string;
  improvementRate: number;  // Percentage improvement
  targetDate: string;
  daysToTarget: number;
}

const PersonalGrowthChart = ({ 
  skillProgressData, 
  skillName, 
  improvementRate, 
  targetDate,
  daysToTarget
}: PersonalGrowthChartProps) => {
  return (
    <Card className="border-t-4 border-t-[#4CAF50]">
      <CardHeader>
        <CardTitle>Your Growth Journey: {skillName}</CardTitle>
        <CardDescription>
          {improvementRate > 0 
            ? `You've improved ${improvementRate}% this month - keep going!` 
            : 'Track your progress over time'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={skillProgressData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <ReferenceLine 
                y={75} 
                label="Industry Standard" 
                stroke="#888888" 
                strokeDasharray="3 3" 
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#4CAF50" 
                strokeWidth={2}
                name="Your Skill Level" 
                dot={{ r: 4 }} 
                activeDot={{ r: 8 }}
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#888888" 
                strokeDasharray="5 5"
                name="Your Target" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-green-50 border border-green-100 rounded-md flex items-start space-x-3">
            <Award className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-green-800">Next Milestone</h4>
              <p className="text-xs text-green-700 mt-1">
                {daysToTarget <= 0 
                  ? "You're on track to reach your target today!" 
                  : `${daysToTarget} days to reach your next target (${targetDate})`}
              </p>
            </div>
          </div>
          
          <div className="p-3 bg-amber-50 border border-amber-100 rounded-md flex items-start space-x-3">
            <TrendingUp className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-amber-800">Growth Pace</h4>
              <p className="text-xs text-amber-700 mt-1">
                At your current pace, you'll reach expert level in 2 months
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalGrowthChart;
