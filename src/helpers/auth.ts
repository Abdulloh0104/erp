// helpers/auth.ts
import {jwtDecode} from "jwt-decode";
import { getItem } from "./storage";

export const getUserIdFromToken = (): number | null => {
  try {
    const token = getItem("access_token");
    if (!token) return null;
    const decoded: { id: number } = jwtDecode(token);
    return decoded.id;
  } catch (err) {
    console.error("Token decode error", err);
    return null;
  }
};
