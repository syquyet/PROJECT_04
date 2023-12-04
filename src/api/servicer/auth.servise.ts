import { signInWithPopup } from "firebase/auth";
import { authFirebase, googleProvider } from "../config/fribase.config";
import { insertData } from "../../utils/DB.Utils";
import axios from "axios";
import { API } from "../common";
//================== login google ==================
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(authFirebase, googleProvider);
    console.log(result);
    return result.user;
  } catch (err) {
    console.error("đăng nhập google thất bại", err);
  }
};
// ===========Function to log out google =================
export const logout = async () => {
  try {
    await authFirebase.signOut();
    console.log("Đăng xuất thành công");
  } catch (err) {
    console.error("Đăng xuất thất bại", err);
  }
};
// =============== login =================
export const apiLogin = async (datLogin: any) => {
  try {
    const response = await axios.post(API + "auth/login", datLogin);
    return response;
  } catch (err) {
    throw err;
  }
};
// ================= register =================
export const apiRegister = async (data: any) => {
  try {
    const response = await axios.post(API + "auth/register", data);
    return response;
  } catch (err) {
    throw err;
  }
};
