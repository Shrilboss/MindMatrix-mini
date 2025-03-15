
/**
 * Get the authentication token from localStorage
 * @returns The authentication token or null if not found
 */
export const getAuthToken = async (): Promise<string | null> => {
  const user = localStorage.getItem('user');
  return user ? 'dummy-auth-token' : null;
};

/**
 * Check if the user is authenticated
 * @returns True if the user is authenticated, false otherwise
 */
export const isAuthenticated = async (): Promise<boolean> => {
  const user = localStorage.getItem('user');
  return !!user;
};

/**
 * Get the current user ID
 * @returns The current user ID or null if not authenticated
 */
export const getCurrentUserId = async (): Promise<string | null> => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user).id : null;
};
