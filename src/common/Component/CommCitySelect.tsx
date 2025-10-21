import { useState } from 'react';
import { FormItemSelect } from '../Antd/Form/FormItems';
import useDebouncedCallback from '../../hooks/useDebouncedCallback';
import { useGetCityListQuery } from '../PublicApi/publicApiEndpoints';

const CommCitySelect = ({ name }: { name: string | string[] }) => {
  const [search, setSearch] = useState('');
  const { data } = useGetCityListQuery({ name: search });
  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
  }, 500);

  return (
    <FormItemSelect
      name={name}
      label='Select City'
      colProps={{ xs: 24, md: 12 }}
      componentProps={{
        options: data?.data?.map((item) => ({
          label: item.name,
          value: item.id,
        })),
        onSearch(value) {
          handleSearch(value);
        },
      }}
    />
  );
};

export default CommCitySelect;
