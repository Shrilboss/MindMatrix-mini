
import { UserProfile, UserRole } from '@/types/auth';
import { Database } from '@/integrations/supabase/types';

/**
 * Maps the database profile object to the application UserProfile type
 */
export const mapDatabaseProfileToUserProfile = (
  dbProfile: Database['public']['Tables']['profiles']['Row']
): UserProfile => {
  return {
    name: `${dbProfile.first_name || ''} ${dbProfile.last_name || ''}`.trim(),
    email: '', // Will be populated from auth.user.email
    role: dbProfile.role as UserRole,
    profileImage: dbProfile.avatar_url || undefined,
    // Add default values for other required fields
    mmCoins: 0,
    engagement: {
      daily: 0,
      weekly: 0,
      monthly: 0,
      streak: 0
    }
  };
};
