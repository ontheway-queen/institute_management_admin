import { ThemeStateType } from '../slice/themeSlice';

export const themePresets: ThemeStateType[] = [
  {
    headerBg: '#FFFFFF', // right Top Header
    siderBg: '#002147',
    mode: 'light',
    name: 'Default',
    itemBg: '#173d6d',
    subMenuItemBg: '#112641',
    itemHoverBg: 'rgb(0, 0, 0, 0.5)',
    itemSelectedColor: '#FFFFFF',
    colorPrimary: '#002147',
    colorText: '#cccccc',
  },
  {
    mode: 'dark',
    name: 'Dark',
    siderBg: '#1F1F1F',
    headerBg: '#000000',
    itemBg: '#1F1F1F',
  },
];

export const primaryColors: { label: string; value: string }[] = [
  { label: 'Turquoise', value: '#1abc9c' },
  { label: 'Emerald', value: '#2ecc71' },
  {
    label: 'Peter River',
    value: '#002147',
  },
  { label: 'Amethyst', value: '#9b59b6' },
  { label: 'Alizarin', value: '#e74c3c' },
  { label: 'Orange', value: '#f39c12' },
  { label: 'Pumpkin', value: '#d35400' },
  { label: 'Pomegranate', value: '#c0392b' },
];

export const fontSizes: { label: string; value: number }[] = Array.from(
  { length: 6 },
  (_, i) => {
    const size = 13 + i;
    return {
      label: `${size}${size === 14 ? ' (Default)' : ''}`,
      value: size,
    };
  }
);

export const fontFamilies: { label: string; value: string }[] = [
  {
    label: 'Roboto (Default)',
    value: 'Roboto, sans-serif',
  },
  {
    label: 'Poppins',
    value: 'Poppins, sans-serif',
  },
];
