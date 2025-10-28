import { FileExcelOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Card, Form, Space, Upload, message } from "antd";
import { RcFile } from "antd/lib/upload";
import Papa from "papaparse";
import React, { useEffect, useState } from "react";
import FileUploadLabel from "../../../utilities/FileUploadLabel";
import { useCreateSubjectMutation } from "../api/subjectApiEndpoints";
import { ICreateSubjecCSVtType } from "../types/subjectTypes";

const CreateSubjectFile: React.FC = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<RcFile[]>([]);
  const [jsonData, setJsonData] = useState<ICreateSubjecCSVtType[]>([]);

  const [createBulkSubject, { isLoading }] = useCreateSubjectMutation();
  useEffect(() => {
    form.resetFields();
    setFileList([]);
    setJsonData([]);
  }, [form]);

  // Clean up CSV before parsing
  const preprocessCSV = (csvString: string) => {
    if (csvString.charCodeAt(0) === 0xfeff) csvString = csvString.slice(1);

    csvString = csvString.replace(/“|”/g, '"');
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

      const results = Papa.parse<ICreateSubjecCSVtType>(csvString, {
        header: true,
        skipEmptyLines: true,
        quoteChar: '"',
        dynamicTyping: false,
        delimiter: ",",
        transformHeader: (header) => header.trim().toLowerCase(),
      });
      console.log({ results });
      const data: ICreateSubjecCSVtType[] = results.data.map((row) => ({
        name: (row.name || "").toString().trim(),
        code: (row.code || "").toString(),
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

    const headers: Array<keyof ICreateSubjecCSVtType> = ["name", "code"];
    const headerLabels = {
      name: "Subject Name",
      code: "Subject Code",
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
      await createBulkSubject(jsonData).unwrap();
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
      "\uFEFF" + "Name,Code\n" + "Physics,27049\n" + "Mathematics,37044";

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "create_subject_template.csv";
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

export default CreateSubjectFile;
