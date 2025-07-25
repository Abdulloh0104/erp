import moment from "moment";
import dayjs from "dayjs";
import { Tag, Tooltip } from "antd";
import type { Branch, Course, Group, Room, Student, Teacher } from "@types";
import type { TableProps } from "antd";
// GROUP COLUMNS
export const GroupColums: TableProps<Group>["columns"] = [
  {
    title: "Group",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Course",
    dataIndex: "course",
    key: "course",
    render: (course: { title: string }) => <span>{course.title}</span>,
  },
  {
    title: "Start time",
    dataIndex: "start_time",
    key: "start_time",
    render: (value: string) =>
      value ? dayjs(value, "HH:mm:ss").format("HH:mm") : "-",
  },
  {
    title: "End time",
    dataIndex: "end_time",
    key: "end_time",
    render: (value: string) =>
      value ? dayjs(value, "HH:mm:ss").format("HH:mm") : "-",
  },
  {
    title: "Start date",
    dataIndex: "start_date",
    key: "start_date",
    render: (value: string) => moment(value).format("M.D.YYYY"),
  },
  {
    title: "End date",
    dataIndex: "end_date",
    key: "end_date",
    render: (value: string) => moment(value).format("M.D.YYYY"),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (value: boolean) => (
      <Tag color={value ? "blue" : "gold"}>{value ? value : value}</Tag>
    ),
  },
];

// COURSE COLUMNS
export const CourseColums: TableProps<Course>["columns"] = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Duration",
    dataIndex: "duration",
    key: "duration",
  },
  {
    title: "Lessons in a month",
    dataIndex: "lessons_in_a_month",
    key: "lessons_in_a_month",
  },
  {
    title: "Lessons in a week",
    dataIndex: "lessons_in_a_week",
    key: "lessons_in_a_week",
  },
  {
    title: "Lesson duration",
    dataIndex: "lesson_duration",
    key: "lesson_duration",
  },
  {
    title: "Is active",
    dataIndex: "is_active",
    key: "is_active",
    render: (value: boolean) => (
      <Tag color={value ? "blue" : "gold"}>{value ? "Active" : "Inactive"}</Tag>
    ),
  },
  {
    title: "Created date",
    dataIndex: "created_at",
    key: "created_at",
    render: (value: string) => moment(value).format("M.D.YYYY"),
  },
  {
    title: "Updated date",
    dataIndex: "updated_at",
    key: "updated_at",
    render: (value: string) => moment(value).format("M.D.YYYY"),
  },
];

// BRANCH COLUMNS
export const BranchColums: TableProps<Branch>["columns"] = [
  {
    title: "Branch",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Call number",
    dataIndex: "call_number",
    key: "call_number",
  },
  {
    title: "Created date",
    dataIndex: "created_at",
    key: "created_at",
    render: (value: string) => moment(value).format("M.D.YYYY"),
  },
  {
    title: "Updated date",
    dataIndex: "updated_at",
    key: "updated_at",
    render: (value: string) => moment(value).format("M.D.YYYY"),
  },
];

// TEACHER COLUMNS
export const TeacherColums: TableProps<Teacher>["columns"] = [
  {
    title: "Photo",
    dataIndex: "avatar_url",
    key: "avatar_url",
    render: () => (
      <img
        src={"/images/Aicon.jpg"}
        alt="Avatar"
        style={{ width: 40, height: 40, borderRadius: "50%" }}
      />
    ),
  },
  {
    title: "First name",
    dataIndex: "first_name",
    key: "first_name",
  },
  {
    title: "Last name",
    dataIndex: "last_name",
    key: "last_name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone number",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Is active",
    dataIndex: "is_active",
    key: "is_active",
    render: (value: boolean) => (
      <Tag color={value ? "blue" : "gold"}>{value ? "Active" : "Inactive"}</Tag>
    ),
  },
  {
    title: "Branches",
    dataIndex: "branches", // 🔥 TO‘G‘RILANDI
    key: "branches",
    render: (branches: Branch[]) => {
      if (!branches || branches.length === 0) return <span>-</span>;

      const colors = ["green", "blue", "volcano", "magenta", "orange"];

      return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {branches.map((branch, index) => (
            <Tooltip
              key={branch.id}
              title={
                <>
                  <div>
                    <strong>Address:</strong> {branch.address}
                  </div>
                  <div>
                    <strong>Phone:</strong> {branch.call_number}
                  </div>
                </>
              }
            >
              <Tag color={colors[index % colors.length]}>{branch.name}</Tag>
            </Tooltip>
          ))}
        </div>
      );
    },
  },
];

// STUDENT COLUMNS
export const StudentColums: TableProps<Student>["columns"] = [
  {
    title: "First name",
    dataIndex: "first_name",
    key: "first_name",
  },
  {
    title: "Last name",
    dataIndex: "last_name",
    key: "last_name",
  },
  {
    title: "Phone number",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Birth date",
    dataIndex: "date_of_birth",
    key: "date_of_birth",
    render: (value: string) => moment(value).format("M.D.YYYY"),
  },
];

// ROOM COLUMNS
export const RoomColums: TableProps<Room>["columns"] = [
  {
    title: "Room",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Capacity",
    dataIndex: "capacity",
    key: "capacity",
  },
  {
    title: "Branch",
    dataIndex: "branch",
    key: "branch",
    render: (branch: { name: string }) => <span>{branch.name}</span>,
  },
  {
    title: "Created date",
    dataIndex: "created_at",
    key: "created_at",
    render: (value: string) => moment(value).format("M.D.YYYY"),
  },
  {
    title: "Updated date",
    dataIndex: "updated_at",
    key: "updated_at",
    render: (value: string) => moment(value).format("M.D.YYYY"),
  },
];