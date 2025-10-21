import React from 'react';
import CommNodataFound from './CommNodataFound';
import Card from '../Antd/Card';

type IProps<T> = {
  children: React.ReactElement;
  isData?: T | null;
};

const CommSingleViewPage = <T,>({ children, isData }: IProps<T>) => {
  const hasData =
    isData &&
    (typeof isData !== 'object' || Object.keys(isData as object)?.length > 0);

  if (!hasData) {
    return (
      <Card
        style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CommNodataFound />
      </Card>
    );
  }

  return <>{children}</>;
};

export default CommSingleViewPage;
