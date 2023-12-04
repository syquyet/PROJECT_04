import { apiGetOrders } from "../API/order.api";

class OrdersService {
  // ================= get products =======================
  async getOrders() {
    const response = await apiGetOrders();
    return response;
  }
}
export default OrdersService;
