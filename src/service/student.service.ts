import { apiConfig } from "@api/config";
import { ApiUrls } from "../api/api-urls";
import type { Student, ParamsType } from "@types";

export const studentService = {
  async getStudents(params:ParamsType) {
    const res = await apiConfig().getRequest(ApiUrls.STUDENTS,params);
    return res;
  },

  async createStudent(model: Student) {
    console.log("model", model);
    const res = await apiConfig().postRequest(ApiUrls.STUDENTS, model);
    return res;
  },

  async updateStudent(id:number,model: Student) {
    const res = await apiConfig().patchRequest(
      `${ApiUrls.STUDENTS}/${id}`,
      model
    );
    return res;
  },

  async deleteStudent(id: number) {
    const res = await apiConfig().removeRequest(`${ApiUrls.STUDENTS}/${id}`);
    return res;
  },
};
