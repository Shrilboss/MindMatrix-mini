
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LightbulbIcon, ArrowRight, Clock, Trophy, ArrowUpRight, Sparkles } from 'lucide-react';

interface ActionItem {
  title: string;
  description: string;
  impact: string;
  timeRequired: string;
  skillsTargeted: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'task' | 'module' | 'challenge';
}

interface NextBestActionProps {
  actionItems: ActionItem[];
}

const NextBestAction = ({ actionItems }: NextBestActionProps) => {
  // Get first item as primary recommendation, rest as alternatives
  const primaryAction = actionItems[0];
  const alternativeActions = actionItems.slice(1);

  // Map difficulty to colors
  const difficultyColors = {
    easy: 'bg-green-100 text-green-700',
    medium: 'bg-amber-100 text-amber-700',
    hard: 'bg-red-100 text-red-700'
  };

  // Map type to icons
  const typeIcons = {
    task: Clock,
    module: Trophy,
    challenge: Sparkles
  };

  return (
    <Card>
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-100">
        <div className="flex items-center">
          <LightbulbIcon className="h-6 w-6 mr-2 text-indigo-600" />
          <div>
            <CardTitle>Your Next Best Action</CardTitle>
            <CardDescription>
              Recommended based on your goals, progress, and learning patterns
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-5">
        <div className="space-y-5">
          {/* Primary Recommendation */}
          <div className="p-4 border rounded-lg shadow-sm bg-gradient-to-r from-white to-indigo-50/30">
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-lg flex items-center text-indigo-900">
                {React.createElement(typeIcons[primaryAction.type], { className: "h-5 w-5 mr-2 text-indigo-600" })}
                {primaryAction.title}
              </h3>
              <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColors[primaryAction.difficulty]}`}>
                {primaryAction.difficulty}
              </span>
            </div>
            
            <p className="text-sm mt-2 text-gray-600">{primaryAction.description}</p>
            
            <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-indigo-500" />
                <span>Est. time: {primaryAction.timeRequired}</span>
              </div>
              <div className="flex items-center">
                <ArrowUpRight className="h-4 w-4 mr-1 text-green-500" />
                <span className="text-green-700">Impact: {primaryAction.impact}</span>
              </div>
            </div>
            
            <div className="mt-3 flex flex-wrap gap-1">
              {primaryAction.skillsTargeted.map((skill, index) => (
                <span key={index} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
            
            <div className="mt-4">
              <Button className="w-full">
                Start Now
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
          
          {/* Alternative Options */}
          <div>
            <h4 className="text-sm font-medium mb-3 text-gray-600">Other high-impact options:</h4>
            <div className="space-y-2">
              {alternativeActions.map((action, index) => (
                <div key={index} className="p-3 border rounded bg-gray-50 flex justify-between items-center">
                  <div className="flex items-center">
                    {React.createElement(typeIcons[action.type], { className: "h-4 w-4 mr-2 text-indigo-500" })}
                    <span className="text-sm">{action.title}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NextBestAction;
