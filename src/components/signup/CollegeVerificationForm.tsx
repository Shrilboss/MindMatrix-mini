
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { CollegeDetails } from '@/types/auth';

interface CollegeVerificationFormProps {
  onSubmit: (details: CollegeDetails) => void;
  onBack: () => void;
}

const CollegeVerificationForm = ({ onSubmit, onBack }: CollegeVerificationFormProps) => {
  const [details, setDetails] = useState<CollegeDetails>({
    state: '',
    university: '',
    college: '',
    enrollmentNumber: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(details);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="state" className="text-sm font-medium">
            State
          </label>
          <select
            id="state"
            className="w-full px-3 py-2 border border-input rounded-md"
            value={details.state}
            onChange={(e) => setDetails({ ...details, state: e.target.value })}
            required
          >
            <option value="">Select your state</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Maharashtra">Maharashtra</option>
            {/* Add more states */}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="university" className="text-sm font-medium">
            State University
          </label>
          <select
            id="university"
            className="w-full px-3 py-2 border border-input rounded-md"
            value={details.university}
            onChange={(e) => setDetails({ ...details, university: e.target.value })}
            required
          >
            <option value="">Select your university</option>
            <option value="VTU">Visvesvaraya Technological University</option>
            {/* Add more universities */}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="college" className="text-sm font-medium">
            College
          </label>
          <select
            id="college"
            className="w-full px-3 py-2 border border-input rounded-md"
            value={details.college}
            onChange={(e) => setDetails({ ...details, college: e.target.value })}
            required
          >
            <option value="">Select your college</option>
            <option value="RVCE">RV College of Engineering</option>
            {/* Add more colleges */}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="enrollmentNumber" className="text-sm font-medium">
            Enrollment Number
          </label>
          <input
            id="enrollmentNumber"
            className="w-full px-3 py-2 border border-input rounded-md"
            type="text"
            value={details.enrollmentNumber}
            onChange={(e) => setDetails({ ...details, enrollmentNumber: e.target.value })}
            placeholder="Enter your college enrollment number"
            required
          />
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">
          Verify & Continue
        </Button>
      </div>
    </form>
  );
};

export default CollegeVerificationForm;
