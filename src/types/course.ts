export interface Course {
  id?: number;
  title: string;
  duration: string;
  lessons_in_a_week: number;
  lesson_duration: string;
  price: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  description: string;
}
