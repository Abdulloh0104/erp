  // import { Button, Form, Modal, Select } from "antd";
  // import { useForm, Controller } from "react-hook-form";
  // import { yupResolver } from "@hookform/resolvers/yup";
  // // import { useEffect } from "react";
  // import type { ModalProps, Teacher, } from "@types";
  // import {useGroup, useTeacher } from "@hooks";
  // import { groupTeacherFormSchema } from "@utils";
  // interface GroupTeacherProps extends ModalProps {
  //   id: number;
  // }

  // const GroupTeacherModel = ({ open, toggle,id }: GroupTeacherProps) => {
  //   const { useGroupTeachersCreate } = useGroup(
  //     {
  //       page: 1,
  //       limit: 11,
  //     },
  //   Number(id)
  //   );
  //   const { data } = useTeacher({ page: 1, limit: 11 });
  //   console.log("TEACHERS",data);
  //   const { mutate: createFn } = useGroupTeachersCreate();
  //   const {
  //     control,
  //     handleSubmit,
  //     formState: { errors },
  //     // setValue,
  //   } = useForm({
  //     resolver: yupResolver(groupTeacherFormSchema),
  //     defaultValues: {
  //       groupId: id,
  //       teacherId: [],
  //     },
  //   });
  //   const onSubmit = (data: any) => {
  //     console.log("GROUP TEACHER", { ...data, groupId: id });
  //     createFn(
  //       { ...data, groupId:id },
  //       {
  //         onSuccess: () => {
  //           console.log("Create Group Teacher", { ...data, groupId:id });
  //           toggle();
  //         },
  //       }
  //     );
  //     // }
  //   };
  //   return (
  //     <Modal
  //       title="Add teacher to Group"
  //       centered
  //       open={open}
  //       onCancel={toggle}
  //       width={700}
  //       closeIcon
  //       footer={null}
  //       style={{margin:"10px"}}
  //     >
  //       <Form
  //         layout="vertical"
  //         autoComplete="on"
  //         onFinish={handleSubmit(onSubmit)}
  //       >
  //         <Form.Item
  //           label="Teachers"
  //           name="teacherId"
  //           validateStatus={errors.teacherId ? "error" : ""}
  //           help={errors.teacherId ? errors.teacherId.message : ""}
  //         >
  //           <Controller
  //             name="teacherId"
  //             control={control}
  //             render={({ field }) => (
  //               <Select
  //                 {...field}
  //                 mode="multiple" //qo'shildi
  //                 showSearch
  //                 status={errors.teacherId ? "error" : ""}
  //                 placeholder="Select Teachers"
  //                 optionFilterProp="label"
  //                 filterSort={(optionA, optionB) =>
  //                   (optionA?.label ?? "")
  //                     .toLowerCase()
  //                     .localeCompare((optionB?.label ?? "").toLocaleLowerCase())
  //                 }
  //                 options={data?.data?.data?.map((t:Teacher) => ({
  //                   value: t.id,
  //                   label:`${t.last_name} ${t.first_name}`,
  //                 }))}
  //               />
  //             )}
  //           />
  //         </Form.Item>
  //         <Form.Item>
  //           <Button type="primary" htmlType="submit">
  //             Submit
  //           </Button>
  //         </Form.Item>
  //       </Form>
  //     </Modal>
  //   );
  // };

  // export default GroupTeacherModel;


  import { useEffect, useState } from "react";
  import { Button, Form, Modal, Select } from "antd";
  import { useForm, Controller } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
  import type { ModalProps, Teacher } from "@types";
  import { useGroup, useTeacher } from "@hooks";
  import { groupTeacherFormSchema } from "@utils";
  
  interface GroupTeacherProps extends ModalProps {
    id: number;
  }

  const GroupTeacherModel = ({ open, toggle, id }: GroupTeacherProps) => {
    // pagination va search uchun state
    const [page, setPage] = useState(1);
    const [allTeachers, setAllTeachers] = useState<Teacher[]>([]);
    const [search, setSearch] = useState("");

    // teacherlar hook (faqat page/limit ishlaydi)
    const { data } = useTeacher({ page, limit: 20 });

    // guruhga teacher qo‘shish hook
    const { useGroupTeachersCreate } = useGroup(
      { page: 1, limit: 11 },
      Number(id)
    );
    const { mutate: createFn } = useGroupTeachersCreate();

    // backenddan kelgan teacherlarni jamlab boramiz
    useEffect(() => {
      if (data?.data?.data) {
        setAllTeachers((prev) => {
          // dublikat bo‘lmasligi uchun filter
          const newTeachers = data.data.data.filter(
            (t: Teacher) => !prev.some((p) => p.id === t.id)
          );
          return [...prev, ...newTeachers];
        });
      }
    }, [data]);

    // search bo‘yicha filterlangan teacherlar
    const filteredTeachers = allTeachers.filter((t) =>
      `${t.last_name} ${t.first_name}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    // agar search natija topmasa → keyingi sahifani chaqirish
    useEffect(() => {
      if (search && filteredTeachers.length === 0) {
        setPage((prev) => prev + 1);
      }
    }, [search, filteredTeachers]);

    // react-hook-form
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(groupTeacherFormSchema),
      defaultValues: {
        groupId: id,
        teacherId: [],
      },
    });

    // form submit
    const onSubmit = (data: any) => {
      createFn(
        { ...data, groupId: id },
        {
          onSuccess: () => {
            toggle();
          },
        }
      );
    };

    return (
      <Modal
        title="Add teacher to Group"
        centered
        open={open}
        onCancel={toggle}
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
                  mode="multiple"
                  showSearch
                  placeholder="Select Teachers"
                  optionFilterProp="label"
                  filterOption={false} // search frontendda
                  onSearch={(value) => {
                    setSearch(value);
                    setPage(1); // yangi search bo‘lsa, page qaytadan 1 dan
                    setAllTeachers([]); // eski teacherlarni tozalash
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
                  options={filteredTeachers.map((t) => ({
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

  export default GroupTeacherModel;
