import React from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider, FloatButton, App as AntdContainer, theme } from 'antd';
import NotificationConfig from './config/NotificationConfig';
import ModalConfig from './config/ModalConfig';
import DrawerConfig from './config/DrawerConfig';
import { useAppSelector } from './app/store';
import { ThemeState } from './app/slice/themeSlice';
import useBreakpoint from './hooks/useBreakpoint';
import router from './router/router';
import RenderCustomEmpty from './common/Antd/RenderCustomEmpty';

const App: React.FC = () => {
  const {
    mode,
    colorPrimary,
    fontFamily,
    fontSize,
    siderBg,
    headerBg,
    subMenuItemBg,
  } = useAppSelector(ThemeState);
  const isLight: boolean = mode === 'light' ? true : false;
  const { xs } = useBreakpoint();

  const getAlgorithm = () => {
    if (xs) {
      return [
        isLight ? theme.defaultAlgorithm : theme.darkAlgorithm,
        theme.compactAlgorithm,
      ];
    }
    return isLight ? theme.defaultAlgorithm : theme.darkAlgorithm;
  };

  return (
    <ConfigProvider
      renderEmpty={RenderCustomEmpty}
      theme={{
        algorithm: getAlgorithm(),
        token: {
          colorPrimary,
          fontFamily,
          fontSize,
          // borderRadius: 5,
        },

        components: {
          Select: {
            controlItemBgActive: '#e9e9e9',
          },
          Layout: {
            siderBg: siderBg,
            headerBg,
            algorithm: true,
          },
          Menu: {
            // Background colors
            itemBg: siderBg, // Main sidebar background
            subMenuItemBg: subMenuItemBg, // Slightly lighter for nested menus
            // Hover / Active states
            itemHoverBg: 'rgba(255, 255, 255, 0.08)', // Soft white overlay on hover
            itemActiveBg: siderBg, // More visible active state
            colorPrimary: '#fff',
            itemSelectedBg: 'rgba(255, 255, 255, 0.18)', // Selected background
            itemSelectedColor: '#fff', // Selected text stays white
            // Text colors
            colorText: 'rgba(255, 255, 255, 0.85)', // Normal text
            colorTextDisabled: 'rgba(255, 255, 255, 0.35)',
            // Icon colors
            iconSize: 16,
            colorIcon: 'rgba(255, 255, 255, 0.65)',
            colorIconHover: '#ffffff',
            // Dividers / Borders
            groupTitleColor: 'rgba(255, 255, 255, 0.45)',
            borderRadiusLG: 8, // Rounded corners for pop-out menus
            // Padding & spacing
            itemMarginInline: 0,
            itemHeight: 42,
            itemPaddingInline: 20,
            // Special effects
            collapsedWidth: 80,
            itemHoverColor: '#ffffff',
          },
          Tag: {
            colorText: 'rgb(22 101 52)',
            colorBgContainer: 'rgb(220 252 231)',
            colorPrimaryBorder: 'green',
            colorBorder: '#00000000',
            borderRadius: 30,
          },
          Table: {
            // headerBg: 'rgb(66 128 239 / 0.05)',
            headerBg: 'rgba(31, 45, 56, 0.1)',
            // algorithm: true,
            // headerColor: hexToRgba(colorPrimary, 1),
          },

          Steps: {
            algorithm: true,
            colorPrimary: '#1797d3', // active step color
          },
        },
      }}
    >
      <>
        <AntdContainer>
          <RouterProvider router={router} />
          <NotificationConfig />
          <ModalConfig />
          <DrawerConfig />
          <FloatButton.BackTop />
        </AntdContainer>
      </>
    </ConfigProvider>
  );
};

export default App;
