import { Typography, Tooltip } from "antd";
import { FileExcelOutlined, InfoCircleOutlined } from "@ant-design/icons";

const { Text, Link } = Typography;

const FileUploadLabel = ({ onDownloadSample }: any) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
      }}
    >
      <Text
        style={{
          paddingLeft: "100px",
        }}
      >
        Upload CSV File
      </Text>
      <Text style={{ color: "red" }}>*</Text>
      <Tooltip title="Download a sample CSV template">
        <Link
          onClick={onDownloadSample}
          style={{
            color: "#1890ff",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "14px",
          }}
        >
          <FileExcelOutlined style={{ color: "green" }} />
          <Text style={{ color: "#1890ff" }}>(Download Sample)</Text>
        </Link>
      </Tooltip>
      <Tooltip title="Please ensure your file matches the sample format">
        <InfoCircleOutlined style={{ color: "gray" }} />
      </Tooltip>
    </div>
  );
};

export default FileUploadLabel;
