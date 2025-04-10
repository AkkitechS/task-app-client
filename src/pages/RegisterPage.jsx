import { Form, Input, Button, Typography, message } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { USER_URLS } from "../utils/urls";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    console.log("Received values:", values);
    const { firstName, lastName, email, username, password, confirmPass } =
      values;
    try {
      const res = await api.post(USER_URLS.SIGNUP, values);
      if (res.status == 200) {
        message.success(
          "Registration successful. Please check your email for verification."
        );
        form.resetFields();
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      message.error(error.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="bg-stone-950 w-full h-[100vh] pt-[80px] overflow-y-scroll">
      <div className="w-[40%] mx-auto border border-stone-800 rounded-md p-[10px]">
        <div className="bg-violet-500 text-stone-950 mb-[20px] rounded-sm p-[4px]">
          <h3 className="text-center">REGISTER USER</h3>
        </div>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name={"firstName"}
            rules={[{ required: true, message: "Please enter firstname!" }]}
            label={<span className="text-white font-semibold">First Name</span>}
          >
            <Input
              size="medium"
              placeholder="First Name"
              style={{
                backgroundColor: "oklch(0.216 0.006 56.043)",
                border: "1px solid oklch(0.216 0.006 56.043)",
                color: "whitesmoke",
              }}
            />
          </Form.Item>
          <Form.Item
            name={"lastName"}
            rules={[{ required: true, message: "Please enter lastname!" }]}
            label={<span className="text-white font-semibold">Last Name</span>}
          >
            <Input
              size="medium"
              placeholder="Last Name"
              style={{
                backgroundColor: "oklch(0.216 0.006 56.043)",
                border: "1px solid oklch(0.216 0.006 56.043)",
                color: "whitesmoke",
              }}
            />
          </Form.Item>
          <Form.Item
            name={"email"}
            rules={[{ required: true, message: "Please enter email!" }]}
            label={<span className="text-white font-semibold">Email</span>}
          >
            <Input
              size="medium"
              placeholder="Email"
              style={{
                backgroundColor: "oklch(0.216 0.006 56.043)",
                border: "1px solid oklch(0.216 0.006 56.043)",
                color: "whitesmoke",
              }}
            />
          </Form.Item>
          <Form.Item
            name={"username"}
            rules={[{ required: true, message: "Please enter username!" }]}
            label={<span className="text-white font-semibold">Username</span>}
          >
            <Input
              size="medium"
              placeholder="Username"
              style={{
                backgroundColor: "oklch(0.216 0.006 56.043)",
                border: "1px solid oklch(0.216 0.006 56.043)",
                color: "whitesmoke",
              }}
            />
          </Form.Item>
          <Form.Item
            name={"password"}
            rules={[{ required: true, message: "Please enter password!" }]}
            label={<span className="text-white font-semibold">Password</span>}
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
              style={{
                backgroundColor: "oklch(0.216 0.006 56.043)",
                border: "1px solid oklch(0.216 0.006 56.043)",
                color: "whitesmoke",
              }}
            />
          </Form.Item>
          <Form.Item
            name={"confirmPass"}
            label={
              <span className="text-white font-semibold">Confirm Password</span>
            }
            rules={[
              { required: true, message: "Please confirm password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
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
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
