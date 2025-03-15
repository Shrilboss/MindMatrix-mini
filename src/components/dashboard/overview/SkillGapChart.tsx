
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import { Button } from '@/components/ui/button';
import { ArrowUp, Star, Zap } from 'lucide-react';

interface SkillData {
  subject: string;
  currentLevel: number;
  startLevel: number;
  targetLevel: number;
  industryStandard: number;
}

interface SkillGapChartProps {
  skillData: SkillData[];
  mostImprovedSkill: {
    name: string;
    improvement: number;
  };
}

const SkillGapChart = ({ skillData, mostImprovedSkill }: SkillGapChartProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Your Personal Skill Journey</CardTitle>
            <CardDescription>
              Track your growth from where you started to where you're heading
            </CardDescription>
          </div>
          <div className="bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
            <span className="text-sm font-medium text-blue-700 flex items-center">
              <ArrowUp className="h-4 w-4 mr-1 text-blue-700" />
              {mostImprovedSkill.improvement}% growth in {mostImprovedSkill.name}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar 
                  name="Where You Started" 
                  dataKey="startLevel" 
                  stroke="#9e9e9e" 
                  fill="#9e9e9e" 
                  fillOpacity={0.2} 
                />
                <Radar 
                  name="Current Level" 
                  dataKey="currentLevel" 
                  stroke="#4CAF50" 
                  fill="#4CAF50" 
                  fillOpacity={0.5} 
                />
                <Radar 
                  name="Your Target" 
                  dataKey="targetLevel" 
                  stroke="#3F51B5" 
                  fill="#3F51B5" 
                  fillOpacity={0.1} 
                  strokeDasharray="5 5"
                />
                <Radar 
                  name="Industry Standard" 
                  dataKey="industryStandard" 
                  stroke="#888888" 
                  fill="none"
                  strokeDasharray="3 3"
                />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-md">
              <h3 className="text-sm font-semibold mb-2 flex items-center">
                <Zap className="h-4 w-4 mr-1.5 text-blue-700" />
                <span className="text-blue-800">Focus Areas This Week</span>
              </h3>
              <ul className="space-y-3">
                {skillData
                  .sort((a, b) => (b.targetLevel - b.currentLevel) - (a.targetLevel - a.currentLevel))
                  .slice(0, 3)
                  .map((skill, index) => (
                    <li key={index} className="text-xs flex flex-col">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-blue-800">{skill.subject}</span>
                        <span className="text-blue-700">{skill.currentLevel}% → {skill.targetLevel}%</span>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-1.5">
                        <div 
                          className="bg-blue-600 h-1.5 rounded-full" 
                          style={{ width: `${skill.currentLevel}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-blue-700 mt-1">
                        +5% boost with 3 hours of focused learning
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
            
            <div className="p-4 bg-green-50 border border-green-100 rounded-md">
              <h3 className="text-sm font-semibold mb-2 flex items-center">
                <Star className="h-4 w-4 mr-1.5 text-green-700" />
                <span className="text-green-800">Your Strengths</span>
              </h3>
              <ul className="space-y-2">
                {skillData
                  .sort((a, b) => b.currentLevel - a.currentLevel)
                  .slice(0, 2)
                  .map((skill, index) => (
                    <li key={index} className="text-xs flex justify-between items-center">
                      <span className="text-green-800">{skill.subject}</span>
                      <span className="font-medium text-green-700">{skill.currentLevel}%</span>
                    </li>
                  ))}
              </ul>
              <p className="text-xs text-green-700 mt-3">
                Your {skillData.sort((a, b) => b.currentLevel - a.currentLevel)[0].subject} skills 
                are in the top 25% of all users!
              </p>
            </div>
            
            <Button className="w-full" size="sm">
              Get Personalized Skill Plan
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillGapChart;
