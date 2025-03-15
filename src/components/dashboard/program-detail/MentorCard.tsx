
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { Mentor } from '@/types/program';

interface MentorCardProps {
  mentor: Mentor;
}

const MentorCard = ({ mentor }: MentorCardProps) => {
  return (
    <Card key={mentor.id}>
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-muted flex-shrink-0 mx-auto sm:mx-0">
            <img 
              src={mentor.image} 
              alt={mentor.name} 
              className="w-full h-full object-cover" 
            />
          </div>
          
          <div className="flex-1 space-y-3 text-center sm:text-left">
            <div>
              <h4 className="text-base font-semibold">{mentor.name}</h4>
              <p className="text-sm text-muted-foreground">{mentor.title}</p>
            </div>
            
            <div className="flex flex-wrap gap-1 justify-center sm:justify-start">
              {mentor.expertise.map((skill, i) => (
                <Badge key={i} variant="secondary" className="font-normal">
                  {skill}
                </Badge>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex flex-col text-sm">
                <span className="text-muted-foreground">Experience</span>
                <span className="font-medium">{mentor.experience}</span>
              </div>
              
              <div className="flex flex-col text-sm">
                <span className="text-muted-foreground">Industry</span>
                <span className="font-medium">{mentor.industry}</span>
              </div>
              
              <div className="flex flex-col text-sm">
                <span className="text-muted-foreground">Students Taught</span>
                <span className="font-medium">{mentor.studentsCount}+</span>
              </div>
              
              <div className="flex flex-col text-sm">
                <span className="text-muted-foreground">Rating</span>
                <span className="font-medium flex items-center">
                  {mentor.ratings}/5
                  <Star className="h-3.5 w-3.5 ml-1 text-yellow-500 fill-yellow-500" />
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {mentor.testimonials.length > 0 && (
          <div className="mt-6 pt-4 border-t">
            <h5 className="text-sm font-medium mb-3">Student Testimonials</h5>
            <div className="space-y-3">
              {mentor.testimonials.map((testimonial, i) => (
                <div key={i} className="bg-muted p-3 rounded-md">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium">{testimonial.student}</p>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star 
                          key={idx} 
                          className={`h-3 w-3 ${idx < Math.floor(testimonial.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs mt-1">"{testimonial.text}"</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MentorCard;
