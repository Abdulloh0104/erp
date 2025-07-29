// import { Outlet, useNavigate } from "react-router-dom";

// import React, { useState } from "react";
// import {
//   AppstoreOutlined,
//   BankOutlined,
//   BookOutlined,
//   CodeOutlined,
//   DribbbleOutlined,
//   FolderOpenOutlined,
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
// } from "@ant-design/icons";
// import { Button, Layout, Menu, theme } from "antd";
// import { clearStorage } from "@helpers";

// const { Header, Sider, Content } = Layout;

// const App: React.FC = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   const navigate = useNavigate();

//   const handleMenuClick = ({ key }: { key: string }) => {
//     navigate(`/${key}`);
//   };

//   const handleLogout = () => {
//     clearStorage();
//     navigate("/");
//   };

//   return (
//     <>
//       <Layout>
//         <Sider trigger={null} collapsible collapsed={collapsed}>
//           <div className="demo-logo-vertical" />
//           <Menu
//             theme="dark"
//             mode="inline"
//             defaultSelectedKeys={["admin"]}
//             onClick={handleMenuClick}
//             items={[
//               {
//                 key: "admin",
//                 icon: <FolderOpenOutlined />,
//                 label: "Groups",
//               },
//               {
//                 key: "admin/teacher",
//                 icon: <BookOutlined />,
//                 label: "Teachers",
//               },
//               {
//                 key: "admin/student",
//                 icon: <DribbbleOutlined />,
//                 label: "Students",
//               },
//               {
//                 key: "admin/courses",
//                 icon: <CodeOutlined />,
//                 label: "Courses",
//               },
//               {
//                 key: "admin/branches",
//                 icon: <BankOutlined />,
//                 label: "Branches",
//               },
//               {
//                 key: "admin/room",
//                 icon: <AppstoreOutlined/>,
//                 label: "Rooms",
//               },
//             ]}
//           />
//         </Sider>
//         <Layout>
//           <Header
//             style={{
//               padding: "0 24px",
//               background: colorBgContainer,
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               fontWeight: "bold",
//             }}
//           >
//             <div>
//               <Button
//                 type="text"
//                 icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//                 onClick={() => setCollapsed(!collapsed)}
//                 style={{
//                   fontSize: "16px",
//                   width: 64,
//                   height: 64,
//                 }}
//               />
//               <span style={{ fontSize: "36px" }}>Admin Layout</span>
//             </div>

//             <Button type="primary" danger onClick={handleLogout}>
//               Logout
//             </Button>
//           </Header>
//           <Content
//             style={{
//               margin: "24px 16px",
//               padding: 24,
//               height: "120vh",
//               // minHeight: 280,
//               background: colorBgContainer,
//               borderRadius: borderRadiusLG,
//             }}
//           >
//             <Outlet />
//           </Content>
//         </Layout>
//       </Layout>
//     </>
//   );
// };

// export default App;


import { Outlet, useNavigate, useLocation } from "react-router-dom"; // useLocation ni qo'shdik
import React, { useState } from "react";
import {
  AppstoreOutlined,
  BookOutlined,
  BranchesOutlined,
  CodeOutlined,
  DribbbleOutlined,
  FolderOpenOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
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
  const location = useLocation(); // 🔹 hozirgi URLni olish

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(`/admin/${key}`);
  };

  const handleLogout = () => {
    clearStorage();
    navigate("/");
  };

  // 🔸 pathdan "admin/" qismini olib tashlaymiz
  const selectedKey = location.pathname.startsWith("/admin/")
    ? location.pathname.replace("/admin/", "")
    : "groups";

  return (
    <>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <h2 style={{height:"60px",display:"flex", alignItems: "center", justifyContent:"center", color:"#fff", margin:"0 0 25px 0"}}>CRM</h2>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedKey]} // ✅ faqat "student", "teacher", ...
            onClick={handleMenuClick}
            items={[
              {
                key: "",
                icon: <FolderOpenOutlined />,
                label: "Groups",
              },
              {
                key: "teacher",
                icon: <BookOutlined />,
                label: "Teachers",
              },
              {
                key: "student",
                icon: <DribbbleOutlined />,
                label: "Students",
              },
              {
                key: "courses",
                icon: <CodeOutlined />,
                label: "Courses",
              },
              {
                key: "branches",
                icon: <BranchesOutlined />,
                label: "Branches",
              },
              {
                key: "room",
                icon: <AppstoreOutlined />,
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
            <Button type="primary" danger onClick={handleLogout}>
              Logout
            </Button>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              height: "120vh",
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
