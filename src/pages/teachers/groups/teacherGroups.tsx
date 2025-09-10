import {Table, type TablePaginationConfig } from "antd";
import { useGeneral, useTeacher } from "@hooks";
import { GroupColums } from "@components";
import type { Group, TeacherGroupsType } from "@types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TeacherGroups = () => {
  // const [open, setOpen] = useState(false);
  // const [update, setUpdate] = useState<Group | null>(null);
  const [params, setParams] = useState({
    page: 1,
    limit: 5,
  });
  const { myGroups = [] } = useTeacher();
  console.log("groups___+===", myGroups);
  const { handlePagination } = useGeneral();
  const navigate = useNavigate();
  //butching ikkita va undan ortiq o'zgarishlarni alohida emas hammasini bittada render qilish
  // const editItem = (record: Group) => {
  //   setUpdate(record);
  //   setOpen(true);
  // };

  // const toggle = () => {
  //   setOpen(!open);
  //   if (update) {
  //     setUpdate(null);
  //   }
  // };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    handlePagination({ pagination, setParams });
  };

  // Transformatsiya
  const groups: Group[] = (myGroups ?? []).map((item: TeacherGroupsType) => ({
    id: item.group?.id ?? 0,
    name: item.group?.name ?? "-",
    courseId: item.group?.course?.id ?? 0,
    course: item.group?.course ?? { id: 0, title: "-" },
    roomId: item.group?.roomId ?? 0,
    start_time: item.group?.start_time ?? "",
    end_time: item.group?.end_time ?? "",
    start_date: item.group?.start_date ?? "",
    end_date: item.group?.end_date ?? "",
    status: item.group?.status ?? "unknown",
  }));
  // GroupModel pastda nega kerak;
  return (
    <>
      {/* {open && <GroupModel open={open} toggle={toggle} update={update} />} */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">My Groups</h2>
      </div>
      <Table<Group>
        columns={GroupColums} // Actionni olib tashladik
        dataSource={groups}
        rowKey={(row) => row.id!}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: groups.length,
          showSizeChanger: true,
          pageSizeOptions: ["4", "5", "6", "7", "10"],
        }}
        onChange={handleTableChange}
        onRow={(record) => ({
          onClick: () => {
            // row bosilganda navigatsiya qilish
            // React Router hook ishlatmoqchi bo‘lsangiz:
            navigate(`/teacher/group/${record.id}`);
          },
        })}
        rowClassName={() => "cursor-pointer"}
      />
    </>
  );
};

export default TeacherGroups;
