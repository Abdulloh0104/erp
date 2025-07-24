import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setItem } from "@helpers";
import { useAuth } from "@hooks";
import {LockOutlined, PaperClipOutlined} from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Radio,
  Select,
} from "antd";

type SizeType = Parameters<typeof Form>[0]["size"];

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const { mutate, isPending } = useAuth();
  const submit = () => {
    const payload = { email, password };
    mutate(
      { data: payload, role },
      {
        onSuccess: (res: any) => {
          if (res.status === 201) {
            setItem("access_token", res.data.access_token);
            setItem("role", role);
            navigate(`/${role}`);
          }
        },
      }
    );
  };
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f2f5", // umumiy fon
      }}
    >
      <div
        style={{
          padding: 32,
          backgroundColor: "#fff", // forma foni
          borderRadius: 8,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)", // yumshoq soyali effekt
          width: 400,
        }}
      >
        <h1 style={{ textAlign: "center" }}>Sign in</h1>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
          initialValues={{ size: componentSize }}
          onValuesChange={onFormLayoutChange}
          size="middle"
          style={{ maxWidth: 600 }}
        >
          <Form.Item label="Form Size" name="size">
            <Radio.Group>
              <Radio.Button value="small">Small</Radio.Button>
              <Radio.Button value="default">Default</Radio.Button>
              <Radio.Button value="large">Large</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              type="email"
              prefix={<PaperClipOutlined />}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            label="Select"
            name="role"
            rules={[{ required: true, message: "Please choose one!" }]}
          >
            <Select onChange={(value) => setRole(value)}>
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="teacher">Teacher</Select.Option>
              <Select.Option value="student">Student</Select.Option>
              <Select.Option value="lid">Lid</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              block
              type="primary"
              onClick={submit}
              loading={isPending}
              htmlType="submit"
              style={{ display: "inline-block", margin: "0 auto" }}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
        Don't have an account <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default SignIn;
