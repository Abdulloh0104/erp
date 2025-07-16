import type { Course, Group } from "@types";
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
    render: (course:{title:string}) => <span>{course.title}</span>,
  },
  {
    title: "Start date",
    dataIndex: "start_date",
    key: "start_date",
  },
  {
    title: "End date",
    dataIndex: "end_date",
    key: "end_date",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
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
    title: "Lesson in a week",
    dataIndex: "lesson_in_a_week",
    key: "lesson_in_a_week",
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
  },
  {
    title: "Created date",
    dataIndex: "created_at",
    key: "created_at",
  },
  {
    title: "Updated date",
    dataIndex: "updated_at",
    key: "updated_at",
  },
];

// STUDENT COLUMNS