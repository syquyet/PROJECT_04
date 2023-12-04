import { getDataById, updateData } from "../../utils/DB.Utils";

//  ================= get product by id =================
export const apiGetUserById = async (id: string) => {
  try {
    const response = await getDataById("users", id);
    return response;
  } catch (err) {
    throw err;
  }
};
// ================= update avatar =================
export const apiUpdateAvatar = async (id: any, data: any) => {
  try {
    const response = await updateData("users/avatar", id, data);
    return response;
  } catch (err) {
    throw err;
  }
};
