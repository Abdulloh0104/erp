import { apiConfig } from "@api/config";
import { ApiUrls } from "../api/api-urls";
import type {Lessons} from "@types";

export const generalService = {
  async updateGroupLesson(id:number,model: Lessons) {
    const res = await apiConfig().patchRequest(
      `${ApiUrls.LESSONS}/${id}/status`,
      model
    );
    return res;
  },
};
