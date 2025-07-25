import { Button, Table, Space, type TablePaginationConfig } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useGeneral, useTeacher } from "@hooks";
import { TeacherColums, PopConfirm } from "@components";
import type { Teacher } from "@types";
import { useEffect, useState } from "react";
import {useLocation} from "react-router-dom";
import TeacherModel from "./model";

const Teachers = () => {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState<Teacher | null>(null);
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
  const { data, useTeacherDelete } = useTeacher(params);
  const { handlePagination } = useGeneral();
  const { mutate: deleteFn, isPending: isDeleting } = useTeacherDelete();
  const deleteItem = (id: number) => {
    deleteFn(id);
  };
  //butching ikkita va undan ortiq o'zgarishlarni alohida emas hammasini bittada render qilish
  const editItem = (record: Teacher) => {
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
    ...(TeacherColums ?? []),
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Teacher) => (
        <Space size="middle">
          <Button type="primary" onClick={() => editItem(record)}>
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
      {open && <TeacherModel open={open} toggle={toggle} update={update} />}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Teachers</h2>
        <Button type="primary" onClick={() => setOpen(true)}>
          + Add Teacher
        </Button>
      </div>
      <Table<Teacher>
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

export default Teachers;
