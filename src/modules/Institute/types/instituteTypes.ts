export interface IInstituteListType {
  id: number;
  name: string;
  code: number;
  short_name: string;
  status: boolean;
  created_by: number;
  created_by_name: string;
  created_at: string;
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
