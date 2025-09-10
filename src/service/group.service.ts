import { apiConfig } from "@api/config";
import { ApiUrls } from "../api/api-urls";
import type { Group, GroupStudentCreateType, GroupTeacherCreateType, ParamsType } from "@types";

export const groupService = {
  async getGroupById(id: number): Promise<any> {
    const res = await apiConfig().getRequest(`${ApiUrls.GROUPS}/${id}`);
    return res;
  },
  async getGroups(params: ParamsType) {
    const res = await apiConfig().getRequest(ApiUrls.GROUPS, params);
    return res;
  },

  async getGroupStudents(id: number) {
    const res = await apiConfig().getRequest(
      `${ApiUrls.GROUP_STUDENTS_BY_GROUP_ID}/${id}`
    );
    return res;
  },

  async getGroupLessons(id: number) {
    const res = await apiConfig().getRequest(`${ApiUrls.GROUP_LESSONS}/${id}`);
    return res;
  },

  async getGroupTeachers(id: number) {
    const res = await apiConfig().getRequest(
      `${ApiUrls.GROUP_TEACHERS_BY_GROUP_ID}/${id}`
    );
    return res;
  },

  //Mutations
  async createGroup(model: Group) {
    const res = await apiConfig().postRequest(ApiUrls.GROUPS, model);
    return res;
  },

  async createGroupStudent(model: GroupStudentCreateType) {
    const res = await apiConfig().postRequest(ApiUrls.GROUP_STUDENTS, model);
    return res;
  },

  async createGroupTeacher(model: GroupTeacherCreateType) {
    const res = await apiConfig().postRequest(ApiUrls.GROUP_TEACHERS, model);
    return res;
  },

  async updateGroup(id: number, model: Group) {
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
