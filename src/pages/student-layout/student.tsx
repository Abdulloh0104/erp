import { Outlet } from "react-router-dom";

const Student = () => {
  return (
    <div>
      <h1>Student layout</h1>
      {/* sidebar */}
      <Outlet />
    </div>
  );
}

export default Student

