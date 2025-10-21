import { Table } from "antd";
import Container from "../../../common/Container/Container";
import CommTableActions from "../../../common/Utilities/CommTableActions";
import {
  useDeleteSubjectMutation,
  useGetSubjectListQuery,
} from "../api/subjectApiEndpoints";
import CommStatusTag from "../../../common/Utilities/CommStatusTag";
import { ISubjectListType } from "../types/subjectTypes";
import { useForm } from "antd/es/form/Form";
import useQueryParams from "../../../hooks/useQueryParams";
import CreateSubject from "../components/CreateSubject";
import { useDispatch } from "react-redux";
import { showModal } from "../../../app/slice/modalSlice";
import EditSubject from "../components/EditSubject";

const SubjectList = () => {
  const [form] = useForm<{ subjects: ISubjectListType[] }>();
  const dispatch = useDispatch();
  const [query, setSearchParams] = useQueryParams<{
    limit: string;
    skip: string;
    name: string;
  }>();
  const { data, isLoading } = useGetSubjectListQuery({ ...query });
  const [deleteSubject] = useDeleteSubjectMutation();

  return (
    <Container
      options={{ showButton: true, showStatus: true, showSearchFilter: true }}
      title="Subject List"
      openModal={{
        title: "Create Subject",
        width: 900,
        content: <CreateSubject form={form} />,
      }}
      statusOption={{
        placeholder: "Select Status",
        options: [
          { label: "Active", value: "true" },
          { label: "Inactive", value: "false" },
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
                    deleteOnConfirm={() => deleteSubject(record?.id)}
                    showEdit
                    // You can implement modal edit later:
                    handleEditChange={() =>
                      dispatch(
                        showModal({
                          title: "Edit Subject",
                          width: 900,
                          content: <EditSubject record={record} />,
                        })
                      )
                    }
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
