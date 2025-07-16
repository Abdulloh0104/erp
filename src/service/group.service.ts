import { apiConfig } from "@api/config";
import { ApiUrls } from "../api/api-urls";
import { Notification } from "@helpers";
import type { Group, ParamsType } from "@types";

export const groupService = {
  async getGroups(params: ParamsType) {
    const res = await apiConfig().getRequest(ApiUrls.GROUPS, params);
    return res;
  },

  async getGroupStudents(params: ParamsType,id:number) {
    const res = await apiConfig().getRequest(`${ApiUrls.GROUPS}/${id}`, params);
    return res;
  },

  async createGroup(model: Group) {
    const res = await apiConfig().postRequest(ApiUrls.GROUPS, model);
    Notification("success", res?.data.message);

    return res;
  },

  async updateGroup(model: Group) {
    const { id } = model;
    model = {
      name: model.name,
      status: model.status,
      course_id: model.course_id,
      start_date: model.start_date,
      end_date: model.end_date,
    };
    // console.log(id);
    const res = await apiConfig().updateRequest(
      `${ApiUrls.GROUPS}/${id}`,
      model
    );
    // Notification("success", res?.data.message);

    // console.log(res);
    return res;
  },

  async deleteGroup(id: number) {
    const res = await apiConfig().removeRequest(`${ApiUrls.GROUPS}/${id}`);
    console.log(`${ApiUrls.GROUPS}/${+id}}`);
    Notification("success", res?.data.message);

    return res;
  },
};
