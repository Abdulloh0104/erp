  import { Button, Form, Modal, Select } from "antd";
  import { useForm, Controller } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
  // import { useEffect } from "react";
  import type {Student} from "@types";
  import {useGroup, useStudent } from "@hooks";
  import { groupStudentFormSchema } from "@utils";
  interface GroupStudentProps {
    id: number;
    openStudent: boolean;
    toggleStudent: () => void;
  }

  const GroupStudentModel = ({ openStudent, toggleStudent,id }: GroupStudentProps) => {
    const { useGroupStudentsCreate } = useGroup(
      {
        page: 1,
        limit: 11,
      },
    Number(id)
    );
    const { data } = useStudent({ page: 1, limit: 11 });
    console.log("STUDENTS",data?.data?.data);
    const { mutate: createFn } = useGroupStudentsCreate();
    const {
      control,
      handleSubmit,
      formState: { errors },
      // setValue,
    } = useForm({
      resolver: yupResolver(groupStudentFormSchema),
      defaultValues: {
        groupId: id,
        studentId: [],
      },
    });
    const onSubmit = (data: any) => {
      console.log("GROUP STUDENT", { ...data, groupId: id });
      createFn(
        { ...data, groupId:id },
        {
          onSuccess: () => {
            console.log("Create Group Teacher", { ...data, groupId:id });
            toggleStudent();
          },
        }
      );
      // }
    };
    return (
      <Modal
        title="Add Students to Group"
        centered
        open={openStudent}
        onCancel={toggleStudent}
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
            label="Students"
            name="studentId"
            validateStatus={errors.studentId ? "error" : ""}
            help={errors.studentId ? errors.studentId.message : ""}
          >
            <Controller
              name="studentId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  mode="multiple" //qo'shildi
                  showSearch
                  status={errors.studentId ? "error" : ""}
                  placeholder="Select Students"
                  optionFilterProp="label"
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLocaleLowerCase())
                  }
                  options={data?.data?.data?.map((t: Student) => ({
                    value: t.id,
                    label: `${t.last_name} ${t.first_name}`,
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

  export default GroupStudentModel;
