import { CaretLeftOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { imgUrl2 } from "../../../app/utilities/baseQuery";
import { useGetSingleInstituteQuery } from "../api/instituteApiEndpoints";
import { IInstituteALL } from "../types/instituteTypes";

const ViewInstitute: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading } = useGetSingleInstituteQuery({ id: Number(id) });
  const institute: IInstituteALL | undefined = data?.data;
  console.log(institute);
  // Columns for subjects table
  // const subjectColumns: ColumnsType<any> = [
  //   { title: "Name", dataIndex: "name", key: "name" },
  //   { title: "Code", dataIndex: "code", key: "code" },
  //   {
  //     title: "Status",
  //     dataIndex: "status",
  //     key: "status",
  //     render: (status: boolean) => (status ? "Active" : "Inactive"),
  //   },
  // ];

  // Columns for departments table
  // const departmentColumns: ColumnsType<any> = [
  //   { title: "Name", dataIndex: "name", key: "name" },
  //   { title: "Short Name", dataIndex: "short_name", key: "short_name" },
  //   {
  //     title: "Status",
  //     dataIndex: "status",
  //     key: "status",
  //     render: (status: boolean) => (status ? "Active" : "Inactive"),
  //   },
  // ];

  if (isLoading || !institute) return <div>Loading...</div>;

  return (
    <div>
      <Button style={{ marginBottom: 5 }} onClick={() => navigate(-1)}>
        <CaretLeftOutlined />
        Back
      </Button>
      <Card title="Institute Information" style={{ marginBottom: 20 }}>
        <Row gutter={16}>
          <Col xs={24} lg={6}>
            <img
              src={`${imgUrl2}${institute.institute_logo}`}
              alt={institute.institute_name}
              style={{ width: "100%", maxWidth: 150, borderRadius: 8 }}
            />
          </Col>
          <Col xs={24} lg={18}>
            <p>
              <b>Name:</b> {institute.institute_name}
            </p>
            <p>
              <b>Code:</b> {institute.institution_code}
            </p>
            <p>
              <b>Category:</b> {institute.category}
            </p>
            <p>
              <b>Ownership:</b> {institute.ownership}
            </p>
            <p>
              <b>Email:</b> {institute.institute_email}
            </p>
            <p>
              <b>Website:</b>{" "}
              <a
                href={`https://${institute.institute_website}`}
                target="_blank"
                rel="noreferrer"
              >
                {institute.institute_website}
              </a>
            </p>
            <p>
              <b>Address:</b> {institute.address}
            </p>
            <p>
              <b>Postal Code:</b> {institute.postal_code}
            </p>
          </Col>
        </Row>
      </Card>

      <Card title="Institute Head Information" style={{ marginBottom: 20 }}>
        <Row gutter={[16, 16]} align="middle">
          {/* Head Photo */}
          <Col xs={24} sm={8} md={6} lg={4}>
            <img
              src={
                imgUrl2 + institute?.institute_head?.photo || "/placeholder.png"
              }
              alt={institute?.institute_head?.name}
              style={{
                width: "100%",
                maxWidth: 150,
                borderRadius: 8,
                objectFit: "cover",
              }}
            />
          </Col>

          {/* Head Info */}
          <Col xs={24} sm={16} md={18} lg={20}>
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <p>
                  <b>Name:</b> {institute?.institute_head?.name || "-"}
                </p>
              </Col>
              <Col span={12}>
                <p>
                  <b>Email:</b> {institute?.institute_head?.email || "-"}
                </p>
              </Col>
              <Col span={12}>
                <p>
                  <b>Phone:</b> {institute?.institute_head?.phone || "-"}
                </p>
              </Col>
              <Col span={12}>
                <p>
                  <b>Code:</b> {institute?.institute_head?.code || "-"}
                </p>
              </Col>
              <Col span={12}>
                <p>
                  <b>Gender:</b> {institute?.institute_head?.gender || "-"}
                </p>
              </Col>
              <Col span={12}>
                <p>
                  <b>Blood Group:</b>{" "}
                  {institute?.institute_head?.blood_group || "-"}
                </p>
              </Col>
              <Col span={12}>
                <p>
                  <b>NID:</b> {institute?.institute_head?.nid || "-"}
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      {/* <Card title="Subjects" style={{ marginBottom: 20 }}>
        <Table
          columns={subjectColumns}
          dataSource={institute.subjects}
          rowKey="id"
          pagination={false}
        />
      </Card> */}

      {/* <Card title="Departments" style={{ marginBottom: 20 }}>
        <Table
          columns={departmentColumns}
          dataSource={institute.departments}
          rowKey="id"
          pagination={false}
        />
      </Card> */}
    </div>
  );
};

export default ViewInstitute;
