import {
  Button,
  Form,
  Input,
  Modal,
} from "antd";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAdmin} from "@hooks";
import { passwordFormSchema } from "@utils";
import type { ModalProps } from "@types";
interface PasswordProps extends ModalProps {
  id: number;
}



const PasswordModal = ({ open, toggle, id }: PasswordProps) => {
  const { usePasswordUpdate } = useAdmin();
  const { mutate: updateFn } = usePasswordUpdate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordFormSchema),
    defaultValues: {
      old_password: "",
      confirm_password: "",
      password: "",
    },
  });
  const onSubmit = (data: any) => {
    console.log("onSubmit", data);
    updateFn({id,data}, {
      onSuccess: () => {
        console.log("Update Password", data);
        toggle();
      },
    });
  };
  return (
    <Modal
      title="Change password"
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
          label="Previous Password"
          name="old_password"
          validateStatus={errors.old_password ? "error" : ""}
          help={errors.old_password ? errors.old_password.message : ""}
        >
          <Controller
            name="old_password"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                status={errors.old_password ? "error" : ""}
                placeholder="Old Password"
              />
            )}
          />
        </Form.Item>

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
                placeholder="New Password"
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
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
                status={errors.confirm_password ? "error" : ""}
                placeholder="Confirm password"
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

export default PasswordModal;
