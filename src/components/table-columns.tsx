import moment from "moment";
import { Tag } from "antd";
import type { Branch, Course, Group } from "@types";
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

// GROUP COLUMNS
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

// STUDENT COLUMNS
