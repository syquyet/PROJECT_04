import {
  apiDeleteProduct,
  apiGetProduct,
  apiGetProductById,
} from "../API/product.api";

class ProductService {
  // ================= get products =======================
  async getProducts() {
    const response = await apiGetProduct();
    return response;
  }
  
  // ===================== get product by id ================
  async getProductById(id: any) {
    const response = await apiGetProductById(id);
    return response;
  }
  // ===================== delete product by id =============
  async deleteProduct(id: any) {
    const response = await apiDeleteProduct(id);
    return response;
  }
  // =====================validate form data================
  checkErrorForm(formData: any) {
    const error = {
      isError: false,
      msgName: "",
      msgPrice: "",
      msgQuantity: "",
      msgDescribes: "",
      msgCategory: "",
      msgSize: "",
      msgImage: "",
    };
    if (!formData.product_name) {
      error.isError = true;
      error.msgName = "*Tên sản phẩm không đc để trống";
    }
    if (formData.product_name?.length > 45) {
      error.isError = true;
      error.msgName = "*Tên sản phẩm quá dài";
    }
    if (!formData.product_price) {
      error.isError = true;
      error.msgPrice = "*Giá không đực để trống";
    }
    if (!formData.quantity) {
      error.isError = true;
      error.msgQuantity = "*Số lượng sản phẩm không được để trống";
    }
    if (!formData.category_name) {
      error.isError = true;
      error.msgCategory = "*Danh mục sản phẩm không được để trống";
    }
    if (formData.categogy_name?.length > 45) {
      error.isError = true;
      error.msgDescribes = "*Danh mục sản phẩm quá dài";
    }
    if (!formData.describes) {
      error.isError = true;
      error.msgDescribes = "*Mô tả sản phẩm không được để trống";
    }
    if (!formData.size) {
      error.isError = true;
      error.msgSize = "*Size sản phẩm ko đc để trống";
    }
    if (formData.product_imf) {
      error.isError = true;
      error.msgImage = "*Ảnh không được để trống";
    }

    return error;
  }
}
export default ProductService;
