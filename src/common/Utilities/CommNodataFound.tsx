import { Button, Typography } from 'antd';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import './CommNodataFound.css';

const { Text, Title } = Typography;

const CommNodataFound = () => {
  const navigate = useNavigate();

  return (
    <div className='comm-nodata-card'>
      <div className='comm-nodata-content'>
        {/* Animated Icon */}
        <Icon icon='mdi:database-off-outline' className='comm-nodata-icon' />

        {/* Title */}
        <Title level={3} className='comm-nodata-title'>
          No Data Found
        </Title>

        {/* Description */}
        <Text className='comm-nodata-text'>
          We couldn’t find any records to display here. Try adjusting your
          filters or come back later.
        </Text>

        {/* Back Button */}
        <Button
          type='primary'
          icon={<Icon icon='mdi:arrow-left' />}
          className='comm-nodata-button'
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default CommNodataFound;
