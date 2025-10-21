import { Form } from 'antd';
import {
  useGetAllPermissionListQuery,
  useGetSingleRoleQuery,
  useUpdateRoleMutation,
} from '../api/adminUserApiEndpoints';
import RolePermissionForm, {
  PermissionItem,
} from '../components/RolePermissionForm';
import { IRoleList } from '../types/adminUserTypes';
import { useForm } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';
import FormSubmit from '../../../common/Antd/Form/FormSubmit';

const EditRolePermission = ({ record }: { record: IRoleList }) => {
  const [form] = useForm();
  const { data } = useGetSingleRoleQuery({ id: record.role_id });
  const { data: allPermission } = useGetAllPermissionListQuery();
  const unMatched = allPermission?.data
    ?.filter(
      (perm) =>
        !data?.data?.permissions?.some(
          (selected) => selected.permission_id === perm.permission_id
        )
    )
    .map((item) => ({
      permission_id: item.permission_id,
      permission_name: item.permission_name,
      read: 0,
      write: 0,
      update: 0,
      delete: 0,
    }));

  const [perMissionData, setPermissionData] = useState<PermissionItem[]>();
  const [UpdateRole, { isLoading }] = useUpdateRoleMutation();

  const onFinish = (value: { role_name: string }) => {
    const body: any = {
      role_name: value.role_name,
      permissions: (perMissionData || []).map((item) => ({
        permission_id: item.permission_id,
        read: item.read,
        update: item.update,
        write: item.write,
        delete: item.delete,
      })),
    };

    UpdateRole({ body: body, id: record.role_id });
  };

  useEffect(() => {
    if (record) {
      form.setFieldValue('role_name', record.role_name);
    }
  }, [record]);
  return (
    <Form onFinish={onFinish} form={form}>
      {data?.data?.permissions && (
        <RolePermissionForm
          handlePerData={(value) => {
            setPermissionData(value);
          }}
          name={record.role_name}
          permissionsData={[
            ...(data?.data?.permissions || []),
            ...(unMatched || []),
          ]}
        />
      )}

      <div style={{ textAlign: 'right', marginTop: 16 }}>
        <FormSubmit loading={isLoading} name='Update Role' />
      </div>
    </Form>
  );
};

export default EditRolePermission;
