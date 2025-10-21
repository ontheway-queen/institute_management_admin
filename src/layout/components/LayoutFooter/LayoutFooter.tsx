import { Card, Col, Row, Typography } from 'antd';
import React from 'react';

const LayoutFooter: React.FC = () => {
  const year: number = new Date().getFullYear();

  return (
    <>
      <Card>
        <Row justify={{ xs: 'center', md: 'space-between' }}>
          <Col></Col>
          <Col>
            {' '}
            <Typography.Paragraph style={{ margin: 0 }}>
              Copyright © {year} <strong> Institute Management </strong>by
              M360ICT. All rights reserved.
            </Typography.Paragraph>
          </Col>
          <Col>
            {' '}
            <Typography.Link type='secondary'>Support</Typography.Link>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default LayoutFooter;
