// import type { Lessons, ModalProps } from "@types";
// import { useGeneral } from "@hooks";
// import { Controller, useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { groupLessonFormSchema } from "@utils";
// import { useEffect } from "react";
// import {
//   Button,
//   DatePicker,
//   Form,
//   Input,
//   Modal,
//   Select,
//   type DatePickerProps
// } from "antd";
// import dayjs from "dayjs";

// interface LessonListProps extends ModalProps {
//   update: Lessons | null;
// }
// const LessonsListsModal = ({ open, toggle, update }: LessonListProps) => {

//     const { useGroupLessonUpdate,} = useGeneral();
//     const { mutate: updateFn } = useGroupLessonUpdate();
//     const {
//       control,
//       handleSubmit,
//       formState: { errors },
//       setValue,
//     } = useForm({
//       resolver: yupResolver(groupLessonFormSchema),
//       defaultValues: {
//         note: "",
//         status: "",
//         date: undefined,
//       },
//     });
//     useEffect(() => {
//       if (update?.id) {
//         setValue("note", update.title);
//         setValue("status", update.status);
//         setValue("date", update.date);
//       }
//     }, [update, setValue]);
//     const handleChange: DatePickerProps["onChange"] = (_, dateString: any) => {
//       setValue("date", dateString);
//     };
//     const onSubmit = (data: any) => {
//       console.log("onSubmit", data);
//       const formattedData = {
//         ...data, status:(new Date()== data.date?"in_progress":data.status)
//       };
//       if (update?.id) {
//         updateFn(
//           { id: update.id, data: formattedData },
//           {
//             onSuccess: () => {
//               console.log("Update Group", { ...formattedData, id: update.id });
//               toggle();
//             },
//           }
//         );
//       }

//     };
//   return (
//     <Modal
//       title="Lesson Modal"
//       centered
//       open={open}
//       onCancel={toggle}
//       width={700}
//       closeIcon
//       footer={null}
//     >
//       <Form
//         layout="vertical"
//         autoComplete="on"
//         onFinish={handleSubmit(onSubmit)}
//       >
//         <Form.Item
//           label="Note"
//           name="note"
//           validateStatus={errors.note ? "error" : ""}
//           help={errors.note ? errors.note.message : ""}
//         >
//           <Controller
//             name="note"
//             control={control}
//             render={({ field }) => (
//               <Input
//                 {...field}
//                 status={errors.note ? "error" : ""}
//                 placeholder="Note"
//               />
//             )}
//           />
//         </Form.Item>
//         <Form.Item
//           label="Status"
//           name="status"
//           validateStatus={errors.status ? "error" : ""}
//           help={errors.status ? errors.status.message : ""}
//         >
//           <Controller
//             name="status"
//             control={control}
//             render={({ field }) => (
//               <Select
//                 {...field}
//                 placeholder="Select status"
//                 status={errors.status ? "error" : ""}
//                 options={[
//                   { value: "in_progress", label: "In Progress" },
//                   { value: "new", label: "New" },
//                   { value: "completed", label: "Completed" },
//                   { value: "cancelled", label: "Cancelled" },
//                 ]}
//               />
//             )}
//           />
//         </Form.Item>

//         <Form.Item
//           label="date"
//           name="date"
//           validateStatus={errors.date ? "error" : ""}
//           help={errors.date ? errors.date.message : ""}
//         >
//           <Controller
//             name="date"
//             control={control}
//             render={({ field }) => (
//               <DatePicker
//                 value={
//                   field.value
//                     ? typeof field.value === "string"
//                       ? field.value
//                         ? dayjs(field.value)
//                         : null
//                       : field.value
//                     : null
//                 }
//                 onChange={(date, dateString) => {
//                   field.onChange(date);
//                   handleChange(date, dateString);
//                 }}
//                 placeholder="date"
//               />
//             )}
//           />
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             Submit
//           </Button>
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default LessonsListsModal;

