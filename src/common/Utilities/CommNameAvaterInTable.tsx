import { Space, Typography } from 'antd';
import Avatar from '../Antd/Avatar';

const { Text } = Typography;

interface CommNameAvatarInTableProps {
  avatarKey?: string; // which field contains avatar URL
  nameKey?: string; // which field contains name
}

const CommNameAvatarInTable =
  ({ avatarKey = 'photo', nameKey = 'name' }: CommNameAvatarInTableProps) =>
  (_: any, record: any) => {
    return (
      <Space style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Avatar url={record[avatarKey]} />
        <Text>{record[nameKey]}</Text>
      </Space>
    );
  };

export default CommNameAvatarInTable;
