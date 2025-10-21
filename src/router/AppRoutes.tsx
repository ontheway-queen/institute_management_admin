import { RouteObject } from "react-router-dom";
import Dashboard from "../modules/Dashboard/page/Dashboard";
import AdminUsersList from "../modules/Administration/pages/AdminUsersList";
import RoleList from "../modules/Administration/pages/RoleList";
import DepartmentList from "../modules/Department/pages/DepartmentList";

import CreateInstitute from "../modules/Institute/pages/CreateInstitute";
import SemesterList from "../modules/Semester/pages/SemesterList";
import SubjectList from "../modules/Subject/pages/SubjectList";
import CreateSubject from "../modules/Subject/components/CreateSubject";
import InstituteList from "../modules/Institute/pages/InstituteList";
import ViewInstitute from "../modules/Institute/pages/ViewInstitute";

type AppRouteObject = RouteObject & {
  children?: AppRouteObject[];
};

export const appRoutes: AppRouteObject[] = [
  {
    path: "/",
    element: <Dashboard />,
  },

  {
    path: "/department",
    children: [
      {
        path: "list",
        element: <DepartmentList />,
      },
    ],
  },

  {
    path: "/institute",
    children: [
      {
        path: "list",
        element: <InstituteList />,
      },
      {
        path: "create",
        element: <CreateInstitute />,
      },
      { path: "view/:id", element: <ViewInstitute /> },
    ],
  },
  {
    path: "/semester",
    children: [
      {
        path: "list",
        element: <SemesterList />,
      },
      {
        path: "create",
        element: <CreateInstitute />,
      },
    ],
  },
  {
    path: "/subject",
    children: [
      {
        path: "list",
        element: <SubjectList />,
      },
      {
        path: "create",
        element: <CreateSubject />,
      },
    ],
  },

  {
    path: "/administration",
    children: [
      { path: "user/list", element: <AdminUsersList /> },
      { path: "role/list", element: <RoleList /> },
    ],
  },
];
