import { apiConfig } from "@api/config";
import { ApiUrls } from "../api/api-urls";
import { Notification } from "@helpers";
import type { Branch, ParamsType } from "@types";

export const branchService = {
  async getBranches(params: ParamsType) {
    const res = await apiConfig().getRequest(ApiUrls.BRANCHES, params);
    return res;
  },

  async getBranchStudents(params: ParamsType,id:number) {
    const res = await apiConfig().getRequest(`${ApiUrls.BRANCHES}/${id}`, params);
    return res;
  },

  async createBranch(model: Branch) {
    const res = await apiConfig().postRequest(ApiUrls.BRANCHES, model);
    Notification("success", res?.data.message);

    return res;
  },

  async updateBranch(model: Branch) {
    const { id } = model;
    model = {
      name: model.name,
      address: model.address,
      call_number: model.call_number,
      created_at: model.created_at,
      updated_at: model.updated_at,
    };
    // console.log(id);
    const res = await apiConfig().updateRequest(
      `${ApiUrls.BRANCHES}/${id}`,
      model
    );
    // Notification("success", res?.data.message);

    // console.log(res);
    return res;
  },

  async deleteBranch(id: number) {
    const res = await apiConfig().removeRequest(`${ApiUrls.BRANCHES}/${id}`);
    console.log(`${ApiUrls.BRANCHES}/${+id}}`);
    Notification("success", res?.data.message);

    return res;
  },
};
