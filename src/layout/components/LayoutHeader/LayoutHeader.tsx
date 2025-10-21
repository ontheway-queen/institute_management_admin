import {
  Avatar,
  Button,
  Dropdown,
  Flex,
  Layout,
  Space,
  Typography,
} from "antd";
import React from "react";
import Iconify from "../../../config/IconifyConfig";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { clearAuth } from "../../../app/slice/authSlice";
import api from "../../../app/api/api";
import { imgUrl } from "../../../app/utilities/baseQuery";
import { ThemeState } from "../../../app/slice/themeSlice";

interface Props {
  xs?: boolean;
  collapsed: boolean;
  handleCollapsed: () => void;
  handleOpen: () => void;
}
const LayoutHeader: React.FC<Props> = ({
  xs,
  collapsed,
  handleCollapsed,
  handleOpen,
}) => {
  const { mode } = useAppSelector(ThemeState);
  const isLight: boolean = mode === "light" ? true : false;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearAuth());
    localStorage.clear();
    dispatch(api.util.resetApiState());
    localStorage.clear();
    navigate("/auth/login");
  };

  return (
    <Layout.Header
      style={{
        padding: "0 1rem",
        lineHeight: 0,
        maxHeight: "100%",
        display: "flex",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 3,
        border: !isLight ? "1px solid #353232" : "",
      }}
    >
      <Flex align="center" justify="space-between" style={{ width: "100%" }}>
        <Space>
          {xs ? (
            <Button
              onClick={handleOpen}
              icon={<Iconify icon="heroicons-outline:menu-alt-1" />}
              type="default"
            />
          ) : (
            <Button
              onClick={handleCollapsed}
              icon={
                <Iconify
                  icon={
                    collapsed
                      ? "line-md:menu-unfold-right"
                      : "line-md:menu-fold-left"
                  }
                />
              }
              type="default"
            />
          )}

          <div>
            <Typography.Text
              style={{
                display: "block",
                lineHeight: 1,
                fontWeight: 600,
                fontSize: xs ? "12px" : "16px",
              }}
            >
              Hello, 
              {/* {data?.data?.name} */}
            </Typography.Text>
          </div>
        </Space>

        <Flex align="center" gap={20}>
          {/* <Notification /> */}

          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: <Link to="/settings">Profile</Link>,
                  icon: <Iconify icon="ic:round-settings" />,
                },
                {
                  key: "3",
                  label: "Logout",
                  icon: <Iconify icon="ant-design:logout-outlined" />,
                  danger: true,
                  onClick: handleLogout,
                },
              ],
            }}
            trigger={["click"]}
            arrow
          >
            <Avatar
              shape="circle"
              style={{ cursor: "pointer" }}
              // src={`${imgUrl}${data?.data?.photo}`}
            />
          </Dropdown>
        </Flex>
      </Flex>
    </Layout.Header>
  );
};

export default LayoutHeader;
