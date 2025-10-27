import { MenuProps } from "antd";
import { NavLink } from "react-router-dom";
import Iconify from "../../config/IconifyConfig";

export type NavigationItem = {
  key: string;
  label: string;
  to?: string;
  icon: string;
  children?: NavigationItem[];
};

const icons = { create: "pajamas:todo-add", list: "typcn:th-list" };

export const navigationMenu: NavigationItem[] = [
  {
    key: "/",
    to: "/",
    label: "Dashboard",
    icon: "streamline:dashboard-circle-solid",
  },
  {
    key: "/institute/list",
    to: "/institute/list",
    label: "Institute List",
    icon: icons.list,
  },
  {
    key: "/department/list",
    to: "/department/list",
    label: "Technology List",
    icon: icons.list,
  },
  {
    key: "/subject/list",
    to: "/subject/list",
    label: "Subject List",
    icon: icons.list,
  },
  {
    key: "/semester/list",
    to: "/semester/list",
    label: "Semester List",
    icon: icons.list,
  },
  // {
  //   key: "/department",
  //   to: "/department",
  //   label: "Department Management",
  //   icon: "flat-color-icons:department",
  //   children: [
  //     {
  //       key: "/department/list",
  //       to: "/department/list",
  //       label: "Department List",
  //       icon: icons.list,
  //     },
  //     {
  //       key: "/department/batch/list",
  //       to: "/department/batch/list",
  //       label: "Batch List",
  //       icon: icons.list,
  //     },
  //     {
  //       key: "/department/batch-wise-semester/list",
  //       to: "/department/batch-wise-semester/list",
  //       label: "Batch wise Semester List",
  //       icon: icons.list,
  //     },
  //     {
  //       key: "/department/assign-subject/list",
  //       to: "/department/assign-subject/list",
  //       label: "Assign Subject",
  //       icon: icons.list,
  //     },
  //   ],
  // },
  // {
  //   key: "/teacher",
  //   to: "/teacher",
  //   label: "Teacher Management",
  //   icon: "mdi:teacher",
  //   children: [
  //     {
  //       key: "/teacher/list",
  //       to: "/teacher/list",
  //       label: "Teacher List",
  //       icon: icons.list,
  //     },
  //   ],
  // },
  // {
  //   key: "/student",
  //   to: "/student",
  //   label: "Student Management",
  //   icon: "ph:student-fill",
  //   children: [
  //     {
  //       key: "/student/list",
  //       to: "/student/list",
  //       label: "Student List",
  //       icon: icons.list,
  //     },

  //     {
  //       key: "/student/student-enrollment/list",
  //       to: "/student/student-enrollment/list",
  //       label: "Student Enrollment",
  //       icon: icons.list,
  //     },
  //   ],
  // },
  // {
  //   key: "/attendance",
  //   to: "/attendance",
  //   label: "Attendance Summary",
  //   icon: "ph:student-fill",
  //   children: [
  //     {
  //       key: "/attendance/list",
  //       to: "/attendance/list",
  //       label: "Attendance Summary List",
  //       icon: icons.list,
  //     },
  //   ],
  // },

  // {
  //   key: "/configuration",
  //   to: "/configuration",
  //   label: "Configuration",
  //   icon: "hugeicons:configuration-01",
  //   children: [
  //     // {
  //     //   key: '/configuration/department/list',
  //     //   to: '/configuration/department/list',
  //     //   label: 'Department List',
  //     //   icon: icons.list,
  //     // },
  //     {
  //       key: "/configuration/semester/list",
  //       to: "/configuration/semester/list",
  //       label: "Semester List",
  //       icon: icons.list,
  //     },
  //     // {
  //     //   key: '/configuration/branch/list',
  //     //   to: '/configuration/branch/list',
  //     //   label: 'Branch List',
  //     //   icon: icons.list,
  //     // },
  //     {
  //       key: "/configuration/session/list",
  //       to: "/configuration/session/list",
  //       label: "Session List",
  //       icon: icons.list,
  //     },
  //     {
  //       key: "/configuration/subject/list",
  //       to: "/configuration/subject/list",
  //       label: "Subject List",
  //       icon: icons.list,
  //     },
  //   ],
  // },
  // {
  //   key: '/administration',
  //   to: '/administration',
  //   label: 'Administration',
  //   icon: 'eos-icons:admin',
  //   children: [
  //     {
  //       key: '/administration/user/list',
  //       to: '/administration/user/list',
  //       label: 'Admin List',
  //       icon: icons.list,
  //     },
  //     {
  //       key: '/administration/role/list',
  //       to: '/administration/role/list',
  //       label: 'Role List',
  //       icon: icons.list,
  //     },
  //   ],
  // },
];

export const renderMenuItem = (
  item: NavigationItem
): Required<MenuProps>["items"][number] => ({
  key: item.key,
  label: item.children ? (
    item.label
  ) : (
    <NavLink
      style={({ isActive }) => {
        return {
          fontWeight: isActive ? 600 : "normal",
        };
      }}
      to={String(item.to)}
    >
      {item.label}
    </NavLink>
  ),
  icon: <Iconify icon={item.icon} />,
  ...(item.children && { children: item.children.map(renderMenuItem) }),
  type: "item",
});
