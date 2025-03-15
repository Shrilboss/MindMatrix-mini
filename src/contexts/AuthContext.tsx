
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { UserProfile } from '@/types/auth';
import { toast } from 'sonner';

// Sample user profile data
const sampleProfile: UserProfile = {
  name: 'Demo User',
  email: 'demo@example.com',
  role: 'independent',
  mmCoins: 100,
  engagement: {
    daily: 75,
    weekly: 340,
    monthly: 1200,
    streak: 7
  }
};

interface AuthContextType {
  user: any | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: Partial<UserProfile>) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setProfile(sampleProfile);
    }
  }, []);

  // Sign in function
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simple email validation
      if (!email.includes('@')) {
        throw new Error('Invalid email format');
      }
      
      // Simple password validation
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      // Mock successful login
      const userData = { id: 'demo-user-id', email };
      setUser(userData);
      setProfile(sampleProfile);
      
      // Store in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(userData));
      
      toast.success('Logged in successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign up function
  const signUp = async (email: string, password: string, userData: Partial<UserProfile>) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simple email validation
      if (!email.includes('@')) {
        throw new Error('Invalid email format');
      }
      
      // Simple password validation
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      // Mock successful registration
      const newUserData = { id: 'new-user-id', email };
      setUser(newUserData);
      
      // Create profile by merging sample with provided data
      const newProfile = { ...sampleProfile, ...userData, email };
      setProfile(newProfile);
      
      // Store in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(newUserData));
      
      toast.success('Registered successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign up');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign out function
  const signOut = async () => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Clear user state
      setUser(null);
      setProfile(null);
      
      // Remove from localStorage
      localStorage.removeItem('user');
      
      toast.info('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update profile function
  const updateProfile = async (data: Partial<UserProfile>) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update the profile state with the new data
      setProfile(prevProfile => {
        if (!prevProfile) return data as UserProfile;
        return { ...prevProfile, ...data };
      });
      
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
