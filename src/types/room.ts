export interface Room {
  id?: number;
  name: string;
  capacity: number;
  branchId: number;
  branch: {id:number;name:string};
  created_at: string;
  updated_at: string;
}
