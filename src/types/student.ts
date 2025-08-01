import type { Lessons } from "./general";

export interface Student {
  id?: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  password_hash?: string;
  confirm_password?: string;
  gender: string;
  date_of_birth: string;
  attendance: Lessons[];
}
