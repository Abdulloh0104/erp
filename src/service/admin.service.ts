// service/adminService.ts
import { apiConfig } from "@api/config";
import { ApiUrls } from "@api/api-urls";
import type { Password } from "@types";

export const adminService = {
  async getAdminById(id: number): Promise<any> {
    const res = await apiConfig().getRequest(`${ApiUrls.ADMIN}/${id}`);
    return res;
  },

  async updatePassword(id: number, model: Password) {
    const res = await apiConfig().patchRequest(
      `${ApiUrls.CHANGE_ADMIN_PASSWORD}/${id}`,
      model
    );
    return res;
  },
};
