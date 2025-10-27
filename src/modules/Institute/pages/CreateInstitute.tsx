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
import { CaretLeftOutlined, UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useQueryParams from "../../../hooks/useQueryParams";
import { useGetSubjectListQuery } from "../../Subject/api/subjectApiEndpoints";
import { useGetDepartmentListQuery } from "../../Department/api/departmentApiEndpoints";
import { useCreateInstituteMutation } from "../api/instituteApiEndpoints";
import { IInstitute } from "../types/instituteTypes";

const CreateInstitute: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [query] = useQueryParams<{
    limit: string;
    skip: string;
    name: string;
  }>();
  const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const { data: departmentData } = useGetDepartmentListQuery({
    ...query,
  });
  const { data: subjectData } = useGetSubjectListQuery({
    ...query,
  });

  const departmentOptions = departmentData?.data?.map((dept) => ({
    label: dept.name, // what user sees
    value: dept.id, // what gets submitted
  }));
  const subjectOptions = subjectData?.data?.map((sub) => ({
    label: sub.name, // what user sees
    value: sub.id, // what gets submitted
  }));
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [headPhotoFile, setHeadPhotoFile] = useState<File | null>(null);

  const [createInstitute, { isLoading: createLoading }] =
    useCreateInstituteMutation();

  const onFinish = async (values: any) => {
    if (!logoFile || !headPhotoFile) {
      message.error("Please upload both institute logo and head photo.");
      return;
    }

    const payload: IInstitute = {
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
      subjects: values.subjects, // array of IDs from Select
      departments: values.departments, // array of IDs from Select
    };

    const formData = new FormData();
    formData.append("institute_logo", payload.institute_logo);
    formData.append("institute_head_photo", payload.institute_head_photo);
    formData.append("institute", JSON.stringify(payload.institute));
    formData.append("institute_head", JSON.stringify(payload.instituteHead));

    // Append each subject ID to FormData

    formData.append("subjects", JSON.stringify(payload.subjects));

    formData.append("departments", JSON.stringify(payload.departments));

    try {
      console.log("FormData contents:");
      formData.forEach((value, key) => console.log(key, value));

      await createInstitute(formData).unwrap(); // RTK Query mutation

      message.success("Institute created successfully!");
      form.resetFields();
      navigate("/institute/list");
    } catch (err) {
      console.error(err);
      message.error("Error occurred while creating institute.");
    }
  };
  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Button style={{ marginBottom: 5 }} onClick={() => navigate(-1)}>
        <CaretLeftOutlined />
        Back
      </Button>
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
              rules={[
                { required: true, message: "Established year is required" },
                {
                  validator: (_, value) => {
                    if (!value) return Promise.resolve(); // required rule will catch empty
                    const year = Number(value);
                    if (isNaN(year))
                      return Promise.reject("Year must be a number");
                    if (year < 1800)
                      return Promise.reject("Year must be 1800 or later");
                    return Promise.resolve();
                  },
                },
              ]}
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
              <Select
                options={[
                  { label: "Polytechnic", value: "polytechnic" },
                  { label: "School", value: "school" },
                ]}
              />
            </Form.Item>
            <Form.Item name="ownership" label="Ownership">
              <Select
                options={[
                  { label: "Public", value: "public" },
                  { label: "Private", value: "private" },
                ]}
              />
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
                  { label: "পুরুষ", value: "পুরুষ" },
                  { label: "মহিলা", value: "মহিলা" },
                ]}
              />
            </Form.Item>

            <Form.Item name="head_blood_group" label="Blood Group">
              <Select placeholder="Select blood group">
                {BLOOD_GROUPS.map((bg) => (
                  <Select.Option key={bg} value={bg}>
                    {bg}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="head_nid" label="NID">
              <Input placeholder="Enter NID" />
            </Form.Item>
            <Form.Item label="Head Photo">
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
        {/* <Col xs={24} lg={12}>
          <Form.Item
            name="departments"
            label="Technology"
            rules={[{ required: true }]}
          >
            <Select
              mode="multiple"
              options={departmentOptions}
              placeholder="Select departments"
            />
          </Form.Item>
        </Col> */}
      </Row>

      <Form.Item>
        <Button type="primary" loading={createLoading} htmlType="submit">
          Create Institute
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateInstitute;
