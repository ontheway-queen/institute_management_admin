import { useEffect, useState } from 'react';
import { Table, Checkbox } from 'antd';
import { FormItemInput } from '../../../common/Antd/Form/FormItems';
import { InitData } from '../types/adminUserTypes';

export interface PermissionItem {
  permission_id: number;
  permission_name: string;
  groupName: string;
  read: number;
  write: number;
  update: number;
  delete: number;
}

type IProps = {
  permissionsData: InitData[];
  name?: string;
  handlePerData?: (permission: PermissionItem[]) => void;
};

const RolePermissionForm = ({ permissionsData, handlePerData }: IProps) => {
  const groupPermissions = [
    {
      groupName: 'Dashboard',
      permission_ids: [3],
    },
    {
      groupName: 'Hotel',
      permission_ids: [2, 1],
    },
  ];

  const initialPermissions = groupPermissions?.flatMap(
    ({ groupName, permission_ids }) =>
      permission_ids
        .map((id) => {
          const matchedPermission = permissionsData?.find(
            (perm) => perm.permission_id === id
          );
          if (matchedPermission) {
            return {
              ...matchedPermission,
              groupName,
              read: matchedPermission.read || 0,
              write: matchedPermission.write || 0,
              update: matchedPermission.update || 0,
              delete: matchedPermission.delete || 0,
            };
          }
          return null;
        })
        .filter(Boolean)
  );

  const [permissions, setPermissions] = useState<PermissionItem[]>(
    initialPermissions as PermissionItem[]
  );
  const togglePermission = (
    id: number,
    type: keyof Omit<PermissionItem, 'permission_id' | 'permission_name'>
  ) => {
    setPermissions((prev) =>
      prev.map((perm) =>
        perm.permission_id === id
          ? { ...perm, [type]: perm[type] ? 0 : 1 }
          : perm
      )
    );
  };

  useEffect(() => {
    if (permissions?.length) {
      handlePerData?.(permissions);
    }
  }, [permissions]);
  const getRowSpanMap = (data: PermissionItem[]) => {
    const groupNameCount: Record<string, number> = {};
    const rowSpanMap: Record<number, number> = {};

    data?.forEach((item) => {
      groupNameCount[item.groupName] =
        (groupNameCount[item.groupName] || 0) + 1;
    });
    const seen: Record<string, number> = {};
    data?.forEach((item, index) => {
      if (!seen[item.groupName]) {
        rowSpanMap[index] = groupNameCount[item.groupName];
        seen[item.groupName] = 1;
      } else {
        rowSpanMap[index] = 0;
        seen[item.groupName]++;
      }
    });

    return rowSpanMap;
  };
  const rowSpanMap = getRowSpanMap(initialPermissions as PermissionItem[]);
  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <FormItemInput name={'role_name'} label='Role Name' />
      </div>
      <Table
        size='small'
        dataSource={permissions}
        columns={[
          {
            title: 'Module Name',
            dataIndex: 'groupName',
            key: 'groupName',
            width: 100,
            onCell: (_, index) => ({
              rowSpan: rowSpanMap[index ?? 0],
            }),
          },

          {
            title: 'Permission Name',
            dataIndex: 'permission_name',
            key: 'permission_name',
          },
          {
            title: 'Read',
            key: 'read',
            align: 'center' as const,
            render: (_: any, record: PermissionItem) => (
              <Checkbox
                checked={!!record.read}
                onChange={() => togglePermission(record.permission_id, 'read')}
              />
            ),
          },
          {
            title: 'Write',
            key: 'write',
            align: 'center' as const,
            render: (_: any, record: PermissionItem) => (
              <Checkbox
                checked={!!record.write}
                onChange={() => togglePermission(record.permission_id, 'write')}
              />
            ),
          },
          {
            title: 'Update',
            key: 'update',
            align: 'center' as const,
            render: (_: any, record: PermissionItem) => (
              <Checkbox
                checked={!!record.update}
                onChange={() =>
                  togglePermission(record.permission_id, 'update')
                }
              />
            ),
          },
          {
            title: 'Delete',
            key: 'delete',
            align: 'center' as const,
            render: (_: any, record: PermissionItem) => (
              <Checkbox
                checked={!!record.delete}
                onChange={() =>
                  togglePermission(record.permission_id, 'delete')
                }
              />
            ),
          },
        ]}
        rowKey='permission_id'
        pagination={false}
      />
    </>
  );
};

export default RolePermissionForm;
