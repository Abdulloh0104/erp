import { Outlet, useNavigate } from "react-router-dom";

import React, { useState } from "react";
import {
  BookOutlined,
  DribbbleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { PopConfirm } from "@components";

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(`/${key}`);
  };
  return (
    <>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["admin"]}
            onClick={handleMenuClick}
            items={[
              {
                key: "admin",
                icon: <SettingOutlined />,
                label: "Group",
              },
              {
                key: "admin/teacher",
                icon: <BookOutlined />,
                label: "Teacher",
              },
              {
                key: "admin/student",
                icon: <DribbbleOutlined />,
                label: "Student",
              },
              {
                key: "admin/courses",
                icon: <DribbbleOutlined />,
                label: "Courses",
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              display: "flex",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <h1>Admin Layout</h1>
            {/* <PopConfirm
              handleDelete={() => deleteItem(record.id!)}
              loading={isDeleting}
            /> */}
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              height: "120vh",
              // minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default App;
