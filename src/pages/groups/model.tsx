import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect} from "react";
import moment from "moment";
import type { ModalProps, Group } from "@types";
import { useCourse, useGroup } from "@hooks";
import { groupFormSchema } from "@utils";
interface GroupProps extends ModalProps {
  update: Group | null;
}

const GroupModel = ({ open, toggle, update }: GroupProps) => {
  const { useGroupUpdate, useGroupCreate } = useGroup({ page: 1, limit: 11 });
  const { data } = useCourse({page:1,limit:11});
  const { mutate: createFn } = useGroupCreate();
  const { mutate: updateFn } = useGroupUpdate();
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
      course_id: undefined,
      start_date:new Date(),
      end_date:new Date(),
    },
  });
  useEffect(() => {
    if (update?.id) {
      setValue("name", update.name);
      setValue("status", update.status);
      setValue("course_id", update.course_id);
      setValue("start_date",new Date(update.start_date));
      setValue("end_date",new Date(update.end_date));
    }
  }, [update, setValue]);
  const onSubmit = (data: any) => {
    if (update?.id) {
      updateFn({ ...data, id: update.id });
      console.log("Update Group", { ...data, id: update.id });
    } else {
      createFn(data);
      console.log("Create Group", data);
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
          name="course_id"
          validateStatus={errors.course_id ? "error" : ""}
          help={errors.course_id ? errors.course_id.message : ""}
        >
          <Controller
            name="course_id"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                showSearch
                status={errors.status ? "error" : ""}
                placeholder="Select course"
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLocaleLowerCase())
                }
                options={data?.data?.courses.map((course: any) => {
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
                {...field}
                value={field.value ? moment(field.value) : null}
                status={errors.start_date ? "error" : ""}
                placeholder="Start date"
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="End date"
          name="end_date"
          validateStatus={errors.end_date ? "error" : ""}
          help={errors.end_date ? errors.end_date.message : ""}
        >
          <Controller
            name="end_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                value={field.value ? moment(field.value) : null}
                status={errors.end_date ? "error" : ""}
                placeholder="Start date"
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
