// helpers/auth.ts
import {jwtDecode} from "jwt-decode";

export const getUserIdFromToken = (): number | null => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) return null;
    const decoded: { id: number } = jwtDecode(token);
    return decoded.id;
  } catch (err) {
    console.error("Token decode error", err);
    return null;
  }
};
