import { useParams } from "react-router-dom";
import { useGroup } from "@hooks";
import { GroupLessons } from "@components";
// import { useSuspenseQueries } from "@tanstack/react-query";

const SingleGroup = () => {
  const { id } = useParams<{ id: string }>();
  // const { students, lessons, teachers } = useGroup(
  const {lessons} = useGroup(
    { page: 1, limit: 10 },
    Number(id)
  );
  // console.log("students", students);
    // console.log("lessons", lessons);
  // console.log("teachers", teachers);

  return (
    <div>
      <h1>Single group</h1>
      <h1>Id:{id}</h1>
      {/* {teachers?.data.length > 0 && <GroupTeachers teachers={teachers?.data} />}
      {students?.data.length > 0 && <GroupStudents students={students?.data} />} */}
      {lessons?.data.length > 0 && <GroupLessons lessons={lessons?.data} />}
    </div>
  );
};

export default SingleGroup;
