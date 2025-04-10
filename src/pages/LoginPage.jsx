import { Form, Input, Button, message, Space } from "antd";
import { Link } from "react-router-dom";
import {
  MailOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { useAuth } from "../auth/AuthContext";
import "../assets/css/login-page.css";

const LoginPage = () => {
  const [form] = Form.useForm();
  const { login } = useAuth();

  const onFinish = async (values) => {
    try {
      const { email, password } = values;
      console.log("Received values:", values);
      await login(values.email, values.password);
    } catch (error) {
      message.error(
        error.message || "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div className="w-full h-[100vh] bg-stone-950 pt-[150px] overflow-y-scroll">
      <div className="border border-stone-800 rounded-sm drop-shadow-lg w-[30%] mx-auto p-[10px]">
        <div className="bg-violet-500 text-stone-950 mb-[20px] rounded-sm p-[4px]">
          <h3 className="text-center">USER LOGIN</h3>
        </div>
        <Form name="login" form={form} onFinish={onFinish}>
          <Form.Item
            name="email"
            label={<span className="text-red-600 text-md"></span>}
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input
              size="medium"
              placeholder="Email"
              prefix={<MailOutlined style={{ color: "gray" }} />}
              style={{
                backgroundColor: "oklch(0.216 0.006 56.043)",
                border: "1px solid oklch(0.216 0.006 56.043)",
                color: "whitesmoke",
              }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label={<span className="text-red-600 text-md"></span>}
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              size="medium"
              placeholder="Password"
              iconRender={(visible) =>
                visible ? (
                  <EyeOutlined style={{ color: "gray" }} />
                ) : (
                  <EyeInvisibleOutlined style={{ color: "gray" }} />
                )
              }
              prefix={<LockOutlined style={{ color: "gray" }} />}
              style={{
                backgroundColor: "oklch(0.216 0.006 56.043)",
                border: "1px solid oklch(0.216 0.006 56.043)",
                color: "whitesmoke",
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              className="w-full"
              htmlType="submit"
              style={{
                backgroundColor: "oklch(0.606 0.25 292.717)",
                border: "none",
              }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
        <p className="text-center text-white text-xs hover:text-violet-400">
          <Space>
            <Link to={"/register"}>Don't have an account?</Link>
            <span>|</span>
            <Link to={"/forget-password"}>Forgot Password</Link>
          </Space>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
