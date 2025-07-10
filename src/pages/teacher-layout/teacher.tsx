import { Outlet } from "react-router-dom";

const Teacher = () => {
  return (
    <div>
      <h1>Teacher layout</h1>
      {/* sidebar */}
      <Outlet />
    </div>
  );
}

export default Teacher