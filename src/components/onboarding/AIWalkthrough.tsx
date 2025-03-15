
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Bot, ArrowRight, CheckCircle, GraduationCap, Users, Briefcase, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/types/auth';

interface WalkthroughStep {
  title: string;
  description: string;
  animation: string;
}

interface AIWalkthroughProps {
  userRole: UserRole;
  userName?: string;
}

const AIWalkthrough = ({ userRole, userName = 'there' }: AIWalkthroughProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>(userRole);
  const navigate = useNavigate();

  // Generate personalized steps based on user role
  const getSteps = (): WalkthroughStep[] => {
    const commonSteps = [
      {
        title: "Welcome to MindMatrix",
        description: `Hi ${userName}! I'm your AI learning assistant. I'll help you navigate your personalized learning journey.`,
        animation: "wave",
      },
      {
        title: "Personalized Learning Path",
        description: "Based on your profile, I've created a customized learning path to help you achieve your goals efficiently.",
        animation: "path",
      },
      {
        title: "Track Your Progress",
        description: "You can easily track your progress through the dashboard. I'll provide insights and suggestions to keep you motivated.",
        animation: "chart",
      },
      {
        title: "Connect & Collaborate",
        description: "Join our community of learners to discuss topics, share resources, and collaborate on projects.",
        animation: "community",
      },
    ];

    // Add role-specific step
    if (userRole === 'college-credit-student') {
      commonSteps.push({
        title: "College Credit Tracking",
        description: "I'll help you track your college credits and ensure you're on the right path to meet your academic requirements.",
        animation: "credit",
      });
    } else if (userRole === 'independent-student') {
      commonSteps.push({
        title: "Self-Paced Learning",
        description: "As an independent student, you can learn at your own pace. I'll help you stay organized and motivated.",
        animation: "calendar",
      });
    } else if (userRole === 'professional') {
      commonSteps.push({
        title: "Career Advancement",
        description: "I'll help you identify skills relevant to your industry and suggest courses that can advance your career.",
        animation: "career",
      });
    } else {
      commonSteps.push({
        title: "Lifelong Learning",
        description: "Explore diverse topics and develop new skills. I'll guide you based on your interests and goals.",
        animation: "explore",
      });
    }

    return commonSteps;
  };

  const steps = getSteps();

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };

  const goToDashboard = () => {
    // In a real app, you would save the onboarding completion state to the user's profile
    // For now, we'll just navigate to the dashboard
    navigate('/dashboard');
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    // In a real app, you would update the user's role in the database
  };

  // Animation for the AI avatar
  const getAnimationClass = (animation: string) => {
    switch (animation) {
      case 'wave':
        return 'animate-bounce';
      case 'path':
        return 'animate-pulse';
      case 'chart':
        return 'animate-scale-in';
      case 'community':
        return 'animate-pulse-gentle';
      case 'credit':
      case 'calendar':
      case 'career':
      case 'explore':
        return 'animate-scale-in';
      default:
        return '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <AnimatePresence mode="wait">
        {!completed ? (
          <motion.div
            key="steps"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8 rounded-2xl shadow-elevation"
          >
            <div className="flex items-center mb-8">
              <div className={`h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4 ${getAnimationClass(steps[currentStep].animation)}`}>
                <Bot size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{steps[currentStep].title}</h2>
                <div className="flex space-x-1 mt-2">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1.5 rounded-full ${
                        index === currentStep
                          ? 'bg-primary w-8'
                          : index < currentStep
                          ? 'bg-primary/60 w-6'
                          : 'bg-gray-200 dark:bg-gray-700 w-6'
                      } transition-all duration-300`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="relative">
              <motion.div
                key={`step-${currentStep}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="min-h-[120px]"
              >
                <p className="text-lg mb-8">{steps[currentStep].description}</p>
              </motion.div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  className="absolute top-0 right-0 text-primary/20"
                >
                  <Sparkles size={20} />
                </motion.div>
              </div>
              <div className="absolute -bottom-2 -left-2">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ duration: 2, delay: 1, repeat: Infinity, repeatType: "reverse" }}
                  className="absolute bottom-0 left-0 text-primary/20"
                >
                  <Sparkles size={16} />
                </motion.div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-8">
              <span className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </span>
              <Button onClick={nextStep} size="lg" className="group">
                {currentStep < steps.length - 1 ? (
                  <>
                    Next
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                ) : (
                  'Complete'
                )}
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="completed"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8 rounded-2xl shadow-elevation text-center"
          >
            <div className="flex justify-center mb-8">
              <motion.div 
                className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-primary"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
              >
                <CheckCircle size={48} />
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4">You're all set!</h2>
              <p className="text-lg mb-8">
                Your personalized learning journey awaits. I'll be here to help you along the way.
              </p>
              <Button onClick={goToDashboard} size="lg" className="group">
                Go to my dashboard
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIWalkthrough;
