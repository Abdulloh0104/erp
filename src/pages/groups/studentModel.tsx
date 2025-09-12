import { useEffect, useState } from "react";
import { Button, Form, Modal, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { Student } from "@types";
import { useGroup, useStudent } from "@hooks";
import { groupStudentFormSchema } from "@utils";

interface GroupStudentProps {
  id: number;
  openStudent: boolean;
  toggleStudent: () => void;
}

const GroupStudentModel = ({
  openStudent,
  toggleStudent,
  id,
}: GroupStudentProps) => {
  // pagination va search uchun state
  const [page, setPage] = useState(1);
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");

  // studentlar hook (faqat page/limit ishlaydi)
  const { data } = useStudent({ page, limit: 10 });

  // guruhga student qo‘shish hook
  const { useGroupStudentsCreate } = useGroup(
    { page: 1, limit: 11 },
    Number(id)
  );
  const { mutate: createFn } = useGroupStudentsCreate();

  // backenddan kelgan studentlarni jamlab boramiz
  useEffect(() => {
    if (data?.data?.data) {
      setAllStudents((prev) => {
        // dublikat bo‘lmasligi uchun filter
        const newStudents = data.data.data.filter(
          (s: Student) => !prev.some((p) => p.id === s.id)
        );
        return [...prev, ...newStudents];
      });
    }
  }, [data]);

  // search bo‘yicha filterlangan studentlar
  const filteredStudents = allStudents.filter((s) =>
    `${s.last_name} ${s.first_name}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // agar search natija topmasa → keyingi sahifani chaqirish
  useEffect(() => {
    if (search && filteredStudents.length === 0) {
      setPage((prev) => prev + 1);
    }
  }, [search, filteredStudents]);

  // react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(groupStudentFormSchema),
    defaultValues: {
      groupId: id,
      studentId: [],
    },
  });

  // form submit
  const onSubmit = (data: any) => {
    createFn(
      { ...data, groupId: id },
      {
        onSuccess: () => {
          toggleStudent();
        },
      }
    );
  };

  return (
    <Modal
      title="Add Students to Group"
      centered
      open={openStudent}
      onCancel={toggleStudent}
      width={700}
      footer={null}
      style={{ margin: "10px" }}
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
                mode="multiple"
                showSearch
                placeholder="Select Students"
                optionFilterProp="label"
                filterOption={false} // search frontendda
                onSearch={(value) => {
                  setSearch(value);
                  setPage(1); // yangi search bo‘lsa, page qaytadan 1 dan
                  setAllStudents([]); // eski studentlarni tozalash
                }}
                onPopupScroll={(e) => {
                  const target = e.target as HTMLElement;
                  if (
                    target.scrollTop + target.offsetHeight ===
                    target.scrollHeight
                  ) {
                    setPage((prev) => prev + 1);
                  }
                }}
                options={filteredStudents.map((s) => ({
                  value: s.id,
                  label: `${s.last_name} ${s.first_name}`,
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
