import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import { AdminLayout, Groups, SignIn, SignUp, StudentLayout, TeacherLayout,} from "@pages";
import NotFound from "../pages/not-found/not-found";
import LoginProtect from "../pages/protect/login-protect";
import LayoutProtect from "../pages/protect/layout-protect";

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<LoginProtect><SignIn /></LoginProtect>} />
        <Route path="sign-up" element={<SignUp />} />
        

        {/* ADMIN LAYOUT */}
        <Route path="admin" element={<LayoutProtect><AdminLayout /></LayoutProtect>}>
          <Route index element={<Groups />} />
          <Route path="teacher" element={<TeacherLayout />} />
          <Route path="student" element={<StudentLayout />} />
        </Route>

        {/* TEACHER LAYOUT */}
        <Route path="teacher" element={<LayoutProtect><TeacherLayout /></LayoutProtect>}>
        </Route>

        {/* STUDENT LAYOUT */}
        <Route path="student" element={<LayoutProtect><StudentLayout /></LayoutProtect>}>
        </Route>
        <Route path="*" element={<NotFound/>}/>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default Router;
