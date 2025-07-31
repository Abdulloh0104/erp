import type { Lessons } from "./general";
import type { Student } from "./student";
import type { Teacher } from "./teacher";

export interface Group {
  id?: number;
  name: string;
  courseId: number;
  course: { id: number; title: string };
  roomId: number;
  start_time: string;
  start_date: string;
  end_date: string;
  end_time: string;
  status: string;
}

export interface GroupLessonsType {
  lessons: Lessons[];
}

export interface GroupStudentsType {
  students: Student[];
}

export interface GroupTeachersType {
  teachers: Teacher[];
}
