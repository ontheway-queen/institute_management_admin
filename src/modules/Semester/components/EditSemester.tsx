import { useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import CreateSemester, {
  ISemester,
  ISemesterFormValues,
} from "./CreateSemester";
import { setFormInstance } from "../../../app/utilities/formManager";
import { useUpdateSemesterMutation } from "../api/semesterApiEndpoints";

type IProps = {
  record: ISemester; // single semester to edit
  onSuccess?: () => void; // optional callback after successful update
};

const EditSemester = ({ record, onSuccess }: IProps) => {
  const [form] = useForm<ISemesterFormValues>();
  const [updateSemester, { isLoading, isSuccess }] =
    useUpdateSemesterMutation();

  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        semesters: [{ semester_code: record.semester_code }],
      });
    } else {
      form.resetFields();
    }
  }, [record, form]);

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      onSuccess?.();
    }
  }, [isSuccess, form, onSuccess]);

  const onFinish = async (values: ISemesterFormValues) => {
    setFormInstance(form);

    const updated = values.semesters[0];
    if (!record.id) return;

    const payload = {
      id: record.id, // <-- must include ID
      semester_code: updated.semester_code,
    };

    try {
      await updateSemester(payload).unwrap();
      console.log("✅ Semester updated:", payload);
    } catch (err) {
      console.error("❌ Update failed:", err);
    }
  };

  return (
    <CreateSemester
      form={form}
      editMode
      record={record}
      loading={isLoading}
      onFinish={onFinish}
    />
  );
};

export default EditSemester;
