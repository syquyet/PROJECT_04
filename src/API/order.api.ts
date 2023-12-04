import { getData } from "../admin/until/DB.Until";

// ================Api get products=======================
export const apiGetOrders = async () => {
    try {
      const response = await getData("orders");
      return response;
    } catch (err) {}
  };