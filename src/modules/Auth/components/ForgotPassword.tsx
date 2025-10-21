import {
  Form,
  Card,
  Typography,
  Space,
  Divider,
  Button,
  Input,
  Row,
  Col,
} from "antd";
import {
  MailOutlined,
  SendOutlined,
  ArrowLeftOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import type React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForgotPasswordMutation } from "../api/authEndpoint";

const { Title, Text, Paragraph } = Typography;

interface ForgotPasswordTypes {
  password: string;
}

const ForgotPassword: React.FC = () => {
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();
  const onFinish = async (values: ForgotPasswordTypes) => {
    try {
      const { success } = await forgotPassword({
        email: email as string,
        token: token as string,
        password: values?.password,
      }).unwrap();
      if (email && success && token) {
        // dispatch(setAuth({ token: token as string, success: success }));
        navigate("/auth/login");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <Col xs={22} sm={15} md={10} lg={8}>
        <div
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "20px",
          }}
        >
          <Card
            style={{
              borderRadius: "16px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              border: "none",
            }}
          >
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "55px",
                    height: "55px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                    boxShadow: "0 8px 20px rgba(102, 126, 234, 0.3)",
                  }}
                >
                  <MailOutlined style={{ fontSize: "24px", color: "white" }} />
                </div>

                <Title
                  level={3}
                  style={{ margin: "0 0 8px 0", color: "#1f2937" }}
                >
                  Reset Your Password
                </Title>

                <Paragraph
                  style={{
                    color: "#6b7280",
                    fontSize: "14px",
                    margin: "0 0 16px 0",
                    lineHeight: "1.5",
                  }}
                >
                  Enter your new password. It will be used for login next time.
                </Paragraph>
              </div>

              <Divider style={{ margin: "0px 0" }} />

              {/* Form Section */}
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                requiredMark={false}
              >
                <Form.Item
                  name="password"
                  label={
                    <Text strong style={{ fontSize: "14px", color: "#374151" }}>
                      Password
                    </Text>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },

                    {
                      min: 8,
                      message: "Minimum 8 character",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="input-icon" />}
                    placeholder="Enter your password"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    className="custom-input-forgot"
                  />
                </Form.Item>

                <Form.Item style={{ marginBottom: "16px" }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                    icon={<SendOutlined />}
                    block
                    style={{
                      height: "40px",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "600",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
                    }}
                  >
                    {isLoading ? "Sending OTP..." : "Send Verification Code"}
                  </Button>
                </Form.Item>
              </Form>

              {/* Footer Section */}
              <div style={{ textAlign: "center" }}>
                <Link to={"/auth/login"}>
                  <Button
                    type="link"
                    icon={<ArrowLeftOutlined />}
                    style={{
                      color: "#6b7280",
                      fontSize: "13px",
                      padding: "0",
                      height: "auto",
                    }}
                  >
                    Back to Sign In
                  </Button>
                </Link>
              </div>
            </Space>
          </Card>
        </div>
      </Col>
    </Row>
  );
};

export default ForgotPassword;
