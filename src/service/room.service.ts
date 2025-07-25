import { apiConfig } from "@api/config";
import { ApiUrls } from "@api/api-urls";
import type { Room, ParamsType } from "@types";

export const roomService = {
  async getRooms(params: ParamsType) {
    const res = await apiConfig().getRequest(ApiUrls.ROOMS, params);
    return res;
  },

  async createRoom(model: Room) {
    const res = await apiConfig().postRequest(ApiUrls.ROOMS, model);
    return res;
  },

  async updateRoom(id:number, model: Room) {
    // const { id } = model;
    // model = {
    //   name: model.name,
    //   capacity: model.capacity,
    //   branchId: model.branchId,
    //   created_at: model.created_at,
    //   updated_at: model.updated_at,
    // };
    // console.log(id);
    const res = await apiConfig().patchRequest(`${ApiUrls.ROOMS}/${id}`, model);
    return res;
  },

  async deleteRoom(id: number) {
    const res = await apiConfig().removeRequest(`${ApiUrls.ROOMS}/${id}`);
    return res;
  },
};
