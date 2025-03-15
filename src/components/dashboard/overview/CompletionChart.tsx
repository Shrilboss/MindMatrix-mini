
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Clock, Calendar, CheckCircle2 } from 'lucide-react';

// Define COLORS array for pie chart
const COLORS = ['#4CAF50', '#e0e0e0'];

interface CompletionChartProps {
  completionData: {
    name: string;
    value: number;
  }[];
  timeInvestment: {
    current: number;
    target: number;
    unit: string;
  };
  estimatedCompletion: {
    date: string;
    daysLeft: number;
  };
  consistencyStreak: number;
}

const CompletionChart = ({ 
  completionData, 
  timeInvestment,
  estimatedCompletion,
  consistencyStreak
}: CompletionChartProps) => {
  // Calculate percentage of target met
  const percentOfTarget = Math.round((timeInvestment.current / timeInvestment.target) * 100);
  const isTargetExceeded = percentOfTarget > 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Learning Journey Progress</CardTitle>
        <CardDescription>
          Track your dedication and progress towards completion
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-[250px] flex items-center justify-center">
            <div className="relative">
              <ResponsiveContainer width={200} height={200}>
                <PieChart>
                  <Pie
                    data={completionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {completionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Completion']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">{completionData[0].value}%</span>
                <span className="text-xs text-muted-foreground">Complete</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 border rounded-md bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
              <h3 className="text-sm font-semibold mb-2 flex items-center">
                <CheckCircle2 className="h-4 w-4 mr-1.5 text-green-600" />
                <span className="text-green-800">Your Dedication</span>
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-green-700">Weekly Time Investment</span>
                    <span className={`font-medium ${isTargetExceeded ? 'text-green-700' : 'text-amber-600'}`}>
                      {timeInvestment.current} / {timeInvestment.target} {timeInvestment.unit}
                    </span>
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-1.5">
                    <div 
                      className={`${isTargetExceeded ? 'bg-green-600' : 'bg-amber-500'} h-1.5 rounded-full`} 
                      style={{ width: `${Math.min(percentOfTarget, 100)}%` }}
                    />
                  </div>
                  <p className="text-[10px] mt-1 text-green-700">
                    {isTargetExceeded 
                      ? `Amazing! You've exceeded your weekly target by ${percentOfTarget - 100}%` 
                      : `${100 - percentOfTarget}% more to reach your weekly goal`}
                  </p>
                </div>
                
                <div className="flex items-center justify-between text-xs border-t border-green-200 pt-2 mt-2">
                  <span className="text-green-700">Consistency Streak</span>
                  <span className="font-medium text-green-700">{consistencyStreak} days</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 border rounded-md bg-blue-50 border-blue-100">
              <h3 className="text-sm font-semibold mb-2 flex items-center">
                <Calendar className="h-4 w-4 mr-1.5 text-blue-600" />
                <span className="text-blue-800">Your Timeline</span>
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-blue-700">Estimated Completion</span>
                  <span className="font-medium text-blue-700">{estimatedCompletion.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Days Remaining</span>
                  <span className="font-medium text-blue-700">{estimatedCompletion.daysLeft} days</span>
                </div>
                <p className="text-[10px] mt-1 text-blue-700">
                  Adding just 1 more hour per week would complete your journey 7 days sooner!
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompletionChart;
