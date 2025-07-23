import { apiConfig } from "@api/config";
import { ApiUrls } from "../api/api-urls";
import { Notification } from "@helpers";
import type { Room, ParamsType } from "@types";

export const roomService = {
  async getRooms(params: ParamsType) {
    const res = await apiConfig().getRequest(ApiUrls.ROOMS, params);
    return res;
  },

  async createRoom(model: Room) {
    console.log("model", model);
    const res = await apiConfig().postRequest(ApiUrls.ROOMS, model);
    Notification("success", res?.data.message);

    return res;
  },

  async updateRoom(model: Room) {
    const { id } = model;
    model = {
      name: model.name,
      capacity: model.capacity,
      branchId: model.branchId,
      created_at: model.created_at,
      updated_at: model.updated_at,
    };
    // console.log(id);
    const res = await apiConfig().updateRequest(
      `${ApiUrls.ROOMS}/${id}`,
      model
    );
    // Notification("success", res?.data.message);

    // console.log(res);
    return res;
  },

  async deleteRoom(id: number) {
    const res = await apiConfig().removeRequest(`${ApiUrls.ROOMS}/${id}`);
    // console.log(`${ApiUrls.ROOMS}/${+id}}`);
    Notification("success", res?.data.message);

    return res;
  },
};
