import { Space as AndSpace, SpaceProps } from 'antd';

type IProps = SpaceProps;
const Space = (props: IProps) => {
  return (
    <AndSpace
      direction='vertical'
      size={'middle'}
      style={{ width: '100%' }}
      {...props}
    />
  );
};

export default Space;
