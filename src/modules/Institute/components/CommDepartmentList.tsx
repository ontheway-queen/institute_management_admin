import { ColProps, SelectProps } from "antd";
import { FormItemSelect } from "../../../common/Antd/Form/FormItems";
import CommSelectFieldSearch from "../../../common/Utilities/CommSelectFieldSearch";
import { useGetDepartmentListQuery } from "../api/instituteApiEndpoints";

type IProps = {
  colProps?: ColProps | undefined;
  ComponentProps?: SelectProps;
  name: string | string[];
  required?: boolean;
};
const CommDepartmentList = ({
  name,
  colProps,
  ComponentProps,
  required,
}: IProps) => {
  const { data } = useGetDepartmentListQuery({ status: true });
  return (
    <CommSelectFieldSearch>
      <FormItemSelect
        colProps={{ ...colProps }}
        name={name}
        label="Select Department"
        required={required}
        componentProps={{
          options:
            data?.data?.map((item) => ({
              label: item.name,
              value: item.id,
            })) || [],

          ...ComponentProps,
        }}
      />
    </CommSelectFieldSearch>
  );
};

export default CommDepartmentList;
