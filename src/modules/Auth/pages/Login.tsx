import React from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Form,
  Input,
  Button,
  Checkbox,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useLoginMutation } from "../api/authEndpoint";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch } from "../../../app/store";
import { setAuth, setMessage } from "../../../app/slice/authSlice";
import { sanitizeFormValue } from "react-form-sanitization";
import { AuthError, LoginTypes } from "../types/authTypes";
import "./Login.css";
import image1 from "../../../assets/school1.jpg";
import image2 from "../../../assets/school2.jpg";
import image3 from "../../../assets/school1.jpg";
import { logo } from "../../../utilities/images";
const { Title } = Typography;

const images = [image1, image2, image3];

const Login: React.FC = () => {
  const [login, { isLoading }] = useLoginMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onFinish = async (values: LoginTypes) => {
    try {
      const data = sanitizeFormValue(values, { ignoreKeys: ["remember"] });
      const { success, token, data: loginData } = await login(data).unwrap();
      if (success && token && !loginData?.is_2fa_on) {
        navigate("/");
        dispatch(setAuth({ token: token, success}));
      } else if (loginData?.is_2fa_on && loginData?.email) {
        navigate(`/auth/match-otp?email=${loginData.email}&type=verify_admin`);
      }
    } catch (error) {
      const { status, data } = error as AuthError;
      if (status === "FETCH_ERROR") {
        dispatch(
          setMessage(
            "Our servers are temporarily unavailable. Please try again later."
          )
        );
      } else {
        dispatch(setMessage(data.message));
      }
    }
  };

  return (
    <div className="login-wrapper">
      <Row className="login-row" justify="center">
        {/* Left side - form */}
        <Col xs={24} md={12} className="login-left">
          <Card size="small" bordered={false} className="login-card">
            <div className="login-logo-container">
              <img src={logo} alt="Logo" className="login-logo-img" />
              <Title level={3} className="logo-title">
                Institute Management
              </Title>
            </div>

            <Form
              form={form}
              name="admin-login"
              onFinish={onFinish}
              layout="vertical"
              size="large"
            >
              <Form.Item
                name="login_id_or_email"
                label="UserId or Email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email or userId!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Email or Username"
                  className="custom-input"
                />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Enter your password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  className="custom-input"
                />
              </Form.Item>
              <Form.Item>
                <Checkbox name="remember">Remember me</Checkbox>
                <Link className="forgot-link" to="/auth/send-otp">
                  Forgot password?
                </Link>
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={isLoading}
              >
                Sign In
              </Button>
            </Form>
          </Card>
        </Col>

        {/* Right side - image slider */}
        <Col xs={24} md={12} className="login-right">
          <div className="image-slider">
            {images?.map((img, index) => (
              <div className="slide" key={index}>
                <img src={img} alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
