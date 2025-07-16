import { Button, Table, Space, type TablePaginationConfig } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useGeneral, useGroup } from "@hooks";
import { CourseColums, PopConfirm } from "@components";
import type { Course, } from "@types";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CourseModel from "./model";

const Groups = () => {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState<Course | null>(null);
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
  const { data, useGroupDelete } = useGroup(params);
  const { handlePagination } = useGeneral();
  const { mutate: deleteFn, isPending: isDeleting } = useGroupDelete();
  const deleteItem = (id: number) => {
    deleteFn(id);
  };
  //butching ikkita va undan ortiq o'zgarishlarni alohida emas hammasini bittada render qilish
  const editItem = (record: Course) => {
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
    ...(CourseColums ?? []),
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Course) => (
        <Space size="middle">
          <Button type="primary" onClick={() => editItem(record)}>
            <EditOutlined />
          </Button>
          <PopConfirm
            handleDelete={() => deleteItem(record.id!)}
            loading={isDeleting}
          />
          <Link to={`/admin/courses/${record.id}`}>view</Link>
        </Space>
      ),
    },
  ];

  return (
    <>
      {open && <CourseModel open={open} toggle={toggle} update={update} />}
      <h2>GROUPS</h2>
      <Button type="primary" onClick={() => setOpen(true)}>
        add group
      </Button>
      <Table<Course>
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

export default Groups;
