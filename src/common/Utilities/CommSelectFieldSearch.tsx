import React from 'react';
import useDebouncedCallback from '../../hooks/useDebouncedCallback';

type IProps = {
  children: React.ReactElement;
  debounceValue?: (value: string) => void;
};
const CommSelectFieldSearch = ({ children, debounceValue }: IProps) => {
  const handleSearch = useDebouncedCallback((value: string) => {
    debounceValue?.(value);
  }, 500);
  return React.cloneElement(children, {
    componentProps: {
      ...(children.props.componentProps || {}),
      onSearch: handleSearch,
    },
  });
};
export default CommSelectFieldSearch;
