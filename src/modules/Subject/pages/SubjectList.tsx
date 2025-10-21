import { Table } from "antd";
import Container from "../../../common/Container/Container";
import CommTableActions from "../../../common/Utilities/CommTableActions";
import { useAppDispatch } from "../../../app/store";
import {
  useCreateSubjectMutation,
  useDeleteSubjectMutation,
  useGetSubjectListQuery,
} from "../api/subjectApiEndpoints";
import CommStatusTag from "../../../common/Utilities/CommStatusTag";
import { setFormInstance } from "../../../app/utilities/formManager";
import { ISubjectListType } from "../types/semesterTypes";
import { useForm } from "antd/es/form/Form";
import useQueryParams from "../../../hooks/useQueryParams";
import CreateSubject from "../components/CreateSubject";

const SubjectList = () => {
  const [form] = useForm<ISubjectListType>();
  const [query, setSearchParams] = useQueryParams<{
    limit: string;
    skip: string;
    name: string;
  }>();

  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetSubjectListQuery({ ...query });
  console.log(data?.data);
  
  const [deleteDepartmentList] = useDeleteSubjectMutation();
  // Handles both create (multiple) and edit (single)
  const onFinish = async (values: ISubjectListType) => {
    setFormInstance(form);

    await createSubjectList(values);
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
      title="Subject List"
      openModal={{
        title: "Create Subject",
        width: 900,
        content: (
          <CreateSubject />
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
                title: "Name",
                dataIndex: "name",
                key: "name",
              },
              {
                title: "Code",
                dataIndex: "code",
                key: "code",
                align: "center",
              },
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
                title: "Created By",
                dataIndex: "created_by_name",
                key: "created_by_name",
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
                    // handleEditChange={() => handleEdit(record)}
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

export default SubjectList;
