
import MentorCard from './MentorCard';
import { Mentor } from '@/types/program';

interface ProgramMentorsTabProps {
  mentors: Mentor[];
}

const ProgramMentorsTab = ({ mentors }: ProgramMentorsTabProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Program Mentors</h3>
      
      <div className="space-y-6">
        {mentors.map((mentor) => (
          <MentorCard key={mentor.id} mentor={mentor} />
        ))}
      </div>
    </div>
  );
};

export default ProgramMentorsTab;
