export interface IInstitute {
  institute: {
    institution_code: string;
    established_year: string;
    name: string;
    phone: string;
    email: string;
    website: string;
    category: string;
    ownership: string;
    address: string;
    postal_code: string;
  };
  instituteHead: {
    name: string;
    email: string;
    password: string;
    phone: string;
    gender: string;
    blood_group: string;
    nid: string;
  };
  institute_logo: File;
  institute_head_photo: File;
  subjects: number[]; // array of subject IDs
  departments: number[]; // array of department IDs
}

export interface IInstituteHead {
  id: number;
  name: string;
  email: string;
  phone: string;
  code: string;
  gender: string;
  blood_group: string;
  nid: string;
  photo: string;
}

export interface ISubject {
  id: number;
  name: string;
  code: string;
  status: boolean;
  created_by: number;
  created_by_name: string;
  created_at: string;
}

export interface IDepartment {
  id: number;
  name: string;
  code: number;
  short_name: string;
  status: boolean;
  created_by: number;
  created_by_name: string;
  created_at: string;
}

export interface IInstituteALL {
  id?: number;
  institution_code?: string;
  established_year?: number;
  institute_name?: string;
  institute_phone?: string;
  institute_email?: string;
  institute_logo?: string;
  institute_website?: string;
  category?: string;
  ownership?: string;
  address?: string;
  postal_code?: string;
  status?: boolean;
  created_at?: string;
  created_by?: number;
  created_by_name?: string;

  // These are returned from backend when viewing
  institute_head?: IInstituteHead;
  subjects?: ISubject[];
  departments?: IDepartment[];
}

export interface IInstituteListResponse {
  data: IInstituteALL[];
  total: number;
}
export interface IUpdateInstitute {
  institute: {
    institution_code: string;
    established_year: number | string;
    name: string;
    phone: string;
    email: string;
    website?: string;
    category?: string;
    ownership?: string;
    address?: string;
    postal_code?: string;
  };

  instituteHead: {
    name: string;
    email: string;
    password?: string;
    phone: string;
    gender?: string;
    blood_group?: string;
    nid?: string;
    photo?: string; // optional URL for preview
  };

  institute_logo?: File;
  institute_head_photo?: File;

  add_subjects: number[];
  remove_subjects: number[];
  add_departments: number[];
  remove_departments: number[];
}
