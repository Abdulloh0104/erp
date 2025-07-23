export interface Teacher {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  avatar_url: string;
  branchId?: number;
}
