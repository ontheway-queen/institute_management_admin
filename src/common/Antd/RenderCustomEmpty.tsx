import { Icon } from '@iconify/react/dist/iconify.js';
import { Empty } from 'antd';

const RenderCustomEmpty = () => {
  return (
    <Empty
      image={
        <div
          style={{
            height: 'auto',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Icon color='#7b7b7b' icon='fluent:drawer-24-regular' fontSize={60} />
          <span
            style={{
              color: '#7b7b7b',
              fontSize: '12px',
            }}
          >
            No Data Available
          </span>
        </div>
      }
      imageStyle={{ height: 'auto', margin: 0 }} // override default height
      description={false}
      style={{ margin: 0 }}
    />
  );
};

export default RenderCustomEmpty;
