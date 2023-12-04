
import {
  apiDeleteCart,
  apiGetCartByUser,
  apiInsertCart,
  apiUpdateCart,
} from "../api/servicer/cart.api";

class CartService {
  // ================== get cart by user id ================
  async getCartByUserId(user_id: any) {
    const response = await apiGetCartByUser(user_id);
    return response;
  }
  //  ================= insert cart ==========================
  async insertCart(data: any) {
    const response = await apiInsertCart(data);
    return response;
  }
  //  ================= delete cart ===========================
  async deleteCart(id: any) {
    const response = await apiDeleteCart(id);
    return response;
  }
  //   ======= tăng số lượng sản phẩm trong cart ===============
  async quantityAdd(id: any, user_id: any) {
    const res = await apiGetCartByUser(user_id);

    const cartProduct = res.find((item: any) => item.id === id);
    const newCartProduct = {
      ...cartProduct,
      quantity: cartProduct.quantity + 1,
    };
    await apiUpdateCart(id, newCartProduct);
  }
  //   ============ giảm số lượng sản phẩm trong cart =============
  async quantityReduce(id: any, user_id: any) {
    const res = await apiGetCartByUser(user_id);
    const cartProduct = res.find((item: any) => item.id === id);
    if (cartProduct.quantity <= 1) {
      return;
    } else {
      const newCartProduct = {
        ...cartProduct,
        quantity: cartProduct.quantity - 1,
      };

      await apiUpdateCart(id, newCartProduct);
    }
  }
}
export default CartService;
