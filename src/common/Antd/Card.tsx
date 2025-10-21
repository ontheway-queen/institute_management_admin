import { Card as AntdCard, CardProps } from 'antd';
import Title from 'antd/es/typography/Title';

type IProps = CardProps & {
  heightFull?: boolean;
  customTitle?: string;
  titleUnderline?: boolean;
};
const Card = (props: IProps) => {
  return (
    <AntdCard
      size='small'
      style={{ height: props.heightFull ? '100%' : '' }}
      {...props}
    >
      {props.customTitle && (
        <Title
          level={5}
          style={{
            margin: '0px 0px 20px 0px',
            ...(props?.titleUnderline && {
              textDecoration: 'underline',
              textDecorationThickness: '2px',
              textUnderlineOffset: '4px',
              textDecorationColor: '#554545',
            }),
          }}
        >
          {props?.customTitle}
        </Title>
      )}

      {props?.children}
    </AntdCard>
  );
};

export default Card;
