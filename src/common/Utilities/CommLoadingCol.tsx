import { Col, ColProps, Skeleton, SkeletonProps } from 'antd';
import React from 'react';

type ILoadingProps = {
  loading: boolean;
  skeletonProps?: SkeletonProps;
  children: React.ReactNode;
} & ColProps;
const CommLoadingCol = ({
  loading,
  skeletonProps,
  children,
  ...colProps
}: ILoadingProps) => {
  return (
    <Col {...colProps}>
      {loading ? <Skeleton active {...skeletonProps} /> : children}
    </Col>
  );
};

export default CommLoadingCol;
