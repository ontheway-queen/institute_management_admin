import { useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import {
  IDepartmentListType,
  IDepartmentFormValues,
  IUpdateDepartmentType,
} from "../types/instituteTypes";
import { useUpdateDepartmentMutation } from "../api/instituteApiEndpoints";
import CreateDepartment from "./CreateDepartment";
import { setFormInstance } from "../../../app/utilities/formManager";

type IProps = {
  record: IDepartmentListType;
};

const EditInstitute = ({ record }: IProps) => {
  const [form] = useForm<IDepartmentFormValues>();
  const [updateDepartment, { isLoading: updateLod, isSuccess }] =
    useUpdateDepartmentMutation();

  // Initialize form
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

  // Reset form after success
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
    }
  }, [isSuccess, form]);

  // Only send changed values
  const onFinish = async (values: IDepartmentFormValues) => {
    setFormInstance(form);

    const formValues = values.departments[0];
    const payload: Partial<IUpdateDepartmentType> & { id: number } = {
      id: record.id,
    };

    // Compare with original record, only include changed fields
    if (formValues.name !== record.name) payload.name = formValues.name;
    if (formValues.code !== record.code) payload.code = formValues.code;
    if (formValues.short_name !== record.short_name)
      payload.short_name = formValues.short_name;
    if (formValues.status !== record.status) payload.status = formValues.status;

    // Only send if at least one field changed
    const keys = Object.keys(payload).filter((k) => k !== "id");
    if (keys.length > 0) {
      await updateDepartment(payload);
    }
  };

  return (
    <CreateDepartment
      editMode
      form={form} // TS now happy
      loading={updateLod}
      onFinish={onFinish}
    />
  );
};

export default EditInstitute;
