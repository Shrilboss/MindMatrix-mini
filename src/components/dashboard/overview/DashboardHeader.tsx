
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bell, Gift } from 'lucide-react';

interface DashboardHeaderProps {
  userName?: string;
}

const DashboardHeader = ({ userName }: DashboardHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Your Journey at a Glance</h1>
        <p className="text-muted-foreground">
          Track your progress, see how you compare, and plan your next steps
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-[#FF7043]"></span>
        </Button>
        <Button variant="outline" size="sm">
          <Gift className="h-4 w-4 mr-2" />
          Rewards
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
