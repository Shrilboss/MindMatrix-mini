
import { useState } from 'react';
import { Flame, Gauge, Clock, Award, TrendingUp, IndianRupee } from 'lucide-react';
import { UserProfile, Program } from '@/types/auth'; // Adding the Program import
import ProgramDetailView from './ProgramDetailView';
import StatCard from './overview/StatCard';
import PersonalGrowthChart from './overview/PeerComparisonChart';
import CompletionChart from './overview/CompletionChart';
import SkillGapChart from './overview/SkillGapChart';
import TrendingInsights from './overview/TrendingInsights';
import PersonalEfficiencyCard from './overview/PersonalEfficiencyCard';
import NextBestAction from './overview/NextBestAction';
import ActivityCards from './overview/ActivityCards';
import MilestoneTracker from './overview/MilestoneTracker';
import StreakFooter from './overview/StreakFooter';
import DashboardHeader from './overview/DashboardHeader';

interface DashboardOverviewProps {
  user: UserProfile;
}

const DashboardOverview = ({ user }: DashboardOverviewProps) => {
  const [stats] = useState({
    programsInProgress: 3,
    completedPrograms: 2,
    hoursSpent: 24,
    totalCredits: user.role === 'college-credit-student' ? 6 : null,
    mmCoins: user.mmCoins || 750,
    streakDays: 7,
    ranking: 24,
    totalPeers: 150,
    skillMastery: 65, 
    averageSkillMastery: 70,
    nextDeadline: {
      event: "Hackathon",
      daysLeft: 5,
      registered: 85,
      requiredModules: 2
    }
  });

  const [recentActivities] = useState([
    { icon: TrendingUp, text: 'Completed: Introduction to AI', timestamp: 'Yesterday' },
    { icon: TrendingUp, text: 'Started: Machine Learning Fundamentals', timestamp: '3 days ago' },
    { icon: Award, text: 'Earned: Data Analysis Certificate', timestamp: '1 week ago' }
  ]);

  // Update this to explicitly define the status as the required union type
  const [upcomingPrograms] = useState<{
    title: string;
    participants: number;
    status: 'live' | 'scheduled';
    time?: string;
    link: string;
  }[]>([
    { title: 'Machine Learning Masterclass', participants: 124, status: 'live', link: '#' },
    { title: 'Technical Interview Prep', participants: 56, status: 'scheduled', time: '4:00 PM Today', link: '#' }
  ]);

  const [trendingInsights] = useState([
    { text: "Google hired 5 Data Analysts with advanced visualization skills", relevance: "high" as const },
    { text: "24% rise in Data Science roles last quarter", relevance: "medium" as const },
    { text: "85% of AI roles require Python—are you proficient yet?", relevance: "high" as const }
  ]);

  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [isProgramDetailOpen, setIsProgramDetailOpen] = useState(false);

  // Personal Growth Data
  const [skillProgressData] = useState([
    { date: 'Jan', score: 20, target: 25 },
    { date: 'Feb', score: 30, target: 35 },
    { date: 'Mar', score: 45, target: 45 },
    { date: 'Apr', score: 55, target: 55 },
    { date: 'May', score: 65, target: 65 },
    { date: 'Jun', score: 70, target: 75 },
    { date: 'Jul', score: 75, target: 85 },
  ]);

  const [completionData] = useState([
    { name: 'Completed', value: 65 },
    { name: 'Remaining', value: 35 }
  ]);

  // New Personal Skills Data
  const [skillData] = useState([
    { subject: 'Python', currentLevel: 85, startLevel: 40, targetLevel: 90, industryStandard: 75 },
    { subject: 'ML Algorithms', currentLevel: 60, startLevel: 20, targetLevel: 80, industryStandard: 70 },
    { subject: 'Data Structures', currentLevel: 55, startLevel: 30, targetLevel: 75, industryStandard: 65 },
    { subject: 'Database', currentLevel: 75, startLevel: 35, targetLevel: 85, industryStandard: 70 },
    { subject: 'Visualization', currentLevel: 50, startLevel: 15, targetLevel: 70, industryStandard: 65 }
  ]);

  // Most improved skill
  const mostImprovedSkill = {
    name: 'ML Algorithms',
    improvement: 40
  };

  // Personal efficiency data
  const [efficiencyData] = useState({
    momentumScore: 78,
    previousMomentumScore: 70,
    taskCompletionRate: 85,
    previousCompletionRate: 80,
    timeToMastery: {
      hours: 25,
      skill: 'ML Algorithms',
      targetLevel: 80
    },
    learningEfficiency: {
      current: 3.2,
      change: 0.5
    }
  });

  // New milestones data
  const [milestones] = useState([
    { 
      date: 'Jul 2023', 
      title: 'Completed Data Structures Course', 
      description: 'Mastered basic data structures and algorithms',
      isCompleted: true,
      impact: 'Improved problem-solving skills by 25%'
    },
    { 
      date: 'Sep 2023', 
      title: 'Completed ML Foundations', 
      description: 'Learned regression, classification, and model evaluation',
      isCompleted: true,
      impact: 'Unlocked intermediate ML modules'
    },
    { 
      date: 'Nov 2023', 
      title: 'Finished Neural Networks Basics', 
      description: 'Built first deep learning model',
      isCompleted: true
    },
    { 
      date: 'Jan 2024', 
      title: 'Began Advanced ML Track', 
      description: 'Started specialized learning path in NLP',
      isCompleted: true
    },
    { 
      date: 'Mar 2024', 
      title: 'Complete Computer Vision Module', 
      description: 'Applied ML to image recognition tasks',
      isCompleted: false
    }
  ]);

  // Next Best Actions
  const [actionItems] = useState([
    {
      title: 'Complete Decision Trees Lab',
      description: 'Practice implementing decision trees on real datasets with cross-validation',
      impact: '+15% ML Algorithms skill',
      timeRequired: '2 hours',
      skillsTargeted: ['ML Algorithms', 'Python'],
      difficulty: 'medium' as const,
      type: 'task' as const
    },
    {
      title: 'Watch Data Visualization Masterclass',
      description: 'Learn advanced visualization techniques with Matplotlib and Seaborn',
      impact: '+10% Data Visualization skill',
      timeRequired: '1.5 hours',
      skillsTargeted: ['Data Visualization', 'Python'],
      difficulty: 'easy' as const,
      type: 'module' as const
    },
    {
      title: 'Weekly Coding Challenge: Database Optimization',
      description: 'Optimize a real-world database query for performance',
      impact: '+20% Database skill',
      timeRequired: '3 hours',
      skillsTargeted: ['Database', 'SQL'],
      difficulty: 'hard' as const,
      type: 'challenge' as const
    }
  ]);

  const [isProgressExpanded, setIsProgressExpanded] = useState(false);

  // Additional personal metrics
  const nextMilestone = {
    title: 'Complete Neural Network Architecture Project',
    daysLeft: 12,
    requiredHours: 15
  };

  const timeInvestment = {
    current: 6,
    target: 5,
    unit: 'hours/week'
  };

  const estimatedCompletion = {
    date: 'August 15, 2024',
    daysLeft: 120
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header Section */}
      <DashboardHeader userName={user.name} />

      {/* Top Stats Strip - Personal Growth Focus */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Personal Streak */}
        <StatCard
          title="Learning Streak"
          value={`${stats.streakDays} days`}
          icon={Flame}
          color="#FF7043"
          progress={{ current: stats.streakDays, max: 30 }}
          helpText={{ 
            success: "You're on fire! 3 more days for a new personal best!" 
          }}
        />

        {/* 2. Skill Momentum */}
        <StatCard
          title="Skill Momentum"
          value={`${efficiencyData.momentumScore}/100`}
          icon={TrendingUp}
          color="#4CAF50"
          progress={{ current: efficiencyData.momentumScore, max: 100 }}
          helpText={{ 
            success: `Increased by ${efficiencyData.momentumScore - efficiencyData.previousMomentumScore}% this week!`
          }}
        />

        {/* 3. Time Invested */}
        <StatCard
          title="Time Invested"
          value={`${timeInvestment.current}/${timeInvestment.target} hrs`}
          icon={Clock}
          color="#3F51B5"
          progress={{ current: timeInvestment.current, max: timeInvestment.target }}
          helpText={{ 
            success: `You've exceeded your weekly target by ${(timeInvestment.current - timeInvestment.target) / timeInvestment.target * 100}%!`
          }}
        />

        {/* 4. MM Coins */}
        <StatCard
          title="MM Coins"
          value={stats.mmCoins}
          icon={Award}
          color="#4CAF50"
          progress={{ current: stats.mmCoins, max: 1000 }}
          helpText={{ 
            success: `Earn ${1000 - stats.mmCoins} more coins for a free 1-on-1 session`
          }}
        />
      </div>

      {/* Main Charts Row - Personal Growth Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Personal Growth Chart */}
        <PersonalGrowthChart 
          skillProgressData={skillProgressData} 
          skillName="AI Fundamentals"
          improvementRate={10}
          targetDate="August 15"
          daysToTarget={30}
        />

        {/* Right Column: Learning Journey Progress */}
        <CompletionChart 
          completionData={completionData} 
          timeInvestment={timeInvestment}
          estimatedCompletion={estimatedCompletion}
          consistencyStreak={stats.streakDays}
        />
      </div>

      {/* Personal Skill Radar Chart */}
      <SkillGapChart skillData={skillData} mostImprovedSkill={mostImprovedSkill} />

      {/* Next Best Action Section */}
      <NextBestAction actionItems={actionItems} />

      {/* Personal Efficiency & Performance Metrics */}
      <PersonalEfficiencyCard efficiencyData={efficiencyData} />

      {/* Trending in Industry Ticker (Limited to 20% of dashboard space) */}
      <TrendingInsights insights={trendingInsights} />

      {/* Recent Activities and Live Programs */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <ActivityCards 
          recentActivities={recentActivities}
          upcomingPrograms={upcomingPrograms}
        />
      </div>

      {/* Milestone Tracker */}
      <MilestoneTracker 
        milestones={milestones}
        nextMilestone={nextMilestone}
        isExpanded={isProgressExpanded}
        setIsExpanded={setIsProgressExpanded}
      />

      {/* Bottom Stats & Streaks */}
      <StreakFooter streakDays={stats.streakDays} />

      {/* Program Detail View Component */}
      <ProgramDetailView 
        isOpen={isProgramDetailOpen}
        onClose={() => setIsProgramDetailOpen(false)}
        program={selectedProgram}
      />
    </div>
  );
};

export default DashboardOverview;
