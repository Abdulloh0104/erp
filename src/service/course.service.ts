import { apiConfig } from "@api/config";
import { ApiUrls } from "../api/api-urls";
import { Notification } from "@helpers";
import type { Course, ParamsType } from "@types";

export const courseService = {
  async getCourses(params:ParamsType) {
    const res = await apiConfig().getRequest(ApiUrls.COURSES,params);
    return res;
  },

  async createCourse(model: Course) {
    console.log("model", model);
    const res = await apiConfig().postRequest(ApiUrls.COURSES, model);
    Notification("success", res?.data.message);

    return res;
  },

  async updateCourse(id:number,model: Course) {
    // const { id } = model;
    // model = {
    //   title: model.title,
    //   description: model.description,
    //   price: model.price,
    //   duration: model.duration,
    //   lessons_in_a_month: model.lessons_in_a_month,
    //   lessons_in_a_week: model.lessons_in_a_week,
    //   lesson_duration: model.lesson_duration,
    //   is_active: model.is_active,
    //   created_at: model.created_at,
    //   updated_at: model.updated_at,
    // };
    // console.log(id);
    const res = await apiConfig().updateRequest(
      `${ApiUrls.COURSES}/${id}`,
      model
    );
    // Notification("success", res?.data.message);

    // console.log(res);
    return res;
  },

  async deleteCourse(id: number) {
    const res = await apiConfig().removeRequest(`${ApiUrls.COURSES}/${id}`);
    console.log(`${ApiUrls.COURSES}/${+id}}`);
    Notification("success", res?.data.message);

    return res;
  },
};
