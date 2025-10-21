import React, { useState } from 'react';
import { Form } from 'antd';
import FormSubmit from '../../../common/Antd/Form/FormSubmit';
import RolePermissionForm, {
  PermissionItem,
} from '../components/RolePermissionForm';
import {
  useAddRoleMutation,
  useGetAllPermissionListQuery,
} from '../api/adminUserApiEndpoints';
import { IPermissionList } from '../types/adminUserTypes';

const PermissionsTable: React.FC = () => {
  const { data } = useGetAllPermissionListQuery();
  const [CreateRole, { isLoading }] = useAddRoleMutation();
  const [perMissionData, setPermissionData] = useState<PermissionItem[]>();

  const onFinish = (value: { role_name: string }) => {
    const body: any = {
      role_name: value.role_name,
      permissions: (perMissionData || [])?.map((item) => ({
        permission_id: item.permission_id,
        read: item.read,
        update: item.update,
        write: item.write,
        delete: item.delete,
      })),
    };

    CreateRole(body);
  };

  return (
    <Form onFinish={onFinish}>
      {data?.data?.length && (
        <RolePermissionForm
          handlePerData={(value) => {
            setPermissionData(value);
          }}
          permissionsData={data?.data as IPermissionList[]}
        />
      )}

      <div style={{ textAlign: 'right', marginTop: 16 }}>
        <FormSubmit loading={isLoading} name='Create Role' />
      </div>
    </Form>
  );
};

export default PermissionsTable;
