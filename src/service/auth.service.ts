import { apiConfig } from "@api/config";
import { ApiUrls } from "@api/api-urls";
import { type SignIn } from "@types";

export const authService = {
  async signIn(model: SignIn,role:string):Promise<any> {
    console.log(model);
    const res = await apiConfig().postRequest(`/${role}-auth${ApiUrls.AUTH}-in`, model);
    return res;
  },
  async signOut(model: SignIn,role:string):Promise<any> {
    const res = await apiConfig().postRequest(`/${role}-auth${ApiUrls.AUTH}-out`, model);
    return res;
  },
};
