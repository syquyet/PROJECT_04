import { getData, getDataById } from "../../utils/DB.Utils";
import { API } from "../common";
import axiosInstance from "../config/config.axios";
// =================Api get products ===========================
export const apiGetProduct = async () => {
  try {
    const response = await getData("products");
    return response;
  } catch (err) {}
};
// =================api sáp xếp sản phẩm có giá tăng dần===========
export const apiSortedByPrice = async () => {
  try {
    const response = await axiosInstance.get(API + `products/sorted/by-price`);
    return response.data;
  } catch (err) {
    throw err;
  }
};
//  ================ fillter products by category===============
export const apiFillterByCategory = async (data: string) => {
  try {
    const response = await axiosInstance.get(API + `products/category/${data}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};
//  ================== get product by id ===================
export const apiGetProductById = async (id: string) => {
  try {
    const response = await getDataById("products", id);
    return response;
  } catch (err) {
    throw err;
  }
};
// ================== seach product by name =================
export const apiSeachProductByName = async (dataName:string) => {
  try {
    const response = await axiosInstance.get(API + `products/seach/`+dataName)
    return response
  } catch (err) {
    throw err;
  }
}