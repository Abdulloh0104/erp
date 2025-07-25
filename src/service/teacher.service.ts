import { apiConfig } from "@api/config";
import { ApiUrls } from "../api/api-urls";
import type { Teacher, ParamsType } from "@types";

export const teacherService = {
  async getTeachers(params: ParamsType) {
    const res = await apiConfig().getRequest(ApiUrls.TEACHERS, params);
    return res;
  },

  async getTeacherStudents(params: ParamsType, id: number) {
    const res = await apiConfig().getRequest(
      `${ApiUrls.TEACHERS}/${id}`,
      params
    );
    return res;
  },

  async createTeacher(model: Teacher) {
    const res = await apiConfig().postRequest(ApiUrls.TEACHERS, model);
    return res;
  },

  async updateTeacher(id:number,model: any) {
    // const { id } = model;
    // model = {
    //   first_name: model.first_name,
    //   last_name: model.last_name,
    //   email: model.email,
    //   // password: model.password,
    //   phone: model.phone,
    //   role: model.role,
    //   branchId: model.branchId,
    //   avatar_url: model.avatar_url,
    // };
    // console.log(model);
    const res = await apiConfig().patchRequest(
      `${ApiUrls.TEACHERS}/${id}`,
      model
    );
    return res;
  },

  async deleteTeacher(id: number) {
    const res = await apiConfig().removeRequest(`${ApiUrls.TEACHERS}/${id}`);
    return res;
  },
};
