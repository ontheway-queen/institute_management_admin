import { Form } from "antd";
import { useEditAdminUserMutation } from "../api/adminUserApiEndpoints";
import {
  AdminUserCreateType,
  UserAdminListType,
} from "../types/adminUserTypes";
import AdminUserForm from "./AdminUserForm";
import { useEffect, useState } from "react";
// import { useEditProfileMutation } from '../../Settings/api/profileEndpoint';

const EditAdminUser = ({
  id,
  record,
  isProfile,
}: {
  isProfile?: boolean;
  id: number;
  record: UserAdminListType;
}) => {
  const [editAdminUser] = useEditAdminUserMutation();
  // const [editProfile, { isLoading: profileLod }] = useEditProfileMutation();
  const [form] = Form.useForm();
  const [values, setValues] = useState<Partial<AdminUserCreateType>>();
  const onValuesChange = (values: Partial<AdminUserCreateType>) => {
    setValues((prev) => ({ ...prev, ...values }));
  };

  const onFinish = async () => {
    const formData = new FormData();

    if (values) {
      Object.keys(values).forEach((key) => {
        if (
          key === "photo" &&
          Array.isArray(values.photo) &&
          values.photo.length > 0
        ) {
          formData.append("photo", values?.photo[0]?.originFileObj);
        } else {
          if (key !== "photo") {
            formData.append(key, String(values[key as keyof typeof values]));
          }
        }
      });

      if (isProfile) {
        // await editProfile({ body: formData }).then((e: any) => {
        //   if (e?.data?.success) {
        //     setValues({});
        //     form.resetFields();
        //   }
        // });
      } else {
        await editAdminUser({ body: formData, id }).then((e: any) => {
          if (e?.data?.success) {
            setValues({});
            form.resetFields();
          }
        });
      }
    }
  };

  useEffect(() => {
    if (record) {
      const { photo, ...rest } = record;
      form.setFieldsValue({
        ...rest,
        status: rest.status === "active" ? true : false,
      });
    }
  }, [record, form]);

  console.log(record);
  return (
    <AdminUserForm<Partial<AdminUserCreateType>>
      // loading={isLoading || profileLod}
      form={form}
      defaultImageLink={record?.photo}
      editMode
      onFinish={onFinish}
      onValuesChange={onValuesChange}
    />
  );
};

export default EditAdminUser;
