
import { useState } from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BadgeIndianRupee } from 'lucide-react';
import { Program } from '@/types/auth';
import { Module, Mentor } from '@/types/program';

// Import our new components
import ProgramOverviewTab from './program-detail/ProgramOverviewTab';
import ProgramModulesTab from './program-detail/ProgramModulesTab';
import ProgramMentorsTab from './program-detail/ProgramMentorsTab';

interface ProgramDetailViewProps {
  isOpen: boolean;
  onClose: () => void;
  program: Program | null;
}

const ProgramDetailView = ({ isOpen, onClose, program }: ProgramDetailViewProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  if (!program) return null;

  // Mock data for modules and mentors if not provided
  const modules = program.modules || [
    {
      id: 'mod1',
      title: 'Fundamentals and Basics',
      sessions: [
        {
          id: 'ses1',
          title: 'Introduction to the Program',
          duration: '1.5 hours',
          tasks: ['Setup development environment', 'Complete pre-assessment quiz'],
          materials: ['Introduction slides', 'Getting started guide']
        },
        {
          id: 'ses2',
          title: 'Core Concepts Overview',
          duration: '2 hours',
          tasks: ['Implement basic algorithm', 'Submit concept map'],
          materials: ['Core concepts PDF', 'Video tutorial links']
        },
        {
          id: 'ses3',
          title: 'Practical Application',
          duration: '3 hours',
          tasks: ['Build mini-project', 'Peer review'],
          materials: ['Project requirements doc', 'Code samples']
        }
      ]
    },
    {
      id: 'mod2',
      title: 'Advanced Techniques',
      sessions: [
        {
          id: 'ses4',
          title: 'Advanced Implementation Strategies',
          duration: '2.5 hours',
          tasks: ['Implement advanced features', 'Write technical document'],
          materials: ['Advanced techniques handbook', 'Case studies']
        },
        {
          id: 'ses5',
          title: 'Optimization and Best Practices',
          duration: '2 hours',
          tasks: ['Optimize existing implementation', 'Performance testing'],
          materials: ['Optimization guide', 'Testing framework documentation']
        }
      ]
    },
    {
      id: 'mod3',
      title: 'Industry Applications',
      sessions: [
        {
          id: 'ses6',
          title: 'Real-world Case Studies',
          duration: '3 hours',
          tasks: ['Analyze industry case', 'Propose solutions'],
          materials: ['Industry reports', 'Analysis framework']
        },
        {
          id: 'ses7',
          title: 'Final Project and Assessment',
          duration: '4 hours',
          tasks: ['Complete final project', 'Present findings', 'Final assessment'],
          materials: ['Project guidelines', 'Rubric', 'Submission template']
        }
      ]
    }
  ];

  const mentors = program.mentors || [
    {
      id: 'ment1',
      name: 'Dr. Priya Sharma',
      image: '/placeholder.svg',
      title: 'Senior AI Researcher',
      experience: '12+ years',
      industry: 'AI and Machine Learning',
      expertise: ['Deep Learning', 'Computer Vision', 'Natural Language Processing'],
      studentsCount: 1200,
      ratings: 4.8,
      testimonials: [
        {
          text: "Dr. Sharma's deep knowledge and practical teaching approach helped me land my dream job at a top tech company.",
          student: 'Rahul Verma, Data Scientist',
          rating: 5
        },
        {
          text: 'The way complex concepts were simplified made a huge difference in my learning journey.',
          student: 'Anjali Mehta, ML Engineer',
          rating: 4.5
        }
      ]
    },
    {
      id: 'ment2',
      name: 'Prof. Vikram Singh',
      image: '/placeholder.svg',
      title: 'Industry Expert',
      experience: '15+ years',
      industry: 'Software Engineering and Cloud Computing',
      expertise: ['Cloud Architecture', 'DevOps', 'System Design'],
      studentsCount: 950,
      ratings: 4.7,
      testimonials: [
        {
          text: 'Prof. Singh brings real industry problems to the classroom, which prepared me for actual work scenarios.',
          student: 'Arjun Reddy, Cloud Engineer',
          rating: 5
        }
      ]
    }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-3xl overflow-y-auto" side="right">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl">{program.title}</SheetTitle>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="font-normal">
              {program.type}
            </Badge>
            {program.credits && (
              <Badge variant="secondary" className="font-normal">
                {program.credits} Credits
              </Badge>
            )}
            <div className="text-sm text-muted-foreground ml-auto flex items-center">
              <BadgeIndianRupee className="h-3.5 w-3.5 mr-1" />
              {program.price}
            </div>
          </div>
        </SheetHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="modules">Modules</TabsTrigger>
            <TabsTrigger value="mentors">Mentors</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <ProgramOverviewTab program={program} />
          </TabsContent>
          
          {/* Modules Tab */}
          <TabsContent value="modules" className="mt-6 space-y-6">
            <ProgramModulesTab modules={modules} />
          </TabsContent>
          
          {/* Mentors Tab */}
          <TabsContent value="mentors" className="mt-6 space-y-6">
            <ProgramMentorsTab mentors={mentors} />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default ProgramDetailView;
