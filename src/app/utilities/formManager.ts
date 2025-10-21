import { FormInstance } from 'antd';

let formInstance: FormInstance | null = null;

export const setFormInstance = (form: FormInstance | null) => {
  formInstance = form;
};

export const resetFormInstance = () => {
  formInstance?.resetFields();
};

export const getFormInstance = () => formInstance;
