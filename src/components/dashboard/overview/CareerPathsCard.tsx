
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CareerOpportunity {
  role: string;
  progress: number;
  requiredSkills: string[];
}

interface CareerPathsCardProps {
  opportunities: CareerOpportunity[];
}

const CareerPathsCard = ({ opportunities }: CareerPathsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Target className="h-5 w-5 mr-2 text-[#3F51B5]" />
          Career Paths Within Reach
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {opportunities.map((opportunity, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">{opportunity.role}</h3>
                <span className="text-xs">{opportunity.progress}% ready</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={cn(
                    "h-2 rounded-full",
                    opportunity.progress >= 70 ? "bg-[#4CAF50]" : 
                    opportunity.progress >= 50 ? "bg-amber-500" : "bg-[#FF7043]"
                  )}
                  style={{ width: `${opportunity.progress}%` }}
                ></div>
              </div>
              <div className="flex flex-wrap gap-1">
                {opportunity.requiredSkills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex} 
                    className="text-xs px-2 py-0.5 rounded-full bg-gray-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-full mt-2">
            Explore More Career Paths
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CareerPathsCard;
