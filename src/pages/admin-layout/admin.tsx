import { Outlet, useNavigate } from "react-router-dom";

import React, { useState } from "react";
import {
  AppstoreOutlined,
  BankOutlined,
  BookOutlined,
  CodeOutlined,
  DribbbleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { clearStorage } from "@helpers";

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

  const handleLogout = () => {
    clearStorage();
    navigate("/");
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
                label: "Groups",
              },
              {
                key: "admin/teacher",
                icon: <BookOutlined />,
                label: "Teachers",
              },
              {
                key: "admin/student",
                icon: <DribbbleOutlined />,
                label: "Students",
              },
              {
                key: "admin/courses",
                icon: <CodeOutlined />,
                label: "Courses",
              },
              {
                key: "admin/branches",
                icon: <BankOutlined />,
                label: "Branches",
              },
              {
                key: "admin/room",
                icon: <AppstoreOutlined/>,
                label: "Rooms",
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: "0 24px",
              background: colorBgContainer,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontWeight: "bold",
            }}
          >
            <div>
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
              <span style={{ fontSize: "36px" }}>Admin Layout</span>
            </div>

            <Button type="primary" danger onClick={handleLogout}>
              Logout
            </Button>
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
