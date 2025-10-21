import React from 'react';
import BreadCrumb from '../Antd/BreadCrumb';
import Space from '../Antd/Space';

interface Props {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  children: React.ReactNode;
  loading?: boolean;
}

const SinglePageContainer: React.FC<Props> = ({ children }: Props) => {
  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <>
        {/* <CommonButton
          name='PREVIOUS PAGE'
          type='link'
          danger
          icon='weui:previous-filled'
          onClick={() => navigate(-1)}
        /> */}
        <BreadCrumb />
      </>

      {children}
    </Space>
  );
};

export default SinglePageContainer;
