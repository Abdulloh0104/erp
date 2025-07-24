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
const Branches = lazy(() => import("./branches/branches"));
const Teachers = lazy(() => import("./teachers/teachers"));
const Students = lazy(() => import("./students/students"));
const Rooms = lazy(() => import("./rooms/room"));

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
  Branches,
  Teachers,
  Students,
  Rooms,
};
