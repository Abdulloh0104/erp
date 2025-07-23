import type { Student } from "./student";
import type { Teacher } from "./teacher";

export interface Group {
  id?: number;
  name: string;
  courseId: number;
  roomId: number;
  start_time: string;
  start_date: string;
  end_date: string;
  status: string;
}

export interface Lessons {
  id:number
  title: string;
  notes: string;
  date: string;
  status: string;
}

export interface GroupLessonsType {
  lessons: Lessons[];
}


export interface GroupTeachersType {
  teachers: Teacher[];
}


export interface GroupStudentsType {
  teachers: Student[];
}