import { Col, Form, FormInstance, Row } from 'antd';
import {
  FormItemInput,
  FormItemPassword,
  FormItemRadioGroup,
} from '../../../common/Antd/Form/FormItems';
import Upload from '../../../common/Antd/Upload';
import FormSubmit from '../../../common/Antd/Form/FormSubmit';

type AdminUserFormProps<T> = {
  loading?: boolean;
  onFinish?: (values: T) => void;
  onValuesChange?: (values: T) => void;
  form?: FormInstance<T>;
  defaultImageLink?: string;
  editMode?: boolean;
};

const AdminUserForm = <T extends Record<string, any>>({
  loading,
  onFinish,
  onValuesChange,
  form,
  defaultImageLink,
  editMode,
}: AdminUserFormProps<T>) => {
  return (
    <Form
      layout='vertical'
      onFinish={onFinish}
      form={form}
      onValuesChange={(e) => {
        onValuesChange?.(e);
      }}
      autoComplete='off'
    >
      <Row gutter={[10, 0]}>
        <FormItemInput name={'name'} label='Admin Name' colProps={{ lg: 12 }} />
        <FormItemInput
          name={'email'}
          label='Email'
          colProps={{ lg: 12 }}
          componentProps={{ type: 'email' }}
        />
        <FormItemInput
          name={'phone_number'}
          label='Phone Number'
          colProps={{ lg: 12 }}
          componentProps={{ type: 'number' }}
        />

        <Col lg={12}>
          <Form.Item
            label={[]}
            name={'photo'}
            style={{ marginBottom: 5 }}
            labelCol={{ style: { marginBottom: 0, paddingBottom: 0 } }}
          >
            <Upload
              listType='picture'
              defaultImageLink={defaultImageLink}
              editMode={editMode}
            />
          </Form.Item>
        </Col>

        {editMode && (
          <FormItemRadioGroup
            name={'status'}
            label='Status'
            colProps={{ lg: 12 }}
            componentProps={{
              options: [
                {
                  label: 'Active',
                  value: true,
                },
                {
                  label: 'InActive',
                  value: false,
                },
              ],
            }}
          />
        )}
        {editMode && (
          <FormItemRadioGroup
            name={'is_2fa_on'}
            label='Two-Factor Authentication'
            colProps={{ lg: 12 }}
            componentProps={{
              options: [
                {
                  label: 'ON',
                  value: true,
                },
                {
                  label: 'OFF',
                  value: false,
                },
              ],
            }}
          />
        )}

        {!editMode && (
          <FormItemPassword
            name={'password'}
            label='Password'
            colProps={{ lg: 12 }}
          />
        )}

        <FormSubmit name='Submit' loading={loading} />
      </Row>
    </Form>
  );
};

export default AdminUserForm;
