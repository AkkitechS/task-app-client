import { Breadcrumb, Descriptions, Avatar, Spin, Badge } from "antd";
import api from "../api/axios";
import { USER_URLS } from "../utils/urls";
import { useEffect, useState } from "react";
import ErrorComponent from "./ErrorComponent";
import { EditOutlined } from "@ant-design/icons";
import toTitleCase from "../utils/toTitleCase";

const breadcrumbItems = [
  { key: "dashboard", title: <span className="text-white">Dashboard</span> },
  { key: "profile", title: <span className="text-white">Profile</span> },
];

const ViewProfile = ({ userData }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function getUser() {
    try {
      setLoading(true);
      const res = await api.get(USER_URLS.GET_USER);
      if (res.status == 200) {
        console.log("USER DATA", res.data.data);
        setError("");
        setUser(res.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.log("ViewProfile -> getUser -> error ", error);
      setError(error.message || "Cannot fetch user Info");
    }
  }

  const handleAvatarUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      
      const response = await api.post(USER_URLS.UPDATE_AVATAR, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      if (response.status === 200) {
        await getUser();
      }
    } catch (error) {
      console.error('Avatar upload failed:', error);
      setError(error.response?.data?.message || 'Failed to update avatar');
    }
  };

  useEffect(() => {
    getUser();
    return () => {
      setUser(null);
    };
  }, []);

  return (
    <div className="bg-[transparent]">
      <div>
        <Breadcrumb
          items={breadcrumbItems}
          separator={<span className="text-white">/</span>}
        />
      </div>

      {loading ? (
        <div className="flex justify-center mt-8">
          <Spin size="large" />
        </div>
      ) : error ? (
        <ErrorComponent error={error} />
      ) : (
        <div className="p-[1rem] mt-[1rem] bg-[#1f1f1f] border border-stone-700">
          <Descriptions
            title={<h1 className="text-white text-xl">User Info</h1>}
          >
            <Descriptions.Item span={3}>
              <Badge
                style={{ margin: "2rem 0" }}
                count={<EditOutlined style={{ color: "white" }} />}
              >
                <Avatar
                  style={{ width: "140px", height: "140px" }}
                  src={user?.avatarUrl}
                  onClick={(event) => {
                    console.log("Edit Profile Clicked");
                    console.log("EVENT TARGET : ", event.target);
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = "image/*";
                    input.onchange = (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        handleAvatarUpload(file);
                      }
                      input.remove();
                    };
                    input.click();
                  }}
                />
              </Badge>
            </Descriptions.Item>
            <Descriptions.Item
              label={<span className="text-white">First Name :</span>}
            >
              <span className="text-white">{toTitleCase(user?.firstName)}</span>
            </Descriptions.Item>
            <Descriptions.Item
              label={<span className="text-white">Last Name :</span>}
            >
              <span className="text-white">{toTitleCase(user?.lastName)}</span>
            </Descriptions.Item>
            <Descriptions.Item
              label={<span className="text-white">Username :</span>}
            >
              <span className="text-white">{user?.username}</span>
            </Descriptions.Item>
            <Descriptions.Item
              label={<span className="text-white">Email :</span>}
            >
              <span className="text-white">{user?.email}</span>
            </Descriptions.Item>
          </Descriptions>
        </div>
        // <div className="p-[1rem] mt-[1rem] border border-stone-700">
        //   <Descriptions
        //     title={<h1 className="text-white text-xl">User Info</h1>}
        //   >
        //     {/* ... rest of the user data display remains the same */}
        //   </Descriptions>
        // </div>
      )}
    </div>
  );
};

export default ViewProfile;
