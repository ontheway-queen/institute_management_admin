import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  Select,
  message,
  Row,
  Col,
  Card,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useGetDepartmentListQuery } from "../api/instituteApiEndpoints";
import useQueryParams from "../../../hooks/useQueryParams";

interface IInstitutePayload {
  institute: {
    institution_code: string;
    established_year: string;
    name: string;
    phone: string;
    email: string;
    website: string;
    category: string;
    ownership: string;
    address: string;
    postal_code: string;
  };
  instituteHead: {
    name: string;
    email: string;
    password: string;
    phone: string;
    gender: string;
    blood_group: string;
    nid: string;
  };
  institute_logo: File;
  institute_head_photo: File;
  subjects: number[];
  departments: number[];
}

// interface CreateInstituteProps {
//   subjectsOptions: { label: string; value: number }[];
//   departmentsOptions: { label: string; value: number }[];
// }

const CreateInstitute: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [query, setSearchParams] = useQueryParams<{
    limit: string;
    skip: string;
    name: string;
  }>();
  const { data: departmentData, isLoading } = useGetDepartmentListQuery({
    ...query,
  });

  const departmentOptions = departmentData?.data?.map((dept) => ({
    label: dept.name, // what user sees
    value: dept.id, // what gets submitted
  }));
  //   const subjectOptions = subjectData?.data?.map((sub) => ({
  //     label: sub.name, // what user sees
  //     value: sub.id, // what gets submitted
  //   }));
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [headPhotoFile, setHeadPhotoFile] = useState<File | null>(null);

  const handleSubmit = async (values: any) => {
    if (!logoFile || !headPhotoFile) {
      message.error("Please upload both institute logo and head photo.");
      return;
    }

    const payload: IInstitutePayload = {
      institute: {
        institution_code: values.institution_code,
        established_year: values.established_year,
        name: values.institute_name,
        phone: values.phone,
        email: values.email,
        website: values.website,
        category: values.category,
        ownership: values.ownership,
        address: values.address,
        postal_code: values.postal_code,
      },
      instituteHead: {
        name: values.head_name,
        email: values.head_email,
        password: values.head_password,
        phone: values.head_phone,
        gender: values.head_gender,
        blood_group: values.head_blood_group,
        nid: values.head_nid,
      },
      institute_logo: logoFile,
      institute_head_photo: headPhotoFile,
      subjects: values.subjects,
      departments: values.departments,
    };

    const formData = new FormData();
    formData.append("institute_logo", payload.institute_logo);
    formData.append("institute_head_photo", payload.institute_head_photo);
    formData.append("institute", JSON.stringify(payload.institute));
    formData.append("instituteHead", JSON.stringify(payload.instituteHead));
    payload.subjects.forEach((id) =>
      formData.append("subjects[]", id.toString())
    );
    payload.departments.forEach((id) =>
      formData.append("departments[]", id.toString())
    );

    try {
      const res = await fetch("/api/institute", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        message.success("Institute created successfully!");
        form.resetFields();
        navigate("/institutes");
      } else {
        message.error("Failed to create institute.");
      }
    } catch (err) {
      console.error(err);
      message.error("Error occurred while creating institute.");
    }
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleSubmit}>
      <Row gutter={16}>
        <Col xs={24} lg={12}>
          <Card
            title="Institute Information"
            bordered
            style={{ marginBottom: 20 }}
          >
            <Form.Item
              name="institute_name"
              label="Institute Name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter institute name" />
            </Form.Item>
            <Form.Item
              name="institution_code"
              label="Institution Code"
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter institution code" />
            </Form.Item>
            <Form.Item
              name="established_year"
              label="Established Year"
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter year" />
            </Form.Item>
            <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
              <Input placeholder="Enter phone number" />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ type: "email" }]}>
              <Input placeholder="Enter email" />
            </Form.Item>
            <Form.Item name="website" label="Website">
              <Input placeholder="Enter website URL" />
            </Form.Item>
            <Form.Item name="category" label="Category">
              <Input placeholder="Enter category" />
            </Form.Item>
            <Form.Item name="ownership" label="Ownership">
              <Input placeholder="Enter ownership type" />
            </Form.Item>
            <Form.Item name="address" label="Address">
              <Input placeholder="Enter address" />
            </Form.Item>
            <Form.Item name="postal_code" label="Postal Code">
              <Input placeholder="Enter postal code" />
            </Form.Item>
            <Form.Item label="Institute Logo" required>
              <Upload
                beforeUpload={(file) => {
                  setLogoFile(file);
                  return false;
                }}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Upload Logo</Button>
              </Upload>
            </Form.Item>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            title="Institute Head Information"
            bordered
            style={{ marginBottom: 20 }}
          >
            <Form.Item
              name="head_name"
              label="Name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter head name" />
            </Form.Item>
            <Form.Item
              name="head_email"
              label="Email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input placeholder="Enter head email" />
            </Form.Item>
            <Form.Item
              name="head_password"
              label="Password"
              rules={[{ required: true }]}
            >
              <Input.Password placeholder="Enter password" />
            </Form.Item>
            <Form.Item
              name="head_phone"
              label="Phone"
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter phone number" />
            </Form.Item>
            <Form.Item name="head_gender" label="Gender">
              <Select
                options={[
                  { label: "Male", value: "Male" },
                  { label: "Female", value: "Female" },
                ]}
              />
            </Form.Item>
            <Form.Item name="head_blood_group" label="Blood Group">
              <Input placeholder="Enter blood group" />
            </Form.Item>
            <Form.Item name="head_nid" label="NID">
              <Input placeholder="Enter NID" />
            </Form.Item>
            <Form.Item label="Head Photo" required>
              <Upload
                beforeUpload={(file) => {
                  setHeadPhotoFile(file);
                  return false;
                }}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Upload Head Photo</Button>
              </Upload>
            </Form.Item>
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        {/* <Col xs={24} lg={12}>
          <Form.Item
            name="subjects"
            label="Subjects"
            rules={[{ required: true }]}
          >
            <Select
              mode="multiple"
              options={subjectOptions}
              placeholder="Select subjects"
            />
          </Form.Item>
        </Col> */}
        <Col xs={24} lg={12}>
          <Form.Item
            name="departments"
            label="Departments"
            rules={[{ required: true }]}
          >
            <Select
              mode="multiple"
              options={departmentOptions}
              placeholder="Select departments"
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Institute
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateInstitute;
