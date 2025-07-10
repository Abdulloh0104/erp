// src/pages/index.tsx
import { lazy } from "react";

const SignIn = lazy(() => import("./auth/sign-in"));
const SignUp = lazy(() => import("./auth/sing-up"));
const StudentLayout = lazy(() => import("./student-layout/student"));
const TeacherLayout = lazy(() => import("./teacher-layout/teacher"));
const AdminLayout = lazy(() => import("./admin-layout/admin"));
const Groups = lazy(() => import("./groups/groups"));

export { SignIn, SignUp,StudentLayout,TeacherLayout,AdminLayout,Groups };
