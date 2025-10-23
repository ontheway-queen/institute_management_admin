import { useEffect } from "react";
import { Form, Radio, Input, Row, Col } from "antd";
import { useUpdateDepartmentMutation } from "../api/departmentApiEndpoints";
import {
  IDepartmentFormValues,
  IDepartmentListType,
  IUpdateDepartmentType,
} from "../types/departmentTypes";
import FormSubmit from "../../../common/Antd/Form/FormSubmit";
import { setFormInstance } from "../../../app/utilities/formManager";

type IProps = {
  record: IDepartmentListType;
};

const EditDepartment = ({ record }: IProps) => {
  const [form] = Form.useForm<IDepartmentFormValues>();
  const [updateDepartment, { isLoading, isSuccess }] =
    useUpdateDepartmentMutation();

  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        departments: [
          {
            name: record.name,
            code: record.code || 0,
            short_name: record.short_name || "",
            status: record.status,
          },
        ],
      });
    } else {
      form.resetFields();
    }
  }, [record, form]);

  useEffect(() => {
    if (isSuccess) form.resetFields();
  }, [isSuccess, form]);

  const onFinish = async (values: IDepartmentFormValues) => {
    setFormInstance(form);
    const formValues = values.departments[0];
    const payload: Partial<IUpdateDepartmentType> & { id: number } = {
      id: record.id,
    };

    if (formValues.name !== record.name) payload.name = formValues.name;
    if (formValues.code !== record.code) payload.code = formValues.code;
    if (formValues.short_name !== record.short_name)
      payload.short_name = formValues.short_name;
    if (formValues.status !== record.status) payload.status = formValues.status;

    const keys = Object.keys(payload).filter((k) => k !== "id");
    if (keys.length > 0) await updateDepartment(payload);
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish} autoComplete="off">
      <Form.List name="departments" initialValue={[{}]}>
        {(fields) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row gutter={[10, 0]} key={key} align="middle">
                <Col xs={24} md={6}>
                  <Form.Item
                    name={[name, "name"]}
                    label={`Name`}
                    rules={[{ required: true, message: "Name is required" }]}
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
                    label="Short Name"
                    {...restField}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col xs={24} md={6}>
                  <Form.Item
                    name={[name, "status"]}
                    label="Status"
                    {...restField}
                    rules={[{ required: true }]}
                  >
                    <Radio.Group>
                      <Radio value={true}>Active</Radio>
                      <Radio value={false}>Inactive</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
            ))}
          </>
        )}
      </Form.List>

      <FormSubmit name="Update" loading={isLoading} />
    </Form>
  );
};

export default EditDepartment;
