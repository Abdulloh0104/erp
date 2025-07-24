import { Button, Table, Space, type TablePaginationConfig } from "antd";
import { EditOutlined, ImportOutlined } from "@ant-design/icons";
import { useGeneral, useGroup } from "@hooks";
import { GroupColums, PopConfirm } from "@components";
import type { Group } from "@types";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import GroupModel from "./model";

const Groups = () => {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState<Group | null>(null);
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
  const editItem = (record: Group) => {
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
    ...(GroupColums ?? []),
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Group) => (
        <Space size="middle">
          <Button type="primary" onClick={() => editItem(record)}>
            <EditOutlined />
          </Button>
          <PopConfirm
            handleDelete={() => deleteItem(record.id!)}
            loading={isDeleting}
          />
          <Link
            to={`/admin/group/${record.id}`}
            className="border"
          >
            <ImportOutlined />
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <>
      {open && <GroupModel open={open} toggle={toggle} update={update} />}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Groups</h2>
        <Button type="primary" onClick={() => setOpen(true)}>+ Add Group</Button>
      </div>
      <Table<Group>
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
