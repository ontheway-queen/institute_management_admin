import { Avatar, Flex, Typography } from 'antd';
import React from 'react';
import { logo } from '../../../utilities/images';

interface Props {
  collapsed: boolean;
}
const TopSection: React.FC<Props> = ({ collapsed }) => {
  return (
    <div style={{ padding: '4px 5px' }}>
      <Flex
        align='center'
        justify={collapsed ? 'center' : 'flex-start'}
        gap={5}
      >
        <div
          style={{
            width: 50,
            height: 50,
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <Avatar src={logo} size={collapsed ? 30 : 45} />
        </div>
        {!collapsed && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography.Text
              style={{ lineHeight: 1, color: 'white', fontSize: '20px' }}
            >
              Institute Management
            </Typography.Text>
          </div>
        )}
      </Flex>
    </div>
  );
};

export default TopSection;
