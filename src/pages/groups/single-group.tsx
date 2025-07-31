import { useParams } from "react-router-dom";
import { useGroup } from "@hooks";
import { GroupLessons, GroupStudents, GroupTeachers } from "@components";

const SingleGroup = () => {
  const { id } = useParams<{ id: string }>();
  const { students, lessons, teachers } = useGroup(
    { page: 1, limit: 10 },
    Number(id)
  );
  return (
    <div>
      <h1>Single group</h1>
      <h1>Id:{id}</h1>
      {teachers?.data.length > 0 && <GroupTeachers teachers={teachers?.data} />}
      {lessons?.data?.lessons.length > 0 && <GroupLessons lessons={lessons?.data?.lessons} />}
      {students?.data.length > 0 && <GroupStudents students={students?.data} />}
    </div>
  );
};

export default SingleGroup;
