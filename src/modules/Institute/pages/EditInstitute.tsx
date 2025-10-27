import { CaretLeftOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleInstituteQuery,
  useUpdateInstituteMutation,
} from "../api/instituteApiEndpoints";
import { IInstituteALL, IUpdateInstitute } from "../types/instituteTypes";

const EditInstitute: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  // const [query] = useQueryParams<{
  //   limit: string;
  //   skip: string;
  //   name: string;
  // }>();

  // Fetch data
  const { data: instituteResponse, isLoading } = useGetSingleInstituteQuery({
    id: Number(id),
  });
  const institute: IInstituteALL | undefined = instituteResponse?.data;

  // const { data: departmentData } = useGetDepartmentListQuery({ ...query });
  // const { data: subjectData } = useGetSubjectListQuery({ ...query });

  const [updateInstitute, { isLoading: updateLoading }] =
    useUpdateInstituteMutation();

  // Local states
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [headPhotoFile, setHeadPhotoFile] = useState<File | null>(null);
  const [selectedSubjects, setSelectedSubjects] = useState<number[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<number[]>([]);

  // To compare later
  const [prevSubjects, setPrevSubjects] = useState<number[]>([]);
  const [prevDepartments, setPrevDepartments] = useState<number[]>([]);

  useEffect(() => {
    if (institute) {
      // Prefill form values
      form.setFieldsValue({
        institute_name: institute.institute_name,
        institution_code: institute.institution_code,
        established_year: institute.established_year,
        phone: institute.institute_phone,
        email: institute.institute_email,
        website: institute.institute_website,
        category: institute.category,
        ownership: institute.ownership,
        address: institute.address,
        postal_code: institute.postal_code,
        head_name: institute.institute_head?.name,
        head_email: institute.institute_head?.email,
        head_phone: institute.institute_head?.phone,
        head_gender: institute.institute_head?.gender,
        head_blood_group: institute.institute_head?.blood_group,
        head_nid: institute.institute_head?.nid,
      });

      const subjectIds = institute.subjects?.map((s) => s.id) || [];
      const departmentIds = institute.departments?.map((d) => d.id) || [];

      setSelectedSubjects(subjectIds);
      setPrevSubjects(subjectIds);

      setSelectedDepartments(departmentIds);
      setPrevDepartments(departmentIds);
    }
  }, [institute, form]);

  const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // const handleSubjectChange = (checkedValues: number[]) => {
  //   setSelectedSubjects(checkedValues);
  // };

  // const handleDepartmentChange = (checkedValues: number[]) => {
  //   setSelectedDepartments(checkedValues);
  // };

  const onFinish = async (values: any) => {
    if (!institute) return;

    // Compute changed fields for institute
    const institutePatch: Partial<IUpdateInstitute["institute"]> = {};
    if (values.institute_name !== institute.institute_name)
      institutePatch.name = values.institute_name;
    if (values.institution_code !== institute.institution_code)
      institutePatch.institution_code = values.institution_code;
    if (values.established_year !== institute.established_year)
      institutePatch.established_year = values.established_year;
    if (values.phone !== institute.institute_phone)
      institutePatch.phone = values.phone;
    if (values.email !== institute.institute_email)
      institutePatch.email = values.email;
    if (values.website !== institute.institute_website)
      institutePatch.website = values.website;
    if (values.category !== institute.category)
      institutePatch.category = values.category;
    if (values.ownership !== institute.ownership)
      institutePatch.ownership = values.ownership;
    if (values.address !== institute.address)
      institutePatch.address = values.address;
    if (values.postal_code !== institute.postal_code)
      institutePatch.postal_code = values.postal_code;

    // Compute changed fields for instituteHead
    const headPatch: Partial<IUpdateInstitute["instituteHead"]> = {};
    if (values.head_name !== institute.institute_head?.name)
      headPatch.name = values.head_name;
    if (values.head_email !== institute.institute_head?.email)
      headPatch.email = values.head_email;
    if (values.head_password) headPatch.password = values.head_password;
    if (values.head_phone !== institute.institute_head?.phone)
      headPatch.phone = values.head_phone;
    if (values.head_gender !== institute.institute_head?.gender)
      headPatch.gender = values.head_gender;
    if (values.head_blood_group !== institute.institute_head?.blood_group)
      headPatch.blood_group = values.head_blood_group;
    if (values.head_nid !== institute.institute_head?.nid)
      headPatch.nid = values.head_nid;

    // Determine added/removed subjects and departments
    const add_subjects = selectedSubjects.filter(
      (id) => !prevSubjects.includes(id)
    );
    const remove_subjects = prevSubjects.filter(
      (id) => !selectedSubjects.includes(id)
    );

    const add_departments = selectedDepartments.filter(
      (id) => !prevDepartments.includes(id)
    );
    const remove_departments = prevDepartments.filter(
      (id) => !selectedDepartments.includes(id)
    );

    // Build FormData with only changed fields
    const formData = new FormData();
    if (Object.keys(institutePatch).length)
      formData.append("institute", JSON.stringify(institutePatch));
    if (Object.keys(headPatch).length)
      formData.append("institute_head", JSON.stringify(headPatch));
    if (logoFile) formData.append("institute_logo", logoFile);
    if (headPhotoFile) formData.append("institute_head_photo", headPhotoFile);
    if (add_subjects.length)
      formData.append("add_subjects", JSON.stringify(add_subjects));
    if (remove_subjects.length)
      formData.append("remove_subjects", JSON.stringify(remove_subjects));
    if (add_departments.length)
      formData.append("add_departments", JSON.stringify(add_departments));
    if (remove_departments.length)
      formData.append("remove_departments", JSON.stringify(remove_departments));

    // Debug: see what is being sent
    console.log("===== FormData Contents =====");
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
    console.log("===== End FormData =====");

    try {
      await updateInstitute({ id: Number(id), formData }).unwrap();
      message.success("Institute updated successfully!");
      navigate("/institute/list");
    } catch (error) {
      console.error("Update failed:", error);
      message.error("Failed to update institute.");
    }
  };

  if (isLoading || !institute) return <div>Loading...</div>;

  return (
    <div>
      <Button style={{ marginBottom: 5 }} onClick={() => navigate(-1)}>
        <CaretLeftOutlined />
        Back
      </Button>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Row gutter={16}>
          <Col xs={24} lg={12}>
            <Card title="Institute Information" style={{ marginBottom: 20 }}>
              <Form.Item
                name="institute_name"
                label="Institute Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="institution_code"
                label="Institution Code"
                rules={[{ required: true }]}
              >
                <Input readOnly disabled />
              </Form.Item>
              <Form.Item name="established_year" label="Established Year">
                <Input />
              </Form.Item>
              <Form.Item name="phone" label="Phone">
                <Input />
              </Form.Item>
              <Form.Item name="email" label="Email">
                <Input />
              </Form.Item>
              <Form.Item name="website" label="Website">
                <Input />
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
                <Input />
              </Form.Item>
              <Form.Item name="postal_code" label="Postal Code">
                <Input />
              </Form.Item>
              <Form.Item label="Institute Logo">
                <Upload
                  beforeUpload={(file) => {
                    setLogoFile(file);
                    return false;
                  }}
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />}>Upload New Logo</Button>
                </Upload>
              </Form.Item>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card
              title="Institute Head Information"
              style={{ marginBottom: 20 }}
            >
              <Form.Item
                name="head_name"
                label="Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="head_email"
                label="Email"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="head_password" label="Password">
                <Input.Password placeholder="Leave blank if unchanged" />
              </Form.Item>
              <Form.Item name="head_phone" label="Phone">
                <Input />
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
                <Select>
                  {BLOOD_GROUPS.map((bg) => (
                    <Select.Option key={bg} value={bg}>
                      {bg}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="head_nid" label="NID">
                <Input />
              </Form.Item>
              <Form.Item label="Head Photo">
                <Upload
                  beforeUpload={(file) => {
                    setHeadPhotoFile(file);
                    return false;
                  }}
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />}>
                    Upload New Head Photo
                  </Button>
                </Upload>
              </Form.Item>
            </Card>
          </Col>
        </Row>

        {/* Subjects Checklist */}
        {/* <Card title="Subjects">
          <Checkbox.Group
            style={{ width: "100%" }}
            value={selectedSubjects}
            onChange={handleSubjectChange}
          >
            <Row gutter={[0, 8]}>
              {subjectData?.data?.map((sub) => (
                <Col span={8} key={sub.id}>
                  <Checkbox value={sub.id}>{sub.name}</Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </Card> */}

        {/* Departments Checklist */}
        {/* <Card title="Departments" style={{ marginTop: 20 }}>
          <Checkbox.Group
            style={{ width: "100%" }}
            value={selectedDepartments}
            onChange={handleDepartmentChange}
          >
            <Row gutter={[0, 8]}>
              {departmentData?.data?.map((dept) => (
                <Col span={8} key={dept.id}>
                  <Checkbox value={dept.id}>{dept.name}</Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </Card> */}

        <Form.Item style={{ marginTop: 20 }}>
          <Button type="primary" htmlType="submit" loading={updateLoading}>
            Update Institute
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditInstitute;
