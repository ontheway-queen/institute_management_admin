import { useEffect } from "react";
import { Form, InputNumber } from "antd";
import FormSubmit from "../../../common/Antd/Form/FormSubmit";
import {
  useUpdateSemesterMutation,
  useGetSemesterListQuery,
} from "../api/semesterApiEndpoints";

interface IProps {
  id: number; // ID of semester to edit
}

const EditSemester = ({ id }: IProps) => {
  const [form] = Form.useForm();
  const { data: semester } = useGetSemesterListQuery(
    { limit: "1", skip: "0" },
    {
      selectFromResult: ({ data }) => ({
        data: data?.data?.find((s) => s.id === id),
      }),
    }
  );
  const [updateSemester, { isLoading }] = useUpdateSemesterMutation();

  useEffect(() => {
    if (semester) {
      form.setFieldsValue({
        semesters: [{ semester_code: semester.semester_code }],
      });
    }
  }, [semester, form]);

  const handleFinish = async (values: any) => {
    if (!semester) return;
    try {
      await updateSemester({
        id: semester.id!,
        semester_code: values.semesters[0].semester_code,
      }).unwrap();
      form.resetFields();
    } catch (err) {
      console.error("❌ Error updating semester:", err);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      autoComplete="off"
    >
      <Form.List name="semesters" initialValue={[semester || {}]}>
        {(fields) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Form.Item
                {...restField}
                key={key}
                name={[name, "semester_code"]}
                label="Semester Code"
                rules={[
                  { required: true, message: "Semester code is required" },
                ]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            ))}
          </>
        )}
      </Form.List>
      <FormSubmit name="Update" loading={isLoading} />
    </Form>
  );
};

export default EditSemester;
