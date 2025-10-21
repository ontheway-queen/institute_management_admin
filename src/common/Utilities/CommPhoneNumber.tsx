import { Col, Form } from 'antd';
import type { ColProps, FormItemProps } from 'antd';
import PhoneInput from 'react-phone-input-2';

type CommPhoneNumberProps = { colProps?: ColProps } & Partial<FormItemProps>;

const CommPhoneNumber: React.FC<CommPhoneNumberProps> = ({
  colProps,
  ...formItemProps
}) => {
  return (
    <Col xs={24} md={12} {...colProps}>
      <Form.Item
        labelCol={{ style: { marginBottom: 0, paddingBottom: 0 } }}
        rules={[
          {
            validator: (_: any, value: string) => {
              if (!value) {
                return Promise.reject(
                  new Error('Please enter a valid phone number!')
                );
              }
              return Promise.resolve();
            },
          },
        ]}
        // 🔑 Tell AntD how to read/write value from PhoneInput
        valuePropName='value'
        getValueFromEvent={(...args) => args[0]} // PhoneInput passes phone as first arg
        {...formItemProps}
      >
        <PhoneInput
          enableSearch
          country='bd'
          inputStyle={{ width: '100%', height: '26px', borderRadius: 5 }}
        />
      </Form.Item>
    </Col>
  );
};

export default CommPhoneNumber;
