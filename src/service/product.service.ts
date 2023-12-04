import {
  apiFillterByCategory,
  apiGetProduct,
  apiGetProductById,
  apiSeachProductByName,
  apiSortedByPrice,
} from "../api/servicer/product.api";

class ProductService {
  // ================= get products =======================
  async getProducts() {
    const response = await apiGetProduct();
    return response;
  }
  // ================== sort products by price=============
  async sortedByPrice() {
    const response = await apiSortedByPrice();
    return response;
  }
  //===================fillter by category ===============
  async fillByCategory(data: string) {
    const response = await apiFillterByCategory(data);
    return response;
  }
  // ===================== get product by id ================
  async getProductById(id: any) {
    const response = await apiGetProductById(id);
    return response;
  }
  // ===================== get product by name =============
  async getProductByName(name: string) {
    const response= await apiSeachProductByName(name)
    return response;
  }
}
export default ProductService;
