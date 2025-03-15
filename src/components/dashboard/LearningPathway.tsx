import { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  BookMarked, 
  Briefcase,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Users,
  Clock,
  BadgeIndianRupee,
  Bell,
  TrendingUp,
  Zap,
  BarChart,
  Award,
  Star,
  Flame,
  Plus,
  Minus
} from 'lucide-react';
import { UserProfile, Program } from '@/types/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';
import ProgramDetailView from './ProgramDetailView';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from '@/lib/utils';

interface LearningPathwayProps {
  user: UserProfile;
}

const rotatingMessages = [
  {
    type: 'fomo',
    message: "Vikram just completed Data Science Essentials—and earned 150 coins!",
    icon: <Award className="h-4 w-4" />
  },
  {
    type: 'fomo',
    message: "Pratima soared to rank #3 on the ML leaderboard! Don't fall behind.",
    icon: <TrendingUp className="h-4 w-4" />
  },
  {
    type: 'hope',
    message: "You're up 5 ranks this week! Keep up the great work!",
    icon: <Flame className="h-4 w-4" />
  },
  {
    type: 'fomo',
    message: "Google hired 2 graduates with AI Visualization—are you next?",
    icon: <Briefcase className="h-4 w-4" />
  },
  {
    type: 'hope',
    message: "You're on track to earn a new certificate at this pace!",
    icon: <Star className="h-4 w-4" />
  }
];

