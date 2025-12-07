export interface Course {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  category: "active" | "in-progress" | "completed";
  progress: number;
  duration: number;
  lessons: number;
  instructor: string;
  initials: string;
}
