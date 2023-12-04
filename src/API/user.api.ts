import { getData, getDataById } from "../admin/until/DB.Until";


//  =============== get product by id ===================
export const apiGetUserById = async (id: string) => {
    try {
      const response = await getDataById("users", id);
      return response;
    } catch (err) {
      throw err;
    }
  };
  // ================ get all users =================
  export const apiGetAllUsers = async ()=>{
   try {
    const response= await getData("users",);
    return response
   } catch (err) {
    throw err;
   }
  }