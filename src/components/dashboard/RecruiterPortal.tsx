
import { UserProfile } from "@/types/auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, TrendingUp, Award, BadgeIndianRupee } from "lucide-react";

interface RecruiterPortalProps {
  user: UserProfile;
}

const RecruiterPortal = ({ user }: RecruiterPortalProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Recruiter Portal</h1>
        <p className="text-muted-foreground">
          Connect with top employers and explore job opportunities
        </p>
      </div>

      {/* AI Screening Section */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="mr-2 h-5 w-5 text-primary" />
            AI Screening
          </CardTitle>
          <CardDescription>
            This screening helps you prepare better for recruitment cycles and helps recruiters see your true potential
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" size="lg">Assess Yourself</Button>
          <p className="text-xs text-muted-foreground mt-2">
            *Completing the AI screening is mandatory to apply for internships and jobs
          </p>
        </CardContent>
      </Card>

      {/* Placeholder for Success Stories */}
      <Card>
        <CardHeader>
          <CardTitle>Success Stories</CardTitle>
          <CardDescription>MindMatrix students who were recently placed</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border p-4">
              <div className="flex flex-col space-y-3">
                <div className="relative h-40 bg-muted rounded-md overflow-hidden">
                  <img src="/placeholder.svg" alt="Student" className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <h4 className="text-white text-sm font-medium">Rahul Sharma</h4>
                    <p className="text-white/90 text-xs">Data Scientist at Infosys</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Key Skills</span>
                    <span className="text-xs font-medium">Salary <BadgeIndianRupee className="inline h-3 w-3" />12 LPA</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs px-2 py-0.5 rounded-full">Python</span>
                    <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs px-2 py-0.5 rounded-full">ML</span>
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs px-2 py-0.5 rounded-full">AWS</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex flex-col space-y-3">
                <div className="relative h-40 bg-muted rounded-md overflow-hidden">
                  <img src="/placeholder.svg" alt="Student" className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <h4 className="text-white text-sm font-medium">Priya Patel</h4>
                    <p className="text-white/90 text-xs">SDE at Amazon</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Key Skills</span>
                    <span className="text-xs font-medium">Salary <BadgeIndianRupee className="inline h-3 w-3" />18 LPA</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs px-2 py-0.5 rounded-full">Java</span>
                    <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs px-2 py-0.5 rounded-full">DSA</span>
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs px-2 py-0.5 rounded-full">Cloud</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Placeholder for Hot Jobs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Briefcase className="mr-2 h-5 w-5" />
            Hot Jobs
          </CardTitle>
          <CardDescription>Trending positions in the industry</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <div className="flex gap-3">
                <div className="h-12 w-12 bg-primary/10 rounded-md flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">AI Engineer</h4>
                  <p className="text-xs text-muted-foreground">TCS, Bangalore</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">New</span>
                    <span className="text-xs font-medium"><BadgeIndianRupee className="inline h-3 w-3" />10-15 LPA</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex gap-3">
                <div className="h-12 w-12 bg-primary/10 rounded-md flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">Data Scientist</h4>
                  <p className="text-xs text-muted-foreground">Wipro, Hyderabad</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Popular</span>
                    <span className="text-xs font-medium"><BadgeIndianRupee className="inline h-3 w-3" />12-18 LPA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Button variant="outline" className="w-full mt-4">
            View All Jobs
          </Button>
        </CardContent>
      </Card>

      {/* Placeholder for Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            Recruitment Analytics
          </CardTitle>
          <CardDescription>Trends and patterns in the recruitment market</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-[200px] border rounded-md p-4 flex items-center justify-center bg-muted/20">
              <p className="text-sm text-muted-foreground">Industry Hiring Trends Graph (Coming Soon)</p>
            </div>
            
            <div className="h-[120px] border rounded-md p-4 flex items-center justify-center bg-muted/20">
              <p className="text-sm text-muted-foreground">Skill Demand Analytics (Coming Soon)</p>
            </div>
          </div>
          
          <div className="mt-4 border rounded-md p-4 bg-green-50 dark:bg-green-900/20">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">MindMatrix Trust Score</h4>
              <span className="text-green-600 font-semibold">92%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Percentage of recruiters who trust MindMatrix candidates</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecruiterPortal;
