// import type { TabsProps } from "antd";
// import { Tabs } from "antd";
// import { useForm } from "antd/es/form/Form";
// import CreateSubject from "./CreateSubject";
// import { setFormInstance } from "../../../app/utilities/formManager";

// interface props {
//   semester_id: string;
//   department_id: string;
// }

// const SelectCreateStudent = ({ semester_id, department_id }: props) => {
//   const [form] = useForm();
//   const [createStudentList, { isLoading }] = useCreateStudentMutation();
//   const onFinish = async (values: ICreateStudent) => {
//     const payload = {
//       ...values,
//       department_id: Number(department_id),
//       semester_id: Number(semester_id),
//     };
//     setFormInstance(form);
//     await createStudentList(payload).unwrap();
//   };
//   const items: TabsProps["items"] = [
//     {
//       key: "1",
//       label: "Add New",
//       children: <CreateSubject  />,
//     },
//     {
//       key: "2",
//       label: "Migrate",
//       children: (
//         <AddSemesterWiseStudent
//           department_id={department_id}
//           semester_id={semester_id}
//         />
//       ),
//     },

//     {
//       key: "3",
//       label: "File",
//       children: <CreateStudentFile semester_id={semester_id} />,
//     },
//   ];

//   return <Tabs defaultActiveKey="1" items={items} />;
// };

// export default SelectCreateStudent;
