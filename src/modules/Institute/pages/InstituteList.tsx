import Container from "../../../common/Container/Container";

import { useGetInstituteListQuery } from "../api/instituteApiEndpoints";
import { Table } from "antd";
import useQueryParams from "../../../hooks/useQueryParams";
import CommTableActions from "../../../common/Utilities/CommTableActions";
import { imgUrl2 } from "../../../app/utilities/baseQuery";
import { IInstituteALL } from "../types/instituteTypes";
import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";

const InstituteList = () => {
  const navigate = useNavigate();
  const [query, setSearchParams] = useQueryParams<{
    limit: string;
    skip: string;
    name: string;
  }>();
  const columns: ColumnsType<IInstituteALL> = [
    {
      title: "Institute",
      key: "institute",
      render: (_: any, record: IInstituteALL) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img
            src={`${imgUrl2}${record.institute_logo}`}
            alt={record.institute_name}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <span style={{ fontWeight: 500 }}>{record.institute_name}</span>
        </div>
      ),
    },

    {
      title: "Institution Code",
      dataIndex: "institution_code",
      key: "institution_code",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Email",
      dataIndex: "institute_email",
      key: "institute_email",
    },

    {
      title: "Website",
      dataIndex: "institute_website",
      key: "institute_website",
      render: (website: string) => (
        <a href={`https://${website}`} target="_blank" rel="noreferrer">
          {website}
        </a>
      ),
    },

    {
      title: "Action",
      key: "action",
      align: "center",
      width: 110,
      render: (_: any, record: IInstituteALL) => (
        <CommTableActions
          // showDelete
          showView
          showEdit
          handleViewChange={() => {
            if (record.id !== undefined) handleView(record.id);
          }}
          handleEditChange={() => {
            if (record.id !== undefined) handleEdit(record.id);
          }}
          // handleEditChange={() => handleEdit(record.id)}
        />
      ),
    },
  ];

  const handleView = (id: number) => {
    // Navigate to /institute/view/:id
    navigate(`/institute/view/${id}`);
  };
  const handleEdit = (id: number) => {
    navigate(`/institute/edit/${id}`);
  };
  const { data, isLoading } = useGetInstituteListQuery({ ...query });
  const instituteData: IInstituteALL[] = Array.isArray(data?.data)
    ? data.data
    : data?.data
    ? [data.data]
    : [];

  return (
    <Container
      options={{ showButton: true, showStatus: true, showSearchFilter: true }}
      title="Institute List"
      buttonLink={"/institute/create"}
      statusOption={{
        placeholder: "Select Status",
        options: [
          { label: "Active", value: "true" },
          { label: "InActive", value: "false" },
        ],
      }}
      // content={<div>shakil</div>}
      content={
        <div style={{ marginTop: 12 }}>
          <Table<IInstituteALL>
            scroll={{ x: 500 }}
            loading={isLoading}
            bordered
            size="small"
            columns={columns}
            dataSource={instituteData}
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
          />
        </div>
      }
    />
  );
};

export default InstituteList;
