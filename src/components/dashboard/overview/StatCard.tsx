
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  progress?: {
    current: number;
    max: number;
  };
  helpText?: {
    warning?: string;
    success?: string;
  };
  className?: string;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
  progress,
  helpText,
  className,
}: StatCardProps) => {
  return (
    <Card className={cn(`overflow-hidden border-t-4 border-t-[${color}]`, className)}>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium">
            {title}
          </CardTitle>
          <Icon className={`h-4 w-4 text-[${color}]`} />
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="text-2xl font-bold">{value}</div>
        {progress && (
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className={`bg-[${color}] h-2 rounded-full`} 
              style={{ width: `${(progress.current / progress.max) * 100}%` }}
            ></div>
          </div>
        )}
        {helpText?.warning && (
          <p className="text-xs mt-1 text-[#FF7043]">
            {helpText.warning}
          </p>
        )}
        {helpText?.success && (
          <p className="text-xs mt-1 text-[#4CAF50]">
            {helpText.success}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
