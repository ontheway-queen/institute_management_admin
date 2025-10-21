import { Form, Card, Typography, Space, Divider, Button, Row, Col } from "antd";
import {
  SendOutlined,
  ArrowLeftOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import type React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FormItemInputOTP } from "../../../common/Antd/Form/FormItems";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMatchOTPMutation, useSendOTPMutation } from "../api/authEndpoint";
import { useAppDispatch } from "../../../app/store";
import { setAuth, setMessage } from "../../../app/slice/authSlice";
import { AuthError, TCommOTPVerifyType } from "../types/authTypes";

const { Title, Text, Paragraph } = Typography;

const MatchOTP: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [sendOTP, { isLoading: sendOTPLoading }] = useSendOTPMutation();
  const [matchOTP, { isLoading }] = useMatchOTPMutation();
  const email = searchParams.get("email");
  const type = searchParams.get("type");
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onFinish = async (values: { otp: string }) => {
    try {
      if (email && values?.otp && type) {
        const { token, success } = await matchOTP({
          email,
          otp: values.otp,
          type: type as TCommOTPVerifyType,
        }).unwrap();

        if (token && success && type === "verify_admin") {
          dispatch(
            setAuth({
              token: token,
              success: success as boolean,
            })
          );
          navigate("/");
        } else {
          navigate(`/auth/forgot-password?email=${email}&token=${token}`);
        }
      }
    } catch (error) {
      const { status, data } = error as AuthError;
      if (status === "FETCH_ERROR") {
        dispatch(
          setMessage(
            "Our servers are temporarily unavailable due to maintenance. Please try again later."
          )
        );
      } else {
        dispatch(setMessage(data?.message));
      }
    }
  };

  return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <Col xs={22} sm={15} md={10} lg={8}>
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(31, 45, 56, 1), rgba(68, 85, 94, 0.8))",
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
                      "linear-gradient(135deg, rgba(31, 45, 56, 1), rgba(68, 85, 94, 0.8))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                    boxShadow: "0 8px 20px rgba(102, 126, 234, 0.3)",
                  }}
                >
                  <Icon
                    icon="arcticons:otp-authenticator"
                    width="48"
                    height="48"
                    color="white"
                  />
                </div>

                <Title
                  level={3}
                  style={{ margin: "0 0 8px 0", color: "#1f2937" }}
                >
                  Match Your OTP
                </Title>

                <Paragraph
                  style={{
                    color: "#6b7280",
                    fontSize: "14px",
                    margin: "0 0 16px 0",
                    lineHeight: "1.5",
                  }}
                >
                  For Two-Factor Authentication verification, an OTP has been
                  sent to your email. <br />{" "}
                  <span style={{ color: "#553131" }}>({email})</span>
                </Paragraph>
              </div>

              <Divider style={{ margin: "0px 0" }} />

              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                size="middle"
                requiredMark={false}
              >
                <FormItemInputOTP
                  name="otp"
                  componentProps={{ style: { width: "100%" } }}
                />

                <Form.Item style={{ marginTop: "16px" }}>
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
                        "linear-gradient(135deg, rgba(31, 45, 56, 1), rgba(68, 85, 94, 0.8))",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
                    }}
                  >
                    {isLoading ? "Verifying OTP..." : "Verify OTP"}
                  </Button>
                </Form.Item>
                <div style={{ textAlign: "center" }}>
                  <Text
                    onClick={() => {
                      if (email) {
                        form.resetFields();
                        sendOTP({
                          email: email,
                          type: "reset_admin",
                        });
                      }
                    }}
                    style={{
                      padding: "5px",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "600",
                      color:
                        "linear-gradient(135deg, rgba(31, 45, 56, 1), rgba(68, 85, 94, 0.8))",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    {sendOTPLoading && (
                      <Icon icon="codex:loader" width="24" height="24" />
                    )}
                    Resend OTP
                  </Text>
                </div>
              </Form>
              <div
                style={{
                  padding: "12px",
                  backgroundColor: "#f0f9ff",
                  borderRadius: "8px",
                  border: "1px solid #bae6fd",
                }}
              >
                <Space align="start" size="small">
                  <InfoCircleOutlined
                    style={{ color: "#0284c7", marginTop: "2px" }}
                  />
                  <div>
                    <Text strong style={{ color: "#0c4a6e", fontSize: "13px" }}>
                      💡 Helpful Tips:
                    </Text>
                    <div style={{ marginTop: "4px" }}>
                      <Text
                        style={{
                          color: "#0c4a6e",
                          fontSize: "12px",
                          display: "block",
                        }}
                      >
                        • Check your spam/junk folder
                      </Text>
                      <Text
                        style={{
                          color: "#0c4a6e",
                          fontSize: "13px",
                          display: "block",
                        }}
                      >
                        • Make sure{" "}
                        <span style={{ fontFamily: "bolder" }}>
                          {email || ""}
                        </span>{" "}
                        is correct
                      </Text>
                      <Text
                        style={{
                          color: "#0c4a6e",
                          fontSize: "12px",
                          display: "block",
                        }}
                      >
                        • The OTP expires within 3 minutes
                      </Text>
                    </div>
                  </div>
                </Space>
              </div>

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

export default MatchOTP;
