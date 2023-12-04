

import { deleteData, getData, getDataById } from "../admin/until/DB.Until";
// ================Api get products=======================
export const apiGetProduct = async () => {
  try {
    const response = await getData("products");
    return response;
  } catch (err) {}
};
//  ===================== get product by id==================
export const apiGetProductById = async (id: string) => {
  try {
    const response = await getDataById("products", id);
    return response;
  } catch (err) {
    throw err;
  }
};
// ====================== delete product ====================
export const apiDeleteProduct = async (id: string) => {
  try {
    const response = await deleteData("products", id);
    return response;
  } catch (err) {
    throw err;
  }
}
