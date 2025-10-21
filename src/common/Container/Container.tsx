import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  FormInstance,
  Input,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ModalTypes, showModal } from "../../app/slice/modalSlice";
import { useAppDispatch, useAppSelector } from "../../app/store";
import Iconify from "../../config/IconifyConfig";
import useBreakpoint from "../../hooks/useBreakpoint";
import BreadCrumb from "../Antd/BreadCrumb";
import { DrawerTypes, showDrawer } from "../../app/slice/drawerSlice";
import { SearchOutlined } from "@ant-design/icons";
import useQueryParams from "../../hooks/useQueryParams";
import { debounce } from "lodash";
import dayjs from "dayjs";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ThemeState } from "../../app/slice/themeSlice";
import { hexToRgba, rangePresets } from "../../utilities/helper";
const { Text } = Typography;
const { RangePicker } = DatePicker;
interface Props {
  showBackbtn?: boolean;
  showTitleWithIcon?: string;
  title: string | React.ReactNode;
  content: React.ReactNode;
  buttonLabel?: string;
  openModal?: ModalTypes;
  openDrawer?: DrawerTypes;
  buttonLink?: string;
  options?: {
    showButton?: boolean;
    showSearch?: boolean;
    placeholder?: string;
    showDateRange?: boolean;
    searchKeyName?: string;
    showStatus?: boolean;
    showStatus1?: boolean;
    showSearchFilter?: boolean;
  };
  additionalContent?: React.ReactNode[];
  additionalButton?: React.ReactNode;
  filterData?: {
    [key: string]: string | number | boolean;
  };

  handleSearchFun?: (value: string) => void;
  statusOption?: {
    placeholder?: string;
    options?: { value: string; label: string }[];
    queryName?: string;
    defaultValue?: string;
  };
  statusOption1?: {
    defaultValue?: string;
    placeholder?: string;
    queryName?: string;
    options?: { value: string; label: string }[];
  };
  form?: FormInstance<any>;
}

