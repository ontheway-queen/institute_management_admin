// import { Form, FormInstance, Row, Col, Button, Input, Radio } from "antd";
// import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
// import { ICreateSubjectType, ISubjectListType } from "../types/subjectTypes";
// import FormSubmit from "../../../common/Antd/Form/FormSubmit";
// import { useCreateSubjectMutation } from "../api/subjectApiEndpoints";

// type IProps = {
//   loading?: boolean;
//   onFinish?: (values: ISubjectListType[]) => void;
//   form?: FormInstance<{ subjects: ISubjectListType[] }>;
//   record?: ICreateSubjectType;
//   editMode?: boolean;
// };

// const CreateSubject = ({ form, record, editMode }: IProps) => {
//   const [createSubjectList, { isLoading }] = useCreateSubjectMutation();

//   const onFinish = async (values: { subjects: ISubjectListType[] }) => {
//     try {
//       // If API expects array directly
//       await createSubjectList(values.subjects).unwrap();
//       console.log("✅ Successfully created:", values.subjects);
//       form?.resetFields();
//     } catch (error) {
//       console.error("❌ Error creating subjects:", error);
//     }
//   };

//   return (
//     <Form
//       layout="vertical"
//       form={form}
//       onFinish={onFinish}
//       autoComplete="off"
//       initialValues={{
//         subjects: editMode && record ? [{ ...record }] : [{}],
//       }}
//     >
//       <Form.List name="subjects">
//         {(fields, { add, remove }) => (
//           <>
//             {fields.map(({ key, name, ...restField }, index) => (
//               <Row gutter={[10, 0]} key={key} align="middle">
//                 <Col xs={24} md={8}>
//                   <Form.Item
//                     {...restField}
//                     name={[name, "name"]}
//                     label={`Name ${fields.length > 1 ? index + 1 : ""}`}
//                     rules={[{ required: true, message: "Name is required" }]}
//                   >
//                     <Input placeholder="Enter subject name" />
//                   </Form.Item>
//                 </Col>

//                 <Col xs={24} md={8}>
//                   <Form.Item
//                     {...restField}
//                     name={[name, "code"]}
//                     label="Code"
//                     rules={[{ required: true, message: "Code is required" }]}
//                   >
//                     <Input type="number" placeholder="Enter subject code" />
//                   </Form.Item>
//                 </Col>

//                 {editMode && (
//                   <Col xs={24} md={8}>
//                     <Form.Item
//                       {...restField}
//                       name={[name, "status"]}
//                       label="Status"
//                       rules={[{ required: true, message: "Select status" }]}
//                     >
//                       <Radio.Group>
//                         <Radio value={true}>Active</Radio>
//                         <Radio value={false}>Inactive</Radio>
//                       </Radio.Group>
//                     </Form.Item>
//                   </Col>
//                 )}

//                 {!editMode && fields.length > 1 && (
//                   <Col xs={24} md={2}>
//                     <Button
//                       type="text"
//                       danger
//                       icon={<MinusCircleOutlined />}
//                       onClick={() => remove(name)}
//                     />
//                   </Col>
//                 )}
//               </Row>
//             ))}

//             {!editMode && (
//               <Row>
//                 <Col span={24}>
//                   <Button
//                     type="dashed"
//                     onClick={() => add()}
//                     icon={<PlusOutlined />}
//                     block
//                   >
//                     Add Another Subject
//                   </Button>
//                 </Col>
//               </Row>
//             )}
//           </>
//         )}
//       </Form.List>

//       <FormSubmit name={editMode ? "Update" : "Submit"} loading={isLoading} />
//     </Form>
//   );
// };

// export default CreateSubject;

import {
  Form,
  FormInstance,
  Row,
  Col,
  Button,
  Input,
  Radio,
  InputNumber,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import FormSubmit from "../../../common/Antd/Form/FormSubmit";
import { useCreateSubjectMutation } from "../api/subjectApiEndpoints";
import { ISubjectListType } from "../types/subjectTypes";

type IProps = {
  loading?: boolean;
  onFinish?: (values: { subjects: ISubjectListType[] }) => void;
  form?: FormInstance<{ subjects: ISubjectListType[] }>;
  record?: ISubjectListType;
  editMode?: boolean;
};

const CreateSubject = ({ form, record, editMode, onFinish }: IProps) => {
  const [createSubjectList, { isLoading }] = useCreateSubjectMutation();

  const handleFinish = async (values: { subjects: ISubjectListType[] }) => {
    if (onFinish) {
      await onFinish(values); // <-- use parent-provided onFinish
    } else {
      await createSubjectList(values.subjects).unwrap(); // default create
    }
  };

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={handleFinish}
      autoComplete="off"
      initialValues={{
        subjects: editMode && record ? [{ ...record }] : [{}],
      }}
    >
      <Form.List name="subjects">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, index) => (
              <Row gutter={[10, 0]} key={key} align="middle">
                <Col xs={24} md={8}>
                  <Form.Item
                    {...restField}
                    name={[name, "name"]}
                    label={`Name ${fields.length > 1 ? index + 1 : ""}`}
                    rules={[{ required: true, message: "Name is required" }]}
                  >
                    <Input placeholder="Enter subject name" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={8}>
                  <Form.Item
                    {...restField}
                    name={[name, "code"]}
                    label="Code"
                    rules={[{ required: true, message: "Code is required" }]}
                  >
                    <InputNumber
                      placeholder="Enter subject code"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>

                {editMode && (
                  <Col xs={24} md={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "status"]}
                      label="Status"
                      rules={[{ required: true, message: "Select status" }]}
                    >
                      <Radio.Group>
                        <Radio value={true}>Active</Radio>
                        <Radio value={false}>Inactive</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                )}

                {!editMode && fields.length > 1 && (
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

            {!editMode && (
              <Row>
                <Col span={24}>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                    block
                  >
                    Add Another Subject
                  </Button>
                </Col>
              </Row>
            )}
          </>
        )}
      </Form.List>

      <FormSubmit name={editMode ? "Update" : "Submit"} loading={isLoading} />
    </Form>
  );
};

export default CreateSubject;
