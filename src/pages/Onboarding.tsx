
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Bot, BookOpen, Lightbulb, Users, CheckCircle, Zap, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { profile } = useAuth();
  const navigate = useNavigate();
  
  // Get the user's name from profile or use default
  const userName = profile?.name ? profile.name.split(' ')[0] : 'there';
  
  // Onboarding steps
  const steps = [
    {
      title: `Welcome, ${userName}!`,
      description: "We're excited to have you join MindMatrix! Let's get you set up with a personalized experience.",
      icon: <Bot className="h-8 w-8" />,
    },
    {
      title: "Personalized Learning Path",
      description: "Based on your profile, we'll create a customized learning journey to help you achieve your goals efficiently.",
      icon: <Lightbulb className="h-8 w-8" />,
    },
    {
      title: "Collaborative Learning",
      description: "Connect with peers, join study groups, and participate in discussions to enhance your learning experience.",
      icon: <Users className="h-8 w-8" />,
    },
    {
      title: "Track Your Progress",
      description: "Monitor your achievements, complete tasks, and watch your skills grow through our intuitive dashboard.",
      icon: <Zap className="h-8 w-8" />,
    },
    {
      title: "Ready to Begin",
      description: "Your personalized dashboard is all set up! Click below to start your learning journey with MindMatrix.",
      icon: <Rocket className="h-8 w-8" />,
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="max-w-3xl w-full mx-auto px-4">
        <div className="glass-card p-8 rounded-2xl shadow-elevation">
          {/* Progress indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? 'bg-primary w-8'
                      : index < currentStep
                      ? 'bg-primary/60'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {steps[currentStep].icon}
                </div>
              </div>
              
              <h2 className="text-3xl font-bold mb-4">{steps[currentStep].title}</h2>
              <p className="text-lg mb-8 max-w-xl mx-auto">{steps[currentStep].description}</p>
              
              {currentStep < steps.length - 1 ? (
                <Button onClick={handleNext} size="lg" className="group">
                  Next
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              ) : (
                <Button onClick={handleGoToDashboard} size="lg" className="bg-primary hover:bg-primary/90">
                  Take me to my dashboard
                </Button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
