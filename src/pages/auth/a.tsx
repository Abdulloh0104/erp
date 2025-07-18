import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setItem } from "@helpers";
import { useAuth } from "@hooks";
import {
  Button,
  Form,
} from "antd";

type SizeType = Parameters<typeof Form>[0]["size"];

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();


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
    <div>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />

      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <select onChange={(e) => setRole(e.target.value)}>
        <option value="teacher">Teacher</option>
        <option value="student">Student</option>
        <option value="admin">Admin</option>
        <option value="lid">Lid</option>
      </select>
      <Button type="primary" onClick={submit} loading={isPending}>
        submit
      </Button>
    </div>
  );
};

export default SignIn;
