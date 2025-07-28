import { Button, Form, Input, Modal, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import type { ModalProps, Teacher } from "@types";
import { useBranch, useTeacher } from "@hooks";
import { teacherFormSchema } from "@utils";
import { MaskedInput } from "antd-mask-input";
interface TeacherProps extends ModalProps {
  update: Teacher | null;
}

const TeacherModel = ({ open, toggle, update }: TeacherProps) => {
  console.log(update);
  const { useTeacherUpdate, useTeacherCreate } = useTeacher({
    page: 1,
    limit: 11,
  });
  const { data } = useBranch({ page: 1, limit: 11 });
  const { mutate: createFn } = useTeacherCreate();
  const { mutate: updateFn } = useTeacherUpdate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(teacherFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      role: "",
      avatar_url: undefined,
      branchId: [],
    },
  });
  useEffect(() => {
    if (update?.id) {
      setValue("first_name", update.first_name);
      setValue("last_name", update.last_name);
      setValue("email", update.email);
      setValue("phone", update.phone);
      // setValue("password", update.password!);
      setValue("role", update.role);
      setValue(
        "branchId",
        update.branches.map((id: any) => id.id)
      );
    }
  }, [update, setValue]);
  const onSubmit = (data: any) => {
    if (update?.id) {
      delete data.password;
      updateFn(
        { id: update.id, data },
        {
          onSuccess: () => {
            console.log("Update Teacher", { ...data, id: update.id });
            toggle();
          },
        }
      );
      console.log(update);
    } else {
      createFn(data, {
        onSuccess: () => {
          console.log("Create Teacher", data);
          toggle();
        },
      });
    }
  };
  return (
    <Modal
      title="Teacher Modal"
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
          <Form.Item
            label="Password"
            name="password"
            validateStatus={errors.password ? "error" : ""}
            help={errors.password ? errors.password.message : ""}
          >
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  status={errors.password ? "error" : ""}
                  placeholder="Password"
                />
              )}
            />
          </Form.Item>
        )}
        <Form.Item
          label="Role"
          name="role"
          validateStatus={errors.role ? "error" : ""}
          help={errors.role ? errors.role.message : ""}
        >
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select role"
                status={errors.role ? "error" : ""}
                options={[
                  { value: "main teacher", label: "Main teacher" },
                  { value: "assistant teacher", label: "Assistant teacher" },
                ]}
              />
            )}
          />
        </Form.Item>{" "}
        <Form.Item
          label="Branches"
          name="branchId"
          validateStatus={errors.branchId ? "error" : ""}
          help={errors.branchId ? errors.branchId.message : ""}
        >
          <Controller
            name="branchId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                mode="multiple" //qo'shildi
                showSearch
                status={errors.branchId ? "error" : ""}
                placeholder="Select course"
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLocaleLowerCase())
                }
                options={data?.data?.branch.map((branch: any) => ({
                  value: branch.id,
                  label: branch.name,
                }))}
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

export default TeacherModel;