import type { Lessons, ModalProps } from "@types";
import { useGeneral } from "@hooks";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { groupLessonFormSchema } from "@utils";
import { useEffect } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Descriptions,
  Tag,
  Space,
  Card,
  Divider,
  type DatePickerProps,
} from "antd";
import {
  EditOutlined,
  EyeOutlined,
  CalendarOutlined,
  HomeOutlined,
  TeamOutlined,
  BookOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

interface LessonsModalProps extends ModalProps {
  lesson: Lessons | null;
  mode: "view" | "edit";
  onSwitchToEdit?: () => void;
}

const LessonsModal = ({
  open,
  toggle,
  lesson,
  mode,
  onSwitchToEdit,
}: LessonsModalProps) => {
  const { useGroupLessonUpdate } = useGeneral();
  const updateMutation = useGroupLessonUpdate();
  const { mutate: updateFn } = updateMutation;

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(groupLessonFormSchema),
    defaultValues: {
      note: "",
      status: "",
      date: undefined,
    },
  });

  // Reset form when lesson changes
  useEffect(() => {
    if (lesson?.id) {
      setValue("note", lesson.title || "");
      setValue("status", lesson.status || "");
      setValue("date", lesson.date || "");
    } else {
      reset();
    }
  }, [lesson, setValue, reset]);

  const handleDateChange: DatePickerProps["onChange"] = (
    _,
    dateString: any
  ) => {
    setValue("date", dateString);
  };
  const onSubmit = (data: any) => {
    if (!lesson?.id) return;

    const today = dayjs().format("YYYY-MM-DD");
    const lessonDate = dayjs(data.date).format("YYYY-MM-DD");

    // Auto-update status logic
    let finalStatus = data.status;
    if (data.status === "new" && lessonDate === today) {
      finalStatus = "in_progress";
    }
    const formattedData = {
      ...data,
      status: finalStatus,
      date: dayjs(data.date).format("YYYY-MM-DD"), // bu yer muhim
    };

    updateFn(
      { id: lesson.id, data: formattedData },
      {
        onSuccess: () => {
          console.log("Updated lesson:", { ...formattedData, id: lesson.id });
          toggle();
        },
      }
    );
  };

  // Get status color for tags
  const getStatusColor = (status: string, date: string) => {
    const today = dayjs().format("YYYY-MM-DD");
    const lessonDate = dayjs(date).format("YYYY-MM-DD");

    if (status === "new" && lessonDate === today) {
      return "warning";
    }

    switch (status) {
      case "new":
        return "default";
      case "in_progress":
        return "warning";
      case "completed":
        return "success";
      case "cancelled":
        return "blue";
      default:
        return "default";
    }
  };

  // Get status display text
  const getStatusText = (status: string, date: string) => {
    const today = dayjs().format("YYYY-MM-DD");
    const lessonDate = dayjs(date).format("YYYY-MM-DD");

    if (status === "new" && lessonDate === today) {
      return "In Progress";
    }

    switch (status) {
      case "new":
        return "New";
      case "in_progress":
        return "In Progress";
      case "completed":
        return "Completed";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  const modalTitle = mode === "view" ? "Lesson Details" : "Edit Lesson";
  const isToday = lesson?.date
    ? dayjs(lesson.date).format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD")
    : false;

  return (
    <Modal
      title={
        <Space>
          {mode === "view" ? <EyeOutlined /> : <EditOutlined />}
          {modalTitle}
        </Space>
      }
      centered
      open={open}
      onCancel={toggle}
      width={700}
      closeIcon
      footer={null}
      className="lesson-modal"
    >
      {mode === "view" && lesson ? (
        // View Mode - Show all information
        <div className="space-y-6">
          {/* Header Info Card */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {lesson.title || "Lesson"}
                </h3>
                <Space>
                  <Tag
                    color={getStatusColor(lesson.status, lesson.date)}
                    className="text-sm px-3 py-1"
                  >
                    {getStatusText(lesson.status, lesson.date)}
                  </Tag>
                  {isToday && <Tag color="orange">Today</Tag>}
                </Space>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  {dayjs(lesson.date).format("DD")}
                </div>
                <div className="text-sm text-gray-600">
                  {dayjs(lesson.date).format("MMM YYYY")}
                </div>
              </div>
            </div>
          </Card>

          {/* Detailed Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Lesson Details */}
            <Card
              title={
                <Space>
                  <CalendarOutlined />
                  Lesson Information
                </Space>
              }
              className="h-fit"
            >
              <Descriptions column={1} size="small">
                <Descriptions.Item label="Date">
                  <strong>
                    {dayjs(lesson.date).format("dddd, DD MMMM YYYY")}
                  </strong>
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  <Tag color={getStatusColor(lesson.status, lesson.date)}>
                    {getStatusText(lesson.status, lesson.date)}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Note">
                  <div className="mt-2">
                    {lesson.title ? (
                      <div className="p-3 bg-gray-50 rounded border min-h-[60px]">
                        {lesson.title}
                      </div>
                    ) : (
                      <div className="p-3 bg-gray-50 rounded border text-gray-400 italic">
                        No note provided
                      </div>
                    )}
                  </div>
                </Descriptions.Item>
              </Descriptions>
            </Card>

            {/* Group & Room Details */}
            <div className="space-y-4">
              {/* Group Information */}
              {lesson.group && (
                <Card
                  title={
                    <Space>
                      <TeamOutlined />
                      Group Details
                    </Space>
                  }
                  size="small"
                >
                  <Descriptions column={1} size="small">
                    <Descriptions.Item label="Group Name">
                      <strong>{lesson.group.name}</strong>
                    </Descriptions.Item>
                    <Descriptions.Item label="Course">
                      <Space>
                        <BookOutlined />
                        {lesson.group.course?.title || "N/A"}
                      </Space>
                    </Descriptions.Item>
                    <Descriptions.Item label="Schedule">
                      <div className="text-sm">
                        <div>
                          {dayjs(lesson.group.start_date).format("DD MMM")} -{" "}
                          {dayjs(lesson.group.end_date).format("DD MMM YYYY")}
                        </div>
                        <div className="text-gray-600">
                          {lesson.group.start_time} - {lesson.group.end_time}
                        </div>
                      </div>
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              )}

              {/* Room Information */}
              {lesson.room && (
                <Card
                  title={
                    <Space>
                      <HomeOutlined />
                      Room Details
                    </Space>
                  }
                  size="small"
                >
                  <Descriptions column={1} size="small">
                    <Descriptions.Item label="Room Name">
                      <strong>{lesson.room.name}</strong>
                    </Descriptions.Item>
                    <Descriptions.Item label="Capacity">
                      {lesson.room.capacity} students
                    </Descriptions.Item>
                    <Descriptions.Item label="Branch">
                      {lesson.room.branch?.name || "N/A"}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              )}
            </div>
          </div>

          <Divider />

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <Button onClick={toggle} size="large">
              Close
            </Button>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={onSwitchToEdit}
              size="large"
            >
              Edit Lesson
            </Button>
          </div>
        </div>
      ) : (
        // Edit Mode - Only allow editing note, status, and date
        <Form
          layout="vertical"
          autoComplete="off"
          onFinish={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Read-only information */}
          <Card className="bg-gray-50" size="small">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Group:</strong> {lesson?.group?.name || "N/A"}
              </div>
              <div>
                <strong>Room:</strong> {lesson?.room?.name || "N/A"}
              </div>
            </div>
          </Card>

          <Form.Item
            label="Note"
            validateStatus={errors.note ? "error" : ""}
            help={errors.note ? errors.note.message : ""}
          >
            <Controller
              name="note"
              control={control}
              render={({ field }) => (
                <Input.TextArea
                  {...field}
                  status={errors.note ? "error" : ""}
                  placeholder="Enter lesson note or description"
                  rows={4}
                  className="resize-none"
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Status"
            validateStatus={errors.status ? "error" : ""}
            help={errors.status ? errors.status.message : ""}
          >
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Select lesson status"
                  status={errors.status ? "error" : ""}
                  size="large"
                  options={[
                    {
                      value: "new",
                      label: (
                        <Space>
                          <span className="w-3 h-3 bg-gray-400 rounded-full inline-block"></span>
                          New
                        </Space>
                      ),
                    },
                    {
                      value: "in_progress",
                      label: (
                        <Space>
                          <span className="w-3 h-3 bg-yellow-400 rounded-full inline-block"></span>
                          In Progress
                        </Space>
                      ),
                    },
                    {
                      value: "completed",
                      label: (
                        <Space>
                          <span className="w-3 h-3 bg-green-400 rounded-full inline-block"></span>
                          Completed
                        </Space>
                      ),
                    },
                    {
                      value: "cancelled",
                      label: (
                        <Space>
                          <span className="w-3 h-3 bg-blue-400 rounded-full inline-block"></span>
                          Cancelled
                        </Space>
                      ),
                    },
                  ]}
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Date"
            validateStatus={errors.date ? "error" : ""}
            help={errors.date ? errors.date.message : ""}
          >
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  value={
                    field.value
                      ? typeof field.value === "string"
                        ? field.value
                          ? dayjs(field.value)
                          : null
                        : field.value
                      : null
                  }
                  onChange={(date, dateString) => {
                    field.onChange(date);
                    handleDateChange(date, dateString);
                  }}
                  placeholder="Select lesson date"
                  size="large"
                  className="w-full"
                  format="DD MMMM YYYY"
                />
              )}
            />
          </Form.Item>

          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button onClick={toggle} size="large">
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" size="large">
              Update Lesson
            </Button>
          </div>
        </Form>
      )}
    </Modal>
  );
};

export default LessonsModal;
