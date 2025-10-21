import { useForm } from "antd/es/form/Form";
import { useAppDispatch } from "../../../app/store";
import Container from "../../../common/Container/Container";
import Table from "../../../common/Antd/Table";
import CommStatusTag from "../../../common/Utilities/CommStatusTag";
import CommTableActions from "../../../common/Utilities/CommTableActions";
import { showModal } from "../../../app/slice/modalSlice";
import { setFormInstance } from "../../../app/utilities/formManager";
import {
  IDepartmentFormValues,
  IDepartmentListType,
} from "../types/instituteTypes";
import CreateDepartment from "../components/CreateDepartment";
import useQueryParams from "../../../hooks/useQueryParams";
import {
  useCreateDepartmentMutation,
  useDeleteDepartmentMutation,
  useGetDepartmentListQuery,
} from "../api/instituteApiEndpoints";
import EditDepartment from "../components/EditInstitute";
import EditInstitute from "../components/EditInstitute";
import { Navigate } from "react-router-dom";

const InstituteList = () => {
  const [form] = useForm<IDepartmentFormValues>();
  const [query, setSearchParams] = useQueryParams<{
    limit: string;
    skip: string;
    name: string;
  }>();

  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetDepartmentListQuery({ ...query });
  console.log(data?.data);
  const [createInstituteList, { isLoading: createLod }] =
    useCreateInstituteMutation();
  const [deleteDepartmentList] = useDeleteDepartmentMutation();
  // Handles both create (multiple) and edit (single)
  const onFinish = async (values: IDepartmentFormValues) => {
    setFormInstance(form);

    await createInstituteList(values.departments);
  };
  // const handleCreateInstitute = () => {
  //   Navigate("/institute/create"); // redirect
  // };
  const handleEdit = (record: IDepartmentListType) => {
    console.log(record);
    dispatch(
      showModal({
        title: "Edit Department",
        width: 900,
        content: <EditInstitute record={record} />,
      })
    );
  };
  return (
    <Container
      options={{ showButton: true, showStatus: true, showSearchFilter: true }}
      title="Institute List"
      buttonLink={"/management/create"}
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
                    deleteOnConfirm={() => deleteDepartmentList(record?.id)}
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

export default InstituteList;
