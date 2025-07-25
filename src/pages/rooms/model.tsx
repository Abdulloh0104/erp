import { Button, Form, Input, Modal, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import type { ModalProps, Room } from "@types";
import { useBranch, useRoom } from "@hooks";
import { roomFormSchema } from "@utils";
interface RoomProps extends ModalProps {
  update: Room | null;
}

const RoomModel = ({ open, toggle, update }: RoomProps) => {
  const { useRoomUpdate, useRoomCreate } = useRoom({
    page: 1,
    limit: 10,
  });
  const { data } = useBranch({ page: 1, limit: 11 });
  const { mutate: createFn } = useRoomCreate();
  const { mutate: updateFn } = useRoomUpdate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(roomFormSchema),
    defaultValues: {
      name: "",
      capacity: undefined,
      branchId: undefined,
    },
  });
  useEffect(() => {
    if (update?.id) {
      setValue("name", update.name);
      setValue("capacity", update.capacity);
      setValue("branchId", update.branch?.id);
    }
  }, [update, setValue]);
  const onSubmit = (data: any) => {
    if (update?.id) {
      updateFn(
        {id: update.id,data },
        {
          onSuccess: () => {
            // console.log("Update Room", { ...data, id: update.id });
            toggle();
          },
        }
      );
    } else {
      createFn(data, {
        onSuccess: () => {
          console.log("Create Room", data);
          toggle();
        },
      });
    }
  };
  return (
    <Modal
      title="Room Modal"
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
          label="Room"
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
                placeholder="Room"
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Capacity"
          name="capacity"
          validateStatus={errors.capacity ? "error" : ""}
          help={errors.capacity ? errors.capacity.message : ""}
        >
          <Controller
            name="capacity"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                status={errors.capacity ? "error" : ""}
                placeholder="Capacity"
              />
            )}
          />
        </Form.Item>
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
                showSearch
                status={errors.branchId ? "error" : ""}
                placeholder="Select course"
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLocaleLowerCase())
                }
                options={data?.data?.branch.map((course: any) => {
                  return {
                    value: course.id,
                    label: course.name,
                  };
                })}
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

export default RoomModel;
