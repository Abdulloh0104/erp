  import { Button, Form, Modal, Select } from "antd";
  import { useForm, Controller } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
  // import { useEffect } from "react";
  import type { ModalProps, Teacher, } from "@types";
  import {useGroup, useTeacher } from "@hooks";
  import { groupTeacherFormSchema } from "@utils";
  interface GroupTeacherProps extends ModalProps {
    id: number;
  }

  const GroupTeacherModel = ({ open, toggle,id }: GroupTeacherProps) => {
    const { useGroupTeachersCreate } = useGroup(
      {
        page: 1,
        limit: 11,
      },
    Number(id)
    );
    const { data } = useTeacher({ page: 1, limit: 11 });
    console.log("TEACHERS",data);
    const { mutate: createFn } = useGroupTeachersCreate();
    const {
      control,
      handleSubmit,
      formState: { errors },
      // setValue,
    } = useForm({
      resolver: yupResolver(groupTeacherFormSchema),
      defaultValues: {
        groupId: id,
        teacherId: [],
      },
    });
    const onSubmit = (data: any) => {
      console.log("GROUP TEACHER", { ...data, groupId: id });
      createFn(
        { ...data, groupId:id },
        {
          onSuccess: () => {
            console.log("Create Group Teacher", { ...data, groupId:id });
            toggle();
          },
        }
      );
      // }
    };
    return (
      <Modal
        title="Add teacher to Group"
        centered
        open={open}
        onCancel={toggle}
        width={700}
        closeIcon
        footer={null}
        style={{margin:"10px"}}
      >
        <Form
          layout="vertical"
          autoComplete="on"
          onFinish={handleSubmit(onSubmit)}
        >
          <Form.Item
            label="Teachers"
            name="teacherId"
            validateStatus={errors.teacherId ? "error" : ""}
            help={errors.teacherId ? errors.teacherId.message : ""}
          >
            <Controller
              name="teacherId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  mode="multiple" //qo'shildi
                  showSearch
                  status={errors.teacherId ? "error" : ""}
                  placeholder="Select Teachers"
                  optionFilterProp="label"
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLocaleLowerCase())
                  }
                  options={data?.data?.data?.map((t:Teacher) => ({
                    value: t.id,
                    label:`${t.last_name} ${t.first_name}`,
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

  export default GroupTeacherModel;
