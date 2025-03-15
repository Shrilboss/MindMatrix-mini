
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Gauge, TrendingUp, Clock, Flame } from 'lucide-react';

interface PersonalEfficiencyCardProps {
  efficiencyData: {
    momentumScore: number;
    previousMomentumScore: number;
    taskCompletionRate: number;
    previousCompletionRate: number;
    timeToMastery: {
      hours: number;
      skill: string;
      targetLevel: number;
    };
    learningEfficiency: {
      current: number;
      change: number;
    };
  };
}

const PersonalEfficiencyCard = ({ efficiencyData }: PersonalEfficiencyCardProps) => {
  const momentumChange = efficiencyData.momentumScore - efficiencyData.previousMomentumScore;
  const completionRateChange = efficiencyData.taskCompletionRate - efficiencyData.previousCompletionRate;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Learning Efficiency</CardTitle>
        <CardDescription>
          Track your momentum and optimize your learning strategy
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="p-4 border rounded-md bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-100">
              <h3 className="text-sm font-semibold mb-3 flex items-center">
                <Flame className="h-4 w-4 mr-1.5 text-purple-600" />
                <span className="text-purple-800">Momentum Score</span>
              </h3>
              <div className="flex items-center mb-2">
                <div className="text-2xl font-bold text-purple-700">{efficiencyData.momentumScore}</div>
                <div className={`ml-2 text-xs px-1.5 py-0.5 rounded ${momentumChange >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  <span className="flex items-center">
                    {momentumChange >= 0 ? 
                      <TrendingUp className="h-3 w-3 mr-0.5" /> : 
                      <TrendingUp className="h-3 w-3 mr-0.5 transform rotate-180" />
                    }
                    {Math.abs(momentumChange)}%
                  </span>
                </div>
              </div>
              <div className="w-full bg-purple-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full" 
                  style={{ width: `${efficiencyData.momentumScore}%` }}
                />
              </div>
              <p className="text-xs text-purple-700 mt-2">
                Your momentum combines your consistency, improvement rate, and weekly focus hours
              </p>
            </div>
            
            <div className="p-4 border rounded-md bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100">
              <h3 className="text-sm font-semibold mb-2 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1.5 text-blue-600" />
                <span className="text-blue-800">Task Completion Rate</span>
              </h3>
              <div className="flex items-center mb-2">
                <div className="text-2xl font-bold text-blue-700">{efficiencyData.taskCompletionRate}%</div>
                <div className={`ml-2 text-xs px-1.5 py-0.5 rounded ${completionRateChange >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {completionRateChange >= 0 ? '↑' : '↓'} {Math.abs(completionRateChange)}%
                </div>
              </div>
              <p className="text-xs text-blue-700">
                You complete tasks faster than {75}% of learners at your level
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 border rounded-md bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
              <h3 className="text-sm font-semibold mb-2 flex items-center">
                <Clock className="h-4 w-4 mr-1.5 text-green-600" />
                <span className="text-green-800">Time to Mastery</span>
              </h3>
              <div className="flex flex-col">
                <div className="text-2xl font-bold text-green-700">{efficiencyData.timeToMastery.hours} hours</div>
                <p className="text-xs text-green-700 mt-1">
                  Until you reach {efficiencyData.timeToMastery.targetLevel}% mastery in {efficiencyData.timeToMastery.skill}
                </p>
                <div className="mt-2 text-xs text-green-700">
                  At your current pace of 5 hours/week, you'll reach this milestone in{' '}
                  <span className="font-medium">{Math.ceil(efficiencyData.timeToMastery.hours / 5)} weeks</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 border rounded-md bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-100">
              <h3 className="text-sm font-semibold mb-2 flex items-center">
                <Gauge className="h-4 w-4 mr-1.5 text-amber-600" />
                <span className="text-amber-800">Learning Efficiency</span>
              </h3>
              <div className="flex items-center mb-2">
                <div className="text-2xl font-bold text-amber-700">{efficiencyData.learningEfficiency.current}</div>
                <div className={`ml-2 text-xs px-1.5 py-0.5 rounded ${efficiencyData.learningEfficiency.change >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {efficiencyData.learningEfficiency.change >= 0 ? '↑' : '↓'} {Math.abs(efficiencyData.learningEfficiency.change)}
                </div>
              </div>
              <p className="text-xs text-amber-700">
                You gain {efficiencyData.learningEfficiency.current} skill points per hour of focused study
              </p>
              <div className="mt-2 text-xs text-amber-700">
                <strong>Pro tip:</strong> Taking a 5-minute break every 25 minutes can increase your efficiency by up to 20%
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalEfficiencyCard;
