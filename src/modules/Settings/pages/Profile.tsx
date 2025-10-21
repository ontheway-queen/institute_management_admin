import {
  Card,
  Badge,
  Button,
  Typography,
  Space,
  Row,
  Col,
  Divider,
  Tag,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  CrownOutlined,
  WifiOutlined,
  SafetyOutlined,
  GlobalOutlined,
  HomeOutlined,
  FieldTimeOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";
import {
  useEditProfileMutation,
  useGetProfileQuery,
} from "../api/profileEndpoint";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { showModal } from "../../../app/slice/modalSlice";
import EditAdminUser from "../../Administration/components/EditAdminUser";
import { ThemeState } from "../../../app/slice/themeSlice";
import Avatar from "../../../common/Antd/Avatar";

const { Title, Text } = Typography;

const Profile = () => {
  const [editProfile, { isLoading: profileLod }] = useEditProfileMutation();
  const { data } = useGetProfileQuery();
  const dispatch = useAppDispatch();
  const profile = data?.data;
  const institute = profile?.institute;

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* ================= USER CARD ================= */}
        <Card
          style={{
            background:
              "linear-gradient(135deg, rgba(0, 33, 71, 1), rgba(46, 84, 139, 0.8))",
          }}
          size="small"
        >
          <Row justify="space-between" align="top">
            <Col>
              <Space size="large" align="start">
                <Badge
                  dot
                  status={profile?.status === "active" ? "success" : "error"}
                  offset={[-8, 8]}
                >
                  <Avatar
                    size={120}
                    url={profile?.photo}
                    style={{
                      border: "4px solid white",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    }}
                    shape="square"
                  />
                </Badge>

                <Space direction="vertical" size="small">
                  <Space align="center">
                    <Title
                      level={2}
                      style={{
                        margin: 0,
                        color: "white",
                        position: "relative",
                        width: "100%",
                        marginBottom: "15px",
                      }}
                    >
                      {profile?.name} <br />
                      <span
                        style={{
                          fontSize: "11px",
                          position: "absolute",
                          top: "36px",
                          width: "100%",
                        }}
                      >
                        @{profile?.login_id}
                      </span>
                    </Title>

                    {profile?.is_main && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: "1rem",
                        }}
                      >
                        <CrownOutlined
                          style={{ color: "#ffd700", fontSize: "36px" }}
                        />
                        <svg width="150" height="60" viewBox="0 0 150 60">
                          <defs>
                            <path id="curve" d="M 10 55 A 60 40 0 0 1 140 59" />
                          </defs>
                          <text
                            fontSize="16"
                            fontWeight="600"
                            fill="white"
                            fontFamily="'Segoe UI', sans-serif"
                            textAnchor="middle"
                          >
                            <textPath href="#curve" startOffset="50%">
                              Main User
                            </textPath>
                          </text>
                        </svg>
                      </div>
                    )}
                  </Space>

                  <Space size="large">
                    <Space align="center">
                      {profile?.status === "active" ? (
                        <>
                          <CheckCircleOutlined style={{ color: "#52c41a" }} />
                          <Text style={{ color: "rgba(255,255,255,0.85)" }}>
                            Active
                          </Text>
                        </>
                      ) : (
                        <>
                          <CloseCircleOutlined style={{ color: "#ff4d4f" }} />
                          <Text style={{ color: "rgba(255,255,255,0.85)" }}>
                            Inactive
                          </Text>
                        </>
                      )}
                    </Space>
                    <Space align="center">
                      <WifiOutlined style={{ color: "#1890ff" }} />
                      <Text style={{ color: "rgba(255,255,255,0.85)" }}>
                        Online
                      </Text>
                    </Space>
                  </Space>
                </Space>
              </Space>
            </Col>

            <Col>
              <Space>
                <Button
                  type="default"
                  icon={<EditOutlined />}
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    color: "white",
                  }}
                  onClick={() => {
                    if (profile) {
                      dispatch(
                        showModal({
                          title: "User Edit",
                          content: (
                            <EditAdminUser
                              isProfile
                              record={{
                                email: profile.email,
                                is_2fa_on: profile.is_2fa_on,
                                phone_number: profile.phone,
                                status: profile.status,
                                photo: profile.photo,
                                user_id: profile.user_id,
                                username: profile.name,
                                name: profile.name,
                              }}
                              id={profile.institute_id}
                            />
                          ),
                        })
                      );
                    }
                  }}
                >
                  Edit Profile
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        <Row gutter={[24, 24]}>
          {/* =============== CONTACT INFORMATION =============== */}
          <Col xs={24} lg={16}>
            <Card
              title={
                <Title level={4} style={{ margin: 0 }}>
                  Contact Information
                </Title>
              }
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <InfoCard
                    icon={<UserOutlined style={{ color: "#722ed1" }} />}
                    label="Name"
                    value={profile?.name || "-"}
                  />
                </Col>
                <Col xs={24} md={12}>
                  <InfoCard
                    icon={<MailOutlined style={{ color: "#1890ff" }} />}
                    label="Email"
                    value={profile?.email || "-"}
                  />
                </Col>
                <Col xs={24} md={12}>
                  <InfoCard
                    icon={<PhoneOutlined style={{ color: "#52c41a" }} />}
                    label="Phone"
                    value={profile?.phone || "-"}
                  />
                </Col>
                <Col xs={24} md={12}>
                  <InfoCard
                    icon={<UserOutlined style={{ color: "#fa541c" }} />}
                    label="Gender"
                    value={profile?.gender || "-"}
                  />
                </Col>
                <Col xs={24} md={12}>
                  <InfoCard
                    icon={<UserOutlined style={{ color: "#d4380d" }} />}
                    label="Blood Group"
                    value={profile?.blood_group || "-"}
                  />
                </Col>
                <Col xs={24} md={12}>
                  <InfoCard
                    icon={<UserOutlined style={{ color: "#ad6800" }} />}
                    label="NID"
                    value={profile?.nid || "-"}
                  />
                </Col>
              </Row>
            </Card>
          </Col>

          {/* =============== SECURITY & STATUS =============== */}
          <Col xs={24} lg={8}>
            <Card
              title={
                <Title level={4} style={{ margin: 0, height: "100%" }}>
                  Security & Status
                </Title>
              }
            >
              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%", height: "100%" }}
              >
                <Row justify="space-between" align="middle">
                  <Text strong>Account Status</Text>
                  <Tag color={profile?.status === "active" ? "green" : "red"}>
                    {profile?.status}
                  </Tag>
                </Row>

                <Divider style={{ margin: "8px 0" }} />

                <Row justify="space-between" align="middle">
                  <Text strong>Two-Factor Auth</Text>
                  <Tag color={profile?.is_2fa_on ? "green" : "default"}>
                    {profile?.is_2fa_on ? "Enabled" : "Disabled"}
                  </Tag>
                </Row>

                <Divider style={{ margin: "8px 0" }} />

                <Button
                  loading={profileLod}
                  type={profile?.is_2fa_on ? "default" : "primary"}
                  icon={<SafetyOutlined />}
                  block
                  style={{ marginTop: "16px" }}
                  onClick={() => {
                    const formData = new FormData();
                    if (profile) {
                      formData.append("is_2fa_on", String(!profile.is_2fa_on));
                      editProfile({ body: formData });
                    }
                  }}
                >
                  {profile?.is_2fa_on ? "Disable 2FA" : "Enable 2FA"}
                </Button>
              </Space>
            </Card>
          </Col>
        </Row>

        {/* =============== INSTITUTE CARD =============== */}
        {institute && (
          <Card
            style={{ marginTop: 24 }}
            title={
              <Space>
                <ApartmentOutlined style={{ color: "#722ed1" }} />
                <Title level={4} style={{ margin: 0 }}>
                  Institute Information
                </Title>
              </Space>
            }
          >
            <Row gutter={[24, 24]} align="middle">
              <Col xs={24} md={6} style={{ textAlign: "center" }}>
                <Avatar
                  size={120}
                  url={institute?.institute_logo}
                  shape="square"
                  style={{
                    border: "2px solid #eee",
                    marginBottom: 12,
                  }}
                />
                <Title level={5} style={{ margin: 0 }}>
                  {institute.institute_name}
                </Title>
                <Tag color="blue">{institute.category}</Tag>
                <Tag color="purple">{institute.ownership}</Tag>
              </Col>

              <Col xs={24} md={18}>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={24} md={12} lg={12}>
                    <InfoCard
                      icon={<GlobalOutlined style={{ color: "#1890ff" }} />}
                      label="Website"
                      value={institute.institute_website}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12}>
                    <InfoCard
                      icon={<PhoneOutlined style={{ color: "#52c41a" }} />}
                      label="Phone"
                      value={institute.institute_phone}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12}>
                    <InfoCard
                      icon={<MailOutlined style={{ color: "#722ed1" }} />}
                      label="Email"
                      value={institute.institute_email}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12}>
                    <InfoCard
                      icon={<HomeOutlined style={{ color: "#fa8c16" }} />}
                      label="Address"
                      value={`${institute.address}, ${institute.postal_code}`}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12}>
                    <InfoCard
                      icon={<FieldTimeOutlined style={{ color: "#d46b08" }} />}
                      label="Established"
                      value={institute.established_year}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12}>
                    <InfoCard
                      icon={<UserOutlined style={{ color: "#13c2c2" }} />}
                      label="Institute Head"
                      value={institute.institute_head?.name}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        )}
      </Space>
    </div>
  );
};

// 🔹 Small reusable info component
const InfoCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string | number | null;
}) => {
  const { mode } = useAppSelector(ThemeState);
  const isLight = mode === "light";

  return (
    <Card
      size="small"
      style={{
        background: isLight ? "#f8f9fa" : "",
        border: !isLight ? "1px solid #353232" : "none",
        borderRadius: "8px",
      }}
    >
      <Space align="center">
        {icon}
        <Space direction="vertical" size={0}>
          <Text type="secondary" style={{ fontSize: "12px" }}>
            {label}
          </Text>
          <Text strong>{value || "-"}</Text>
        </Space>
      </Space>
    </Card>
  );
};

export default Profile;
