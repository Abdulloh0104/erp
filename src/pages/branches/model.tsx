import { Button, Form, Input, Modal } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import type { ModalProps, Branch } from "@types";
import { useBranch } from "@hooks";
import { branchFormSchema } from "@utils";
import MaskedInput from "antd-mask-input";
interface BranchProps extends ModalProps {
  update: Branch | null;
}


const BranchModel = ({ open, toggle, update }: BranchProps) => {
  const { useBranchUpdate, useBranchCreate } = useBranch({
    page: 1,
    limit: 11,
  });
  const { mutate: createFn } = useBranchCreate();
  const { mutate: updateFn } = useBranchUpdate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(branchFormSchema),
    defaultValues: {
      name: "",
      address: "",
      call_number: "",
    },
  });
  useEffect(() => {
    if (update?.id) {
      setValue("name", update.name);
      setValue("address", update.address);
      console.log("address", update.address);
      setValue("call_number", update.call_number);
    }
  }, [update, setValue]);
  const onSubmit = (data: any) => {
    // console.log(data); 
    // data.call_number=data.call_number.replace(/[^\d+]/g,"")
    if (update?.id) {
      updateFn(
        {id: update.id,data },
        {
          onSuccess: () => {
            console.log("Update Branch", { id: update.id,data });
            toggle(); // 🔁 faqat muvaffaqiyatli bo‘lsa modalni yop
          },
        }
      );
    } else {
      createFn(data, {
        onSuccess: () => {
          console.log("Create Branch", data);
          toggle(); // 🔁 faqat muvaffaqiyatli bo‘lsa modalni yop
        },
      });
    }
  };
  return (
    <Modal
      title="Branch Modal"
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
          label="Address"
          name="address"
          validateStatus={errors.address ? "error" : ""}
          help={errors.address ? errors.address.message : ""}
        >
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                status={errors.address ? "error" : ""}
                placeholder="Address"
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Call number"
          name="call_number"
          validateStatus={errors.call_number ? "error" : ""}
          help={errors.call_number ? errors.call_number.message : ""}
        >
          <Controller
            name="call_number"
            control={control}
            render={({ field }) => (
              <MaskedInput {...field}
              mask="+998 (00) 000-00-00"
              value={update?update.call_number:""}
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

export default BranchModel;
