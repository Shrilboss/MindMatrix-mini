
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { UserProfile } from '@/types/auth';
import { toast } from 'sonner';
// import { resolve } from 'path';
const API_URL = import.meta.env.VITE_API_URL;
interface AuthContextType {
  user: any | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: Partial<UserProfile>) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => void;
  // signInWithGoogle : (onSuccess?: (token: string) => void) => void; 
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await fetchUserProfile();
        } catch (error) {
          console.error('Session validation failed:', error);
          signOut();
        }
      }
    };
    checkAuth();
  }, []);

  const fetchUserProfile = async () => {
    setLoading(true);
    console.log("Fetching User Profile");
    try {
      const response = await fetch(`${API_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) throw new Error('Session expired');
      
      const data = await response.json();
      console.log("Feteched user data",data);
      setUser(data.user);
      setProfile(data.profile);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthResponse = async (response: Response) => {
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Authentication failed');
    console.log("Handled response Fetched data",data)
    localStorage.setItem('token', data.token);
    await fetchUserProfile();
    return data;
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    console.log("Signing in");
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      await handleAuthResponse(response);
      console.log("Logged in successfully");
      toast.success('Logged in successfully');
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userData: Partial<UserProfile>) => {
    setLoading(true);
    console.log("Signing up");
    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, ...userData })
      });
      await handleAuthResponse(response);
      console.log("Registation successful");
      toast.success('Registration successful');
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await fetch(`${API_URL}/api/auth/logout`,{
        method: 'POST',
        credentials: 'include'
      });

      localStorage.removeItem('token');
      sessionStorage.clear();

      setUser(null);
      setProfile(null);

      console.log("Logged out successfully");
      toast.info('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
    }
    finally {
      setLoading(false);
    }
  };
  const signInWithGoogle = () => {
    window.location.href = `${API_URL}/api/auth/google`;
  }
  // const signInWithGoogle = () => {
  //   return new Promise<void>((resolve, reject) => {
  //     const popup = window.open(
  //       `${API_URL}/api/auth/google`,
  //       'GoogleAuth',
  //       'width=500,height=600'
  //     );
  
  //     const handleMessage = async (event: MessageEvent) => {
  //       if (event.origin !== window.location.origin) return;
  
  //       try {
  //         if (event.data.token) {
  //           console.log("Hello");
  //           localStorage.setItem('token', event.data.token);
  //           await fetchUserProfile();
  //           popup?.close();
  //           resolve();
  //         }
  
  //         if (event.data.error) {
  //           console.log(event.data.error);
  //           popup?.close();
  //           reject(new Error(event.data.error));
  //         }
  //       } catch (error) {
  //         popup?.close();
  //         console.log(error);
  //         reject(error);
  //       }
  //     };
  
  //     window.addEventListener('message', handleMessage);
  
  //     const interval = setInterval(() => {
  //       if (popup?.closed) {
  //         clearInterval(interval);
  //         window.removeEventListener('message', handleMessage);
  //         reject(new Error('Popup closed by user'));
  //       }
  //     }, 500);
  //   });
  // };
  // const signInWithGoogle = () => {
  //   return new Promise<void>((resolve, reject) => {
  //     const popup = window.open(
  //       `${API_URL}/api/auth/google`,
  //       'GoogleAuth',
  //       'width=500,height=600'
  //     );
  
  //     const checkPopupClosed = setInterval(() => {
  //       if (popup?.closed) {
  //         clearInterval(checkPopupClosed);
  //         resolve();
  //       }
  //     }, 500);
  //   });
  // };
  
  // const signInWithGoogle = () => {
  //   return new Promise<void>((resolve, reject) => {
  //     const popup = window.open(
  //       `${API_URL}/api/auth/google`,
  //       'GoogleAuth',
  //       'width=500,height=600'
  //     );
  
  //     const handleMessage = async (event: MessageEvent) => {
  //       if (event.origin !== window.location.origin) return;
  
  //       try {
  //         if (event.data.token) {
  //           localStorage.setItem('token', event.data.token);
  //           await fetchUserProfile();
  //           popup?.close();
  //           resolve(); // Resolve after successful auth
  //         }
  
  //         if (event.data.error) {
  //           popup?.close();
  //           reject(new Error(event.data.error));
  //         }
  //       } catch (error) {
  //         popup?.close();
  //         reject(error);
  //       }
  //     };
  
  //     window.addEventListener('message', handleMessage);
  
  //     // Cleanup listener when popup closes
  //     const interval = setInterval(() => {
  //       if (popup?.closed) {
  //         clearInterval(interval);
  //         window.removeEventListener('message', handleMessage);
  //         reject(new Error('Popup closed by user'));
  //       }
  //     }, 500);
  //   });
  // };
  // const signInWithGoogle = (onSuccess?: (token: string) => void) => {
  //   const popup = window.open(
  //     `${API_URL}/api/auth/google`,
  //     'GoogleAuth',
  //     'width=500,height=600'
  //   );
  
  //   const handleAuthMessage = (event: MessageEvent) => {
  //     if (event.origin !== window.location.origin) return; // Security check
  
  //     if (event.data.token) {
  //       localStorage.setItem('token', event.data.token);
  //       fetchUserProfile(); // Update user state
  //       onSuccess(event.data.token); // ✅ Call the success callback
  //       popup?.close();
  //     }
  
  //     if (event.data.error) {
  //       toast.error(event.data.error);
  //       popup?.close();
  //     }
  //   };
  
  //   window.addEventListener('message', handleAuthMessage);
    
  //   // Cleanup event listener when popup closes
  //   const checkPopupClosed = setInterval(() => {
  //     if (!popup || popup.closed) {
  //       clearInterval(checkPopupClosed);
  //       window.removeEventListener('message', handleAuthMessage);
  //     }
  //   }, 500);
  // };
  
  // const signInWithGoogle = () => {
  //   const popup = window.open(
  //     `${API_URL}/api/auth/google`,
  //     'GoogleAuth',
  //     'width=500,height=600'
  //   );
  
  //   // Add message listener
  //   window.addEventListener('message', (event) => {
  //     // Security check - verify origin
  //     if (event.origin !== window.location.origin) return;
  
  //     if (event.data.token) {
  //       // Handle successful login
  //       localStorage.setItem('token', event.data.token);
  //       fetchUserProfile();
  //       resolve(event.data.token);
  //       // navigate('/onboarding');
  //       popup?.close();
  //     }
  
  //     if (event.data.error) {
  //       toast.error(event.data.error);
  //       popup?.close();
  //     }
  //   });
  // };
  // const signInWithGoogle = () => {
  //   const popup = window.open(
  //     `${API_URL}/api/auth/google`,
  //     '_blank',
  //     'width=500,height=600'
  //   );
  
  //   return new Promise((resolve, reject) => {
  //     const handleAuthMessage = (event: MessageEvent) => {
  //       if (event.origin !== API_URL) return; // Security check
  //       const { token } = event.data;
  
  //       if (token) {
  //         localStorage.setItem('token', token);
  //         window.removeEventListener('message', handleAuthMessage);
  //         popup?.close(); // Close popup
  //         resolve(token);
  //       } else {
  //         reject(new Error('Google signup failed'));
  //       }
  //     };
  
  //     window.addEventListener('message', handleAuthMessage);
  //   });
  // };
  
  // const signInWithGoogle = () => {
  //   window.open(`${API_URL}/api/auth/google`, '_blank', 'width=500,height=600');
  // };

  const updateProfile = async (data: Partial<UserProfile>) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/users/me`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
      });
      
      const updatedProfile = await handleAuthResponse(response);
      setProfile(updatedProfile);
      toast.success('Profile updated successfully');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      loading,
      signIn,
      signUp,
      signOut,
      updateProfile,
      signInWithGoogle
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};