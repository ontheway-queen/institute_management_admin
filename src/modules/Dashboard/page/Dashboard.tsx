import { Col, Row, Typography, List } from "antd";
import { Icon } from "@iconify/react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Card from "../../../common/Antd/Card";
import Table from "../../../common/Antd/Table";
import useBreakpoint from "../../../hooks/useBreakpoint";

// Destructuring Ant Design components for easier use
const { Title, Text } = Typography;

const Dashboard = () => {
  const { xl } = useBreakpoint();
  // Hardcoded data for dashboard statistics
  const stats = [
    { title: "Technologies", value: 8, icon: "mdi:office-building" },
    { title: "Semesters", value: 12, icon: "mdi:calendar-range" },
    { title: "Batches", value: 24, icon: "mdi:layers" },
    { title: "Teachers", value: 56, icon: "mdi:account-tie" },
    { title: "Students", value: 1200, icon: "mdi:account-group" },
    { title: "Sessions", value: 6, icon: "mdi:school" },
  ];

  // Data for the Students per Department Pie Chart
  const deptData = [
    { name: "CSE", value: 400 },
    { name: "EEE", value: 300 },
    { name: "BBA", value: 300 },
    { name: "English", value: 200 },
  ];

  // Data for the Students per Batch Bar Chart
  const batchData = [
    { name: "Batch 2021", students: 200 },
    { name: "Batch 2022", students: 350 },
    { name: "Batch 2023", students: 420 },
  ];

  // Data for the Latest Applicants section
  const latestApplicantsData = [
    { id: 1, name: "John Doe", department: "CSE", date: "2025-08-25" },
    { id: 2, name: "Jane Smith", department: "EEE", date: "2025-08-24" },
    { id: 3, name: "Peter Jones", department: "BBA", date: "2025-08-23" },
    { id: 4, name: "Mary Brown", department: "English", date: "2025-08-22" },
  ];

  // Data for the Courses Overview table
  const courseData = [
    {
      id: "C001",
      name: "Introduction to Programming",
      technology: "CSE",
      students: 125,
      sessions: 20,
    },
    {
      id: "C002",
      name: "Circuit Analysis I",
      technology: "EEE",
      students: 98,
      sessions: 18,
    },
    {
      id: "C003",
      name: "Principles of Marketing",
      technology: "BBA",
      students: 110,
      sessions: 22,
    },
    {
      id: "C004",
      name: "Academic Writing",
      technology: "English",
      students: 85,
      sessions: 15,
    },
  ];

  // Column definitions for the Courses Overview table
  const courseColumns = [
    { title: "Course ID", dataIndex: "id", key: "id" },
    { title: "Course Name", dataIndex: "name", key: "name" },
    { title: "Technology", dataIndex: "technology", key: "technology" },
    {
      title: "Students",
      dataIndex: "students",
      key: "students",
    },
    {
      title: "Sessions",
      dataIndex: "sessions",
      key: "sessions",
    },
  ];

  const enrollmentTrend = [
    { year: "2020", students: 850 },
    { year: "2021", students: 950 },
    { year: "2022", students: 1050 },
    { year: "2023", students: 1200 },
    { year: "2024", students: 1250 },
  ];

  const activities = [
    {
      id: 1,
      message: "New student John Doe enrolled in Batch 2023",
      time: "2h ago",
    },
    {
      id: 2,
      message: "Exam scheduled: CSE Mid-term on 15 Sep",
      time: "5h ago",
    },
    {
      id: 3,
      message: "Payment received from Student #1023",
      time: "1 day ago",
    },
    {
      id: 4,
      message: "New Teacher: Dr. Sarah Lee joined English Dept.",
      time: "2 days ago",
    },
  ];

  const upcomingExams = [
    { subject: "Math Midterm", date: "2025-09-10", batch: "Batch 2023" },
    { subject: "CSE Final", date: "2025-09-15", batch: "Batch 2022" },
    { subject: "English Viva", date: "2025-09-20", batch: "Batch 2021" },
  ];
  // Color palette for the Pie Chart
  const COLORS = ["#1677ff", "#52c41a", "#faad14", "#eb2f96"];

  return (
    <div
      className="dashboard-wrapper"
      style={{ background: "#f5f5f5", minHeight: "100vh" }}
    >
      <Row gutter={[16, 16]}>
        {stats?.map((item) => (
          <Col xs={24} sm={12} md={8} lg={4} key={item.title}>
            <Card hoverable heightFull>
              <Row align="middle" gutter={[12, 0]}>
                <Col>
                  <Icon
                    icon={item.icon}
                    style={{ fontSize: 32, color: "#1677ff" }}
                  />
                </Col>
                <Col>
                  <Text
                    type="secondary"
                    strong
                    style={{ fontSize: xl ? 18 : 15 }}
                  >
                    {item.title}
                  </Text>
                  <Title level={xl ? 4 : 5} style={{ margin: 0 }}>
                    {item.value}
                  </Title>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}

        <Col span={24}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Card customTitle="Students per Batch" titleUnderline heightFull>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={batchData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="students"
                      fill="#1677ff"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card
                size="small"
                customTitle="Students per Technology"
                titleUnderline
                heightFull
              >
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={deptData} dataKey="value" outerRadius={80} label>
                      {deptData.map((_, i) => (
                        <Cell
                          key={`cell-${i}`}
                          fill={COLORS[i % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card
                size="small"
                customTitle="Enrollment Trend"
                titleUnderline
                heightFull
              >
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={enrollmentTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="students"
                      stroke="#1677ff"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card customTitle="Recent Activities" titleUnderline heightFull>
                <List
                  itemLayout="horizontal"
                  dataSource={activities}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Icon
                            icon="mdi:bell-outline"
                            style={{ fontSize: 20, color: "#1677ff" }}
                          />
                        }
                        title={item.message}
                        description={item.time}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card customTitle="Upcoming Exams" titleUnderline heightFull>
                <Table
                  dataSource={upcomingExams}
                  pagination={false}
                  rowKey="subject"
                  columns={[
                    { title: "Subject", dataIndex: "subject" },
                    { title: "Date", dataIndex: "date" },
                    { title: "Batch", dataIndex: "batch" },
                  ]}
                />
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card customTitle="Latest Applicants" titleUnderline heightFull>
                <List
                  itemLayout="horizontal"
                  dataSource={latestApplicantsData}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Icon
                            icon="mdi:account-plus"
                            style={{ fontSize: 24, color: "#52c41a" }}
                          />
                        }
                        title={<a href="#">{item.name}</a>}
                        description={`Department: ${item.department} | Applied: ${item.date}`}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card customTitle="Courses Overview" titleUnderline heightFull>
                <Table
                  dataSource={courseData}
                  columns={courseColumns}
                  pagination={false}
                  rowKey="id"
                />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
