import { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home,
  Users, 
  Briefcase,
  Calendar, 
  Settings,
  Menu, 
  X, 
  LayoutDashboard,
  GraduationCap,
  CheckSquare,
  Pencil,
  UserCircle,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { UserProfile } from '@/types/auth';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useAuth } from '@/contexts/AuthContext'; // Ensure this import exists


interface DashboardLayoutProps {
  children: ReactNode;
  user: UserProfile;
}

interface NavItem {
  title: string;
  href: string;
  icon: ReactNode;
}

const DashboardLayout = ({ children, user }: DashboardLayoutProps) => {
  const { signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (location.pathname === '/dashboard') {
      setActiveTab('overview');
    } else if (location.pathname.includes('learning-pathway')) {
      setActiveTab('learning-pathway');
    } else if (location.pathname.includes('tasks')) {
      setActiveTab('tasks');
    } else if (location.pathname.includes('study-room')) {
      setActiveTab('study-room');
    }
  }, [location.pathname]);

  const verticalNavItems: NavItem[] = [
    {
      title: 'Home',
      href: '/dashboard/profile',
      icon: <UserCircle className="w-5 h-5" />,
    },
    {
      title: 'Community',
      href: '/dashboard/community',
      icon: <Users className="w-5 h-5" />,
    },
    {
      title: 'Recruiter Portal',
      href: '/dashboard/recruiter',
      icon: <Briefcase className="w-5 h-5" />,
    },
    {
      title: 'My Calendar',
      href: '/dashboard/calendar',
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  const horizontalTabItems: NavItem[] = [
    {
      title: 'Overview',
      href: '/dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      title: 'Learning Pathway',
      href: '/dashboard/learning-pathway',
      icon: <GraduationCap className="w-5 h-5" />,
    },
    {
      title: 'Tasks',
      href: '/dashboard/tasks',
      icon: <CheckSquare className="w-5 h-5" />,
    },
    {
      title: 'Study Room',
      href: '/dashboard/study-room',
      icon: <Pencil className="w-5 h-5" />,
    },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50"
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)} 
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-16 md:w-20 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-200 ease-in-out md:translate-x-0 md:relative md:h-screen flex flex-col items-center",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full w-full">
          <div className="flex items-center justify-center p-4 border-b border-gray-200 dark:border-gray-800">
            <Link to="/" className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
              <span className="font-bold text-white text-xl">M</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden absolute right-2"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>

          <nav className="flex-1 overflow-y-auto py-4 flex flex-col items-center">
            <ul className="space-y-6 w-full">
              {verticalNavItems.map((item) => (
                <li key={item.href} className="px-2">
                  <Link
                    to={item.href}
                    className={cn(
                      "flex flex-col items-center justify-center gap-1 rounded-md p-2 text-xs font-medium transition-colors",
                      location.pathname === item.href
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    {item.icon}
                    <span className="text-center">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex justify-center">
            <HoverCard openDelay={200} closeDelay={100}>
              <HoverCardTrigger asChild>
                <div className="h-9 w-9 rounded-full bg-primary/10 overflow-hidden flex items-center justify-center text-primary cursor-pointer">
                  {user.profileImage ? (
                    <img src={user.profileImage} alt={user.name} className="h-full w-full object-cover" />
                  ) : (
                    user.name.split(' ').map(n => n[0]).join('')
                  )}
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-auto p-0" align="start" side="right">
                <div className="flex flex-col p-4">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-2 justify-start"
                    onClick={() => {
                      signOut(); // Properly clear the session
                      navigate('/'); // Redirect after logout
                    }}
                    // onClick={() => navigate('/')}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </Button>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </aside>

      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto pb-16">
          <div className="container p-4 md:p-6">
            {children}
          </div>
        </main>

        <footer className="h-16 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 flex items-center px-4 md:px-6 fixed bottom-0 w-full z-10">
          <div className="container mx-auto flex justify-center">
            <nav className="flex-1">
              <ul className="flex space-x-4 justify-center">
                {horizontalTabItems.map((item) => (
                  <li key={item.href}>
                    <Button
                      variant={item.href === '/dashboard' && location.pathname === '/dashboard' || 
                              item.href !== '/dashboard' && location.pathname.includes(item.href.replace('/dashboard/', '')) 
                        ? "default" : "ghost"}
                      className={cn(
                        "flex items-center gap-2",
                        item.href === '/dashboard' && location.pathname === '/dashboard' || 
                        item.href !== '/dashboard' && location.pathname.includes(item.href.replace('/dashboard/', ''))
                          ? "bg-primary text-primary-foreground" 
                          : "text-muted-foreground"
                      )}
                      onClick={() => navigate(item.href)}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
