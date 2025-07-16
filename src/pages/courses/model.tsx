import { Button, Form, Input, Modal, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import type { ModalProps, Course } from "@types";
import { useCourse } from "@hooks";
import { courseFormSchema } from "@utils";
interface CourseProps extends ModalProps {
  update: Course | null;
}

const CourseModel = ({ open, toggle, update }: CourseProps) => {
  const { useCourseUpdate, useCourseCreate } = useCourse({
    page: 1,
    limit: 10,
  });
  const { mutate: createFn } = useCourseCreate();
  const { mutate: updateFn } = useCourseUpdate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(courseFormSchema),
    defaultValues: {
      title: "",
      duration: undefined,
      lessons_in_a_week: undefined,
      lesson_duration: undefined,
      price: undefined,
      description: "",
    },
  });
  useEffect(() => {
    if (update?.id) {
      setValue("title", update.title);
      setValue("duration", update.duration);
      setValue("lessons_in_a_week", update.lessons_in_a_week);
      setValue("lesson_duration", update.lesson_duration);
      setValue("price", update.price);
      setValue("description", update.description);
    }
  }, [update, setValue]);
  const onSubmit = (data: any) => {
    if (update?.id) {
      updateFn({ ...data, id: update.id });
      console.log("Update Course", { ...data, id: update.id });
      toggle();
    } else {
      createFn(data);
      console.log("Create Course", data);
      toggle();
    }
  };
  return (
    <Modal
      title="Course Modal"
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
          label="Title"
          name="title"
          validateStatus={errors.title ? "error" : ""}
          help={errors.title ? errors.title.message : ""}
        >
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                status={errors.title ? "error" : ""}
                placeholder="Title"
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Duration"
          name="duration"
          validateStatus={errors.duration ? "error" : ""}
          help={errors.duration ? errors.duration.message : ""}
        >
          <Controller
            name="duration"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select duration"
                status={errors.duration ? "error" : ""}
                options={[
                  { value: "2 month", label: "2 month" },
                  { value: "3 month", label: "3 month" },
                  { value: "4 month", label: "4 month" },
                  { value: "5 month", label: "5 month" },
                  { value: "6 month", label: "6 month" },
                  { value: "7 month", label: "7 month" },
                  { value: "8 month", label: "8 month" },
                ]}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Lessons in a week"
          name="lessons_in_a_week"
          validateStatus={errors.lessons_in_a_week ? "error" : ""}
          help={
            errors.lessons_in_a_week ? errors.lessons_in_a_week.message : ""
          }
        >
          <Controller
            name="lessons_in_a_week"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select duration"
                status={errors.lessons_in_a_week ? "error" : ""}
                options={[
                  { value: 3, label: "3" },
                  { value: 5, label: "5" },
                ]}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Lesson duration"
          name="lesson_duration"
          validateStatus={errors.lesson_duration ? "error" : ""}
          help={errors.lesson_duration ? errors.lesson_duration.message : ""}
        >
          <Controller
            name="lesson_duration"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select lesson duration"
                status={errors.lesson_duration ? "error" : ""}
                options={[
                  { value: "120 min", label: "120 min" },
                  { value: "180 min", label: "180 min" },
                  { value: "240 min", label: "240 min" },
                  { value: "270 min", label: "270 min" },
                ]}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Price for a month"
          name="price"
          validateStatus={errors.price ? "error" : ""}
          help={errors.price ? errors.price.message : ""}
        >
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select price for a month"
                status={errors.price ? "error" : ""}
                options={[
                  { value: 1350000, label: "1350000" },
                  { value: 1400000, label: "1400000" },
                  { value: 1300000, label: "1300000" },
                  { value: 1600000, label: "1600000" },
                  { value: 1650000, label: "1650000" },
                  { value: 1900000, label: "1900000" },
                  { value: 2000000, label: "2000000" },
                ]}
              />
            )}
          />
        </Form.Item>
        {/* <Form.Item
          label="Is active"
          name="is_active"
          validateStatus={errors.is_active ? "error" : ""}
          help={errors.is_active ? errors.is_active.message : ""}
        >
          <Controller
            name="is_active"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select is active"
                status={errors.is_active ? "error" : ""}
                options={[
                  { value: "true", label: "active" },
                  { value: "false", label: "inactive" },
                ]}
              />
            )}
          />
        </Form.Item> */}
        <Form.Item
          label="Description"
          name="description"
          validateStatus={errors.description ? "error" : ""}
          help={errors.description ? errors.description.message : ""}
        >
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                status={errors.description ? "error" : ""}
                placeholder="description"
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

export default CourseModel;
