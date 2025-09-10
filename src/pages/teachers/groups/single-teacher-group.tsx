// import { useParams } from "react-router-dom";
// import { useGroup } from "@hooks";
// import { GroupLessons, GroupStudents, GroupTeachers } from "@components";

// const SingleGroup = () => {
//   const { id } = useParams<{ id: string }>();
//   const { students, lessons, teachers,singleGroup } = useGroup(
//     { page: 1, limit: 10 },
//     Number(id)
//   );
//   console.log("singleGroup", singleGroup?.data?.group);
//   return (
//     <div>
//       <h1>Single group</h1>
//       <h1>Id:{id}</h1>
//       {teachers?.data.length > 0 && <GroupTeachers teachers={teachers?.data} />}
//       {singleGroup?.data?.group?.name}
//       {lessons?.data?.lessons.length > 0 && <GroupLessons lessons={lessons?.data?.lessons} />}
//       {students?.data.length > 0 && <GroupStudents students={students?.data} />}
//     </div>
//   );
// };

// export default SingleGroup;

import { useParams } from "react-router-dom";
import { useGroup } from "@hooks";
import { GroupLessons, GroupStudents, GroupTeachers } from "@components";
import { Card, Descriptions, Tag, Space, Button } from "antd";
import {
  TeamOutlined,
  BookOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import GroupTeacherModel from "../../groups/teacherModel";
import { useState } from "react";
import GroupStudentModel from "../../groups/studentModel";

const SingleTeacherGroup = () => {
  const [open, setOpen] = useState(false);
  const [openStudent, setOpenStudent] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { students, lessons, teachers, singleGroup } = useGroup(
    { page: 1, limit: 10 },
    Number(id)
  );

  const groupData = singleGroup?.data?.group;

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "success";
      case "inactive":
        return "default";
      case "pending":
        return "warning";
      case "completed":
        return "blue";
      default:
        return "default";
    }
  };
  const addTeachers = () => {
    setOpen(true);
  };

  const toggle = () => {
    setOpen(!open);
  };

  const addStudents = () => {
    setOpenStudent(true);
  };

  const toggleStudent = () => {
    setOpenStudent(!openStudent);
  };

  return (
    <>
      {open && <GroupTeacherModel open={open} toggle={toggle} id={+id!} />}
      {openStudent && (
        <GroupStudentModel
          openStudent={openStudent}
          toggleStudent={toggleStudent}
          id={+id!}
        />
      )}

      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Group Details
          </h1>
          <p className="text-gray-600">Group ID: {id}</p>
        </div>

        {/* Main Layout */}
        <div className="flex gap-6 mb-8">
          {/* Left Side - Teachers (60% width) */}
          <div className="flex-1" style={{ width: "60%" }}>
            {teachers?.data.length > 0 ? (
              <>
                <Button
                  type="primary"
                  onClick={() => addTeachers()}
                  size="small"
                  className="mb-3"
                >
                  + Add Teachers
                </Button>
                <GroupTeachers data={teachers?.data} />
              </>
            ) : (
              <>
                <Button
                  type="primary"
                  onClick={() => addTeachers()}
                  size="small"
                  className="mb-3"
                >
                  + Add Teachers
                </Button>
                <GroupTeachers data={teachers?.data} />
              </>
            )}
          </div>

          {/* Right Side - Group Info (35% width) */}
          <div className="flex-shrink-0" style={{ width: "35%" }}>
            {groupData && (
              <Card
                title={
                  <Space>
                    <TeamOutlined />
                    Group Information
                  </Space>
                }
                className="shadow-lg border-0 bg-white"
                styles={{
                  header: {
                    backgroundColor: "#f8fafc",
                    borderBottom: "2px solid #e2e8f0",
                    fontSize: "18px",
                    fontWeight: "bold",
                  },
                }}
              >
                <div className="space-y-4">
                  {/* Group Name */}
                  <div className="text-center pb-4 border-b">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {groupData.name}
                    </h2>
                    <Tag
                      color={getStatusColor(groupData.status)}
                      className="text-sm px-3 py-1"
                    >
                      {groupData.status || "Unknown"}
                    </Tag>
                  </div>

                  <Descriptions
                    column={1}
                    size="small"
                    styles={{
                      label: {
                        fontWeight: "bold",
                        color: "#374151",
                        width: "35%",
                      },
                      content: {
                        color: "#1f2937",
                      },
                    }}
                  >
                    <Descriptions.Item
                      label={
                        <Space>
                          <BookOutlined />
                          Course
                        </Space>
                      }
                    >
                      <div>
                        <div className="font-semibold">
                          {groupData.course?.title || "N/A"}
                        </div>
                        {groupData.course?.description && (
                          <div className="text-sm text-gray-600 mt-1">
                            {groupData.course.description}
                          </div>
                        )}
                      </div>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={
                        <Space>
                          <CalendarOutlined />
                          Duration
                        </Space>
                      }
                    >
                      <div className="space-y-1">
                        <div className="text-sm">
                          <strong>Start:</strong>{" "}
                          {dayjs(groupData.start_date).format("DD MMM YYYY")}
                        </div>
                        <div className="text-sm">
                          <strong>End:</strong>{" "}
                          {dayjs(groupData.end_date).format("DD MMM YYYY")}
                        </div>
                        <div className="text-xs text-gray-500">
                          Duration:{" "}
                          {dayjs(groupData.end_date).diff(
                            dayjs(groupData.start_date),
                            "day"
                          )}{" "}
                          days
                        </div>
                      </div>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={
                        <Space>
                          <ClockCircleOutlined />
                          Schedule
                        </Space>
                      }
                    >
                      <div className="space-y-1">
                        <div className="text-sm">
                          <strong>Start Time:</strong> {groupData.start_time}
                        </div>
                        <div className="text-sm">
                          <strong>End Time:</strong> {groupData.end_time}
                        </div>
                        <div className="text-xs text-gray-500">
                          Daily: {groupData.start_time} - {groupData.end_time}
                        </div>
                      </div>
                    </Descriptions.Item>
                  </Descriptions>

                  {/* Additional Stats */}
                  <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {teachers?.data?.length || 0}
                      </div>
                      <div className="text-sm text-gray-600">Teachers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {students?.data?.length || 0}
                      </div>
                      <div className="text-sm text-gray-600">Students</div>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Bottom Sections */}
        <div className="space-y-6">
          {/* Lessons Section */}
          {lessons?.data?.lessons.length > 0 && (
            <Card
              title={
                <Space>
                  <CalendarOutlined />
                  Group Lessons
                </Space>
              }
              className="shadow-lg border-0"
            >
              <GroupLessons lessons={lessons?.data?.lessons} />
            </Card>
          )}

          {/* Students Section */}
          {students?.data.length > 0 ? (
            <Card
              title={
                <Space>
                  <div>
                    <UserOutlined />
                    Group Students
                  </div>
                  <Button
                    type="primary"
                    onClick={() => addStudents()}
                    size="small"
                  >
                    + Add Students
                  </Button>
                </Space>
              }
              className="shadow-lg border-0"
            >
              <GroupStudents studentData={students?.data} />
            </Card>
          ) : (
            <Card
              title={
                <Space className="flex justify-between">
                  <div>
                    <UserOutlined />
                    Group Students
                  </div>
                  <Button
                    type="primary"
                    onClick={() => addStudents()}
                    size="small"
                  >
                    + Add Students
                  </Button>
                </Space>
              }
              className="shadow-lg border-0"
            >
              <GroupStudents studentData={students?.data} />
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleTeacherGroup;
