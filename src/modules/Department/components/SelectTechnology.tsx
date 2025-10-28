import type { TabsProps } from "antd";
import { Tabs } from "antd";
import CreateTechnology from "./CreateTechnology";
import CreateTechnologyFile from "./CreateTechnologyFile";

const SelectCreateTechnology = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Add New",
      children: <CreateTechnology />,
    },

    {
      key: "2",
      label: "File",
      children: <CreateTechnologyFile />,
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
};

export default SelectCreateTechnology;
