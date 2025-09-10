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
    const res = await apiConfig().patchRequest(`${ApiUrls.ROOMS}/${id}`, model);
    return res;
  },

  async deleteRoom(id: number) {
    const res = await apiConfig().removeRequest(`${ApiUrls.ROOMS}/${id}`);
    return res;
  },
};
