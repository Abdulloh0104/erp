import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import {
  AdminLayout,
  Groups,
  SignIn,
  SignUp,
  SingleGroup,
  StudentLayout,
  TeacherLayout,
  Worker,
  Courses,
  SingleCourse,
  Branches,
  SingleBranch,
  Teachers,
  SingleTeacher,
  Students,
  SingleStudents,
  Rooms,
  SingleRoom,
} from "@pages";
import NotFound from "../pages/not-found/not-found";
import LoginProtect from "../pages/protect/login-protect";
import LayoutProtect from "../pages/protect/layout-protect";

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route
          index
          element={
            <LoginProtect>
              <SignIn />
            </LoginProtect>
          }
        />
        <Route path="sign-up" element={<SignUp />} />

        {/* ADMIN LAYOUT */}
        <Route
          path="admin"
          element={
            <LayoutProtect>
              <AdminLayout />
            </LayoutProtect>
          }
        >
          <Route index element={<Groups />} />
          <Route path="group/:id" element={<SingleGroup />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:id" element={<SingleCourse />} />
          <Route path="branches" element={<Branches />} />
          <Route path="branches/:id" element={<SingleBranch />} />
          <Route path="teacher" element={<Teachers />} />
          <Route path="teacher/:id" element={<SingleTeacher />} />
          <Route path="student" element={<Students />} />
          <Route path="student/:id" element={<SingleStudents />} />
          <Route path="room" element={<Rooms />} />
          <Route path="room/:id" element={<SingleRoom />} />
        </Route>

        {/* TEACHER LAYOUT */}
        <Route
          path="teacher"
          element={
            <LayoutProtect>
              <TeacherLayout />
            </LayoutProtect>
          }
        ></Route>

        {/* STUDENT LAYOUT */}
        <Route
          path="student"
          element={
            <LayoutProtect>
              <StudentLayout />
            </LayoutProtect>
          }
        ></Route>
        <Route path="*" element={<NotFound />} />
        <Route path="worker" element={<Worker />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default Router;
