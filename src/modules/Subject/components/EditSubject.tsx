import { useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import CreateSubject from "./CreateSubject";
import { ISubjectListType } from "../types/subjectTypes";

type IProps = {
  record: ISubjectListType;
};

const EditSubject = ({ record }: IProps) => {
  const [form] = useForm<{ subjects: ISubjectListType[] }>();

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

  return <CreateSubject editMode record={record} />;
};

export default EditSubject;
