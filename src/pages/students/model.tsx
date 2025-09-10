import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  type DatePickerProps,
} from "antd";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import type { ModalProps, Student } from "@types";
import { useStudent } from "@hooks";
import { studentFormSchema } from "@utils";
import { MaskedInput } from "antd-mask-input";
interface StudentProps extends ModalProps {
  update: Student | null;
}

const StudentModel = ({ open, toggle, update }: StudentProps) => {
  console.log("update",update);
  const { useStudentUpdate, useStudentCreate } = useStudent({
    page: 1,
    limit: 11,
  });
  const { mutate: createFn } = useStudentCreate();
  const { mutate: updateFn } = useStudentUpdate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(studentFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      password_hash: "",
      gender: "",
      date_of_birth: "",
    },
  });
  useEffect(() => {
    if (update?.id) {
      setValue("first_name", update.first_name);
      setValue("last_name", update.last_name);
      setValue("email", update.email);
      setValue("phone", update.phone);
      setValue("gender", update.gender);
      setValue("password_hash", update.password_hash!);
      setValue("date_of_birth", update.date_of_birth);
    }
  }, [update, setValue]);
  const handleChange: DatePickerProps["onChange"] = (_, dateString: any) => {
    setValue("date_of_birth", dateString);
  };
  const onSubmit = (data: any) => {
    if (update?.id) {
      updateFn(
        { id: update.id, data },
        {
          onSuccess: () => {
            // console.log("Update Student", { ...data, id: update.id });
            toggle();
          },
        }
      );
      console.log("up",update);
    } else {
      createFn(
        { ...data },
        {
          onSuccess: () => {
            console.log("Create Student", data);
            toggle();
          },
        }
      );
    }
  };
  return (
    <Modal
      title="Student Modal"
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
          label="First name"
          name="first_name"
          validateStatus={errors.first_name ? "error" : ""}
          help={errors.first_name ? errors.first_name.message : ""}
        >
          <Controller
            name="first_name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                status={errors.first_name ? "error" : ""}
                placeholder="First name"
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Last name"
          name="last_name"
          validateStatus={errors.last_name ? "error" : ""}
          help={errors.last_name ? errors.last_name.message : ""}
        >
          <Controller
            name="last_name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                status={errors.last_name ? "error" : ""}
                placeholder="Last name"
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          validateStatus={errors.email ? "error" : ""}
          help={errors.email ? errors.email.message : ""}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                status={errors.email ? "error" : ""}
                placeholder="Email"
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          validateStatus={errors.phone ? "error" : ""}
          help={errors.phone ? errors.phone.message : ""}
        >
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <MaskedInput
                {...field}
                mask="+998 (00) 000-00-00"
                value={update ? update.phone : ""}
              />
            )}
          />
        </Form.Item>
        {!update?.id && (
          <>
            <Form.Item
              label="Password"
              name="password_hash"
              validateStatus={errors.password_hash ? "error" : ""}
              help={errors.password_hash ? errors.password_hash.message : ""}
            >
              <Controller
                name="password_hash"
                control={control}
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    type="password"
                    status={errors.password_hash ? "error" : ""}
                    placeholder="Password"
                  />
                )}
              />
            </Form.Item>
          </>
        )}
        <Form.Item
          label="Gender"
          name="gender"
          validateStatus={errors.gender ? "error" : ""}
          help={errors.gender ? errors.gender.message : ""}
        >
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select role"
                status={errors.gender ? "error" : ""}
                options={[
                  { value: "male", label: "male" },
                  { value: "female", label: "female" },
                ]}
              />
            )}
          />
        </Form.Item>{" "}
        <Form.Item
          label="date_of_birth date"
          name="date_of_birth"
          validateStatus={errors.date_of_birth ? "error" : ""}
          help={errors.date_of_birth ? errors.date_of_birth.message : ""}
        >
          <Controller
            name="date_of_birth"
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
                  handleChange(date, dateString);
                }}
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

export default StudentModel;
