import { useAdmin } from "@hooks";
import { Card, Spin, Button, Avatar, Badge, Typography } from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  IdcardOutlined,
  EditOutlined,
  KeyOutlined,
  CrownOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import PasswordModal from "./password";
import UpdateModal from "./update";

const { Title, Text } = Typography;

const AdminProfilePage = () => {
  // ✅ Call ALL hooks at the top level first
  const { data } = useAdmin();
  const [openUpdate, setOpenUpdate] = useState(false);
  const [open, setOpen] = useState(false);

  // ✅ Then do conditional logic/early returns
  const admin = data?.data?.admin;
  if (!admin)
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" tip="Loading profile..." />
      </div>
    );

  const handleChange = () => {
    setOpen(true);
  };

  const toggle = () => {
    setOpen(!open);
  };


  const toggleUpdate = () => {
    setOpenUpdate(!openUpdate);
  };
  return (
    <>
      {open && <PasswordModal open={open} toggle={toggle} id={admin?.id} />}
      {openUpdate && (
        <UpdateModal openUpdate={openUpdate} toggleUpdate={toggleUpdate} />
      )}

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Card with Cover */}
        <Card className="relative overflow-hidden" bodyStyle={{ padding: 0 }}>
          {/* Cover Background */}
          <div className="h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative">
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          {/* Profile Content */}
          <div className="relative px-6 pb-6">
            {/* Avatar */}
            <div className="flex items-end justify-between -mt-16">
              <div className="flex items-end space-x-4">
                <div className="relative">
                  <Avatar
                    size={120}
                    src="/images/Aicon.jpg"
                    className="border-4 border-white shadow-lg"
                  />
                  <Badge
                    count={<CrownOutlined className="text-yellow-500" />}
                    offset={[-10, 10]}
                  />
                </div>

                <div className="pb-4">
                  <Title level={2} className="mb-1">
                    {admin.first_name} {admin.last_name}
                  </Title>
                  <Text type="secondary" className="text-lg">
                    System Administrator
                  </Text>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pb-4 space-x-2">
                <Button
                  type="primary"
                  icon={<KeyOutlined />}
                  onClick={handleChange}
                  size="large"
                >
                  Change Password
                </Button>
                <Button
                  icon={<EditOutlined />}
                  size="large"
                  onClick={toggleUpdate}
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Information Card */}
          <div className="lg:col-span-2">
            <Card
              title={
                <div className="flex items-center space-x-2">
                  <UserOutlined className="text-blue-500" />
                  <span>Personal Information</span>
                </div>
              }
              className="h-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div className="space-y-2">
                  <Text type="secondary" className="text-sm font-medium">
                    First Name
                  </Text>
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <Text className="text-base font-semibold">
                      {admin.first_name}
                    </Text>
                  </div>
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <Text type="secondary" className="text-sm font-medium">
                    Last Name
                  </Text>
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <Text className="text-base font-semibold">
                      {admin.last_name}
                    </Text>
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Text type="secondary" className="text-sm font-medium">
                    <PhoneOutlined className="mr-1" />
                    Phone Number
                  </Text>
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <Text className="text-base font-semibold">
                      {admin.phone}
                    </Text>
                  </div>
                </div>

                {/* Admin ID */}
                <div className="space-y-2">
                  <Text type="secondary" className="text-sm font-medium">
                    <IdcardOutlined className="mr-1" />
                    Admin ID
                  </Text>
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <Text className="text-base font-semibold">#{admin.id}</Text>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="space-y-6">
            {/* Profile Stats */}
            <Card title="Profile Statistics" className="text-center">
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">100%</div>
                  <Text type="secondary">Profile Complete</Text>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    Active
                  </div>
                  <Text type="secondary">Account Status</Text>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Image Upload Guidelines */}
        <Card title="Profile Image Guidelines" className="bg-gray-50">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <UserOutlined className="text-blue-600 text-xl" />
              </div>
            </div>
            <div>
              <Title level={5} className="mb-2">
                Image Requirements
              </Title>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Recommended size: 500x500 pixels</li>
                <li>• Supported formats: JPEG, JPG, PNG</li>
                <li>• Maximum file size: 2MB</li>
                <li>• Square aspect ratio preferred</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default AdminProfilePage;
