export interface Course {
  id?: number;
  title: string;
  duration: number;
  lessons_in_a_month: number;
  lessons_in_a_week: number;
  lesson_duration: number;
  price: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  description: string;
}
