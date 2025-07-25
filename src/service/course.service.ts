import { apiConfig } from "@api/config";
import { ApiUrls } from "../api/api-urls";
import type { Course, ParamsType } from "@types";

export const courseService = {
  async getCourses(params:ParamsType) {
    const res = await apiConfig().getRequest(ApiUrls.COURSES,params);
    return res;
  },

  async createCourse(model: Course) {
    console.log("model", model);
    const res = await apiConfig().postRequest(ApiUrls.COURSES, model);
    return res;
  },

  async updateCourse(id:number,model: Course) {
    const res = await apiConfig().patchRequest(
      `${ApiUrls.COURSES}/${id}`,
      model
    );
    return res;
  },

  async deleteCourse(id: number) {
    const res = await apiConfig().removeRequest(`${ApiUrls.COURSES}/${id}`);
    return res;
  },
};
