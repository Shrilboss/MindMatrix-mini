import { useState, useRef, useEffect } from 'react';
import {
  Pencil, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Star, 
  TrendingUp, 
  Calendar,
  ChevronDown,
  ChevronUp,
  Linkedin,
  Clock,
  Users,
  LineChart,
  BadgeCheck,
  Trophy,
  BarChart,
  Plus,
  Trash2
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter 
} from '@/components/ui/card';
import { UserProfile as UserProfileType, Skill } from '@/types/auth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  LineChart as RechartLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

interface UserProfileProps {
  user: UserProfileType;
}

// Define a type that extends Skill with guaranteed trending property
type EnhancedSkill = Skill & { trending: 'up' | 'down' | 'stable' };

const UserProfile = ({ user }: UserProfileProps) => {
  const [educationHistory, setEducationHistory] = useState([
    {
      id: '1',
      institution: 'Stanford University',
      degree: "Bachelor's in Computer Science",
      startDate: '2018',
      endDate: '2022',
      current: false,
      cgpa: '3.8/4.0'
    },
    {
      id: '2',
      institution: 'MindMatrix',
      degree: 'AI and Machine Learning Certification',
      startDate: '2022',
      endDate: '',
      current: true,
      cgpa: 'In Progress'
    }
  ]);

  const [workHistory, setWorkHistory] = useState([
    {
      id: '1',
      company: 'TechCorp',
      position: 'Software Development Intern',
      startDate: 'Jun 2022',
      endDate: 'Present',
      current: true,
      description: 'Working on machine learning algorithms for data analytics platforms.'
    },
    {
      id: '2',
      company: 'University Research Lab',
      position: 'Research Assistant',
      startDate: 'Jan 2021',
      endDate: 'May 2022',
      current: false,
      description: 'Assisted in AI research projects and data collection.'
    }
  ]);

  const [certifications, setCertifications] = useState([
    {
      id: '1',
      title: 'AI Ethics and Governance',
      issuer: 'MindMatrix',
      date: 'May 2023',
      level: 'Advanced',
      icon: <Award className="h-6 w-6" />
    },
    {
      id: '2',
      title: 'Python for Data Science',
      issuer: 'MindMatrix',
      date: 'January 2023',
      level: 'Intermediate',
      icon: <BadgeCheck className="h-6 w-6" />
    },
    {
      id: '3',
      title: 'Deep Learning Fundamentals',
      issuer: 'MindMatrix',
      date: 'March 2023',
      level: 'Beginner',
      icon: <Trophy className="h-6 w-6" />
    }
  ]);

  const [isAboutExpanded, setIsAboutExpanded] = useState(true);
  const [isCareerExpanded, setIsCareerExpanded] = useState(true);
  const [isEducationExpanded, setIsEducationExpanded] = useState(true);
  const [isWorkExpanded, setIsWorkExpanded] = useState(true);
  const [isSkillsExpanded, setIsSkillsExpanded] = useState(true);
  const [isPsychometricExpanded, setIsPsychometricExpanded] = useState(true);
  const [isCertificationsExpanded, setIsCertificationsExpanded] = useState(true);
  const [isProgressExpanded, setIsProgressExpanded] = useState(true);

  // Sample data for charts
  const psychometricData = [
    { subject: 'Communication', current: 75, previous: 65 },
    { subject: 'Leadership', current: 85, previous: 70 },
    { subject: 'Problem Solving', current: 90, previous: 85 },
    { subject: 'Teamwork', current: 78, previous: 72 },
    { subject: 'Adaptability', current: 82, previous: 74 },
    { subject: 'Creativity', current: 65, previous: 60 },
  ];

  const progressData = [
    { month: 'Jan', hours: 12, tasks: 15 },
    { month: 'Feb', hours: 19, tasks: 22 },
    { month: 'Mar', hours: 15, tasks: 18 },
    { month: 'Apr', hours: 22, tasks: 25 },
    { month: 'May', hours: 28, tasks: 30 },
    { month: 'Jun', hours: 25, tasks: 28 },
  ];

  const chartConfig = {
    current: {
      label: "Current",
      theme: {
        light: "hsl(250, 80%, 60%)",
        dark: "hsl(250, 70%, 60%)"
      }
    },
    previous: {
      label: "Previous",
      theme: {
        light: "hsl(220, 20%, 70%)",
        dark: "hsl(220, 20%, 60%)"
      }
    },
    hours: {
      label: "Hours Studied",
      theme: {
        light: "hsl(250, 80%, 60%)",
        dark: "hsl(250, 70%, 60%)"
      }
    },
    tasks: {
      label: "Tasks Completed",
      theme: {
        light: "hsl(176, 73%, 55%)",
        dark: "hsl(176, 73%, 45%)"
      }
    }
  };

  const technicalSkills = user.skills?.filter(skill => skill.category === 'technical') || [];
  const softSkills = user.skills?.filter(skill => skill.category === 'soft') || [];

  // Enhanced skills with extra data for display purposes
  const enhancedTechnicalSkills: EnhancedSkill[] = [
    { name: 'Python', rating: 70, category: 'technical', trending: 'up' },
    { name: 'Machine Learning', rating: 65, category: 'technical', trending: 'up' },
    { name: 'Data Analysis', rating: 80, category: 'technical', trending: 'stable' },
    { name: 'JavaScript', rating: 55, category: 'technical', trending: 'down' },
    ...technicalSkills.filter(skill => 
      !['Python', 'Machine Learning', 'Data Analysis', 'JavaScript'].includes(skill.name)
    ).map(skill => ({ ...skill, trending: 'stable' as const }))
  ];

  const enhancedSoftSkills: EnhancedSkill[] = [
    { name: 'Communication', rating: 75, category: 'soft', trending: 'up' },
    { name: 'Teamwork', rating: 85, category: 'soft', trending: 'stable' },
    { name: 'Problem Solving', rating: 90, category: 'soft', trending: 'up' },
    { name: 'Time Management', rating: 60, category: 'soft', trending: 'up' },
    ...softSkills.filter(skill => 
      !['Communication', 'Teamwork', 'Problem Solving', 'Time Management'].includes(skill.name)
    ).map(skill => ({ ...skill, trending: 'stable' as const }))
  ];

  // LinkedIn sync placeholder function
  const handleLinkedInSync = () => {
    alert("This would connect to LinkedIn API to import profile data");
  };

  // Function to get a trending icon for skills
  const getTrendingIcon = (trend: string) => {
    switch(trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingUp className="h-4 w-4 text-red-500 transform rotate-180" />;
      default:
        return <div className="h-4 w-4 flex items-center justify-center">―</div>;
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Profile header with banner and image */}
      <div className="relative">
        <div className="h-60 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden shadow-lg">
          {user.bannerImage && (
            <img src={user.bannerImage} alt="Profile banner" className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <Button size="sm" className="absolute top-4 right-4" variant="outline">
            <Pencil className="h-4 w-4 mr-2" />
            Edit Banner
          </Button>
        </div>
        
        {/* Profile Avatar */}
        <div className="absolute -bottom-12 left-10 transform">
          <div className="relative group">
            <Avatar className="h-24 w-24 border-4 border-background bg-muted overflow-hidden shadow-lg">
              {user.profileImage ? (
                <AvatarImage src={user.profileImage} alt={user.name} />
              ) : (
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Button size="sm" variant="ghost" className="text-white">
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* User info section */}
      <div className="mt-16 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
            <p className="text-sm text-muted-foreground">
              {user.role === 'college-credit-student' ? 'College Student (Credit)' :
               user.role === 'independent-student' ? 'College Student' :
               user.role === 'professional' ? 'Working Professional' : 
               user.role === 'looking-for-job' ? 'Job Seeker' : 'Independent Learner'}
            </p>
            
            {/* Profile completion banner */}
            <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-lg text-amber-800 dark:text-amber-200 text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                <span>
                  <span className="font-medium">Complete your profile to get 3x recruiter visibility!</span> 40% of top hires landed roles by completing their profiles.
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 flex-wrap">
            <Button onClick={handleLinkedInSync} className="flex items-center gap-2">
              <Linkedin className="h-4 w-4" />
              Sync with LinkedIn
            </Button>
            <Button variant="outline">
              <Pencil className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
        
        {/* LinkedIn sync benefits card */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border-blue-100 dark:border-blue-800">
          <CardContent className="p-4">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <Linkedin className="h-4 w-4 inline-block mr-2" />
              <span className="font-medium">Sync with LinkedIn</span> to instantly fill your work experience and education—save time and stand out!
            </p>
          </CardContent>
        </Card>
        
        {/* About Me section */}
        <Collapsible
          open={isAboutExpanded}
          onOpenChange={setIsAboutExpanded}
          className="w-full"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between py-4">
              <CardTitle className="text-xl">About Me</CardTitle>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost">
                  <Pencil className="h-4 w-4" />
                </Button>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">
                    {isAboutExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </CollapsibleTrigger>
              </div>
            </CardHeader>
            
            <CollapsibleContent>
              <CardContent>
                <p className="text-sm">{user.bio || 'Add a bio to tell others about yourself and highlight your experience and interests.'}</p>
                
                {/* FOMO Prompt */}
                <div className="mt-3 text-xs text-muted-foreground flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-primary" />
                  <span>Students with completed bios get 3x more recruiter profile views!</span>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
        
        {/* Career Interests */}
        <Collapsible
          open={isCareerExpanded}
          onOpenChange={setIsCareerExpanded}
          className="w-full"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between py-4">
              <CardTitle className="text-xl">Career Interests</CardTitle>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost">
                  <Pencil className="h-4 w-4" />
                </Button>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">
                    {isCareerExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </CollapsibleTrigger>
              </div>
            </CardHeader>
            
            <CollapsibleContent>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {user.careerInterests?.map((interest, index) => (
                    <Badge key={index} variant="outline" className="bg-primary/5 text-primary hover:bg-primary/10 transition-colors">
                      {interest}
                    </Badge>
                  ))}
                  {(!user.careerInterests || user.careerInterests.length === 0) && (
                    <div className="w-full text-center py-3">
                      <p className="text-sm text-muted-foreground">Add your career interests</p>
                      <Button size="sm" variant="outline" className="mt-2">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Interests
                      </Button>
                    </div>
                  )}
                </div>
                
                {/* CTA and FOMO */}
                <div className="mt-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <LineChart className="h-3.5 w-3.5 text-primary" />
                    <span>Refine your career goals to see more targeted course & job recommendations.</span>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
        
        {/* Education and Work Experience */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Education Panel */}
          <Collapsible
            open={isEducationExpanded}
            onOpenChange={setIsEducationExpanded}
            className="w-full"
          >
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between py-4">
                <CardTitle className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-primary" />
                  Education
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost">
                    <Plus className="h-4 w-4" />
                  </Button>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      {isEducationExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </CollapsibleTrigger>
                </div>
              </CardHeader>
              
              <CollapsibleContent>
                <CardContent>
                  <div className="space-y-4">
                    {educationHistory.map((education) => (
                      <div key={education.id} className="border rounded-lg p-4 transition-all duration-200 hover:shadow-md hover:border-primary/20">
                        <div className="flex justify-between">
                          <div className="space-y-1">
                            <h4 className="font-medium">{education.institution}</h4>
                            <p className="text-sm">{education.degree}</p>
                            <p className="text-xs text-muted-foreground">
                              {education.startDate} - {education.current ? 'Present' : education.endDate}
                            </p>
                            <p className="text-xs font-medium text-primary">CGPA: {education.cgpa}</p>
                          </div>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <Button variant="outline" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Another Degree
                    </Button>
                  </div>
                </CardContent>
                
                <CardFooter className="border-t pt-4 pb-2">
                  <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-primary" />
                    <span>Profiles with educational details receive 45% more recruiter attention!</span>
                  </div>
                </CardFooter>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Work Experience Panel */}
          <Collapsible
            open={isWorkExpanded}
            onOpenChange={setIsWorkExpanded}
            className="w-full"
          >
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between py-4">
                <CardTitle className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2 text-primary" />
                  Experience
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost">
                    <Plus className="h-4 w-4" />
                  </Button>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      {isWorkExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </CollapsibleTrigger>
                </div>
              </CardHeader>
              
              <CollapsibleContent>
                <CardContent>
                  <div className="space-y-4">
                    {workHistory.map((work) => (
                      <div key={work.id} className="border rounded-lg p-4 transition-all duration-200 hover:shadow-md hover:border-primary/20">
                        <div className="flex justify-between">
                          <div className="space-y-1">
                            <h4 className="font-medium">{work.position}</h4>
                            <p className="text-sm">{work.company}</p>
                            <p className="text-xs text-muted-foreground">
                              {work.startDate} - {work.current ? 'Present' : work.endDate}
                            </p>
                            <p className="text-sm mt-2">{work.description}</p>
                          </div>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <Button variant="outline" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Another Experience
                    </Button>
                  </div>
                </CardContent>
                
                <CardFooter className="border-t pt-4 pb-2">
                  <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-primary" />
                    <span>Profiles with relevant experience get 5x recruiter engagement!</span>
                  </div>
                </CardFooter>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        </div>
        
        {/* Skills section */}
        <Collapsible
          open={isSkillsExpanded}
          onOpenChange={setIsSkillsExpanded}
          className="w-full"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between py-4">
              <CardTitle className="text-xl">Skills</CardTitle>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  {isSkillsExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </CollapsibleTrigger>
            </CardHeader>
            
            <CollapsibleContent>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Star className="h-5 w-5 mr-2 text-amber-500" />
                      Technical Skills
                    </h3>
                    <div className="space-y-4">
                      {enhancedTechnicalSkills.map((skill) => (
                        <div key={skill.name} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{skill.name}</span>
                              {skill.trending && getTrendingIcon(skill.trending)}
                            </div>
                            <span className="text-sm text-muted-foreground">{skill.rating}/100</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full" 
                              style={{ width: `${skill.rating}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                      {enhancedTechnicalSkills.length === 0 && (
                        <p className="text-sm text-muted-foreground">No technical skills added yet</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Star className="h-5 w-5 mr-2 text-blue-500" />
                      Soft Skills
                    </h3>
                    <div className="space-y-4">
                      {enhancedSoftSkills.map((skill) => (
                        <div key={skill.name} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{skill.name}</span>
                              {skill.trending && getTrendingIcon(skill.trending)}
                            </div>
                            <span className="text-sm text-muted-foreground">{skill.rating}/100</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full" 
                              style={{ width: `${skill.rating}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                      {enhancedSoftSkills.length === 0 && (
                        <p className="text-sm text-muted-foreground">No soft skills added yet</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-6">
                  <p className="text-xs text-muted-foreground mb-2">
                    <Clock className="h-3.5 w-3.5 inline-block mr-1" />
                    Skills are auto-updated from your course completions and performance data
                  </p>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
        
        {/* Psychometric Analysis & Growth */}
        <Collapsible
          open={isPsychometricExpanded}
          onOpenChange={setIsPsychometricExpanded}
          className="w-full"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between py-4">
              <div>
                <CardTitle className="text-xl">Psychometric Analysis</CardTitle>
                <CardDescription>Performance on soft skill dimensions</CardDescription>
              </div>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  {isPsychometricExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </CollapsibleTrigger>
            </CardHeader>
            
            <CollapsibleContent>
              <CardContent className="pb-14">
                <div className="h-[350px] w-full mx-auto mb-8">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={psychometricData}>
                        <PolarGrid strokeDasharray="3 3" />
                        <PolarAngleAxis dataKey="subject" />
                        <Radar 
                          name="Current" 
                          dataKey="current" 
                          stroke="var(--color-current)" 
                          fill="var(--color-current)" 
                          fillOpacity={0.3} 
                        />
                        <Radar 
                          name="Previous" 
                          dataKey="previous" 
                          stroke="var(--color-previous)" 
                          fill="var(--color-previous)" 
                          fillOpacity={0.3} 
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-200 text-sm">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                    <span><span className="font-medium">+10% growth since last month!</span> You're making great progress on your skills.</span>
                  </div>
                  <div className="mt-2 text-xs text-green-700 dark:text-green-300">
                    Next psychometric test in 3 weeks—stay on track to see higher growth.
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
        
        {/* Certifications */}
        <Collapsible
          open={isCertificationsExpanded}
          onOpenChange={setIsCertificationsExpanded}
          className="w-full"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between py-4">
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2 text-primary" />
                Certifications & Badges
              </CardTitle>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  {isCertificationsExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </CollapsibleTrigger>
            </CardHeader>
            
            <CollapsibleContent>
              <CardContent>
                <div className="space-y-4">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="p-4 border rounded-md flex items-center gap-4 bg-gradient-to-r from-white to-slate-50 dark:from-slate-900 dark:to-slate-900/50 transition-all duration-200 hover:shadow-md hover:border-primary/20">
                      <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        {cert.icon}
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium">{cert.title}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-muted-foreground">{cert.issuer} • {cert.date}</p>
                          <Badge variant="outline" className="text-xs bg-primary/5 text-primary hover:bg-primary/10 transition-colors">
                            {cert.level}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-lg text-amber-800 dark:text-amber-200 text-sm">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                    <span>
                      <span className="font-medium">5 more completions needed to earn the 'Data Specialist' badge—start now!</span>
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-amber-700 dark:text-amber-300">
                    82% of recruiters prioritize verified credentials when screening candidates.
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
        
        {/* Your Progress */}
        <Collapsible
          open={isProgressExpanded}
          onOpenChange={setIsProgressExpanded}
          className="w-full"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between py-4">
              <div>
                <CardTitle className="text-xl">Your Progress</CardTitle>
                <CardDescription>Performance trajectory since joining MindMatrix</CardDescription>
              </div>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  {isProgressExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </CollapsibleTrigger>
            </CardHeader>
            
            <CollapsibleContent>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartLineChart data={progressData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" orientation="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line 
                          yAxisId="left"
                          type="monotone" 
                          dataKey="hours" 
                          name="Hours Studied"
                          stroke="var(--color-hours)" 
                          activeDot={{ r: 8 }} 
                        />
                        <Line 
                          yAxisId="right"
                          type="monotone" 
                          dataKey="tasks" 
                          name="Tasks Completed"
                          stroke="var(--color-tasks)" 
                        />
                      </RechartLineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="p-4 border rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-100 dark:border-green-800">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-green-800 dark:text-green-300">You're on track for a 15% skill improvement this month</p>
                        <p className="text-sm text-green-700 dark:text-green-400 mt-1">Keep up the great work! Your consistent study habits are paying off.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-100 dark:border-blue-800">
                    <div className="flex items-start gap-3">
                      <Trophy className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-800 dark:text-blue-300">You're #10 in Bangalore's rankings</p>
                        <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">Top 5 get special industry invites! Just 5 hours more study time to reach top 5.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Milestones */}
                <div className="mt-6">
                  <h4 className="font-medium mb-3 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                    Key Milestones
                  </h4>
                  <div className="space-y-3 relative before:absolute before:inset-y-0 before:left-3 before:w-0.5 before:bg-muted">
                    <div className="flex items-start gap-4 pl-6 relative before:absolute before:left-3 before:top-1.5 before:h-2 before:w-2 before:bg-primary before:rounded-full">
                      <div className="bg-primary/10 text-primary text-xs font-medium py-1 px-2 rounded">May 2022</div>
                      <p className="text-sm">Started B.Tech</p>
                    </div>
                    <div className="flex items-start gap-4 pl-6 relative before:absolute before:left-3 before:top-1.5 before:h-2 before:w-2 before:bg-primary before:rounded-full">
                      <div className="bg-primary/10 text-primary text-xs font-medium py-1 px-2 rounded">Jan 2023</div>
                      <p className="text-sm">Completed Data Science Course</p>
                    </div>
                    <div className="flex items-start gap-4 pl-6 relative before:absolute before:left-3 before:top-1.5 before:h-2 before:w-2 before:bg-green-500 before:rounded-full">
                      <div className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 text-xs font-medium py-1 px-2 rounded">Mar 2023</div>
                      <p className="text-sm font-medium text-green-700 dark:text-green-400">Reached Skill Level 50% in AI Fundamentals</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Ready for your next milestone? Check out advanced courses!
                    </Button>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      </div>
    </div>
  );
};

export default UserProfile;

