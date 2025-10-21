import { useState } from 'react';
import { FormItemSelect } from '../Antd/Form/FormItems';
import useDebouncedCallback from '../../hooks/useDebouncedCallback';
import { useGetNationalityListQuery } from '../PublicApi/publicApiEndpoints';

const CommNationality = ({ name }: { name: string | string[] }) => {
  const [search, setSearch] = useState('');
  const { data } = useGetNationalityListQuery({ name: search });
  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
  }, 500);

  return (
    <FormItemSelect
      name={name}
      label='Select Nationality'
      colProps={{ xs: 24, md: 12 }}
      componentProps={{
        options: data?.data?.map((item) => ({
          label: item.name,
          value: String(item.id),
        })),
        onSearch(value) {
          handleSearch(value);
        },
      }}
    />
  );
};

export default CommNationality;
