
  export interface ISubjectListType {
  id: number;
  name: string;
  code: string;
  status: boolean;
  created_by: number;
  created_by_name: string;
  created_at: string; // ISO timestamp (e.g. "2025-10-14T05:09:41.249Z")
}
export interface ICreateDepartmentType {
  name: string;
  code: number;
  short_name: string;
  status: boolean;
  semesters?: number[];
}
export interface IDepartmentFormValues {
  departments: ICreateDepartmentType[];
}
export interface IUpdateDepartmentType extends ICreateDepartmentType {
  status: boolean;
}
