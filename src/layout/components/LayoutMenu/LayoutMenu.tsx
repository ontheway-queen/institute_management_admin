import { Menu, MenuProps } from 'antd';
import TopSection from './TopSection';
import { useLocation } from 'react-router-dom';
import { getOpenKeys } from '../../utilities/helper';
import { navigationMenu, renderMenuItem } from '../../utilities/navigationMenu';
import BottomSection from './BottomSection';
import { useEffect, useState } from 'react';

interface Props {
  collapsed: boolean;
}

const getAllMenuKeys = (items: any[]): string[] => {
  let keys: string[] = [];

  items?.forEach((item) => {
    if (item.key) keys.push(item.key);
    if (item.children) {
      keys = keys.concat(getAllMenuKeys(item.children));
    }
  });

  return keys;
};

const normalizeSelectedKey = (path: string, menuItems: any[]) => {
  const allKeys = getAllMenuKeys(menuItems);
  const matchedKey = allKeys
    .filter((key) => path.startsWith(key))
    .sort((a, b) => b.length - a.length)[0];
  return matchedKey || path;
};

const LayoutMenu: React.FC<Props> = ({ collapsed }) => {
  const location = useLocation();
  const defaultOpenKeys = getOpenKeys(navigationMenu, location.pathname);
  const [stateOpenKeys, setStateOpenKeys] = useState([location.pathname]);

  const getLevelKeys = (items1: any[]) => {
    const key: Record<string, number> = {};
    const func = (items2: any[], level = 1) => {
      items2.forEach((item) => {
        if (item.key) {
          key[item.key] = level;
        }
        if (item.children) {
          func(item.children, level + 1);
        }
      });
    };
    func(items1);
    return key;
  };

  const levelKeys = getLevelKeys(navigationMenu?.map(renderMenuItem));

  const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );

    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      setStateOpenKeys(openKeys);
    }
  };

  useEffect(() => {
    const basePath = '/' + location.pathname.split('/')[1];
    setStateOpenKeys([basePath]);
  }, [location.pathname]);

  return (
    <section
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <div
          style={{ borderBottom: '1px solid rgb(98 98 107)', marginTop: '5px' }}
        >
          <TopSection collapsed={collapsed} />
        </div>

        <Menu
          mode='inline'
          items={navigationMenu?.map(renderMenuItem)}
          selectedKeys={[
            normalizeSelectedKey(location?.pathname, navigationMenu),
          ]}
          defaultOpenKeys={defaultOpenKeys}
          openKeys={stateOpenKeys}
          onOpenChange={onOpenChange}
          onSelect={(e) => {
            if (e.key === '/') {
              setStateOpenKeys([]);
            }
          }}
          style={{ paddingLeft: 5, paddingRight: 5, border: 'none' }}
        />
      </div>
      <BottomSection collapsed={collapsed} />
    </section>
  );
};

export default LayoutMenu;
