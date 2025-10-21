import { Form, FormInstance, Row, Col, Button, Input } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import FormSubmit from "../../../common/Antd/Form/FormSubmit";

export interface ISemester {
  id?: number; // optional for edit
  semester_code: number;
}

export interface ISemesterFormValues {
  semesters: ISemester[];
}

type IProps = {
  loading?: boolean;
  onFinish?: (values: ISemesterFormValues) => void;
  form?: FormInstance<ISemesterFormValues>;
  record?: ISemester; // single record for edit
  editMode?: boolean;
};

const CreateSemester = ({
  onFinish,
  form,
  record,
  editMode = false,
}: IProps) => {
  // Initialize form with existing record if editing
  useEffect(() => {
    if (record) {
      form?.setFieldsValue({ semesters: [{ ...record }] });
    } else {
      form?.resetFields();
    }
  }, [record, form]);

  return (
    <Form layout="vertical" form={form} onFinish={onFinish} autoComplete="off">
      <Form.List
        name="semesters"
        initialValue={editMode && record ? [{ ...record }] : [{}]}
      >
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, index) => (
              <Row key={key} gutter={[10, 0]} align="middle">
                <Col xs={24} md={20}>
                  <Form.Item
                    {...restField}
                    name={[name, "semester_code"]}
                    label={`Semester Code ${
                      fields.length > 1 ? index + 1 : ""
                    }`}
                    rules={[
                      { required: true, message: "Semester code is required" },
                    ]}
                  >
                    <Input type="number" placeholder="Enter semester code" />
                  </Form.Item>
                </Col>

                {!editMode && fields.length > 1 && (
                  <Col xs={24} md={4}>
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
                    Add Another Semester
                  </Button>
                </Col>
              </Row>
            )}
          </>
        )}
      </Form.List>

      <FormSubmit
        name={editMode ? "Update" : "Submit"}
        loading={form?.isFieldsTouched()}
      />
    </Form>
  );
};

export default CreateSemester;
