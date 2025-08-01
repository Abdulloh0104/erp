import { Button, Table, Space, type TablePaginationConfig } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useRoom, useGeneral } from "@hooks";
import { PopConfirm, RoomColums } from "@components";
import type { Room, } from "@types";
import { useEffect, useState } from "react";
import {useLocation } from "react-router-dom";
import RoomModal from "./model";

const Rooms = () => {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState<Room | null>(null);
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
  const { data, useRoomDelete } = useRoom(params);

  const { handlePagination } = useGeneral();
  const { mutate: deleteFn, isPending: isDeleting } = useRoomDelete();
  const deleteItem = (id: number) => {
    deleteFn(id);
  };
  const editItem = (record: Room) => {
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
    ...(RoomColums ?? []),
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Room) => (
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
      {open && <RoomModal open={open} toggle={toggle} update={update} />}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Rooms</h2>
        <Button type="primary" onClick={() => setOpen(true)}>
          + Add Room
        </Button>
      </div>
      <Table<Room>
        columns={columns}
        dataSource={data?.data?.rooms}
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

export default Rooms;
