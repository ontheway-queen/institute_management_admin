import Container from '../../../common/Container/Container';
import useQueryParams from '../../../hooks/useQueryParams';
import CommTableActions from '../../../common/Utilities/CommTableActions';
import { useAppDispatch } from '../../../app/store';
import Loader from '../../../common/Utilities/Loader';
import { useGetUserRoleListQuery } from '../api/adminUserApiEndpoints';
import Table from '../../../common/Antd/Table';
import CreateRole from './CreateRole';
import { showDrawer } from '../../../app/slice/drawerSlice';
import EditRolePermission from './EditRolePermission';
const RoleList = () => {
  const [query, setSearchParams] = useQueryParams<{
    limit: string;
    skip: string;
  }>();

  const dispatch = useAppDispatch();
  const { data } = useGetUserRoleListQuery({ ...query });
  //   const [createAdmin, { isLoading }] = useAddAdminRoleMutation();

  return (
    <Container
      options={{ showSearch: false, showButton: true }}
      title='Role List'
      openDrawer={{
        title: 'Role Create',
        content: <CreateRole />,
        width: 800,
      }}
      content={
        <div style={{ marginTop: '12px' }}>
          <Table
            bordered
            size='small'
            dataSource={data?.data || []}
            loading={{ indicator: <Loader />, spinning: false }}
            rowKey={'role_id'}
            pagination={{
              onChange(current, size) {
                setSearchParams({
                  skip:
                    current === 1
                      ? String(Number(current) - 1)
                      : String(
                          current * Number(query.limit) - Number(query.limit)
                        ),
                  limit: String(size),
                });
              },

              showSizeChanger: true,
              defaultPageSize: query.limit ? Number(query.limit) : 100,
              pageSizeOptions: ['50', '100', '200', '300', '400', '500'],
              total: data ? Number(data?.total) : 0,
              showTotal: (total) => `Total ${total} `,
            }}
            columns={[
              {
                title: 'Role Name',
                key: 'role_name',
                dataIndex: 'role_name',
              },

              {
                key: '3',
                title: 'Action',
                dataIndex: 'action',
                align: 'center',
                render: (_, record) => (
                  <CommTableActions
                    showEdit
                    handleEditChange={() => {
                      dispatch(
                        showDrawer({
                          title: 'Role Edit',
                          content: <EditRolePermission record={record} />,
                          width: 800,
                        })
                      );
                    }}
                  />
                ),
              },
            ]}
          />
        </div>
      }
    />
  );
};

export default RoleList;
