
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import LearningPathway from '@/components/dashboard/LearningPathway';
import TasksPanel from '@/components/dashboard/TasksPanel';
import StudyRoom from '@/components/dashboard/StudyRoom';
import UserProfile from '@/components/dashboard/UserProfile';
import Community from '@/components/dashboard/Community';
import RecruiterPortal from '@/components/dashboard/RecruiterPortal';
import CalendarView from '@/components/dashboard/CalendarView';
import Settings from '@/components/dashboard/Settings';
import { useAuth } from '@/contexts/AuthContext';
import AIChatbot from '@/components/dashboard/AIChatbot';

const Dashboard = () => {
  const location = useLocation();
  const [chatbotExpanded, setChatbotExpanded] = useState(false);
  const { profile } = useAuth();
  
  // Check if the current route should have a fixed chatbot
  const shouldFixChatbot = 
    location.pathname.includes('/dashboard/learning-pathway') || 
    location.pathname.includes('/dashboard/recruiter');

  // Set initial expanded state based on route
  useEffect(() => {
    if (shouldFixChatbot) {
      setChatbotExpanded(true);
    }
  }, [location.pathname, shouldFixChatbot]);

  const toggleChatbot = () => {
    setChatbotExpanded(!chatbotExpanded);
  };

  // If profile is not loaded or doesn't exist, we could show a loading state
  if (!profile) {
    return <div className="min-h-screen flex items-center justify-center">Loading user profile...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardLayout user={profile}>
        <div className="flex flex-col flex-1 overflow-hidden relative">
          <Routes>
            {/* Horizontal Tabs Routes */}
            <Route index element={<DashboardOverview user={profile} />} />
            <Route path="learning-pathway" element={<LearningPathway user={profile} />} />
            <Route path="tasks" element={<TasksPanel user={profile} />} />
            <Route path="study-room" element={<StudyRoom user={profile} />} />
            
            {/* Vertical Taskbar Routes */}
            <Route path="profile" element={<UserProfile user={profile} />} />
            <Route path="community" element={<Community user={profile} />} />
            <Route path="recruiter" element={<RecruiterPortal user={profile} />} />
            <Route path="calendar" element={<CalendarView user={profile} />} />
            <Route path="settings" element={<Settings user={profile} />} />
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
          
          {/* AI Chatbot - always present but in different states */}
          <AIChatbot 
            expanded={chatbotExpanded} 
            fixed={shouldFixChatbot}
            onToggle={toggleChatbot}
          />
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Dashboard;
