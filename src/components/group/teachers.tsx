import type { GroupTeachersType } from "@types";

const GroupTeachers = ({teachers}: GroupTeachersType) => {
  console.log("teachers", teachers);
  return (
    <div>
      <h1>Teachers</h1>
    </div>
  );
};

export default GroupTeachers;