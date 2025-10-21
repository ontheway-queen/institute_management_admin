import { Form, FormInstance, Row, Col, Button, Input, Radio } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import {
  ICreateDepartmentType,
  IDepartmentFormValues,
} from "../types/semesterTypes";
import FormSubmit from "../../../common/Antd/Form/FormSubmit";

type IProps = {
  loading?: boolean;
  onFinish?: (values: IDepartmentFormValues) => void;
  form?: FormInstance<IDepartmentFormValues>;
  record?: ICreateDepartmentType; // single record for edit
  editMode?: boolean;
};

const CreateSemester = ({
  onFinish,
  form,
  record,
  editMode = false,
}: IProps) => {
  useEffect(() => {
    if (record) {
      form?.setFieldsValue({ departments: [{ ...record }] });
    } else {
      form?.resetFields();
    }
  }, [record, form]);

  return (
    <Form layout="vertical" form={form} onFinish={onFinish} autoComplete="off">
      <Form.List
        name="departments"
        initialValue={editMode && record ? [{ ...record }] : [{}]}
      >
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name: fieldIndex, ...restField }, index) => (
              <Row gutter={[10, 0]} key={key} align="middle">
                <Col xs={24} md={6}>
                  <Form.Item
                    name={[fieldIndex, "name"]}
                    label={`Name ${fields.length > 1 ? index + 1 : ""}`}
                    rules={[{ required: true, message: "Name is required" }]}
                    {...restField}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col xs={24} md={6}>
                  <Form.Item
                    name={[fieldIndex, "code"]}
                    label="Code"
                    rules={[{ required: true, message: "Code is required" }]}
                    {...restField}
                  >
                    <Input type="number" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={6}>
                  <Form.Item
                    name={[fieldIndex, "short_name"]}
                    label="Short Name"
                    {...restField}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                {editMode && (
                  <Col xs={24} md={6}>
                    <Form.Item
                      name={[fieldIndex, "status"]}
                      label="Status"
                      {...restField}
                      rules={[
                        { required: true, message: "Please select status" },
                      ]}
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
                      onClick={() => remove(fieldIndex)}
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
                    Add Another Department
                  </Button>
                </Col>
              </Row>
            )}
          </>
        )}
      </Form.List>

      <FormSubmit name={editMode ? "Update" : "Submit"} />
    </Form>
  );
};

export default CreateSemester;
