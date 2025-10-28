import { FileExcelOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Card, Form, Space, Upload, message } from "antd";
import { RcFile } from "antd/lib/upload";
import Papa from "papaparse";
import React, { useEffect, useState } from "react";
import FileUploadLabel from "../../../utilities/FileUploadLabel";
import { ICreateDepartmentCSVType } from "../types/departmentTypes";
import { useCreateDepartmentMutation } from "../api/departmentApiEndpoints";

const CreateTechnologyFile: React.FC = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<RcFile[]>([]);
  const [jsonData, setJsonData] = useState<ICreateDepartmentCSVType[]>([]);

  const [createBulkTechnology, { isLoading }] = useCreateDepartmentMutation();
  useEffect(() => {
    form.resetFields();
    setFileList([]);
    setJsonData([]);
  }, [form]);

  // Clean up CSV before parsing
  const preprocessCSV = (csvString: string) => {
    if (csvString.charCodeAt(0) === 0xfeff) csvString = csvString.slice(1);
    csvString = csvString.replace(/"([^"]*)\n([^"]*)"/g, '"$1 $2"');
    return csvString;
  };

  const beforeUpload = async (file: RcFile) => {
    const isCsvOrExcel =
      file.type === "text/csv" ||
      file.type === "application/vnd.ms-excel" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    if (!isCsvOrExcel) {
      message.error("You can only upload CSV or Excel files!");
      return false;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      let csvString = e.target?.result as string;
      csvString = preprocessCSV(csvString);

      const results = Papa.parse<ICreateDepartmentCSVType>(csvString, {
        header: true,
        skipEmptyLines: true,
        quoteChar: '"',
        dynamicTyping: false,
        delimiter: ",",
        transformHeader: (header) =>
          header.trim().toLowerCase().replace(/\s+/g, "_"),
      });
      console.log({ results });
      const data: ICreateDepartmentCSVType[] = results.data.map((row) => ({
        name: (row.name || "").toString().trim(),
        code: (row.code || "").toString(),
        short_name: (row["short_name"] || "").toString().trim(),
      }));

      setJsonData(data);
      setFileList([file]);
    };

    reader.readAsText(file, "utf-8");

    return false;
  };

  const onRemove = () => {
    setFileList([]);
    setJsonData([]);
  };

  const renderJsonData = () => {
    if (jsonData.length === 0) return null;

    const headers: Array<keyof ICreateDepartmentCSVType> = [
      "name",
      "code",
      "short_name",
    ];
    const headerLabels = {
      name: "Technology Name",
      code: "Technology Code",
      short_name: "Short Name",
    };

    return (
      <div style={{ width: "100%", overflowX: "auto", height: "300px" }}>
        <h3>Preview of Uploaded Data:</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    backgroundColor: "#f2f2f2",
                  }}
                >
                  {headerLabels[header]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {jsonData.map((row, index) => (
              <tr key={index}>
                {headers.map((header) => (
                  <td
                    key={header}
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const handleSubmit = async () => {
    if (fileList.length === 0) {
      message.error("Please upload a CSV file!");
      return;
    }

    try {
      await createBulkTechnology(jsonData).unwrap();
      form.resetFields();
      setFileList([]);
      setJsonData([]);
      message.success("Technologies created successfully!");
    } catch (err: any) {
      const errorMessage =
        err.data?.message || "Failed to create technologies. Please try again.";
      message.error(errorMessage);
    }
  };

  const handleDownloadSample = () => {
    const csvContent =
      "\uFEFF" +
      "Name,Code, Short Name\n" +
      "Power Technology,69, PT\n" +
      "Computer Science and Engineering,71,CSE";

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "create_technology_template.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card
      style={{ margin: "24px auto", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark={false}
        >
          <Form.Item
            label={<FileUploadLabel onDownloadSample={handleDownloadSample} />}
            required
            tooltip="Upload a CSV file containing technology information"
            style={{ marginBottom: 0, textAlign: "center" }}
          >
            <div
              style={{
                display: "flex",
                gap: "16px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Upload
                beforeUpload={beforeUpload}
                onRemove={onRemove}
                fileList={fileList}
                accept=".csv"
                maxCount={1}
              >
                <Button
                  icon={<UploadOutlined />}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px dashed #d9d9d9",
                    background: "#fafafa",
                  }}
                >
                  <Space>
                    <FileExcelOutlined />
                    Click to Upload CSV File
                  </Space>
                </Button>
              </Upload>
            </div>
          </Form.Item>

          {renderJsonData()}

          <Form.Item style={{ marginTop: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              style={{ width: "100%" }}
            >
              Create Subject
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </Card>
  );
};

export default CreateTechnologyFile;
