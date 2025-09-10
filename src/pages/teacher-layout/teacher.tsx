// import { Outlet } from "react-router-dom";

// const Teacher = () => {
//   return (
//     <div>
//       <h1>Teacher layout</h1>
//       {/* sidebar */}
//       <Outlet />
//     </div>
//   );
// }

// export default Teacher


import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  ProfileOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Layout, theme, Menu } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuthLogOut } from "@hooks";
import { clearStorage } from "@helpers";

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const location = useLocation();

  const { mutate, isPending } = useAuthLogOut();

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === "logout") {
      mutate(
        { role: "admin" },
        {
          onSuccess: (res: any) => {
            if (res.status >= 200 && res.status < 300) {
              clearStorage();
              navigate("/");
            }
          },
        }
      );
    } else if (key === "profile") {
      navigate("/teacher/profile"); // Bu sahifani keyin o‘zingiz yaratishingiz mumkin
    }
  };

  const dropdownItems = [
    {
      key: "profile",
      label: (
        <span>
          <ProfileOutlined /> Profile
        </span>
      ),
    },
    {
      key: "logout",
      label: (
        <span style={{ color: "red" }}>
          <LogoutOutlined /> Logout
        </span>
      ),
    },
  ];

  const onMenuClick = ({ key }: { key: string }) => {
    navigate(`/teacher/${key}`);
  };

  const selectedKey = location.pathname.startsWith("/teacher/")
    ? location.pathname.replace("/teacher/", "")
    : "groups";

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <h3
          style={{
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            margin: "0 0 25px 0",
          }}
        >
          CRMT
        </h3>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={onMenuClick}
          items={[
            {
              key: "",
              icon: <FolderOpenOutlined />,
              label: "Groups",
            },
            // {
            //   key: "teacher",
            //   icon: <BookOutlined />,
            //   label: "Teachers",
            // },
            // {
            //   key: "student",
            //   icon: <DribbbleOutlined />,
            //   label: "Students",
            // },
            // {
            //   key: "courses",
            //   icon: <CodeOutlined />,
            //   label: "Courses",
            // },
            // {
            //   key: "branches",
            //   icon: <BranchesOutlined />,
            //   label: "Branches",
            // },
            // {
            //   key: "room",
            //   icon: <AppstoreOutlined />,
            //   label: "Rooms",
            // },
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

          <Dropdown
            menu={{ items: dropdownItems, onClick: handleMenuClick }}
            trigger={["hover"]}
            placement="bottomRight"
          >
            <Button
              shape="circle"
              icon={<UserOutlined />}
              loading={isPending}
            />
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            height: "100%",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;