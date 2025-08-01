import type { TablePaginationConfig } from "antd";
import type { ReactNode } from "react";
import type { Group } from "./group";
import type { Room } from "./room";

export interface ProtectedRoute {
  children: ReactNode;
}

export interface ModalProps {
  open: boolean;
  toggle: () => void;
}

export interface ParamsType {
  page: number;
  limit: number;
}

export interface PaginationConfig {
  pagination: TablePaginationConfig;
  setParams: (params: ParamsType) => void;
}


export interface Lessons {
  id?: number;
  title?: string;
  notes?: string;
  date: string;
  status: string;
  group?: Group;
  room?: Room;
  description?:string;
}

export interface Password {
  old_password: string;
  confirm_password: string
  password: string
}