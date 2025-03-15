import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { UserProfile, Task } from '@/types/auth';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Calendar, 
  AlertTriangle, 
  CheckSquare, 
  TrendingUp, 
  Users, 
  Award,
  Star,
  Eye,
  Coins,
  Flame,
  BookOpen,
  Undo
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';

interface TasksPanelProps {
  user: UserProfile;
}

interface ExtendedTask extends Task {
  coinsReward?: number;
  coinsPenalty?: number;
  percentPeersCompleted?: number;
  industryRelevance?: number;
  hoursOverdue?: number;
  partialCreditAvailable?: boolean;
  recoveryCoins?: number;
  fomoCopy?: string;
  hopeCopy?: string;
}

const TasksPanel = ({ user }: TasksPanelProps) => {
  const [tasks, setTasks] = useState<ExtendedTask[]>([
    {
      id: '1',
      title: 'Complete Python Assignment #3',
      description: 'Implement a data processing algorithm using Pandas',
      dueDate: '2023-07-20T15:00:00',
      programId: 'prog1',
      programTitle: 'Python for Data Science',
      completed: false,
      priority: 'high',
      coinsReward: 30,
      coinsPenalty: 15,
      percentPeersCompleted: 78,
      industryRelevance: 8,
      hoursOverdue: 24,
      partialCreditAvailable: true,
      recoveryCoins: 20,
      fomoCopy: 'Missing this assignment reduces your ranking in the Data Science track!',
      hopeCopy: 'Earn 30 coins and improve your recruiter visibility by 15%!'
    },
    {
      id: '2',
      title: 'Watch AI Ethics Lecture Video',
      description: 'Watch the recorded lecture and take notes',
      dueDate: '2023-07-21T23:59:59',
      programId: 'prog2',
      programTitle: 'AI Ethics and Governance',
      completed: false,
      priority: 'medium',
      coinsReward: 20,
      percentPeersCompleted: 70,
      industryRelevance: 5,
      fomoCopy: '70% of your peers already completed this—don\'t fall behind!',
      hopeCopy: 'Earn 20 coins for on-time completion.'
    },
    {
      id: '3',
      title: 'Submit Quiz Responses',
      description: 'Complete the online quiz before the deadline',
      dueDate: '2023-07-19T12:00:00',
      programId: 'prog1',
      programTitle: 'Python for Data Science',
      completed: true,
      priority: 'high',
      coinsReward: 30,
      percentPeersCompleted: 95,
      industryRelevance: 5,
    },
    {
      id: '4',
      title: 'Prepare for Group Discussion',
      description: 'Read the assigned materials and prepare discussion points',
      dueDate: '2023-07-25T14:30:00',
      programId: 'prog3',
      programTitle: 'Communication Skills',
      completed: false,
      priority: 'low',
      coinsReward: 15,
      percentPeersCompleted: 45,
      industryRelevance: 10,
      fomoCopy: 'Missing this will hurt your soft skill rating!',
      hopeCopy: 'Improve your communication skills—recruiters value this highly!'
    },
    {
      id: '5',
      title: 'Complete Project Milestone 1',
      description: 'Finish data collection and initial analysis',
      dueDate: '2023-07-28T23:59:59',
      programId: 'prog1',
      programTitle: 'Python for Data Science',
      completed: false,
      priority: 'medium',
      coinsReward: 40,
      percentPeersCompleted: 35,
      industryRelevance: 15,
      fomoCopy: 'Only 35% of peers reached this milestone—be among the leaders!',
      hopeCopy: 'Completing this showcases your hands-on experience to recruiters.'
    },
    {
      id: '6',
      title: 'Debugging JavaScript Exercise',
      description: 'Fix bugs in the provided JavaScript code samples',
      dueDate: new Date().toISOString(),
      programId: 'prog4',
      programTitle: 'Web Development Fundamentals',
      completed: false,
      priority: 'high',
      coinsReward: 25,
      percentPeersCompleted: 60,
      industryRelevance: 12,
      fomoCopy: 'Debugging skills are highly valued by tech companies!',
      hopeCopy: 'Complete this to earn a "Problem-Solver" badge on your profile!'
    },
    {
      id: '7',
      title: 'Review Database Concepts',
      description: 'Review SQL fundamentals and complete practice exercises',
      dueDate: new Date().toISOString(),
      programId: 'prog5',
      programTitle: 'Database Management',
      completed: false,
      priority: 'medium',
      coinsReward: 20,
      percentPeersCompleted: 55,
      industryRelevance: 8,
      fomoCopy: 'SQL skills are mentioned in 70% of data science job postings!',
      hopeCopy: 'Mastering databases will make you a more versatile developer.'
    },
    {
      id: '8',
      title: 'Prepare UI/UX Case Study',
      description: 'Analyze the user experience of a popular application',
      dueDate: (() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString();
      })(),
      programId: 'prog6',
      programTitle: 'UI/UX Design Principles',
      completed: false,
      priority: 'high',
      coinsReward: 35,
      percentPeersCompleted: 25,
      industryRelevance: 18,
      fomoCopy: 'Only 25% have started this—be ahead of the curve!',
      hopeCopy: 'This case study can be highlighted in your portfolio for interviews.'
    },
    {
      id: '9',
      title: 'Complete Machine Learning Quiz',
      description: 'Test your knowledge on classification algorithms',
      dueDate: (() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString();
      })(),
      programId: 'prog7',
      programTitle: 'Machine Learning Foundations',
      completed: false,
      priority: 'medium',
      coinsReward: 30,
      percentPeersCompleted: 40,
      industryRelevance: 15,
      fomoCopy: 'ML skills are the #1 most requested in tech interviews this year!',
      hopeCopy: 'This quiz will help identify your machine learning knowledge gaps.'
    }
  ]);

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const newCompletedState = !task.completed;
        
        if (newCompletedState) {
          toast({
            title: "Task completed!",
            description: `You earned +${task.coinsReward} coins ${task.industryRelevance ? `and +${task.industryRelevance} industry relevance` : ''}`,
            variant: "default",
          });
        } else {
          toast({
            title: "Task marked as incomplete",
            description: `Task has been moved back to your to-do list`,
            variant: "destructive",
          });
        }
        
        return { ...task, completed: newCompletedState };
      }
      return task;
    }));
  };

  const getTimeStatus = (dueDate: string) => {
    const taskDate = new Date(dueDate);
    const now = new Date();
    const diffMs = taskDate.getTime() - now.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (diffMs < 0) {
      const overdueHours = Math.abs(Math.floor(diffMs / (1000 * 60 * 60)));
      const overdueDays = Math.floor(overdueHours / 24);
      
      if (overdueDays > 0) {
        return `${overdueDays} ${overdueDays === 1 ? 'day' : 'days'}`;
      } else {
        return `${overdueHours} ${overdueHours === 1 ? 'hour' : 'hours'}`;
      }
    } else {
      if (diffDays > 0) {
        return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} left`;
      } else if (diffHours > 0) {
        return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} left`;
      } else {
        return 'Due very soon!';
      }
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const todayTasks = tasks.filter(task => {
    if (task.completed) return false;
    const taskDate = new Date(task.dueDate);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate.getTime() === today.getTime();
  });
  
  const tomorrowTasks = tasks.filter(task => {
    if (task.completed) return false;
    const taskDate = new Date(task.dueDate);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate.getTime() === tomorrow.getTime();
  });
  
  const upcomingTasks = tasks.filter(task => {
    if (task.completed) return false;
    const taskDate = new Date(task.dueDate);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate.getTime() > tomorrow.getTime();
  });
  
  const overdueNotCompletedTasks = tasks.filter(task => {
    const taskDate = new Date(task.dueDate);
    return !task.completed && taskDate < today;
  });
  
  const completedTasks = tasks.filter(task => task.completed);

  const totalTasks = tasks.length;
  const completedCount = completedTasks.length;
  const overdueCount = overdueNotCompletedTasks.length;
  const totalCoinsAtRisk = tasks
    .filter(task => !task.completed && new Date(task.dueDate) > new Date())
    .reduce((sum, task) => sum + (task.coinsPenalty || task.coinsReward || 0), 0);

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'medium':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'low':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Flame className="h-4 w-4 text-red-600" />;
      case 'medium':
        return <Star className="h-4 w-4 text-orange-500" />;
      case 'low':
        return <CheckSquare className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const [userStreak, setUserStreak] = useState(6);
  
  const TaskItem = ({ task, showTime = true, showControls = true }: { task: ExtendedTask, showTime?: boolean, showControls?: boolean }) => (
    <div className={cn(
      "border rounded-lg p-4 mb-3 shadow-sm transition-all hover:shadow-md",
      task.completed 
        ? "border-green-200 bg-green-50 dark:border-green-900/20 dark:bg-green-900/10" 
        : task.priority === 'high'
          ? "border-red-200 bg-red-50/50 dark:border-red-900/20 dark:bg-red-900/5"
          : task.priority === 'medium'
            ? "border-orange-200 bg-orange-50/50 dark:border-orange-900/20 dark:bg-orange-900/5"
            : "border-blue-200 bg-blue-50/50 dark:border-blue-900/20 dark:bg-blue-900/5"
    )}>
      <div className="flex gap-3">
        {showControls && (
          <button 
            onClick={() => toggleTaskCompletion(task.id)}
            className="mt-1 text-gray-500 hover:text-primary transition-colors"
          >
            {task.completed ? (
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500" />
            ) : (
              <Circle className="h-5 w-5" />
            )}
          </button>
        )}
        
        <div className="flex-1">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              {getPriorityIcon(task.priority)}
              <h4 className={cn(
                "text-base font-medium",
                task.completed && "line-through text-gray-500"
              )}>
                {task.title}
              </h4>
            </div>
            <span className={cn(
              "text-xs px-2 py-0.5 rounded-full flex items-center gap-1",
              getPriorityBadgeColor(task.priority)
            )}>
              <Star className="h-3 w-3" /> {task.priority}
            </span>
          </div>
          
          <p className="text-xs text-muted-foreground mt-1">{task.description}</p>
          
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full dark:bg-blue-900/30 dark:text-blue-300 flex items-center gap-1">
              <BookOpen className="h-3 w-3" /> {task.programTitle}
            </span>
            {showTime && (
              <span className="text-xs text-muted-foreground flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {new Date(task.dueDate).toLocaleString('en-US', { 
                  hour: 'numeric', 
                  minute: '2-digit',
                  month: 'short',
                  day: 'numeric'
                })}
                {!task.completed && (
                  <span className={cn(
                    "ml-2 px-1.5 py-0.5 rounded text-xs",
                    getTimeStatus(task.dueDate).includes('overdue') 
                      ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" 
                      : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                  )}>
                    {getTimeStatus(task.dueDate)}
                  </span>
                )}
              </span>
            )}
          </div>
          
          {!task.completed && task.fomoCopy && (
            <div className="mt-3 p-2 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/20 rounded-md text-xs flex items-start gap-2">
              <Users className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
              <p className="text-orange-800 dark:text-orange-300">{task.fomoCopy}</p>
            </div>
          )}
          
          {!task.completed && task.hopeCopy && (
            <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/20 rounded-md text-xs flex items-start gap-2">
              <Award className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <p className="text-green-800 dark:text-green-300">{task.hopeCopy}</p>
            </div>
          )}
          
          {task.completed && task.coinsReward && (
            <div className="mt-3 text-xs text-green-700 dark:text-green-400 flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Coins className="h-3.5 w-3.5" />
                <span>+{task.coinsReward} coins earned</span>
              </div>
              {task.industryRelevance && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span>+{task.industryRelevance} industry relevance</span>
                  </div>
                </>
              )}
            </div>
          )}
          
          {!task.completed ? (
            <div className="mt-3 flex justify-end">
              <Button size="sm" className="gap-1" onClick={() => toggleTaskCompletion(task.id)}>
                <CheckSquare className="h-4 w-4" /> Complete Now
              </Button>
            </div>
          ) : (
            <div className="mt-3 flex justify-end">
              <Button size="sm" variant="outline" className="gap-1 border-amber-300 text-amber-700" onClick={() => toggleTaskCompletion(task.id)}>
                <Undo className="h-4 w-4" /> Mark as Incomplete
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const OverdueTaskItem = ({ task }: { task: ExtendedTask }) => (
    <div className="border border-red-300 bg-red-50 dark:border-red-900/30 dark:bg-red-900/10 rounded-lg p-3 shadow-sm transition-all hover:shadow-md flex-1 min-w-[250px] max-w-[350px]">
      <div className="flex gap-2">
        <button 
          onClick={() => toggleTaskCompletion(task.id)}
          className="mt-1 text-gray-500 hover:text-primary transition-colors"
        >
          <Circle className="h-4 w-4" />
        </button>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-1">
              <Flame className="h-3 w-3 text-red-600" />
              <h4 className="text-sm font-medium text-red-800 dark:text-red-300 truncate">{task.title}</h4>
            </div>
            <span className="bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 text-xs px-1.5 py-0.5 rounded-full flex items-center gap-1 ml-1 whitespace-nowrap">
              <AlertTriangle className="h-2.5 w-2.5" /> {getTimeStatus(task.dueDate)}
            </span>
          </div>
          
          <div className="mt-1">
            <span className="text-xs bg-red-100 text-red-800 px-1.5 py-0.5 rounded-full dark:bg-red-900/40 dark:text-red-300 flex items-center gap-1 inline-block">
              <BookOpen className="h-2.5 w-2.5" /> {task.programTitle}
            </span>
          </div>
          
          <div className="mt-2 flex justify-end">
            <Button size="sm" variant="destructive" className="gap-1 text-xs h-7 px-2" onClick={() => toggleTaskCompletion(task.id)}>
              <Clock className="h-3 w-3" /> Complete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Task Manager</h1>
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">
                {completedCount} of {totalTasks} tasks completed
              </span>
            </div>
            
            {overdueCount > 0 && (
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span className="text-sm font-medium text-red-600 dark:text-red-400">
                  {overdueCount} Overdue!
                </span>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-amber-500" />
              <span className="text-sm font-medium">
                {totalCoinsAtRisk} MM Coins at risk
              </span>
            </div>
          </div>
          
          <Button>+ Add Task</Button>
        </div>
        
        <p className="text-sm text-muted-foreground flex items-center gap-2 italic">
          <Eye className="h-4 w-4" />
          Stay on track—recruiters watch your timely progress!
        </p>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-3 rounded-lg border border-purple-100 dark:border-purple-900/30 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-purple-500" />
          <span className="text-sm font-medium">Current streak: {userStreak} days</span>
        </div>
        
        <div className="text-sm text-purple-700 dark:text-purple-300">
          {userStreak > 0 ? "Don't break your streak!" : "Start your streak today!"}
        </div>
      </div>

      {overdueNotCompletedTasks.length > 0 && (
        <Card className="col-span-full border-red-200 bg-red-50 dark:border-red-900/20 dark:bg-red-900/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center text-red-700 dark:text-red-400">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Overdue Tasks ({overdueNotCompletedTasks.length})
            </CardTitle>
            <CardDescription className="text-red-600/80 dark:text-red-300/80">
              These tasks need your immediate attention!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {overdueNotCompletedTasks.map(task => (
                <OverdueTaskItem key={task.id} task={task} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Today's Tasks
            </CardTitle>
            <CardDescription>
              {todayTasks.length} tasks due today
            </CardDescription>
          </CardHeader>
          <CardContent>
            {todayTasks.length > 0 ? (
              todayTasks.map(task => (
                <TaskItem key={task.id} task={task} />
              ))
            ) : (
              <div className="text-center p-4 text-muted-foreground">
                No tasks due today
              </div>
            )}
          </CardContent>
          
          <CardHeader className="pb-2 pt-0">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Tomorrow's Tasks
            </CardTitle>
            <CardDescription>
              {tomorrowTasks.length} tasks due tomorrow
            </CardDescription>
          </CardHeader>
          <CardContent>
            {tomorrowTasks.length > 0 ? (
              tomorrowTasks.map(task => (
                <TaskItem key={task.id} task={task} />
              ))
            ) : (
              <div className="text-center p-4 text-muted-foreground">
                No tasks due tomorrow
              </div>
            )}
          </CardContent>
          
          <CardHeader className="pb-2 pt-0">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Upcoming Tasks
            </CardTitle>
            <CardDescription>
              {upcomingTasks.length} tasks coming up
            </CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingTasks.length > 0 ? (
              upcomingTasks.map(task => (
                <TaskItem key={task.id} task={task} />
              ))
            ) : (
              <div className="text-center p-4 text-muted-foreground">
                No upcoming tasks
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <CheckCircle2 className="h-5 w-5 mr-2" />
              Completed Tasks
            </CardTitle>
            <CardDescription>
              {completedTasks.length} tasks completed
            </CardDescription>
          </CardHeader>
          <CardContent>
            {completedTasks.length > 0 ? (
              completedTasks.map(task => (
                <TaskItem key={task.id} task={task} showTime={false} />
              ))
            ) : (
              <div className="text-center p-4 text-muted-foreground">
                No completed tasks yet
              </div>
            )}
          </CardContent>
          
          <CardHeader className="pb-2 pt-0 border-t">
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Weekly Task Progress
            </CardTitle>
            <CardDescription>
              You're 2 tasks away from your weekly goal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full" 
                style={{ width: `${(completedCount / totalTasks) * 100}%` }}
              ></div>
            </div>
            <div className="text-xs text-center text-muted-foreground mb-4">
              {completedCount}/{totalTasks} tasks completed this week
            </div>
            
            <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-900/30">
              <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertTitle className="text-blue-800 dark:text-blue-300">Complete 2 more tasks today</AlertTitle>
              <AlertDescription className="text-blue-700 dark:text-blue-400">
                Finish 2 more tasks to earn your weekly streak bonus of 50 coins!
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>

      {overdueNotCompletedTasks.length > 0 && (
        <Card className="border-amber-200 bg-amber-50 dark:border-amber-900/20 dark:bg-amber-900/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center text-amber-700 dark:text-amber-400">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Missed Deadlines & Lost Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-amber-800 dark:text-amber-300">
              You missed {overdueNotCompletedTasks.length} {overdueNotCompletedTasks.length === 1 ? 'task' : 'tasks'} recently - lost approximately {overdueNotCompletedTasks.reduce((sum, task) => sum + (task.coinsPenalty || 0), 0)} coins and decreased your recruiter visibility.
            </p>
            
            <div className="w-full mb-4">
              <div className="text-xs text-amber-700 dark:text-amber-400 mb-1">
                Industry relevance impact:
              </div>
              <div className="w-full bg-amber-200 rounded-full h-2 dark:bg-amber-800">
                <div 
                  className="bg-amber-500 h-2 rounded-full" 
                  style={{ width: '15%' }}
                ></div>
              </div>
              <div className="text-xs mt-1 text-amber-700 dark:text-amber-400">
                Industry relevance dropped 15% — act fast to regain momentum!
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button variant="outline" className="text-amber-700 border-amber-300 hover:bg-amber-100 hover:text-amber-800 dark:text-amber-400 dark:border-amber-700 dark:hover:bg-amber-900/30">
                Complete for partial credit (expires in 48 hours)
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TasksPanel;

