
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Insight {
  text: string;
  relevance: 'high' | 'medium' | 'low';
}

interface TrendingInsightsProps {
  insights: Insight[];
}

const TrendingInsights = ({ insights }: TrendingInsightsProps) => {
  return (
    <Card className="bg-[#3F51B5]/5 border-none shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <Lightbulb className="h-5 w-5 text-[#3F51B5]" />
          <div className="overflow-hidden flex-1">
            <div className="flex space-x-6 animate-[slide_30s_linear_infinite]">
              {insights.map((insight, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "whitespace-nowrap px-4 py-1 rounded-full text-sm",
                    insight.relevance === "high" ? "bg-[#FF7043]/20 text-[#FF7043]" : 
                    insight.relevance === "medium" ? "bg-[#3F51B5]/20 text-[#3F51B5]" :
                    "bg-gray-100 text-gray-700"
                  )}
                >
                  {insight.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingInsights;
