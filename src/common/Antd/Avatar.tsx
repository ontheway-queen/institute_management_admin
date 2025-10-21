import { Avatar as AntdAvatar, AvatarProps } from 'antd';
import { imgUrl } from '../../app/utilities/baseQuery';
import { no_image } from '../../utilities/images';

type IProps = {
  url: string | undefined | null;
} & AvatarProps;

const Avatar = ({ url, ...rest }: IProps) => {
  return <AntdAvatar src={url ? imgUrl + url : no_image} {...rest} />;
};

export default Avatar;
