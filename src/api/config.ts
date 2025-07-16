import axiosInstance from ".";
import { Notification } from "@helpers";

export function apiConfig() {
  async function getRequest(url: string, params: object = {}) {
    try {
      const res = await axiosInstance.get(url, { params });
      return res;
    } catch (err) {
      console.log(err);
      Notification("error", `${err}`);
    }
  }

  async function postRequest(url: string, body: object = {}) {
    try {
      const res = await axiosInstance.post(url, body);
      console.log("body",body);
      return res;
    } catch (err) {
      console.log(err);
      Notification('error',`${err}`)
    }
  }

  async function updateRequest(url: string, body: object = {}) {
    try {
      const res = await axiosInstance.patch(url, body);
      Notification("success", res?.data?.message);
      return res;
    } catch (err) {
      console.log(err);
      Notification("error", `${err}`);
    }
  }


  async function removeRequest(url: string) {
    try {
      console.log("config",url);
      const res = await axiosInstance.delete(url);
      return res;
    } catch (err) {
      console.log(err);
      Notification("error", `${err}`);
    }
  }
  return {
    getRequest,
    postRequest,
    updateRequest,
    removeRequest,
  };
}
