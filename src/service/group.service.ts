import { apiConfig } from "@api/config";
import { ApiUrls } from "../api/api-urls";
import type { Group, ParamsType } from "@types";

export const groupService = {
  async getGroups(params: ParamsType) {
    const res = await apiConfig().getRequest(ApiUrls.GROUPS, params);
    return res;
  },

  async getGroupStudents(id: number) {
    const res = await apiConfig().getRequest(`${ApiUrls.GROUPS}/${id}`);
    return res;
  },

  async getGroupLessons(id: number) {
    const res = await apiConfig().getRequest(`${ApiUrls.GROUP_LESSONS}/${id}`);
    return res;
  },

  async getGroupTeachers(id: number) {
    const res = await apiConfig().getRequest(`${ApiUrls.GROUP_TEACHERS_BY_GROUP_ID}/${id}`);
    return res;
  },

  async createGroup(model: Group) {
    const res = await apiConfig().postRequest(ApiUrls.GROUPS, model);
    return res;
  },

  async updateGroup(id:number,model: Group) {
    // const { id } = model;
    // model = {
    //   name: model.name,
    //   status: model.status,
    //   courseId: model.courseId,
    //   roomId: model.roomId,
    //   start_time: model.start_time,
    //   start_date: model.start_date,
    //   end_date: model.end_date,
    //   end_time: model.end_time,
    // };
    // console.log(id);
    const res = await apiConfig().patchRequest(
      `${ApiUrls.GROUPS}/${id}`,
      model
    );
    return res;
  },

  async deleteGroup(id: number) {
    const res = await apiConfig().removeRequest(`${ApiUrls.GROUPS}/${id}`);
    console.log(`${ApiUrls.GROUPS}/${+id}}`);
    return res;
  },
};
