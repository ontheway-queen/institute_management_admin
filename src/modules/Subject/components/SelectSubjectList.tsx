
import type { TabsProps } from "antd";
import { Tabs } from "antd";
import CreateSubject from "./CreateSubject";
import CreateSubjectFile from "./CreateSubjectFile";

const SelectCreateSubject = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Add New",
      children: <CreateSubject />,
    },

    {
      key: "2",
      label: "File",
      children: <CreateSubjectFile />,
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
};

export default SelectCreateSubject;
