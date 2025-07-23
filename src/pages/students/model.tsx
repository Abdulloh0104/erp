import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import type { ModalProps, Student } from "@types";
import { useStudent } from "@hooks";
import { studentFormSchema } from "@utils";
interface StudentProps extends ModalProps {
  update: Student | null;
}

const StudentModel = ({ open, toggle, update }: StudentProps) => {
  const { useStudentUpdate, useStudentCreate } = useStudent({
    page: 1,
    limit: 11,
  });
  // const { data } = useBranch({ page: 1, limit: 11 });
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
      confirm_password: "",
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
      setValue("password_hash", update.password_hash);
      setValue("confirm_password", update.confirm_password!);
      setValue("date_of_birth", update.date_of_birth);
    }
  }, [update, setValue]);
  const onSubmit = (data: any) => {
    if (update?.id) {
      updateFn(
        { ...data, id: update.id },
        {
          onSuccess: () => {
            console.log("Update Student", { ...data, id: update.id });
            toggle();
          },
        }
      );
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
              <Input
                {...field}
                placeholder="+998 XX XXX XX XX"
                maxLength={17} // +998 + 9 raqam + 3 space = 17
                onChange={(e) => {
                  // Faqat raqamlar
                  const rawValue = e.target.value.replace(/\D/g, "");

                  // Agar foydalanuvchi +998 ni o‘chirgan bo‘lsa, qayta qo‘shamiz
                  let number = rawValue.startsWith("998")
                    ? rawValue.slice(3)
                    : rawValue;

                  // Formatlash: XX XXX XX XX
                  let formatted = "";
                  if (number.length > 0) {
                    formatted = number.slice(0, 2);
                  }
                  if (number.length >= 3) {
                    formatted += " " + number.slice(2, 5);
                  }
                  if (number.length >= 6) {
                    formatted += " " + number.slice(5, 7);
                  }
                  if (number.length >= 8) {
                    formatted += " " + number.slice(7, 9);
                  }

                  // Yakuniy qiymat: +998 XX XXX XX XX
                  const final = `+998 ${formatted}`.trim();

                  field.onChange(final);
                }}
                value={field.value || "+998 "} // boshlanishda ko‘rsatish
              />
            )}
          />
        </Form.Item>
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
                placeholder="password_hash"
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Confirm your password"
          name="confirm_password"
          validateStatus={errors.confirm_password ? "error" : ""}
          help={errors.confirm_password ? errors.confirm_password.message : ""}
        >
          <Controller
            name="confirm_password"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                type="password"
                status={errors.confirm_password ? "error" : ""}
                placeholder="confirm_password"
              />
            )}
          />
        </Form.Item>
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
                value={field.value ? field.value : null}
                status={errors.date_of_birth ? "error" : ""}
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
