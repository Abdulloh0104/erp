// src/pages/index.tsx
import { lazy } from "react";

const SignIn = lazy(() => import("./auth/sign-in"));
const SignUp = lazy(() => import("./auth/sing-up"));
const StudentLayout = lazy(() => import("./student-layout/student"));
const TeacherLayout = lazy(() => import("./teacher-layout/teacher"));
const AdminLayout = lazy(() => import("./admin-layout/admin"));
const Groups = lazy(() => import("./groups/groups"));
const Worker = lazy(() => import("./worker/worker"));
const Courses = lazy(() => import("./courses/course"));
const SingleGroup = lazy(() => import("./groups/single-group"));
const SingleCourse = lazy(() => import("./courses/single-course"));
const Branches = lazy(() => import("./branches/branches"));
const SingleBranch = lazy(() => import("./branches/single-group"));
const Teachers = lazy(() => import("./teachers/teachers"));
const SingleTeacher = lazy(() => import("./teachers/single-teacher"));
const Students = lazy(() => import("./students/students"));
const SingleStudents = lazy(() => import("./students/single-group"));
const Rooms = lazy(() => import("./rooms/room"));
const SingleRoom = lazy(() => import("./rooms/single-room"));

export {
  SignIn,
  SignUp,
  StudentLayout,
  TeacherLayout,
  AdminLayout,
  Groups,
  Worker,
  SingleGroup,
  Courses,
  SingleCourse,
  Branches,
  SingleBranch,
  Teachers,
  SingleTeacher,
  Students,
  SingleStudents,
  Rooms,
  SingleRoom
};
