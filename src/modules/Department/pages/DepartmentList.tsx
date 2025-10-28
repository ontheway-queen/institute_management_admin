import { showModal } from "../../../app/slice/modalSlice";
import { useAppDispatch } from "../../../app/store";
import Table from "../../../common/Antd/Table";
import Container from "../../../common/Container/Container";
import CommStatusTag from "../../../common/Utilities/CommStatusTag";
import CommTableActions from "../../../common/Utilities/CommTableActions";
import useQueryParams from "../../../hooks/useQueryParams";
import {
  useDeleteDepartmentMutation,
  useGetDepartmentListQuery,
} from "../api/departmentApiEndpoints";
import EditDepartment from "../components/EditDepartment";
import SelectCreateTechnology from "../components/SelectTechnology";
import { IDepartmentListType } from "../types/departmentTypes";

const DepartmentList = () => {
  const [query, setSearchParams] = useQueryParams<{
    limit: string;
    skip: string;
    name: string;
  }>();
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetDepartmentListQuery({ ...query });
  const [deleteInstructorList] = useDeleteDepartmentMutation();

  const handleEdit = (record: IDepartmentListType) => {
    dispatch(
      showModal({
        title: "Edit Technology",
        width: 900,
        content: <EditDepartment record={record} />,
      })
    );
  };

  //

  return (
    <Container
      options={{ showButton: true, showStatus: true, showSearchFilter: true }}
      title="Technology List"
      openModal={{
        title: "Create Technology",
        width: 600,
        content: <SelectCreateTechnology />,
      }}
      statusOption={{
        placeholder: "Select Status",
        options: [
          { label: "Active", value: "true" },
          { label: "InActive", value: "false" },
        ],
      }}
      content={
        <div style={{ marginTop: 12 }}>
          <Table
            scroll={{ x: 500 }}
            loading={isLoading}
            bordered
            size="small"
            dataSource={data?.data || []}
            rowKey="id"
            pagination={{
              onChange(current, size) {
                setSearchParams({
                  skip:
                    current === 1
                      ? String(current - 1)
                      : String(
                          current * Number(query.limit) - Number(query.limit)
                        ),
                  limit: String(size),
                });
              },
              showSizeChanger: true,
              defaultPageSize: query.limit ? Number(query.limit) : 100,
              pageSizeOptions: ["50", "100", "200", "300", "400", "500"],
              total: Number(data?.total || 0),
              showTotal: (total) => `Total ${total}`,
            }}
            columns={[
              { title: "Name", dataIndex: "name", key: "name" },
              {
                title: "Short name",
                dataIndex: "short_name",
                key: "short_name",
              },
              { title: "Code", dataIndex: "code", key: "code" },
              {
                title: "Status",
                key: "status",
                align: "center",
                render: (_, record) => (
                  <CommStatusTag
                    status={record?.status ? "Active" : "Inactive"}
                  />
                ),
              },
              {
                title: "Action",
                key: "action",
                align: "center",
                width: 110,
                render: (_, record) => (
                  <CommTableActions
                    showDelete
                    deleteOnConfirm={() => deleteInstructorList(record.id)}
                    showEdit
                    handleEditChange={() => handleEdit(record)}
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

export default DepartmentList;
