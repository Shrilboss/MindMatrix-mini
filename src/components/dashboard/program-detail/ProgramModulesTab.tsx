
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Clock,
  CheckCircle2, 
  BookOpen 
} from 'lucide-react';
import { Module } from '@/types/program';

interface ProgramModulesTabProps {
  modules: Module[];
}

const ProgramModulesTab = ({ modules }: ProgramModulesTabProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Program Modules</h3>
      
      <div className="space-y-4">
        {modules.map((module, index) => (
          <Card key={module.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                Module {index + 1}: {module.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {module.sessions.map((session, sessionIndex) => (
                  <div key={session.id} className="border-t pt-3 first:border-t-0 first:pt-0">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-medium">Session {sessionIndex + 1}: {session.title}</h4>
                      <Badge variant="outline" className="text-xs font-normal">
                        <Clock className="h-3 w-3 mr-1" /> {session.duration}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div>
                        <p className="text-xs font-medium flex items-center">
                          <CheckCircle2 className="h-3.5 w-3.5 mr-1.5 text-green-600" />
                          Tasks
                        </p>
                        <ul className="mt-1 space-y-1">
                          {session.tasks.map((task, i) => (
                            <li key={i} className="text-xs text-muted-foreground pl-5">
                              • {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <p className="text-xs font-medium flex items-center">
                          <BookOpen className="h-3.5 w-3.5 mr-1.5 text-blue-600" />
                          Materials
                        </p>
                        <ul className="mt-1 space-y-1">
                          {session.materials.map((material, i) => (
                            <li key={i} className="text-xs text-muted-foreground pl-5">
                              • {material}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProgramModulesTab;
