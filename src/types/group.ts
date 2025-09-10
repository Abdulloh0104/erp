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

export interface SingleGroupStudentType {
  status?: boolean;
  student: Student;
}

export interface GroupStudentType {
  studentData: SingleGroupStudentType[];
}

export interface GroupTeachersType {
  teachers: Teacher[];
}
export interface SingleGroupTeacherType {
  status?: boolean;
  teacher: Teacher;
}

export interface GroupTeacherType {
  data:SingleGroupTeacherType[];
}

export interface GroupStudentCreateType {
  groupId?: number;
  studentId: number[];
  status?: boolean;
  start_date?: string;
}

export interface GroupTeacherCreateType {
  groupId?: number;
  teacherId: number[];
  status?: boolean;
  start_date?: string;
}

