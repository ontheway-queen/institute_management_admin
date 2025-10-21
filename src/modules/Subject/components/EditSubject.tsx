import { useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import { useUpdateSubjectMutation } from "../api/subjectApiEndpoints";
import CreateSubject from "./CreateSubject";
import { setFormInstance } from "../../../app/utilities/formManager";
import { ISubjectListType, IUpdateSubjectType } from "../types/subjectTypes";

type IProps = {
  record: ISubjectListType;
};

const EditSubject = ({ record }: IProps) => {
  const [form] = useForm<{ subjects: ISubjectListType[] }>();
  const [updateSubject, { isLoading: updateLod, isSuccess }] =
    useUpdateSubjectMutation();

  // Initialize form with existing record
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        subjects: [
          {
            name: record.name,
            code: record.code,
            status: record.status,
          },
        ],
      });
    } else {
      form.resetFields();
    }
  }, [record, form]);

  // Reset after successful update
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
    }
  }, [isSuccess, form]);

  // Submit only changed values
  const onFinish = async (values: { subjects: ISubjectListType[] }) => {
    setFormInstance(form);
    const updated = values.subjects[0];

    const payload: Partial<IUpdateSubjectType> & { id: number } = {
      id: record.id,
    };

    if (updated.name !== record.name) payload.name = updated.name;
    if (updated.code !== record.code) payload.code = String(updated.code);
    if (updated.status !== record.status) payload.status = updated.status;

    const hasChanges = Object.keys(payload).length > 1; // exclude only id
    if (hasChanges) {
      try {
        await updateSubject(payload).unwrap();
        console.log("✅ Subject updated successfully:", payload);
      } catch (error) {
        console.error("❌ Error updating subject:", error);
      }
    } else {
      console.log("⚠️ No changes detected — skipping update");
    }
  };

  return (
    <CreateSubject
      editMode
      form={form}
      loading={updateLod}
      onFinish={onFinish}
    />
  );
};

export default EditSubject;
