import {
  Layout,
  Flex,
  Avatar,
  Dropdown,
  Space,
  Menu,
  Modal,
  Form,
  Input,
  Button as FormButton,
  message,
} from "antd";
import Logo from "../assets/logo.png";
import {
  UserOutlined,
  LockOutlined,
  LogoutOutlined,
  DownOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useContext } from "react";
import "../assets/css/dashboard-page.css";
import api from "../api/axios";
import { USER_URLS } from "../utils/urls";

const { Header, Content, Sider } = Layout;
const { Button } = Dropdown;

const Dashboard = () => {
  const [form] = Form.useForm();
  const { user, logout } = useAuth();
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const navigate = useNavigate();

  const items = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "View Profile",
      onClick: () => {
        // handle view profile logic here
        console.log("Viewing Profile...");
        navigate("/dashboard/profile");
      },
    },
    {
      key: "changePassword",
      icon: <LockOutlined />,
      label: "Change Password",
      onClick: async () => {
        console.log("Changing Password...");
        setIsChangePasswordModalOpen(true);
      },
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: () => {
        // handle logout logic here
        console.log("Logging out...");
        logout();
      },
    },
  ];

  const menuItems = [
    { key: "tasks", label: "Tasks" },
    { key: "notes", label: "Notes" },
    { key: "timetable", label: "Timetable" },
    { key: "analytics", label: "Analytics" },
  ];

  const handleChangePassword = async (values) => {
    console.log("Change Password Values", values);
    try {
      const { oldPassword, newPassword } = values;
      const res = await api.post(USER_URLS.RESET_PASSWORD, {
        oldPassword,
        newPassword,
      });
      if (res.status === 200) {
        message.success("Password changed successfully!");
        setIsChangePasswordModalOpen(false);
        setTimeout(() => {
          logout();
        }, 1000);
      } else {
        message.error("Failed to change password");
      }
    } catch (error) {
      console.log("Change Password Error", error);
      message.error(error.message || "Failed to change password");
    }
  };

  return (
    <>
      <div className="bg-stone-900 w-full h-screen">
        <Layout
          style={{
            width: "100%",
            height: "100%",
            overflowY: "scroll",
            backgroundColor: "black",
          }}
        >
          <Header
            style={{
              backgroundColor: "oklch(60.6% 0.25 292.717)",
              width: "100%",
            }}
          >
            <Flex dir="vertical" justify="space-between">
              <div>
                <img src={Logo} width={"70px"} />
              </div>
              <div>
                <Dropdown
                  menu={{
                    items,
                  }}
                  placement="bottomRight"
                  arrow
                >
                  <Space className="cursor-pointer">
                    <Avatar size="medium" src={user.avatarUrl}>
                      {(user.firstName[0] + user.lastName[0]).toUpperCase()}
                    </Avatar>
                    <span style={{ color: "white" }}>{user.username}</span>
                    <DownOutlined style={{ color: "white" }} />
                  </Space>
                </Dropdown>
              </div>
            </Flex>
          </Header>
          <Layout style={{ display: "flex", flexDirection: "row" }}>
            <Sider
              width={200}
              style={{
                backgroundColor: "oklch(21.6% 0.006 56.043)",
                color: "white",
                border: "1px solid oklch(26.8% 0.007 34.298)",
                height: "100vh",
                boxShadow: "4px 0 20px rgba(100, 100, 100, 0.2)",
              }}
            >
              <div className="text-center text-white text-lg font-bold py-4">
                <Menu
                  items={menuItems}
                  defaultSelectedKeys={["tasks"]}
                  theme="dark"
                  rootClassName="custom-menu"
                  style={{
                    backgroundColor: "oklch(21.6% 0.006 56.043)",
                    height: "100%",
                  }}
                />
              </div>
              {/* Add your sidebar menu items here */}
            </Sider>
            <Layout
              style={{
                padding: "0 24px 24px",
                backgroundColor: "oklch(14.7% 0.004 49.25)",
                height: "100vh",
              }}
            >
              <Content
                style={{
                  backgroundColor: "transparent",
                  width: "100%",
                  height: "100%",
                  padding: "1.2rem",
                }}
              >
                <Outlet />
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>

      <Modal
        styles={{
          content: {
            backgroundColor: "oklch(26.8% 0.007 34.298)",
            color: "white",
          },
        }}
        open={isChangePasswordModalOpen}
        footer={null}
        closeIcon={
          <CloseOutlined
            style={{ color: "white" }}
            onClick={() => setIsChangePasswordModalOpen(false)}
          />
        }
      >
        <Form
          style={{ padding: "1.2rem" }}
          form={form}
          onFinish={handleChangePassword}
        >
          <Form.Item
            name={"oldPassword"}
            label={<span className="text-red-600 text-md"></span>}
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              size="medium"
              placeholder="Old Password"
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
          <Form.Item
            name={"newPassword"}
            label={<span className="text-red-600 text-md"></span>}
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              size="medium"
              placeholder="New Password"
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
            <FormButton
              style={{
                backgroundColor: "oklch(60.6% 0.25 292.717)",
                color: "white",
                border: "1px solid oklch(60.6% 0.25 292.717)",
              }}
              htmlType="submit"
            >
              Change
            </FormButton>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Dashboard;
