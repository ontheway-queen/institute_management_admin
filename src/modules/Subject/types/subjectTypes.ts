// Single Subject Item
export interface ISubjectListType {
  id: number;
  name: string;
  code: number | string;
  status: boolean;
  created_by?: number;
  created_by_name?: string;
  created_at?: string;
  updated_at?: string;
}

// For Creating Subjects (multiple)
export interface ICreateSubjectType {
  name: string;
  code: number;
  status?: boolean;
}
export interface ICreateSubjecCSVtType {
  name: string;
  code: string;
}

// For Updating a Single Subject
export interface IUpdateSubjectType {
  id: number; // always required for updates
  name?: string;
  code?: number | string;
  status?: boolean;
}
