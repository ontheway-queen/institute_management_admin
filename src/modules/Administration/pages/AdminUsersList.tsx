import { Avatar, Table, Tag } from 'antd';
import Container from '../../../common/Container/Container';
import useQueryParams from '../../../hooks/useQueryParams';
import {
  useAddAdminUserMutation,
  useGetUserAdminListQuery,
} from '../api/adminUserApiEndpoints';
import { imgUrl } from '../../../app/utilities/baseQuery';
import { AdminUserCreateType } from '../types/adminUserTypes';
import CommTableActions from '../../../common/Utilities/CommTableActions';
import { useAppDispatch } from '../../../app/store';
import { showModal } from '../../../app/slice/modalSlice';
import AdminUserForm from '../components/AdminUserForm';
import EditAdminUser from '../components/EditAdminUser';
import { useForm } from 'antd/es/form/Form';
import { setFormInstance } from '../../../app/utilities/formManager';
import Loader from '../../../common/Utilities/Loader';
import { Icon } from '@iconify/react/dist/iconify.js';
const AdminUsersList = () => {
  const [form] = useForm();
  const [query, setSearchParams] = useQueryParams<{
    limit: string;
    skip: string;
  }>();
  const dispatch = useAppDispatch();
  const { data } = useGetUserAdminListQuery({ ...query });
  const [createAdmin, { isLoading }] = useAddAdminUserMutation();

  const onFinish = async (values: AdminUserCreateType) => {
    setFormInstance(form);
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (
        key === 'photo' &&
        Array.isArray(values.photo) &&
        values.photo.length > 0
      ) {
        formData.append('photo', values?.photo[0]?.originFileObj);
      } else {
        if (key !== 'photo') {
          formData.append(key, String(values[key as keyof typeof values]));
        }
      }
    });

    await createAdmin(formData);
  };

  return (
    <Container
      options={{ showSearch: false, showButton: true }}
      title='Admin List'
      openModal={{
        title: 'Admin Create',
        content: (
          <AdminUserForm<AdminUserCreateType>
            loading={isLoading}
            onFinish={onFinish}
            form={form}
          />
        ),
      }}
      content={
        <div style={{ marginTop: '12px' }}>
          <Table
            bordered
            size='small'
            dataSource={data?.data || []}
            loading={{ indicator: <Loader></Loader>, spinning: isLoading }}
            rowKey={'user_id'}
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
                key: '0',
                title: 'SL',
                dataIndex: 'username',
                render: (_, __, index) => index + 1 + Number(query.skip || 0),
              },
              {
                key: '1',
                title: 'User Name',
                dataIndex: 'username',
                render: (_, record) => (
                  <div>
                    <Avatar src={`${imgUrl}${record.photo}`} />{' '}
                    {record.username}{' '}
                  </div>
                ),
              },
              {
                key: '2',
                title: 'Phone Number',
                dataIndex: 'phone_number',
              },
              {
                key: '3',
                title: 'Email',
                dataIndex: 'email',
              },
              {
                title: 'Role',
                key: 'role',
                dataIndex: 'role',
                render: (_, record) => (
                  <div style={{ position: 'relative' }}>
                    {record.is_main && (
                      <Icon
                        icon='streamline-flex-color:star-badge-flat'
                        width='16'
                        height='18'
                        style={{
                          fontSize: '25px',
                          position: 'absolute',
                          top: -10,
                          right: 0,
                          zIndex: 10,
                        }}
                      />
                    )}
                    <Tag style={{ minWidth: '85px', textAlign: 'center' }}>
                      {record.status}
                    </Tag>
                  </div>
                ),
              },
              {
                key: '3',
                title: 'Status',
                dataIndex: 'status',
                render: (_, record) => (
                  <Tag
                    style={{ width: '60px', textAlign: 'center' }}
                    color={record.status ? 'green' : 'red'}
                  >
                    {record.status ? 'Active' : 'InActive'}
                  </Tag>
                ),
              },
              {
                key: '3',
                title: 'Action',
                dataIndex: 'action',
                render: (_, record) => (
                  <CommTableActions
                    showEdit
                    handleEditChange={() => {
                      dispatch(
                        showModal({
                          title: 'Admin Edit',
                          content: (
                            <EditAdminUser
                              record={record}
                              id={record.user_id}
                            />
                          ),
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

export default AdminUsersList;
