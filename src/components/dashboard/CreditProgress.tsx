
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Book, CheckCircle, Clock } from "lucide-react";

const CreditProgress = () => {
  // This would come from an API in a real application
  const creditInfo = {
    totalCredits: 6,
    requiredCredits: 24,
    creditsInProgress: 6,
    completedCourses: [
      { id: 1, title: "Introduction to AI", credits: 3, grade: "A", semester: "Fall 2023" },
      { id: 2, title: "Data Analysis Basics", credits: 3, grade: "B+", semester: "Fall 2023" },
    ],
    inProgressCourses: [
      { id: 3, title: "Machine Learning Fundamentals", credits: 3, progress: 30, dueDate: "May 15, 2024" },
      { id: 4, title: "AI Ethics", credits: 3, progress: 10, dueDate: "May 30, 2024" },
    ],
    college: "Tech University",
    program: "Computer Science",
    advisor: "Dr. Jane Smith",
  };

  const creditPercentage = (creditInfo.totalCredits / creditInfo.requiredCredits) * 100;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Credit Progress</h1>
        <p className="text-muted-foreground mt-2">Track your college credit accumulation</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <GraduationCap className="mr-2 h-5 w-5" />
              Credit Overview
            </CardTitle>
            <CardDescription>Your progress toward degree requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{creditInfo.totalCredits} of {creditInfo.requiredCredits} Credits</span>
                  <span className="text-sm font-medium">{Math.round(creditPercentage)}%</span>
                </div>
                <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className="bg-primary h-full" 
                    style={{ width: `${creditPercentage}%` }}
                  />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Program</span>
                  <span className="font-medium">{creditInfo.program}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>College</span>
                  <span className="font-medium">{creditInfo.college}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Academic Advisor</span>
                  <span className="font-medium">{creditInfo.advisor}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Credits in Progress</span>
                  <span className="font-medium">{creditInfo.creditsInProgress}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5" />
              Completed Courses
            </CardTitle>
            <CardDescription>Courses you've successfully completed</CardDescription>
          </CardHeader>
          <CardContent>
            {creditInfo.completedCourses.length === 0 ? (
              <p className="text-muted-foreground text-sm">No completed courses yet.</p>
            ) : (
              <div className="space-y-4">
                {creditInfo.completedCourses.map((course) => (
                  <div key={course.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{course.title}</h4>
                        <p className="text-sm text-muted-foreground">{course.semester}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-sm font-medium">{course.credits} Credits</span>
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded-full">
                          Grade: {course.grade}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="mr-2 h-5 w-5" />
            Courses In Progress
          </CardTitle>
          <CardDescription>Courses you're currently working on</CardDescription>
        </CardHeader>
        <CardContent>
          {creditInfo.inProgressCourses.length === 0 ? (
            <p className="text-muted-foreground text-sm">No courses in progress.</p>
          ) : (
            <div className="space-y-4">
              {creditInfo.inProgressCourses.map((course) => (
                <div key={course.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium">{course.title}</h4>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Book className="mr-1 h-4 w-4" />
                        {course.credits} Credits
                      </p>
                    </div>
                    <div>
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full">
                        Due: {course.dueDate}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="bg-primary h-full" 
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CreditProgress;
