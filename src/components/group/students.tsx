import type { GroupStudentsType } from "@types";

const GroupStudents = ({students}: GroupStudentsType) => {
  console.log("students", students);
  return (
    <div>
      <h1>Students</h1>
    </div>
  );
};

export default GroupStudents;
