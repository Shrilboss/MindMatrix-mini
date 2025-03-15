
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flame, ArrowRight } from 'lucide-react';

interface StreakFooterProps {
  streakDays: number;
}

const StreakFooter = ({ streakDays }: StreakFooterProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="bg-orange-100 rounded-full p-3">
              <Flame className="h-6 w-6 text-[#FF7043]" />
            </div>
            <div>
              <h3 className="text-sm font-medium">Current Streak: {streakDays} days</h3>
              <p className="text-xs text-[#FF7043]">Don't break your streak! Miss a day, and you lose the bonus.</p>
              <p className="text-xs text-[#4CAF50]">Keep going 3 more days to unlock a bonus certificate!</p>
            </div>
          </div>
          
          <div className="border-l pl-4 hidden md:block h-16"></div>
          
          <div className="md:flex-1 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-sm font-medium">Finalize Your Next Step</h3>
              <p className="text-xs text-[#FF7043]">You risk falling 2 modules behind your weekly goal</p>
            </div>
            <Button className="mt-2 md:mt-0" size="sm">
              Continue Learning <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreakFooter;
