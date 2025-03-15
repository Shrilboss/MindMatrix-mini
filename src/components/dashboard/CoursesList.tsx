
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Clock, BookOpen, Users, ChevronRight, Loader2 } from "lucide-react";
import { useCourses, Course } from "@/hooks/useCourses";
import { useState } from "react";
import { toast } from "sonner";

const CoursesList = () => {
  const { getCourses } = useCourses();
  const { data: courses, isLoading, error } = getCourses();
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2">Loading courses...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-800 rounded-md">
        <p>Error loading courses. Please try again later.</p>
        <p className="text-sm">{(error as Error).message}</p>
      </div>
    );
  }

  const handleContinue = (course: Course) => {
    toast.success(`Continuing ${course.title}`);
    // In a real app, this would navigate to the course
  };

  const toggleCourseDetails = (courseId: string) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
        <p className="text-muted-foreground mt-2">Continue your learning journey</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {courses?.map((course: Course) => (
          <Card key={course._id} className="overflow-hidden">
            <div className="relative h-48 w-full">
              <img 
                src={course.image} 
                alt={course.title} 
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="font-medium text-white">{course.title}</h3>
              </div>
            </div>
            <CardHeader className="p-4 pb-0">
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Progress: {course.progress}%
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="bg-primary h-full" 
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="mr-1 h-4 w-4" />
                    {course.modules} modules
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    {course.students.toLocaleString()}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full" onClick={() => handleContinue(course)}>
                <Play className="mr-2 h-4 w-4" />
                Continue Learning
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Explore More Courses</CardTitle>
          <CardDescription>
            Discover courses aligned with your learning goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { title: "Python for Data Science", category: "Programming", popularity: "Popular" },
              { title: "Deep Learning Specialization", category: "AI", popularity: "Advanced" },
              { title: "Web Development Bootcamp", category: "Development", popularity: "Beginner Friendly" }
            ].map((course, i) => (
              <div key={i} className="flex items-center justify-between p-2 border rounded-lg hover:bg-muted transition-colors">
                <div>
                  <h4 className="font-medium">{course.title}</h4>
                  <p className="text-sm text-muted-foreground">{course.category}</p>
                </div>
                <div className="flex items-center">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full mr-2">
                    {course.popularity}
                  </span>
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoursesList;
