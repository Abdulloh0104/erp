import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  TimePicker,
  type DatePickerProps,
  type TimePickerProps,
} from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import type { ModalProps, Group } from "@types";
import { useCourse, useGroup, useRoom } from "@hooks";
import { groupFormSchema } from "@utils";
import dayjs from "dayjs";
interface GroupProps extends ModalProps {
  update: Group | null;
}

const GroupModel = ({ open, toggle, update }: GroupProps) => {
  console.log(update);
  const { useGroupUpdate, useGroupCreate } = useGroup({ page: 1, limit: 11 });
  const { mutate: createFn } = useGroupCreate();
  const { mutate: updateFn } = useGroupUpdate();
  const { data: courses } = useCourse({ page: 1, limit: 11 });
  const { data: rooms } = useRoom({ page: 1, limit: 11 });
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(groupFormSchema),
    defaultValues: {
      name: "",
      status: "",
      courseId: undefined,
      roomId: undefined,
      start_date: undefined,
      start_time: undefined,
    },
  });
  useEffect(() => {
    if (update?.id) {
      setValue("name", update.name);
      setValue("status", update.status);
      setValue("courseId", update?.course?.id);
      setValue("roomId", update.roomId);
      setValue("start_time", update.start_time);
      setValue("start_date", update.start_date);
    }
  }, [update, setValue]);
  const handleChange: DatePickerProps["onChange"] = (_, dateString: any) => {
    setValue("start_date", dateString);
  };
  const handleTimeChange: TimePickerProps["onChange"] = (
    _,
    timeString: any
  ) => {
    setValue("start_time", timeString);
  };
  const onSubmit = (data: any) => {
    console.log("onSubmit", data);
    const formattedData = {
      ...data,
      start_time: dayjs(data.start_time, "HH:mm:ss").format("HH:mm"), // bu yer muhim
    };
    if (update?.id) {
      updateFn(
        { id: update.id, data: formattedData },
        {
          onSuccess: () => {
            console.log("Update Group", { ...formattedData, id: update.id });
            toggle();
          },
        }
      );
    } else {
      createFn(data, {
        onSuccess: () => {
          console.log("Create Group", formattedData);
          toggle();
        },
      });
    }
  };
  return (
    <Modal
      title="Group Modal"
      centered
      open={open}
      onCancel={toggle}
      width={700}
      closeIcon
      footer={null}
    >
      <Form
        layout="vertical"
        autoComplete="on"
        onFinish={handleSubmit(onSubmit)}
      >
        <Form.Item
          label="Name"
          name="name"
          validateStatus={errors.name ? "error" : ""}
          help={errors.name ? errors.name.message : ""}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                status={errors.name ? "error" : ""}
                placeholder="Name"
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          validateStatus={errors.status ? "error" : ""}
          help={errors.status ? errors.status.message : ""}
        >
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select status"
                status={errors.status ? "error" : ""}
                options={[
                  { value: "active", label: "Active" },
                  { value: "new", label: "New" },
                  { value: "completed", label: "Completed" },
                  { value: "cancelled", label: "Cancelled" },
                ]}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Courses"
          name="courseId"
          validateStatus={errors.courseId ? "error" : ""}
          help={errors.courseId ? errors.courseId.message : ""}
        >
          <Controller
            name="courseId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                showSearch
                status={errors.courseId ? "error" : ""}
                placeholder="Select course"
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLocaleLowerCase())
                }
                options={courses?.data?.courses.map((course: any) => {
                  return {
                    value: course.id,
                    label: course.title,
                  };
                })}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Rooms"
          name="roomId"
          validateStatus={errors.roomId ? "error" : ""}
          help={errors.roomId ? errors.roomId.message : ""}
        >
          <Controller
            name="roomId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                showSearch
                status={errors.roomId ? "error" : ""}
                placeholder="Select room"
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLocaleLowerCase())
                }
                options={rooms?.data?.rooms.map((room: any) => {
                  return {
                    value: room.id,
                    label: room.name,
                  };
                })}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Start date"
          name="start_date"
          validateStatus={errors.start_date ? "error" : ""}
          help={errors.start_date ? errors.start_date.message : ""}
        >
          <Controller
            name="start_date"
            control={control}
            render={({ field }) => (
              <DatePicker
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
                  handleChange(date, dateString);
                }}
                placeholder="Start date"
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Start time"
          name="start_time"
          validateStatus={errors.start_time ? "error" : ""}
          help={errors.start_time ? errors.start_time.message : ""}
        >
          <Controller
            name="start_time"
            control={control}
            render={({ field }) => (
              <TimePicker
                format={"HH:mm"}
                defaultOpenValue={dayjs("00:00", "HH:mm")}
                // value={field.value ? (typeof field.value ==="string" ? (field.value ? dayjs(field.value):null):field.value):null}
                value={field.value ? dayjs(field.value, "HH:mm") : null}
                onChange={(date, dateString) => {
                  field.onChange(date);
                  handleTimeChange(date, dateString);
                }}
                placeholder="Start time"
              />
            )}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default GroupModel;
