
export interface Module {
  id: string;
  title: string;
  sessions: {
    id: string;
    title: string;
    duration: string;
    tasks: string[];
    materials: string[];
  }[];
}

export interface Mentor {
  id: string;
  name: string;
  image: string;
  title: string;
  experience: string;
  industry: string;
  expertise: string[];
  studentsCount: number;
  ratings: number;
  testimonials: {
    text: string;
    student: string;
    rating: number;
  }[];
}

export interface ProgramDetails {
  modules?: Module[];
  mentors?: Mentor[];
}
