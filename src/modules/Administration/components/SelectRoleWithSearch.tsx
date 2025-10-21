import { useState } from 'react';
import { FormItemSelect } from '../../../common/Antd/Form/FormItems';
import { useGetUserRoleListQuery } from '../api/adminUserApiEndpoints';
import CommSelectFieldSearch from '../../../common/Utilities/CommSelectFieldSearch';

const SelectRoleWithSearch = () => {
  const [name, setName] = useState('');
  const { data } = useGetUserRoleListQuery({ name });

  return (
    <CommSelectFieldSearch debounceValue={(value) => setName(value)}>
      <FormItemSelect
        name={'role_id'}
        label='Select Role'
        colProps={{ lg: 12 }}
        componentProps={{
          options: data?.data?.map((item) => ({
            label: item.role_name,
            value: item.role_id,
          })),
        }}
      />
    </CommSelectFieldSearch>
  );
};

export default SelectRoleWithSearch;
