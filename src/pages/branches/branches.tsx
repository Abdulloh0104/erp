import { Button, Table, Space, type TablePaginationConfig } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useGeneral, useBranch } from "@hooks";
import { BranchColums, PopConfirm } from "@components";
import type { Branch } from "@types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BranchModel from "./model";


const Branches = () => {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState<Branch | null>(null);
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
  const { data, useBranchDelete } = useBranch(params);
  const { handlePagination } = useGeneral();
  const { mutate: deleteFn, isPending: isDeleting } = useBranchDelete();
  const deleteItem = (id: number) => {
    deleteFn(id);
  };
  const editItem = (record: Branch) => {
    setUpdate(record);
    console.log(record);
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
    ...(BranchColums ?? []),
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Branch) => (
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
      {open && <BranchModel open={open} toggle={toggle} update={update} />}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Branches</h2>
        <Button type="primary" onClick={() => setOpen(true)}>
          + Add Branch
        </Button>
      </div>
      <Table<Branch>
        columns={columns}
        dataSource={data?.data?.branch}
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

export default Branches;
