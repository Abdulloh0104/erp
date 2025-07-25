import type { Course } from "./course";
import type { Student } from "./student";
import type { Teacher } from "./teacher";

export interface Group {
  id?: number;
  name: string;
  courseId: number;
  course?: Course;
  roomId: number;
  start_time: string;
  start_date: string;
  end_date: string;
  end_time:string;
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