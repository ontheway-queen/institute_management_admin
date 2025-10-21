import { PermissionItem } from '../components/RolePermissionForm';

export interface UserAdminListType {
  user_id: number;
  username: string;
  name: string;
  email: string;
  phone_number: string;
  photo: string;
  status: string;
  is_main?: boolean;
  is_2fa_on: boolean;
}
export interface UserSingleAdminType extends UserAdminListType {
  is_main: boolean;
}

export interface IQueryParams {
  limit?: string;
  skip?: string;
  name?: string;
  status?: string | Boolean;
  filter?: string;
}
export type AdminUserCreateType = {
  email: string;
  name: string;
  password: string;
  phone_number: string;
  role_id: string;
  photo: [
    {
      originFileObj: File;
    }
  ];
  username: string;
};
/* -----------------role-------------------------------------- */
export interface IRoleList {
  role_id: number;
  role_name: string;
  created_by: string;
  create_date: string;
}
/* -----------------role-------------------------------------- */

export interface IPermissionData {
  permission_id: number;
  permission_name: string;
  read: number;
  write: number;
  update: number;
  delete: number;
}
export interface ISingleRole {
  role_id: number;
  role_name: string;
  status: number;
  is_main_role: number;
  permissions: InitData[];
}
export interface IPermissionList {
  permission_id: number;
  permission_name: string;
  created_by?: string;
  create_date?: string;
}

export type InitData = {
  permission_id: number;
  permission_name: string;
  read?: number;
  write?: number;
  update?: number;
  delete?: number;
} & IPermissionList;

export type ICreateRole = {
  role_name: string;
  permissions: PermissionItem[];
};
export type IUpdateRole = {
  status: number;
} & ICreateRole;
