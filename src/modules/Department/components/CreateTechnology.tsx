import { Form, Row, Col, Button, Input } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useCreateDepartmentMutation } from "../api/departmentApiEndpoints";
import { IDepartmentFormValues } from "../types/departmentTypes";
import FormSubmit from "../../../common/Antd/Form/FormSubmit";
import { setFormInstance } from "../../../app/utilities/formManager";

const CreateTechnology = () => {
  const [form] = Form.useForm<IDepartmentFormValues>();
  const [createDepartment, { isLoading }] = useCreateDepartmentMutation();

  const onFinish = async (values: IDepartmentFormValues) => {
    setFormInstance(form);
    await createDepartment(values.departments);
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish} autoComplete="off">
      <Form.List name="departments" initialValue={[{}]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row gutter={[10, 0]} key={key} align="middle">
                <Col xs={24} md={6}>
                  <Form.Item
                    name={[name, "name"]}
                    label="Name"
                    rules={[{ required: true }]}
                    {...restField}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col xs={24} md={6}>
                  <Form.Item
                    name={[name, "code"]}
                    label="Code"
                    rules={[{ required: true, message: "Code is required" }]}
                    {...restField}
                  >
                    <Input type="number" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={6}>
                  <Form.Item
                    name={[name, "short_name"]}
                    rules={[{ required: true }]}
                    label="Short Name"
                    {...restField}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                {fields.length > 1 && (
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

            <Row>
              <Col span={24}>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  block
                >
                  Add Another Technology
                </Button>
              </Col>
            </Row>
          </>
        )}
      </Form.List>

      <FormSubmit name="Submit" loading={isLoading} />
    </Form>
  );
};

export default CreateTechnology;
