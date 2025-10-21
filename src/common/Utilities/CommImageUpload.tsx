import { Form } from 'antd';
import Upload from '../Antd/Upload';
import type { FormItemProps } from 'antd';

type CommImageUploadProps = {
  editMode?: boolean;
  defaultImageLink?: string;
} & Partial<FormItemProps>; // extend with optional Form.Item props

const CommImageUpload: React.FC<CommImageUploadProps> = ({
  editMode,
  defaultImageLink,
  ...formItemProps
}) => {
  return (
    <Form.Item
      labelCol={{ style: { marginBottom: 0, paddingBottom: 0 } }}
      {...formItemProps}
    >
      <Upload
        listType='picture'
        editMode={editMode}
        defaultImageLink={defaultImageLink}
      />
    </Form.Item>
  );
};

export default CommImageUpload;
