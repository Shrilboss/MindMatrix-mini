
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  Calendar, 
  BadgeIndianRupee, 
  Users,
  TrendingUp
} from 'lucide-react';
import { Program } from '@/types/auth';

interface ProgramOverviewTabProps {
  program: Program;
}

const ProgramOverviewTab = ({ program }: ProgramOverviewTabProps) => {
  return (
    <div className="space-y-6">
      <div className="aspect-video rounded-lg overflow-hidden bg-muted">
        <img 
          src={program.image} 
          alt={program.title} 
          className="w-full h-full object-cover" 
        />
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">About This Program</h3>
        <p className="text-sm text-muted-foreground">{program.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex items-start gap-2">
            <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium">Duration</p>
              <p className="text-sm text-muted-foreground">{program.duration}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium">Enrolled Learners</p>
              <p className="text-sm text-muted-foreground">{program.enrolledLearners}</p>
            </div>
          </div>
          
          {program.startDate && (
            <div className="flex items-start gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Start Date</p>
                <p className="text-sm text-muted-foreground">{program.startDate}</p>
              </div>
            </div>
          )}
          
          {program.popularity && (
            <div className="flex items-start gap-2">
              <TrendingUp className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Popularity</p>
                <p className="text-sm text-muted-foreground">{program.popularity}% among peers</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="pt-4 border-t">
        <Button className="w-full">Enroll Now</Button>
      </div>
    </div>
  );
};

export default ProgramOverviewTab;
