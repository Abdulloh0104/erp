// import type { GroupTeachersType } from "@types";

// const GroupTeachers = ({teachers}: GroupTeachersType) => {
//   console.log("teachers", teachers);
//   return (
//     <div>
//       <h1>Teachers</h1>
//     </div>
//   );
// };

// export default GroupTeachers;

import { Card, Avatar, Space, Tag, Row, Col, Typography, Button } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CrownOutlined,
  TeamOutlined,
  DownOutlined,
  UpOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import type { GroupTeacherType } from "@types";
import GroupTeacherModel from "../../pages/groups/teacherModel";
import { useParams } from "react-router-dom";

const { Text, Title } = Typography;

const GroupTeachers = ({ data }: GroupTeacherType) => {
  const [open, setOpen] = useState(false);
  const { id } = useParams<{ id: string }>();

  // console.log("dataTeachers", data);
  const [showAll, setShowAll] = useState(false);

  const addTeachers = () => {
    setOpen(true);
  };

  const toggle = () => {
    setOpen(!open);
  };

  // Sort teachers: active status (true) first, then others
  const sortedTeachers = data
    ? [...data].sort((a, b) => {
        // a and b are objects with { status: boolean, teacher: Teacher }
        // Sort by status (true first), then by role (main teacher first)
        if (a.status !== b.status) {
          return Number(b.status) - Number(a.status); // true (1) comes before false (0)
        }

        // If status is same, prioritize main teacher
        const roleA = (a.teacher?.role || "").toLowerCase();
        const roleB = (b.teacher?.role || "").toLowerCase();

        if (roleA.includes("main") && !roleB.includes("main")) return -1;
        if (!roleA.includes("main") && roleB.includes("main")) return 1;

        return 0;
      })
    : [];

  // Get teachers to display (first 2 or all based on showAll state)
  const displayedTeachers = showAll
    ? sortedTeachers
    : sortedTeachers.slice(0, 2);
  const remainingCount = sortedTeachers.length - 2;

  // Get role color
  const getRoleColor = (role: string) => {
    switch (role?.toLowerCase()) {
      case "main teacher":
        return "gold";
      case "assistant teacher":
        return "blue";
      default:
        return "default";
    }
  };

  // Get role icon
  const getRoleIcon = (role: string) => {
    switch (role?.toLowerCase()) {
      case "main teacher":
        return <CrownOutlined />;
      default:
        return <UserOutlined />;
    }
  };

  // Get status color and icon
  const getStatusDisplay = (status: boolean) => {
    return status
      ? {
          color: "success",
          icon: <CheckCircleOutlined />,
          text: "Active",
        }
      : {
          color: "default",
          icon: <CloseCircleOutlined />,
          text: "Inactive",
        };
  };

  const TeacherCard = ({
    teacherItem,
    index,
  }: {
    teacherItem: any;
    index: number;
  }) => {
    // teacherItem has structure: { status: boolean, teacher: Teacher }
    const teacher = teacherItem.teacher;
    const teacherStatus = teacherItem.status;
    const statusDisplay = getStatusDisplay(teacherStatus);

    return (
      <Card
        key={teacher.id || index}
        className="border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
        styles={{
          body: { padding: "16px" },
        }}
      >
        <Row gutter={[16, 8]} align="middle">
          {/* Avatar */}
          <Col xs={24} sm={6} md={4}>
            <div className="flex justify-center sm:justify-start relative">
              <Avatar
                size={64}
                src={teacher.avatar_url || `/images/Ablue.png`}
                icon={<UserOutlined />}
                className="border-2 border-gray-200"
              />
              {/* Status indicator */}
              <div
                className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                  teacherStatus ? "bg-green-500" : "bg-gray-400"
                }`}
              ></div>
            </div>
          </Col>

          {/* Teacher Info */}
          <Col xs={24} sm={18} md={20}>
            <div className="space-y-2">
              {/* Name and Tags */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <Title level={4} className="m-0 text-gray-800">
                  {teacher.first_name} {teacher.last_name}
                </Title>
                <Space>
                  <Tag
                    color={statusDisplay.color}
                    icon={statusDisplay.icon}
                    className="text-xs px-2 py-1"
                  >
                    {statusDisplay.text}
                  </Tag>
                  <Tag
                    color={getRoleColor(teacher.role)}
                    icon={getRoleIcon(teacher.role)}
                    className="text-sm px-3 py-1"
                  >
                    {teacher.role || "Teacher"}
                  </Tag>
                </Space>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <Space size="small" className="text-gray-600">
                  <MailOutlined className="text-blue-500" />
                  <Text copyable={{ text: teacher.email }}>
                    {teacher.email}
                  </Text>
                </Space>

                <Space size="small" className="text-gray-600">
                  <PhoneOutlined className="text-green-500" />
                  <Text copyable={{ text: teacher.phone }}>
                    {teacher.phone}
                  </Text>
                </Space>
              </div>

              {/* Join Date */}
              {teacher.created_at && (
                <div className="text-xs text-gray-500">
                  Joined:{" "}
                  {new Date(teacher.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Card>
    );
  };

  return (
    <>
      {open && <GroupTeacherModel open={open} toggle={toggle} id={+id!} />}
      <Card
        title={
          <div className="flex justify-between items-center w-full">
            {/* Left side */}
            <Space align="center">
              <TeamOutlined />
              <span>Teachers ({sortedTeachers?.length || 0})</span>
            </Space>

            {/* Right side */}
            <Space align="center">
              <Button
                type="primary"
                onClick={() => addTeachers()}
                size="small"
                className="mb-0"
              >
                + Add Teachers
              </Button>
              {sortedTeachers.length > 2 && (
                <Button
                  type="text"
                  size="small"
                  onClick={() => setShowAll(!showAll)}
                  icon={showAll ? <UpOutlined /> : <DownOutlined />}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {showAll ? "Show Less" : `Show All (${remainingCount} more)`}
                </Button>
              )}
            </Space>
          </div>
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
        {sortedTeachers && sortedTeachers.length > 0 ? (
          <div className="space-y-4">
            {/* Always visible teachers (first 2) */}
            {displayedTeachers
              .slice(0, 2)
              .map((teacherItem: any, index: number) => (
                <TeacherCard
                  key={teacherItem.teacher?.id || `teacher-${index}`}
                  teacherItem={teacherItem}
                  index={index}
                />
              ))}

            {/* Collapsible section for remaining teachers */}
            {showAll && sortedTeachers.length > 2 && (
              <div className="space-y-4 border-t pt-4">
                <div className="text-sm text-gray-500 font-medium">
                  Additional Teachers
                </div>
                {sortedTeachers
                  .slice(2)
                  .map((teacherItem: any, index: number) => (
                    <TeacherCard
                      key={teacherItem.teacher?.id || `additional-${index}`}
                      teacherItem={teacherItem}
                      index={index + 2}
                    />
                  ))}
              </div>
            )}

            {/* Summary when collapsed */}
            {!showAll && sortedTeachers.length > 2 && (
              <div className="text-center py-4 border-t">
                <Text className="text-gray-500">
                  {remainingCount} more teacher{remainingCount > 1 ? "s" : ""}{" "}
                  available
                </Text>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-4">
              <UserOutlined style={{ fontSize: "48px" }} />
            </div>
            <Title level={4} className="text-gray-400">
              No Teachers Assigned
            </Title>
            <Text className="text-gray-500">
              This group doesn't have any teachers assigned yet.
            </Text>
          </div>
        )}
      </Card>
    </>
  );
};

export default GroupTeachers;
