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
} from 'antd';
import {
  MailOutlined,
  SendOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import type React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSendOTPMutation } from '../api/authEndpoint';

const { Title, Text, Paragraph } = Typography;

interface ForgotPasswordTypes {
  email: string;
}

const SendOTP: React.FC = () => {
  const [form] = Form.useForm();
  const [sendOTP, { isLoading }] = useSendOTPMutation();
  const navigate = useNavigate();
  const onFinish = async (values: ForgotPasswordTypes) => {
    try {
      const { data, success } = await sendOTP({
        email: values.email,
        type: 'reset_admin',
      }).unwrap();
      if (data?.email && success) {
        navigate(`/auth/match-otp?email=${data?.email}&type=reset_admin`);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  return (
    <Row justify={'center'} align={'middle'} style={{ height: '100vh' }}>
      <Col xs={22} sm={15} md={10} lg={8}>
        <div
          style={{
            background:
              'linear-gradient(135deg, rgba(31, 45, 56, 1), rgba(68, 85, 94, 0.8))',
            padding: '20px',
          }}
        >
          <Card
            style={{
              borderRadius: '16px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              border: 'none',
            }}
          >
            <Space direction='vertical' size='middle' style={{ width: '100%' }}>
              {/* Header Section */}
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '55px',
                    height: '55px',
                    borderRadius: '50%',
                    background:
                      'linear-gradient(135deg, rgba(31, 45, 56, 1), rgba(68, 85, 94, 0.8))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)',
                  }}
                >
                  <MailOutlined style={{ fontSize: '24px', color: 'white' }} />
                </div>

                <Title
                  level={3}
                  style={{ margin: '0 0 8px 0', color: '#1f2937' }}
                >
                  Verify Your Email
                </Title>

                <Paragraph
                  style={{
                    color: '#6b7280',
                    fontSize: '14px',
                    margin: '0 0 16px 0',
                    lineHeight: '1.5',
                  }}
                >
                  Enter your email address and we'll send you a verification
                  code.
                </Paragraph>
              </div>

              <Divider style={{ margin: '0px 0' }} />

              {/* Form Section */}
              <Form
                form={form}
                layout='vertical'
                onFinish={onFinish}
                size='middle'
                requiredMark={false}
              >
                <Form.Item
                  name='email'
                  label={
                    <Text strong style={{ fontSize: '14px', color: '#374151' }}>
                      Email Address
                    </Text>
                  }
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your email address',
                    },
                    {
                      type: 'email',
                      message: 'Please enter a valid email address',
                    },
                  ]}
                  style={{ marginBottom: '20px' }}
                >
                  <Input
                    prefix={<MailOutlined style={{ color: '#9ca3af' }} />}
                    placeholder='Enter your email address'
                    style={{
                      height: '40px',
                      borderRadius: '8px',
                      fontSize: '14px',
                    }}
                  />
                </Form.Item>

                <Form.Item style={{ marginBottom: '16px' }}>
                  <Button
                    type='primary'
                    htmlType='submit'
                    loading={isLoading}
                    icon={<SendOutlined />}
                    block
                    style={{
                      height: '40px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      background:
                        'linear-gradient(135deg, rgba(31, 45, 56, 1), rgba(68, 85, 94, 0.8))',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                    }}
                  >
                    {isLoading ? 'Sending OTP...' : 'Send Verification Code'}
                  </Button>
                </Form.Item>
              </Form>

              {/* Footer Section */}
              <div style={{ textAlign: 'center' }}>
                <Link to={'/auth/login'}>
                  <Button
                    type='link'
                    icon={<ArrowLeftOutlined />}
                    style={{
                      color: '#6b7280',
                      fontSize: '13px',
                      padding: '0',
                      height: 'auto',
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

export default SendOTP;
