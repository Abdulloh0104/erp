import { Button, Table, Space, type TablePaginationConfig } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useGeneral, useStudent } from "@hooks";
import { StudentColums, PopConfirm } from "@components";
import type { Student } from "@types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import StudentModel from "./model";

const Students = () => {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState<Student | null>(null);
  const [params, setParams] = useState({
    page: 1,
    limit: 5,
  });
  const location = useLocation();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    if (page && limit) {
      setParams(() => ({                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
        page: Number(page),
        limit: Number(limit),
      }));
    }
  }, [location.search]);
  const { data, useStudentDelete } = useStudent(params);
  console.log(data);
  const { handlePagination } = useGeneral();
  const { mutate: deleteFn, isPending: isDeleting } = useStudentDelete();
  const deleteItem = (id: number) => {
    deleteFn(id);
  };
  //butching ikkita va undan ortiq o'zgarishlarni alohida emas hammasini bittada render qilish
  const editItem = (record: Student) => {
    setUpdate(record);
    setOpen(true);
  };

  const toggle = () => {
    setOpen(!open);
    if (update) {
      setUpdate(null);
    }
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    handlePagination({ pagination, setParams });
  };

  const columns = [
    ...(StudentColums ?? []),
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Student) => (
        <Space size="middle">
          <Button type="primary" onClick={() => editItem(record)} size="small">
            <EditOutlined />
          </Button>
          <PopConfirm
            handleDelete={() => deleteItem(record.id!)}
            loading={isDeleting}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      {open && <StudentModel open={open} toggle={toggle} update={update} />}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Students</h2>
        <Button type="primary" onClick={() => setOpen(true)}>
          + Add Student
        </Button>
      </div>
      <Table<Student>
        columns={columns}
        dataSource={data?.data?.data}
        rowKey={(row) => row.id!}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: data?.data?.total,
          showSizeChanger: true,
          pageSizeOptions: ["4", "5", "6", "7", "10"],
        }}
        onChange={handleTableChange}
      />
    </>
  );
};

export default Students;
