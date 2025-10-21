import { Drawer, Layout } from 'antd';
import React, { useEffect } from 'react';
import { useAppSelector } from '../../../app/store';
import useBreakpoint from '../../../hooks/useBreakpoint';
import { ThemeState } from '../../../app/slice/themeSlice';
import LayoutMenu from '../LayoutMenu/LayoutMenu';
import { Icon } from '@iconify/react/dist/iconify.js';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  siderWidth: number;
  collapsed: boolean;
}

const LayoutDrawer: React.FC<Props> = ({
  open,
  setOpen,
  siderWidth,
  collapsed,
}) => {
  const { lg } = useBreakpoint();
  const { siderBg } = useAppSelector(ThemeState);

  useEffect(() => {
    if (lg) setOpen(false);
  }, [lg, setOpen]);

  return (
    <Drawer
      placement='left'
      onClose={() => setOpen(false)}
      open={open}
      footer={null}
      width={siderWidth}
      closeIcon={
        <span>
          <Icon icon='mdi:close-circle-multiple' color='white' fontSize={20} />
        </span>
      }
      styles={{
        content: { background: siderBg },
        body: {
          padding: 0,
          // border: '1px solid white',
        },
      }}
    >
      <Layout.Sider width={'100%'} collapsed={false}>
        <LayoutMenu collapsed={collapsed} />
      </Layout.Sider>
    </Drawer>
  );
};

export default LayoutDrawer;
