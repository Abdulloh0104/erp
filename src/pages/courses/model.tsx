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
      lessons_in_a_month: undefined,
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
      setValue("lessons_in_a_month", update.lessons_in_a_month);
      setValue("lessons_in_a_week", update.lessons_in_a_week);
      setValue("lesson_duration", update.lesson_duration);
      setValue("price", update.price);
      setValue("description", update.description);
    }
  }, [update, setValue]);
  const onSubmit = (data: any) => {
    if (update?.id) {
      updateFn(
        {id: update.id,data },
        {
          onSuccess: () => {
            console.log("Update Course", { id: update.id,data });
            toggle();
          },
        }
      );
    } else {
      createFn(data, {
        onSuccess: () => {
          console.log("Create Course", data);
          toggle();
        },
      });
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
                  { value: 2, label: "2 month" },
                  { value: 3, label: "3 month" },
                  { value: 4, label: "4 month" },
                  { value: 5, label: "5 month" },
                  { value: 6, label: "6 month" },
                  { value: 7, label: "7 month" },
                  { value: 8, label: "8 month" },
                ]}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Lesson number in a month"
          name="lessons_in_a_month"
          validateStatus={errors.lessons_in_a_month ? "error" : ""}
          help={errors.lessons_in_a_month ? errors.lessons_in_a_month.message : ""}
        >
          <Controller
            name="lessons_in_a_month"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select lesson duration"
                status={errors.lessons_in_a_month ? "error" : ""}
                options={[
                  { value: 12, label: "12" },
                  { value: 20, label: "20" },
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
                  { value: 120, label: "120 min" },
                  { value: 180, label: "180 min" },
                  { value: 240, label: "240 min" },
                  { value: 270, label: "270 min" },
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
                  { value: 1300000, label: "1300000" },
                  { value: 1350000, label: "1350000" },
                  { value: 1400000, label: "1400000" },
                  { value: 1600000, label: "1600000" },
                  { value: 1650000, label: "1650000" },
                  { value: 1900000, label: "1900000" },
                  { value: 2000000, label: "2000000" },
                  { value: 2200000, label: "2200000" },
                ]}
              />
            )}
          />
        </Form.Item>
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
