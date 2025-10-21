import { Form, Input, Row, Col } from 'antd';
import {
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from '@ant-design/icons';
import type React from 'react';
import { useChangePasswordMutation } from '../api/authEndpoint';
import FormSubmit from '../../../common/Antd/Form/FormSubmit';
import { setFormInstance } from '../../../app/utilities/formManager';

interface ChangePasswordTypes {
  old_password: string;
  new_password: string;
}

const ChangePassword: React.FC = () => {
  const [form] = Form.useForm();

  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const onFinish = async (values: ChangePasswordTypes) => {
    setFormInstance(form);
    changePassword(values);
  };

  return (
    <Row>
      <Form
        form={form}
        layout='vertical'
        onFinish={onFinish}
        requiredMark={false}
      >
        <Row style={{ width: '500px' }}>
          <Col xs={24}>
            <Form.Item
              name='old_password'
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },

                {
                  min: 8,
                  message: 'Minimum 8 character',
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className='input-icon' />}
                placeholder='Enter your old password'
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                className='custom-input-forgot'
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              name='new_password'
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },

                {
                  min: 8,
                  message: 'Minimum 8 character',
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className='input-icon' />}
                placeholder='Enter your new password'
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                className='custom-input-forgot'
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item style={{ marginBottom: '16px' }}>
          <FormSubmit name='Submit' block loading={isLoading} />
        </Form.Item>
      </Form>
    </Row>
  );
};

export default ChangePassword;
