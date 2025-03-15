
import { supabase } from '@/integrations/supabase/client';

const API_URL = 'http://localhost:5000/api';

// Generic API client with authentication
export const apiClient = {
  get: async (endpoint: string) => {
    // Get the current session for auth token if needed
    const { data: { session } } = await supabase.auth.getSession();
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        // Include auth token if you want to secure the MongoDB API
        ...(session?.access_token ? { 'Authorization': `Bearer ${session.access_token}` } : {})
      }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    
    return await response.json();
  },
  
  post: async (endpoint: string, data: any) => {
    const { data: { session } } = await supabase.auth.getSession();
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(session?.access_token ? { 'Authorization': `Bearer ${session.access_token}` } : {})
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    
    return await response.json();
  },
  
  put: async (endpoint: string, data: any) => {
    const { data: { session } } = await supabase.auth.getSession();
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(session?.access_token ? { 'Authorization': `Bearer ${session.access_token}` } : {})
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    
    return await response.json();
  },
  
  delete: async (endpoint: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(session?.access_token ? { 'Authorization': `Bearer ${session.access_token}` } : {})
      }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    
    return await response.json();
  }
};
