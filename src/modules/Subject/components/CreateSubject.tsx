import { Form, Row, Col, Button, Input, Radio, InputNumber } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import FormSubmit from "../../../common/Antd/Form/FormSubmit";
import {
  useCreateSubjectMutation,
  useUpdateSubjectMutation,
} from "../api/subjectApiEndpoints";
import { ISubjectListType } from "../types/subjectTypes";
import { useEffect } from "react";

type IProps = {
  editMode?: boolean;
  record?: ISubjectListType;
};

const CreateSubject = ({ editMode = false, record }: IProps) => {
  const [form] = Form.useForm<{ subjects: ISubjectListType[] }>();
  const [createSubject, { isLoading: creating }] = useCreateSubjectMutation();
  const [updateSubject, { isLoading: updating }] = useUpdateSubjectMutation();

  // Initialize form if editing
  useEffect(() => {
    if (editMode && record) {
      form.setFieldsValue({
        subjects: [{ ...record }],
      });
    } else {
      form.setFieldsValue({ subjects: [{}] });
    }
  }, [editMode, record, form]);

  const handleFinish = async (values: { subjects: ISubjectListType[] }) => {
    const subject = values.subjects[0];

    if (editMode && record) {
      // Only send changed fields
      const payload: Partial<ISubjectListType> & { id: number } = {
        id: record.id,
      };
      const code = String(subject.code);
      if (subject.name !== record.name) payload.name = subject.name;
      if (subject.code !== record.code) payload.code = code;
      if (subject.status !== record.status) payload.status = subject.status;

      if (Object.keys(payload).length > 1) {
        await updateSubject(payload).unwrap();
      }
    } else {
      await createSubject(values.subjects).unwrap();
    }

    form.resetFields();
  };

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={handleFinish}
      autoComplete="off"
    >
      <Form.List name="subjects">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, index) => (
              <Row gutter={[10, 0]} key={key} align="middle">
                <Col xs={24} md={8}>
                  <Form.Item
                    {...restField}
                    name={[name, "name"]}
                    label={`Name ${fields.length > 1 ? index + 1 : ""}`}
                    rules={[{ required: true, message: "Name is required" }]}
                  >
                    <Input placeholder="Enter Subject Name" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={8}>
                  <Form.Item
                    {...restField}
                    name={[name, "code"]}
                    label="Code"
                    rules={[{ required: true, message: "Code is required" }]}
                    normalize={(value) => String(value)}
                  >
                    <InputNumber
                      placeholder="Enter subject code"
                      style={{ width: "100%" }}
                      type="number"
                    />
                  </Form.Item>
                </Col>

                {editMode && (
                  <Col xs={24} md={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "status"]}
                      label="Status"
                      rules={[{ required: true, message: "Select status" }]}
                    >
                      <Radio.Group>
                        <Radio value={true}>Active</Radio>
                        <Radio value={false}>Inactive</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                )}

                {!editMode && fields.length > 1 && (
                  <Col xs={24} md={2}>
                    <Button
                      type="text"
                      danger
                      icon={<MinusCircleOutlined />}
                      onClick={() => remove(name)}
                    />
                  </Col>
                )}
              </Row>
            ))}

            {!editMode && (
              <Row>
                <Col span={24}>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                    block
                  >
                    Add Another Subject
                  </Button>
                </Col>
              </Row>
            )}
          </>
        )}
      </Form.List>

      <FormSubmit
        name={editMode ? "Update" : "Submit"}
        loading={creating || updating}
      />
    </Form>
  );
};

export default CreateSubject;
