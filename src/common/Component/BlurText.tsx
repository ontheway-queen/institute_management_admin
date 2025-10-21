import React, { useState } from 'react';
import { Tooltip, Typography } from 'antd';
const { Text } = Typography;
type BlurTextProps = {
  text: string | number | null | undefined;
  blur?: boolean; // default true
};

const BlurText: React.FC<BlurTextProps> = ({ text, blur = true }) => {
  const [visible, setVisible] = useState(false);

  if (!text) return <span>-</span>;

  return (
    <Tooltip title='Click to reveal'>
      <span
        onClick={() => setVisible(!visible)}
        style={{
          cursor: 'pointer',
          filter: visible || !blur ? 'none' : 'blur(5px)',
          userSelect: 'none',
          transition: 'filter 0.3s ease',
        }}
      >
        {text}
      </span>{' '}
      <Text copyable={{ text: String(text) }} />
    </Tooltip>
  );
};

export default BlurText;
