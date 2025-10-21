export type ProfileTypes = {
  is_main: boolean;
  is_2fa_on: boolean;
  email: string;
  photo: string;
  name: string;
  phone: string;
  status: 'active' | 'inactive';
  institute_id: number;
  blood_group: string;
  gender: 'male' | 'female';
  user_type: string;
  user_id: number;
  login_id: string;
  created_by: number;
  nid: string;

  institute: {
    id: number;
    institution_code: string;
    established_year: number;
    institute_name: string;
    institute_phone: string;
    institute_email: string;
    institute_logo: string;
    institute_website: string;
    category: string;
    ownership: string;
    address: string;
    postal_code: string;
    status: true;
    created_at: string;
    created_by: number;
    created_by_name: string;
    institute_head: {
      id: number;
      name: string;
      email: string;
      phone: string;
      gender: string;
      blood_group: string;
      nid: string;
    };
  };

  permissions: {
    role_id: number;
    role_name: string;
    status: number;
    init_role: boolean;
    permissions: Array<{
      permission_id: number;
      permission_name: string;
      read: number;
      write: number;
      update: number;
      delete: number;
    }>;
  };
};
