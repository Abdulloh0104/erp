import { apiConfig } from "@api/config";
import { ApiUrls } from "../api/api-urls";
import { Notification } from "@helpers";
import type { Student, ParamsType } from "@types";

export const studentService = {
  async getStudents(params:ParamsType) {
    const res = await apiConfig().getRequest(ApiUrls.STUDENTS,params);
    return res;
  },

  async createStudent(model: Student) {
    console.log("model", model);
    const res = await apiConfig().postRequest(ApiUrls.STUDENTS, model);
    Notification("success", res?.data.message);

    return res;
  },

  async updateStudent(id:number,model: Student) {
    // const { id } = model;
    // model = {
    //   first_name: model.first_name,
    //   last_name: model.last_name,
    //   phone: model.phone,
    //   email: model.email,
    //   password_hash: model.password_hash,
    //   gender: model.gender,
    //   date_of_birth: model.date_of_birth,
    // };
    // console.log(id);
    const res = await apiConfig().updateRequest(
      `${ApiUrls.STUDENTS}/${id}`,
      model
    );
    // Notification("success", res?.data.message);

    // console.log(res);
    return res;
  },

  async deleteStudent(id: number) {
    const res = await apiConfig().removeRequest(`${ApiUrls.STUDENTS}/${id}`);
    console.log(`${ApiUrls.STUDENTS}/${+id}}`);
    Notification("success", res?.data.message);

    return res;
  },
};
