import {
  Card,
  Col,
  Row,
  Space,
  Typography,
  Button,
  Badge,
  Flex,
  theme,
} from 'antd';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { ThemeState, toggleTheme } from '../../../app/slice/themeSlice';
import { themePresets } from '../../../app/utilities/theme';
import {
  CheckOutlined,
  BgColorsOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { Icon } from '@iconify/react/dist/iconify.js';
const CustomizeTheme: React.FC = () => {
  const { mode } = useAppSelector(ThemeState);
  const dispatch = useAppDispatch();
  const { Title, Text, Paragraph } = Typography;

  const [selectedTheme, setSelectedTheme] = useState<string>(mode);
  const { token } = theme.useToken();

  const handleThemeSelect = (themeData: { mode: string }) => {
    setSelectedTheme(themeData?.mode);
  };

  const handleReset = () => {
    const defaultTheme = themePresets[0];
    dispatch(toggleTheme({ ...defaultTheme }));
    setSelectedTheme(defaultTheme?.mode);
  };

  return (
    <>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Space direction='vertical' size='large' style={{ width: '100%' }}>
          {/* Header */}
          <Space direction='vertical' size='small'>
            <Flex align='center' gap='small'>
              <BgColorsOutlined
                style={{ fontSize: '24px', color: token.colorPrimary }}
              />
              <Title level={2} style={{ margin: 0 }}>
                Customize Theme
              </Title>
            </Flex>
            <Paragraph type='secondary' style={{ margin: 0, fontSize: '16px' }}>
              Choose a theme that matches your style and preferences. Your
              selection will be applied instantly.
            </Paragraph>
          </Space>

          {/* Theme Grid */}
          <Row gutter={[16, 16]}>
            {themePresets?.map((themeData, index) => {
              const isSelected = themeData.mode === selectedTheme;

              return (
                <Col
                  key={index}
                  xs={24}
                  sm={12}
                  lg={8}
                  onClick={() => {
                    dispatch(toggleTheme({ ...themeData }));
                    handleThemeSelect(themeData);
                  }}
                >
                  <Card
                    hoverable
                    onClick={() => handleThemeSelect(themeData)}
                    style={{
                      position: 'relative',
                      border: isSelected
                        ? `2px solid ${token.colorPrimary}`
                        : '1px solid #d9d9d9',
                      boxShadow: isSelected
                        ? `0 0 0 2px ${token.colorPrimary}20`
                        : undefined,
                      transition: 'all 0.2s ease-in-out',
                    }}
                    styles={{
                      body: {
                        padding: '16px',
                      },
                    }}
                  >
                    {/* Selection indicator */}
                    {isSelected && (
                      <Badge
                        count={<CheckOutlined style={{ color: 'white' }} />}
                        style={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          zIndex: 10,
                          backgroundColor: token.colorPrimary,
                        }}
                      />
                    )}

                    <Space
                      direction='vertical'
                      size='middle'
                      style={{ width: '100%' }}
                    >
                      {/* Theme preview */}

                      <div
                        style={{
                          position: 'relative',
                          height: '80px',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          backgroundColor: '',
                          background:
                            themeData.mode == 'dark'
                              ? 'rgb(14 13 13)'
                              : '#f3f3f3',
                        }}
                      >
                        {/* Sidebar preview */}
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '30%',
                            height: '100%',
                            backgroundColor:
                              themeData.mode == 'dark' ? '#232323' : 'white',
                          }}
                        />

                        {/* Primary color dot */}
                        <div
                          style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            backgroundColor: token.colorPrimary,
                          }}
                        />

                        {/* Text lines simulation */}
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '8px',
                            left: '8px',
                            width: '32px',
                            height: '4px',
                            borderRadius: '2px',
                            backgroundColor: token.colorPrimary,
                            opacity: 0.5,
                          }}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '8px',
                            left: '8px',
                            width: '20px',
                            height: '4px',
                            borderRadius: '2px',
                            backgroundColor: token.colorPrimary,
                          }}
                        />
                      </div>

                      {/* Theme info */}
                      <Space direction='vertical' size='small'>
                        <Flex align='center' gap='small'>
                          {themeData.mode === 'dark' ? (
                            <Icon
                              icon='iconamoon:mode-dark-bold'
                              width='24'
                              height='24'
                            />
                          ) : (
                            <Icon
                              icon='iconamoon:mode-light'
                              width='24'
                              height='24'
                            />
                          )}

                          <Text strong>{themeData.name}</Text>
                        </Flex>
                        <Text type='secondary' style={{ fontSize: '12px' }}>
                          {themeData.name}
                        </Text>
                      </Space>
                    </Space>
                  </Card>
                </Col>
              );
            })}
          </Row>

          {/* Current selection info */}
          <Card
            style={{
              backgroundColor: token.colorFillAlter,
              border: `1px solid ${token.colorBorder}`,
            }}
            styles={{ body: { padding: '16px' } }}
          >
            <Flex justify='space-between' align='center'>
              <Flex align='center' gap='middle'>
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: themePresets.find(
                      (t) => t.name === selectedTheme
                    )?.colorPrimary,
                    border: `2px solid ${token.colorBgContainer}`,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  }}
                />
                <Space direction='vertical' size={0}>
                  <Text strong style={{ fontSize: '14px' }}>
                    Current theme
                  </Text>
                  <Text type='secondary' style={{ fontSize: '12px' }}>
                    {selectedTheme}
                  </Text>
                </Space>
              </Flex>
              <Button
                icon={<ReloadOutlined />}
                onClick={handleReset}
                type='default'
              >
                Reset to Default
              </Button>
            </Flex>
          </Card>
        </Space>
      </div>
    </>
  );
};

export default CustomizeTheme;
