import { useForm } from "antd/es/form/Form";
import { useAppDispatch } from "../../../app/store";
import Container from "../../../common/Container/Container";
import Table from "../../../common/Antd/Table";
import CommStatusTag from "../../../common/Utilities/CommStatusTag";
import CommTableActions from "../../../common/Utilities/CommTableActions";
import { showModal } from "../../../app/slice/modalSlice";
import { setFormInstance } from "../../../app/utilities/formManager";
import { IDepartmentFormValues } from "../types/semesterTypes";
import useQueryParams from "../../../hooks/useQueryParams";
import {
  useCreateDepartmentMutation,
  useDeleteDepartmentMutation,
  useGetSemesterListQuery,
} from "../api/semesterApiEndpoints";
// import EditDepartment from "../components/EditDepartment";
import CreateSemester from "../components/CreateSemester";

const SemesterList = () => {
  const [form] = useForm<IDepartmentFormValues>();
  const [query, setSearchParams] = useQueryParams<{
    limit: string;
    skip: string;
    name: string;
  }>();

  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetSemesterListQuery({ ...query });
  console.log(data?.data);
  const [createDepartmentList, { isLoading: createLod }] =
    useCreateDepartmentMutation();
  const [deleteDepartmentList] = useDeleteDepartmentMutation();
  // Handles both create (multiple) and edit (single)
  const onFinish = async (values: IDepartmentFormValues) => {
    setFormInstance(form);

    await createDepartmentList(values.departments);
  };

  // const handleEdit = (record: IDepartmentListType) => {
  //   console.log(record);
  //   dispatch(
  //     showModal({
  //       title: "Edit Department",
  //       width: 900,
  //       content: <EditDepartment record={record} />,
  //     })
  //   );
  // };
  return (
    <Container
      options={{ showButton: true, showStatus: true, showSearchFilter: true }}
      title="Semester List"
      openModal={{
        title: "Create Semester",
        width: 900,
        content: (
          <CreateSemester form={form} loading={createLod} onFinish={onFinish} />
        ),
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
              {
                title: "Semester Code",
                dataIndex: "semester_code",
                key: "semester_code",
              },

              // {
              //   title: "Status",
              //   key: "status",
              //   align: "center",
              //   render: (_, record) => (
              //     <CommStatusTag
              //       status={record?.status ? "Active" : "Inactive"}
              //     />
              //   ),
              // },
              // {
              //   title: "Action",
              //   key: "action",
              //   align: "center",
              //   width: 110,
              //   render: (_, record) => (
              //     <CommTableActions
              //       showDelete
              //       deleteOnConfirm={() => deleteDepartmentList(record?.id)}
              //       showEdit
              //       handleEditChange={() => handleEdit(record)}
              //     />
              //   ),
              // },
            ]}
          />
        </div>
      }
    />
  );
};

export default SemesterList;
