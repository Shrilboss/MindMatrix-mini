
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/services/api';

export interface Course {
  _id: string;
  title: string;
  description: string;
  duration: string;
  modules: number;
  students: number;
  image: string;
  progress?: number; // Frontend-only property
}

// Hook for accessing courses data and operations
export const useCourses = () => {
  const queryClient = useQueryClient();
  
  // Fetch all courses
  const getCourses = () => {
    return useQuery({
      queryKey: ['courses'],
      queryFn: async () => {
        const data = await apiClient.get('/courses');
        // Add a mock progress field for each course
        return data.map((course: Course) => ({
          ...course,
          progress: Math.floor(Math.random() * 100)
        }));
      }
    });
  };
  
  // Fetch a single course by ID
  const getCourse = (id: string) => {
    return useQuery({
      queryKey: ['courses', id],
      queryFn: () => apiClient.get(`/courses/${id}`)
    });
  };
  
  // Create a new course
  const createCourse = useMutation({
    mutationFn: (courseData: Omit<Course, '_id'>) => {
      return apiClient.post('/courses', courseData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    }
  });
  
  // Update a course
  const updateCourse = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Course> }) => {
      return apiClient.put(`/courses/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    }
  });
  
  // Delete a course
  const deleteCourse = useMutation({
    mutationFn: (id: string) => {
      return apiClient.delete(`/courses/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    }
  });
  
  return {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse
  };
};
