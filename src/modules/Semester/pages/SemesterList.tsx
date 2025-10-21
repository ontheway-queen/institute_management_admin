import { useState } from "react";
import Container from "../../../common/Container/Container";
import Table from "../../../common/Antd/Table";
import { setFormInstance } from "../../../app/utilities/formManager";
import useQueryParams from "../../../hooks/useQueryParams";
import {
  useCreateSemesterMutation,
  useDeleteSemesterMutation,
  useGetSemesterListQuery,
  useUpdateSemesterMutation,
} from "../api/semesterApiEndpoints";
import CreateSemester, {
  ISemesterFormValues,
  ISemester,
} from "../components/CreateSemester";
import CommTableActions from "../../../common/Utilities/CommTableActions";
import { useForm } from "antd/es/form/Form";
import { ISemesterListType } from "../types/semesterTypes";
import { ColumnType } from "antd/es/table";
import { useDispatch } from "react-redux";
import { showModal } from "../../../app/slice/modalSlice";
import EditSemester from "../components/EditSemester";

const SemesterList = () => {
  const [form] = useForm<ISemesterFormValues>();
  const [editingSemester, setEditingSemester] = useState<ISemester | null>(
    null
  );
  const [query, setSearchParams] = useQueryParams<{
    limit: string;
    skip: string;
    name: string;
  }>();

  const { data, isLoading, refetch } = useGetSemesterListQuery({ ...query });
  const [createSemesterList, { isLoading: createLoading }] =
    useCreateSemesterMutation();
  const [updateSemester] = useUpdateSemesterMutation();
  const [deleteSemester] = useDeleteSemesterMutation();
  const dispatch = useDispatch();
  const onFinish = async (values: ISemesterFormValues) => {
    setFormInstance(form);

    if (!values.semesters || values.semesters.length === 0) return;

    try {
      if (editingSemester) {
        // Edit single semester
        await updateSemester({
          id: editingSemester.id!,
          semester_code: values.semesters[0].semester_code,
        }).unwrap();
        setEditingSemester(null);
      } else {
        // Create multiple semesters
        await createSemesterList(values.semesters).unwrap();
      }
      form.resetFields();
      refetch();
    } catch (error) {
      console.error("❌ Error submitting:", error);
    }
  };

  // const handleEdit = (record: ISemester) => {
  //   setEditingSemester(record);
  //   form.setFieldsValue({
  //     semesters: [{ semester_code: record.semester_code }],
  //   });
  // };

  const handleDelete = async (id: number) => {
    try {
      await deleteSemester(id).unwrap();
      refetch();
    } catch (err) {
      console.error("❌ Error deleting semester:", err);
    }
  };

  const columns: ColumnType<ISemesterListType>[] = [
    {
      title: "Semester Code",
      dataIndex: "semester_code",
      key: "semester_code",
    },
    {
      title: "Created By",
      dataIndex: "created_by_name",
      key: "created_by_name",
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   align: "center",
    //   width: 120,
    //   render: (_: any, record: ISemester) => (
    //     <CommTableActions
    //       showEdit
    //       showDelete
    //       handleEditChange={() => handleEdit(record)}
    //       deleteOnConfirm={() => handleDelete(record.id!)}
    //     />
    //   ),
    // },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: 110,
      render: (_, record) => (
        <CommTableActions
          showDelete
          deleteOnConfirm={() => handleDelete(record.id!)}
          showEdit
          // You can implement modal edit later:
          handleEditChange={() =>
            dispatch(
              showModal({
                title: "Edit Subject",
                width: 900,
                content: <EditSemester record={record} />,
              })
            )
          }
        />
      ),
    },
  ];

  return (
    <Container
      options={{ showButton: true, showStatus: false, showSearchFilter: true }}
      title="Semester List"
      openModal={{
        title: editingSemester ? "Edit Semester" : "Create Semester",
        width: 600,
        content: (
          <CreateSemester
            form={form}
            loading={createLoading}
            editMode={!!editingSemester}
            record={editingSemester || undefined}
            onFinish={onFinish}
          />
        ),
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
                      ? "0"
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
            columns={columns}
          />
        </div>
      }
    />
  );
};

export default SemesterList;
