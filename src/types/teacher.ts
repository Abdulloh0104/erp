import type { Branch } from "./branch";
import type { Group } from "./group";

export interface Teacher {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  phone: string;
  role: string;
  avatar_url: string;
  branchId?: number[];
  branches: Branch[];
}


export interface TeacherGroupsType {
  id: number;
  end_date: string;
  group: Group;
  start_date: string;
  status:boolean
}