const Container: React.FC<Props> = ({
  title,
  content,
  openModal,
  openDrawer,
  buttonLabel = "Create",
  options = {},
  buttonLink,
  handleSearchFun,
  statusOption,
  statusOption1,
  showBackbtn,
  showTitleWithIcon,
}) => {
  const { colorPrimary, mode } = useAppSelector(ThemeState);
  const isLight: boolean = mode === "light" ? true : false;
  const [query, setSearchParams, searchParams] = useQueryParams<{
    limit: string;
    skip: string;
  }>();

  const { lg } = useBreakpoint();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const activeOptions = {
    showButton: options.showButton,
    showSearch: options.showSearch,
    searchKeyName: options.searchKeyName,
    placeholder: options.placeholder ?? "Search",
    showDateRange: options.showDateRange,
    showStatus: options.showStatus,
    showStatus1: options.showStatus1,
    showSearchFilter: options.showSearchFilter,
  };

  const handleSearch = useCallback(
    debounce((value) => {
      handleSearchFun?.(value.target.value);
      if (value.target.value) {
        if (activeOptions?.searchKeyName) {
          setSearchParams({
            ...query,
            [activeOptions?.searchKeyName]: value.target.value,
          });
        } else {
          setSearchParams({ ...query, filter: value.target.value });
        }
      } else {
        searchParams.delete(activeOptions?.searchKeyName || "filter");
        setSearchParams(searchParams);
      }
    }, 500),
    []
  );
  return (
    <Space direction="vertical" style={{ width: "100%" }} size={"large"}>
      <Card size="small">
        <BreadCrumb />
        {activeOptions?.showSearchFilter && (
          <Row
            style={{
              background: isLight ? "rgb(249 250 251)" : "",
              border: !isLight ? "1px solid #353232" : "none",
              padding: "10px 5px",
              borderWidth: "1px",
              marginTop: "20px",
            }}
            gutter={[10, 10]}
            justify={"space-between"}
          >
            <Col
              xs={24}
              lg={6}
              xl={6}
              style={{ display: "flex", alignItems: "center" }}
            >
              <span style={{ display: "flex", gap: "5px" }}>
                <Icon
                  icon={"uil:filter"}
                  color={colorPrimary}
                  fontSize={20}
                  style={{
                    background: hexToRgba(colorPrimary, 0.2),
                    padding: "2px",
                  }}
                />{" "}
                <Text strong> Filter & Search Controls</Text>
              </span>
            </Col>

            <Col xs={24} lg={18} xl={18} xxl={15}>
              <Row justify={"end"} gutter={[5, 5]}>
                {activeOptions.showSearch && (
                  <Col xs={24} sm={24} md={8} xl={6}>
                    <Input
                      allowClear
                      defaultValue={
                        searchParams.get(
                          activeOptions.searchKeyName || "filter"
                        ) || undefined
                      }
                      maxLength={50}
                      prefix={<SearchOutlined />}
                      placeholder={activeOptions.placeholder}
                      onChange={handleSearch}
                    />
                  </Col>
                )}
                {activeOptions.showStatus && (
                  <Col xs={24} sm={24} md={8} xl={6}>
                    <Select
                      defaultValue={
                        searchParams.get(statusOption?.queryName || "status") ||
                        statusOption?.defaultValue
                      }
                      style={{ width: "100%" }}
                      allowClear
                      options={statusOption?.options}
                      placeholder={statusOption?.placeholder || "Select"}
                      onChange={(e) => {
                        if (e) {
                          setSearchParams({
                            ...query,
                            [`${statusOption?.queryName || "status"}`]: e,
                          });
                        } else {
                          searchParams.delete(
                            statusOption?.queryName || "status"
                          );
                          setSearchParams(searchParams);
                        }
                      }}
                    />
                  </Col>
                )}
                {activeOptions.showStatus1 && (
                  <Col xs={24} sm={24} md={8} xl={6}>
                    <Select
                      defaultValue={
                        searchParams.get(statusOption1?.queryName || "") ||
                        statusOption1?.defaultValue
                      }
                      style={{ width: "100%" }}
                      allowClear
                      options={statusOption1?.options}
                      placeholder={statusOption1?.placeholder || "Select"}
                      onChange={(e) => {
                        if (e) {
                          setSearchParams({
                            ...query,
                            [`${statusOption1?.queryName || "status"}`]: e,
                          });
                        } else {
                          searchParams.delete(
                            statusOption1?.queryName || "status"
                          );
                          setSearchParams(searchParams);
                        }
                      }}
                    />
                  </Col>
                )}
                {activeOptions.showDateRange && (
                  <Col xs={24} sm={24} md={8} xl={6}>
                    <>
                      <RangePicker
                        style={{ width: "100%" }}
                        presets={rangePresets}
                        defaultValue={
                          searchParams.get("start_date") &&
                          searchParams.get("end_date")
                            ? [
                                dayjs(searchParams.get("start_date")),
                                dayjs(searchParams.get("end_date")),
                              ]
                            : undefined
                        }
                        onChange={(e, dateRange) => {
                          if (e) {
                            setSearchParams({
                              ...query,
                              start_date: dateRange[0],
                              end_date: dateRange[1],
                            });
                          } else {
                            searchParams.delete("start_date");
                            searchParams.delete("end_date");
                            setSearchParams(searchParams);
                          }
                        }}
                      />
                    </>
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
        )}
      </Card>

      <Card size="small">
        <Row justify={"space-between"} align={"middle"}>
          {showBackbtn && (
            <Col>
              <Icon
                icon="fxemoji:backwithleftwardsarrow"
                width="30"
                height="25"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(-1)}
              />
            </Col>
          )}

          <Col>
            <Typography.Text
              strong
              style={{
                fontSize: lg ? "1.5rem" : "1rem",
                margin: 0,
              }}
            >
              <Space align="center" style={{ lineHeight: 0 }}>
                {showTitleWithIcon && (
                  <Icon icon={showTitleWithIcon} width="28" height="25" />
                )}

                {title}
              </Space>
              {showBackbtn && (
                <Divider
                  style={{ margin: 0, padding: 0 }}
                  orientationMargin={0}
                />
              )}
            </Typography.Text>{" "}
          </Col>

          <Col>
            {activeOptions.showButton && (
              <Button
                style={{ width: "100%" }}
                onClick={() => {
                  return buttonLink
                    ? navigate(buttonLink)
                    : dispatch(
                        openModal
                          ? showModal({ ...openModal })
                          : showDrawer(openDrawer)
                      );
                }}
                type="primary"
                icon={<Iconify icon="mdi:add-bold" />}
              >
                {buttonLabel}
              </Button>
            )}
          </Col>
        </Row>

        <div style={{ marginTop: "12px" }}>{content}</div>
      </Card>
    </Space>
  );
};

export default Container;
