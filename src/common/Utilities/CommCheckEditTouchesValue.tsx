import { message } from 'antd';

type IProps = {
  handleEditValue?: () => void;
  status: boolean;
};
const CommCheckEditTouchesValue = ({ handleEditValue, status }: IProps) => {
  return status ? handleEditValue?.() : message.warning('Change Field First');
};

export default CommCheckEditTouchesValue;