const LearningPathway = ({ user }: LearningPathwayProps) => {
  const [activeCategory, setActiveCategory] = useState('aec');
  const [isProgramDetailOpen, setIsProgramDetailOpen] = useState(false);
  const [programDetailData, setProgramDetailData] = useState<Program | null>(null);
  const [rotatingMessageIndex, setRotatingMessageIndex] = useState(0);
  const [isRoadmapOpen, setIsRoadmapOpen] = useState(true);
  const [isCatalogOpen, setIsCatalogOpen] = useState(true);
  const [isLiveSessionsOpen, setIsLiveSessionsOpen] = useState(true);
  const [isLifeSkillsOpen, setIsLifeSkillsOpen] = useState(true);
  
  const [roadmapPrograms, setRoadmapPrograms] = useState<Program[]>([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingMessageIndex((prev) => (prev + 1) % rotatingMessages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const [recommendedPrograms] = useState<Program[]>([
    {
      id: '1',
      title: 'Advanced Data Visualization',
      type: 'Certification',
      description: 'Learn to create powerful data visualizations with modern tools',
      image: '/placeholder.svg',
      popularity: 92,
      price: 4999,
      enrolledLearners: 1245,
      recommendationReason: '78% of your year students have opted for this program'
    },
    {
      id: '2',
      title: 'AI Ethics and Governance',
      type: 'AEC',
      description: 'Understand the ethical implications of AI development',
      image: '/placeholder.svg',
      credits: 3,
      popularity: 88,
      enrolledLearners: 980,
      recommendationReason: 'Highly relevant for your AI Engineering career path'
    },
    {
      id: '3',
      title: 'Natural Language Processing',
      type: 'MinorDegree',
      description: 'Build systems that understand and generate human language',
      image: '/placeholder.svg',
      credits: 8,
      popularity: 95,
      enrolledLearners: 782,
      recommendationReason: 'Complements your Machine Learning skill set'
    }
  ]);
  
  const [programs] = useState({
    aec: [
      {
        id: 'aec1',
        title: 'AI Foundations',
        type: 'AEC' as const,
        credits: 4,
        duration: '12 weeks',
        instructor: 'Dr. Priya Sharma',
        image: '/placeholder.svg',
        popularity: 85,
        enrolledLearners: 560,
        price: 2999,
        description: 'A comprehensive introduction to artificial intelligence concepts, algorithms, and applications.'
      },
      {
        id: 'aec2',
        title: 'Data Science Essentials',
        type: 'AEC' as const,
        credits: 3,
        duration: '10 weeks',
        instructor: 'Prof. Rahul Verma',
        image: '/placeholder.svg',
        popularity: 92,
        enrolledLearners: 780,
        price: 2499,
        description: 'Learn the fundamental concepts and techniques used in data science and analytics.'
      },
      {
        id: 'aec3',
        title: 'Introduction to Computer Vision',
        type: 'AEC' as const,
        credits: 4,
        duration: '14 weeks',
        instructor: 'Dr. Ananya Patel',
        image: '/placeholder.svg',
        popularity: 88,
        enrolledLearners: 490,
        price: 3499,
        description: 'Explore the world of computer vision and learn how machines interpret visual information.'
      },
      {
        id: 'aec4',
        title: 'Cloud Computing Fundamentals',
        type: 'AEC' as const,
        credits: 3,
        duration: '8 weeks',
        instructor: 'Prof. Vikram Singh',
        image: '/placeholder.svg',
        popularity: 86,
        enrolledLearners: 630,
        price: 2799,
        description: 'Understand cloud computing concepts, infrastructure, and popular platforms.'
      },
      {
        id: 'aec5',
        title: 'IoT for Engineering',
        type: 'AEC' as const,
        credits: 4,
        duration: '12 weeks',
        instructor: 'Dr. Arjun Reddy',
        image: '/placeholder.svg',
        popularity: 91,
        enrolledLearners: 710,
        price: 3299,
        description: 'Learn to develop and deploy Internet of Things solutions for engineering applications.'
      },
      {
        id: 'aec6',
        title: 'Blockchain Technology',
        type: 'AEC' as const,
        credits: 3,
        duration: '10 weeks',
        instructor: 'Prof. Meera Krishnan',
        image: '/placeholder.svg',
        popularity: 87,
        enrolledLearners: 520,
        price: 2999,
        description: 'Understand the fundamentals of blockchain and distributed ledger technology.'
      },
      {
        id: 'aec7',
        title: 'Digital Marketing Analytics',
        type: 'AEC' as const,
        credits: 3,
        duration: '8 weeks',
        instructor: 'Dr. Kiran Joshi',
        image: '/placeholder.svg',
        popularity: 85,
        enrolledLearners: 480,
        price: 2499,
        description: 'Learn to gather, analyze and interpret marketing data to drive business decisions.'
      },
      {
        id: 'aec8',
        title: 'Mobile App Development',
        type: 'AEC' as const,
        credits: 4,
        duration: '14 weeks',
        instructor: 'Prof. Neha Gupta',
        image: '/placeholder.svg',
        popularity: 89,
        enrolledLearners: 620,
        price: 3499,
        description: 'Learn to develop mobile applications for both Android and iOS platforms.'
      }
    ],
    minorDegrees: [
      {
        id: 'md1',
        title: 'Machine Learning Engineering',
        type: 'MinorDegree' as const,
        credits: 15,
        duration: '2 years',
        instructor: 'Multiple faculty',
        image: '/placeholder.svg',
        popularity: 96,
        enrolledLearners: 350,
        price: 29999,
        description: 'A comprehensive minor degree covering all aspects of machine learning from theory to practical implementation.'
      }
    ],
    certifications: [
      {
        id: 'cert1',
        title: 'Python for Machine Learning',
        type: 'Certification' as const,
        duration: '8 weeks',
        instructor: 'Vijay Kumar',
        image: '/placeholder.svg',
        price: 4999,
        popularity: 94,
        enrolledLearners: 1240,
        description: 'Master Python programming specifically for machine learning applications.'
      },
      {
        id: 'cert2',
        title: 'Deep Learning Specialization',
        type: 'Certification' as const,
        duration: '14 weeks',
        instructor: 'Dr. Priyanka Singh',
        image: '/placeholder.svg',
        price: 9999,
        popularity: 97,
        enrolledLearners: 890,
        description: 'Comprehensive coverage of neural networks, deep learning frameworks and applications.'
      },
      {
        id: 'cert3',
        title: 'Full Stack Web Development',
        type: 'Certification' as const,
        duration: '16 weeks',
        instructor: 'Rohit Patel',
        image: '/placeholder.svg',
        price: 8999,
        popularity: 95,
        enrolledLearners: 1050,
        description: 'Become proficient in both frontend and backend web development technologies.'
      },
      {
        id: 'cert4',
        title: 'DevOps and CI/CD',
        type: 'Certification' as const,
        duration: '10 weeks',
        instructor: 'Anil Sharma',
        image: '/placeholder.svg',
        price: 6999,
        popularity: 91,
        enrolledLearners: 780,
        description: 'Learn DevOps practices, continuous integration and continuous deployment pipelines.'
      },
      {
        id: 'cert5',
        title: 'Data Analytics with R',
        type: 'Certification' as const,
        duration: '8 weeks',
        instructor: 'Dr. Sunita Desai',
        image: '/placeholder.svg',
        price: 5499,
        popularity: 88,
        enrolledLearners: 620,
        description: 'Learn data analysis, visualization and statistical modeling using R.'
      },
      {
        id: 'cert6',
        title: 'UX/UI Design Fundamentals',
        type: 'Certification' as const,
        duration: '12 weeks',
        instructor: 'Anjali Mehta',
        image: '/placeholder.svg',
        price: 7499,
        popularity: 92,
        enrolledLearners: 840,
        description: 'Master the principles of user experience and interface design for digital products.'
      },
      {
        id: 'cert7',
        title: 'Cybersecurity Essentials',
        type: 'Certification' as const,
        duration: '10 weeks',
        instructor: 'Ravi Kumar',
        image: '/placeholder.svg',
        price: 6499,
        popularity: 93,
        enrolledLearners: 760,
        description: 'Learn to identify, analyze and respond to various cybersecurity threats.'
      },
      {
        id: 'cert8',
        title: 'Digital Marketing Mastery',
        type: 'Certification' as const,
        duration: '8 weeks',
        instructor: 'Neha Sharma',
        image: '/placeholder.svg',
        price: 4999,
        popularity: 90,
        enrolledLearners: 910,
        description: 'Comprehensive coverage of digital marketing channels, strategies and analytics.'
      },
      {
        id: 'cert9',
        title: 'Project Management Professional',
        type: 'Certification' as const,
        duration: '12 weeks',
        instructor: 'Sanjay Gupta',
        image: '/placeholder.svg',
        price: 8499,
        popularity: 91,
        enrolledLearners: 680,
        description: 'Learn project management methodologies, tools and best practices.'
      },
      {
        id: 'cert10',
        title: 'Mobile App Development with Flutter',
        type: 'Certification' as const,
        duration: '14 weeks',
        instructor: 'Karthik Reddy',
        image: '/placeholder.svg',
        price: 7999,
        popularity: 89,
        enrolledLearners: 730,
        description: 'Build cross-platform mobile applications using Flutter framework.'
      },
      {
        id: 'cert11',
        title: 'Cloud Architecture on AWS',
        type: 'Certification' as const,
        duration: '10 weeks',
        instructor: 'Amit Singh',
        image: '/placeholder.svg',
        price: 8999,
        popularity: 94,
        enrolledLearners: 810,
        description: 'Design, deploy and manage cloud infrastructure on Amazon Web Services.'
      },
      {
        id: 'cert12',
        title: 'Big Data Analytics',
        type: 'Certification' as const,
        duration: '12 weeks',
        instructor: 'Dr. Rajiv Verma',
        image: '/placeholder.svg',
        price: 9499,
        popularity: 92,
        enrolledLearners: 690,
        description: 'Learn to process, analyze and derive insights from large-scale data sets.'
      },
      {
        id: 'cert13',
        title: 'Blockchain Development',
        type: 'Certification' as const,
        duration: '14 weeks',
        instructor: 'Suresh Kumar',
        image: '/placeholder.svg',
        price: 8999,
        popularity: 88,
        enrolledLearners: 580,
        description: 'Learn to develop decentralized applications and smart contracts.'
      },
      {
        id: 'cert14',
        title: 'AI for Business Leaders',
        type: 'Certification' as const,
        duration: '8 weeks',
        instructor: 'Dr. Manish Arora',
        image: '/placeholder.svg',
        price: 5999,
        popularity: 91,
        enrolledLearners: 720,
        description: 'Understand AI capabilities, limitations and strategic implementation for business.'
      }
    ]
  });
  
  const [liveSessions] = useState<Program[]>([
    {
      id: 'live1',
      title: 'Industry Trends in AI',
      type: 'LiveSession',
      date: 'Today',
      time: '3:00 PM',
      speaker: 'Ritu Sharma, AI Lead at TechCorp',
      duration: '1.5 hours',
      image: '/placeholder.svg',
      price: 0,
      enrolledLearners: 240,
      description: "Get insights into the latest AI trends and how they're shaping various industries."
    },
    {
      id: 'live2',
      title: 'Building Your Tech Portfolio',
      type: 'LiveSession',
      date: 'Tomorrow',
      time: '4:30 PM',
      speaker: 'Ashok Kumar, Senior Recruiter',
      duration: '1 hour',
      image: '/placeholder.svg',
      price: 1500,
      enrolledLearners: 180,
      description: 'Learn how to create a tech portfolio that stands out to recruiters and hiring managers.'
    }
  ]);
  
  const [lifeSkills] = useState<Program[]>([
    {
      id: 'skill1',
      title: 'Technical Interview Preparation',
      type: 'LifeSkill',
      category: 'Career Development',
      difficulty: 'Intermediate',
      timeCommitment: '2-3 hours/week',
      duration: '4 weeks',
      image: '/placeholder.svg',
      price: 2999,
      enrolledLearners: 560,
      description: 'Comprehensive preparation for technical interviews across various IT domains.'
    },
    {
      id: 'skill2',
      title: 'Effective Communication for Engineers',
      type: 'LifeSkill',
      category: 'Soft Skills',
      difficulty: 'Beginner',
      timeCommitment: '1-2 hours/week',
      duration: '3 weeks',
      image: '/placeholder.svg',
      price: 1999,
      enrolledLearners: 420,
      description: 'Develop communication skills specifically tailored for technical professionals.'
    }
  ]);
  
  const handleProgramClick = (programId: string, programType: string) => {
    let selectedProgram: Program | undefined;
    
    if (programType === 'recommended') {
      selectedProgram = recommendedPrograms.find(p => p.id === programId);
    } else if (programType === 'aec') {
      selectedProgram = programs.aec.find(p => p.id === programId);
    } else if (programType === 'minor') {
      selectedProgram = programs.minorDegrees.find(p => p.id === programId);
    } else if (programType === 'certification') {
      selectedProgram = programs.certifications.find(p => p.id === programId);
    } else if (programType === 'live') {
      selectedProgram = liveSessions.find(p => p.id === programId);
    } else if (programType === 'skill') {
      selectedProgram = lifeSkills.find(p => p.id === programId);
    } else if (programType === 'roadmap') {
      selectedProgram = roadmapPrograms.find(p => p.id === programId);
    }
    
    if (selectedProgram) {
      setProgramDetailData(selectedProgram);
      setIsProgramDetailOpen(true);
    }
  };

  const addToRoadmap = (program: Program) => {
    if (!roadmapPrograms.some(p => p.id === program.id)) {
      setRoadmapPrograms(prev => [...prev, {...program, addedToRoadmap: true}]);
    }
  };

  const removeFromRoadmap = (programId: string) => {
    setRoadmapPrograms(prev => prev.filter(p => p.id !== programId));
  };

  const isProgramInRoadmap = (programId: string) => {
    return roadmapPrograms.some(p => p.id === programId);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Your Learning Pathway</h1>
        <div className="flex items-center gap-2">
          <div className="bg-amber-100 text-amber-800 text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <Bell className="h-3.5 w-3.5" />
            <span>Rank #12 in Your Group</span>
          </div>
        </div>
      </div>

      <div className="w-full bg-gradient-to-r from-slate-50 to-slate-100 border rounded-lg p-3 mb-4">
        <div className="flex items-center gap-2">
          <div className={cn(
            "p-1.5 rounded-full flex-shrink-0",
            rotatingMessages[rotatingMessageIndex].type === 'fomo' 
              ? "bg-orange-100 text-orange-600" 
              : "bg-green-100 text-green-600"
          )}>
            {rotatingMessages[rotatingMessageIndex].icon}
          </div>
          <p className={cn(
            "text-sm font-medium animate-fade-in",
            rotatingMessages[rotatingMessageIndex].type === 'fomo' 
              ? "text-orange-700" 
              : "text-green-700"
          )}>
            {rotatingMessages[rotatingMessageIndex].message}
          </p>
        </div>
      </div>

      <Card className="border-blue-100">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-indigo-600">
            <BarChart className="h-5 w-5" />
            Current Progress
          </CardTitle>
          <CardDescription>Track your journey toward becoming an AI Engineer</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full" 
                  style={{ width: '65%' }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-slate-500">
                <span>Beginner</span>
                <span>Intermediate</span>
                <span>Advanced</span>
              </div>
              <div className="mt-2">
                <p className="text-sm font-medium">You're 65% toward your goal</p>
                <p className="text-xs text-slate-500 mt-1">Complete 2 more courses to reach Advanced level</p>
              </div>
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 relative overflow-hidden hover:shadow-md transition-shadow">
                <div className="absolute -right-4 -bottom-4 opacity-10">
                  <Zap className="h-24 w-24 text-indigo-500" />
                </div>
                <h3 className="font-semibold text-indigo-600">See how you compare to industry hires</h3>
                <p className="text-xs text-slate-600 mt-1 mb-3">Take a 5-minute assessment to gauge your skills against recent Google and Microsoft hires</p>
                <div className="flex justify-between items-center">
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                    Start Assessment
                  </Button>
                  <span className="text-xs text-indigo-600 animate-pulse">
                    35 students took this today
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Collapsible open={isRoadmapOpen} onOpenChange={setIsRoadmapOpen}>
          <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-100">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-indigo-500" />
                  Your Roadmap
                </CardTitle>
                <CardDescription>Personalized learning path for your career goals</CardDescription>
              </div>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  {isRoadmapOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </CardHeader>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <ScrollArea className="h-[280px] pr-4">
                  {roadmapPrograms.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-40 text-center">
                      <div className="text-indigo-300 mb-2">
                        <GraduationCap className="h-12 w-12" />
                      </div>
                      <p className="text-slate-500 text-sm mb-2">Your roadmap is empty</p>
                      <p className="text-xs text-slate-400">Add programs from the catalog to build your learning path</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {roadmapPrograms.map((program, index) => (
                        <div 
                          key={program.id} 
                          className="border border-indigo-100 rounded-lg p-3 hover:shadow-md transition-all cursor-pointer bg-white relative"
                          onClick={() => handleProgramClick(program.id, 'roadmap')}
                        >
                          <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-indigo-100 text-indigo-600 rounded-full h-6 w-6 flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </div>
                          <div className="pl-3">
                            <div className="flex justify-between items-start mb-1">
                              <h3 className="font-medium text-sm">{program.title}</h3>
                              <span className={cn(
                                "text-xs px-2 py-0.5 rounded-full",
                                program.type === 'Certification' ? "bg-purple-100 text-purple-800" :
                                program.type === 'AEC' ? "bg-blue-100 text-blue-800" :
                                "bg-amber-100 text-amber-800"
                              )}>
                                {program.type === 'AEC' || program.type === 'MinorDegree' 
                                  ? `${program.credits} Credits` 
                                  : program.type}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mb-2 line-clamp-1">{program.description}</p>
                            <div className="flex justify-between items-center">
                              <span className="text-xs flex items-center gap-1 text-slate-500">
                                <Users className="h-3 w-3" /> {program.enrolledLearners} learners
                              </span>
                              <div className="flex gap-2">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="h-7 text-xs flex items-center gap-1 border-red-200 text-red-600 hover:bg-red-50"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeFromRoadmap(program.id);
                                  }}
                                >
                                  <Minus className="h-3 w-3" /> Remove
                                </Button>
                                <Button size="sm" className="h-7 text-xs">
                                  {index === 0 ? 'Start' : 'View'}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        <Collapsible open={isCatalogOpen} onOpenChange={setIsCatalogOpen}>
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <BookMarked className="h-5 w-5 text-indigo-500" />
                  Program Catalog
                </CardTitle>
                <CardDescription>Explore all available programs</CardDescription>
              </div>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  {isCatalogOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </CardHeader>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="flex items-center gap-2 mb-3">
                  <Button
                    variant={activeCategory === 'aec' ? 'default' : 'outline'}
                    onClick={() => setActiveCategory('aec')}
                    size="sm"
                    className="h-8"
                  >
                    AEC
                  </Button>
                  <Button
                    variant={activeCategory === 'minor' ? 'default' : 'outline'}
                    onClick={() => setActiveCategory('minor')}
                    size="sm"
                    className="h-8"
                  >
                    Minor Degrees
                  </Button>
                  <Button
                    variant={activeCategory === 'certification' ? 'default' : 'outline'}
                    onClick={() => setActiveCategory('certification')}
                    size="sm"
                    className="h-8"
                  >
                    Certifications
                  </Button>
                </div>
                <ScrollArea className="h-[220px] pr-4">
                  <div className="grid grid-cols-2 gap-3">
                    {activeCategory === 'aec' && programs.aec.slice(0, 6).map((program) => (
                      <div 
                        key={program.id} 
                        className="border rounded-lg p-3 hover:shadow-md transition-all cursor-pointer bg-white"
                        onClick={() => handleProgramClick(program.id, 'aec')}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-medium text-sm line-clamp-1">{program.title}</h3>
                          <span className="bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 rounded-full flex-shrink-0">
                            {program.credits} Cr
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mb-2 line-clamp-1">{program.instructor}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs flex items-center gap-1 text-slate-500">
                            <Clock className="h-3 w-3" /> {program.duration}
                          </span>
                          <Button 
                            size="sm" 
                            variant={isProgramInRoadmap(program.id) ? "outline" : "default"}
                            className={cn(
                              "h-7 text-xs flex items-center gap-1",
                              isProgramInRoadmap(program.id) 
                                ? "border-green-200 text-green-600 hover:bg-green-50" 
                                : ""
                            )}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!isProgramInRoadmap(program.id)) {
                                addToRoadmap(program);
                              }
                            }}
                            disabled={isProgramInRoadmap(program.id)}
                          >
                            {isProgramInRoadmap(program.id) ? (
                              <>Added</>
                            ) : (
                              <><Plus className="h-3 w-3" /> Add to Path</>
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                    {activeCategory === 'minor' && programs.minorDegrees.map((program) => (
                      <div 
                        key={program.id} 
                        className="border rounded-lg p-3 hover:shadow-md transition-all cursor-pointer bg-white"
                        onClick={() => handleProgramClick(program.id, 'minor')}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-medium text-sm line-clamp-1">{program.title}</h3>
                          <span className="bg-amber-100 text-amber-800 text-xs px-1.5 py-0.5 rounded-full flex-shrink-0">
                            {program.credits} Cr
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mb-2 line-clamp-1">{program.instructor}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs flex items-center gap-1 text-slate-500">
                            <Clock className="h-3 w-3" /> {program.duration}
                          </span>
                          <Button 
                            size="sm" 
                            variant={isProgramInRoadmap(program.id) ? "outline" : "default"}
                            className={cn(
                              "h-7 text-xs flex items-center gap-1",
                              isProgramInRoadmap(program.id) 
                                ? "border-green-200 text-green-600 hover:bg-green-50" 
                                : ""
                            )}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!isProgramInRoadmap(program.id)) {
                                addToRoadmap(program);
                              }
                            }}
                            disabled={isProgramInRoadmap(program.id)}
                          >
                            {isProgramInRoadmap(program.id) ? (
                              <>Added</>
                            ) : (
                              <><Plus className="h-3 w-3" /> Add to Path</>
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                    {activeCategory === 'certification' && programs.certifications.slice(0, 6).map((program) => (
                      <div 
                        key={program.id} 
                        className="border rounded-lg p-3 hover:shadow-md transition-all cursor-pointer bg-white"
                        onClick={() => handleProgramClick(program.id, 'certification')}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-medium text-sm line-clamp-1">{program.title}</h3>
                          <span className="bg-purple-100 text-purple-800 text-xs px-1.5 py-0.5 rounded-full flex-shrink-0">
                            Cert
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mb-2 line-clamp-1">{program.instructor}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs flex items-center gap-1 text-slate-500">
                            <Clock className="h-3 w-3" /> {program.duration}
                          </span>
                          <Button 
                            size="sm" 
                            variant={isProgramInRoadmap(program.id) ? "outline" : "default"}
                            className={cn(
                              "h-7 text-xs flex items-center gap-1",
                              isProgramInRoadmap(program.id) 
                                ? "border-green-200 text-green-600 hover:bg-green-50" 
                                : ""
                            )}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!isProgramInRoadmap(program.id)) {
                                addToRoadmap(program);
                              }
                            }}
                            disabled={isProgramInRoadmap(program.id)}
                          >
                            {isProgramInRoadmap(program.id) ? (
                              <>Added</>
                            ) : (
                              <><Plus className="h-3 w-3" /> Add to Path</>
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {activeCategory === 'aec' && programs.aec.length > 6 && (
                    <div className="text-center mt-3">
                      <Button variant="ghost" size="sm" className="text-indigo-600">
                        View all {programs.aec.length} AEC courses
                      </Button>
                    </div>
                  )}
                  {activeCategory === 'certification' && programs.certifications.length > 6 && (
                    <div className="text-center mt-3">
                      <Button variant="ghost" size="sm" className="text-indigo-600">
                        View all {programs.certifications.length} Certifications
                      </Button>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      </div>

      <Collapsible open={isLiveSessionsOpen} onOpenChange={setIsLiveSessionsOpen}>
        <Card>
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-indigo-500" />
                Upcoming Live Sessions
              </CardTitle>
              <CardDescription>Join interactive sessions with industry experts</CardDescription>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                {isLiveSessionsOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
          </CardHeader>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <Carousel className="w-full">
                <CarouselContent>
                  {liveSessions.map((session) => (
                    <CarouselItem key={session.id} className="md:basis-1/2 lg:basis-1/3">
                      <div 
                        className="border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer bg-white h-full"
                        onClick={() => handleProgramClick(session.id, 'live')}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-sm">{session.title}</h3>
                          <span className="bg-green-100 text-green-800 text-xs px-1.5 py-0.5 rounded-full">
                            {session.date}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mb-2">{session.speaker}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs flex items-center gap-1 text-slate-500">
                            <Clock className="h-3 w-3" /> {session.time}, {session.duration}
                          </span>
                          <Button size="sm" className="h-7 text-xs bg-indigo-600 hover:bg-indigo-700">
                            Join
                          </Button>
                        </div>
                        <div className="mt-2">
                          <p className="text-xs font-medium text-orange-600">{session.enrolledLearners} students already registered</p>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      <Collapsible open={isLifeSkillsOpen} onOpenChange={setIsLifeSkillsOpen}>
        <Card>
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-indigo-500" />
                Essential Life Skills
              </CardTitle>
              <CardDescription>Boost your career with essential non-technical skills</CardDescription>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                {isLifeSkillsOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
          </CardHeader>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="grid md:grid-cols-2 gap-4">
                {lifeSkills.map((skill) => (
                  <div 
                    key={skill.id} 
                    className="border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer bg-white"
                    onClick={() => handleProgramClick(skill.id, 'skill')}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-sm">{skill.title}</h3>
                      <span className="bg-slate-100 text-slate-800 text-xs px-1.5 py-0.5 rounded-full">
                        {skill.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-2 line-clamp-2">{skill.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-xs flex items-center gap-1 text-slate-500">
                          <Clock className="h-3 w-3" /> {skill.duration}, {skill.timeCommitment}
                        </span>
                        <span className="text-xs flex items-center gap-1 text-slate-500 mt-1">
                          <BadgeIndianRupee className="h-3 w-3" /> {skill.price}
                        </span>
                      </div>
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        Enroll Now
                      </Button>
                    </div>
                    <div className="mt-2">
                      <p className="text-xs font-medium text-green-600">Improves your soft skills rating by 15%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {isProgramDetailOpen && programDetailData && (
        <ProgramDetailView
          program={programDetailData}
          isOpen={isProgramDetailOpen}
          onClose={() => setIsProgramDetailOpen(false)}
        />
      )}
    </div>
  );
};

export default LearningPathway;
