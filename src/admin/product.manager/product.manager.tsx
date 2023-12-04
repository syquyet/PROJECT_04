import React, { useEffect, useState } from "react";
import SidebarAdmin from "../sidebar.admin/sidebar";
import "./product.manager.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ReactPaginate from "react-paginate";
import axios from "axios";
import removeUnicode from "../until/removeUnicode";
import { API } from "../../common/ULR.common";
import ProductService from "../../service/product.service";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

const ProductManager: React.FC = () => {
  const productService = new ProductService();
  const [error, setError] = useState<any>({});
  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [action, setAction] = useState<string>("");
  const [status, setStatus] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = (action: string) => {
    action === "ADD" ? setAction("THÊM") : setAction("EDIT");
    setShow(true);
  };
  const [dataProduct, setDataProduct] = useState<any[]>([]);
  useEffect(() => {
    const fetchdata = async () => {
      const response = await productService.getProducts();
      setDataProduct(response);
    };

    fetchdata();
  }, [searchQuery, status]);

  // ======== số sp trong một trang,Xử lý sự kiện khi chuyển trang===========
  const itemsPerPage = 6;
  const pageCount = Math.ceil(dataProduct.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);
  const currentProducts = dataProduct.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  // ======================== xóa sản phẩm ==================================
  const handleDeleteProduct = (id: number) => {
    const dataDeleteProduct = dataProduct.filter((item) => item.id !== id);
    setDataProduct(dataDeleteProduct);
    productService.deleteProduct(id);
  };
  //  ======================= lấy dữ liệu cho sản phẩm ============================
  const [formData, setFormData] = useState<any>({
    category_name: "",
    product_name: "",
    product_price: "",
    size: "",
    quantity: "",
    product_img: "",
    describes: "",
  });
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    if (name === "product_price" || name === "quantity") {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    if (name === "product_img") {
      setFormData({ ...formData, [name]: event.target.files[0] }); //để lấy file gửi lên
    }
  };
  //  ========================= thêm sản phẩm ================================
  const hadleAddProduct = async (event: React.FormEvent) => {
    event.preventDefault();
    const bodyformData = new FormData();
    bodyformData.append("product_name", formData.product_name);
    bodyformData.append("product_price", formData.product_price);
    bodyformData.append("category_name", formData.category_name);
    bodyformData.append("size", formData.size);
    bodyformData.append("quantity", formData.quantity);
    bodyformData.append("describes", formData.describes);
    bodyformData.append("product_img", formData.product_img);
    const error = productService.checkErrorForm(formData);//check form data
    if (error.isError) {
      setError(error);
      return;
    }
    setError({});
    try {
      await axios.post(API + "products", bodyformData, { //thêm mới sản phẩm
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Thêm sản phẩm thành công", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("Thêm sản phẩm thất bại!!!!", {
        position: "top-right",
        autoClose: 2000,
      });
    }
    setFormData({
      category_name: "",
      product_name: "",
      product_price: "",
      size: "",
      quantity: "",
      product_img: "",
      describes: "",
    });
    setStatus(!status);
    handleClose();
  };
  // ======================= tìm user theo tên =============================
  const searchUserByName = (name: string) => {
    const dataSearch = dataProduct.filter((product) =>
      removeUnicode(product.product_name)
        .toLowerCase()
        .includes(name.toLowerCase())
    );
    setDataProduct(dataSearch);
  };
  // ========================== update product ===========================
  const handleEditProduct = () => {
    handleShow("EDIT");
  };
  // ======================== Hiện thị hình ảnh sản phẩm =================
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setShowImageModal(true);
  };
  const closeImageModal = () => {
    setSelectedImage(null);
    setShowImageModal(false);
  };
  return (
    <>
      <ToastContainer />
      <div className="product-container">
        <SidebarAdmin />
        <div className="manage-product">
          <h5>QUẢN LÝ SẢN PHẨM</h5>
          <div className="manage-product-input">
            <input
              id="manage-product-seach"
              type="text"
              placeholder="Nhập từ khóa"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={() => searchUserByName(searchQuery)}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <button
              className="btn-add"
              data-toggle="modal"
              data-target="#exampleModalCenter"
              onClick={() => handleShow("ADD")}
            >
              Thêm
            </button>
          </div>
          <table className="list-product">
            <tbody>
              <tr>
                <th>Stt</th>
                <th>Image</th>
                <th>Tên sản phẩm</th>
                <th>Size</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Hành động</th>
              </tr>
              {currentProducts?.map((product, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={product.product_img}
                      alt=""
                      width="50px"
                      height="50px"
                      onClick={() => openImageModal(product.product_img)}
                    />
                  </td>
                  <td>{product.product_name}</td>
                  <td>{product?.size.toString()}</td>
                  <td>{product?.product_price.toLocaleString()}đ</td>
                  <td>{product.quantity}</td>
                  <td>
                    <button className="btn-detail">
                      <i className="fa-regular fa-eye"></i>
                    </button>
                    <button className="btn-edit" onClick={handleEditProduct}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </div>
        {/* modal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>THÊM SẢN PHẨM</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form encType="multipart/form-data">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Tên sản phẩm:</Form.Label>
                <Form.Control
                  name="product_name"
                  type="text"
                  value={formData.product_name}
                  autoFocus
                  onChange={handleInputChange}
                />
                <p style={{ color: "red" }}>{error.msgName}</p>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Giá sản phẩm:</Form.Label>
                <Form.Control
                  name="product_price"
                  type="number"
                  autoFocus
                  onChange={handleInputChange}
                />
                <p style={{ color: "red" }}>{error.msgPrice}</p>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Số lượng sản phẩm:</Form.Label>
                <Form.Control
                  name="quantity"
                  type="number"
                  autoFocus
                  onChange={handleInputChange}
                />
                <p style={{ color: "red" }}>{error.msgQuantity}</p>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Danh mục sản phẩm:</Form.Label>
                <Form.Control
                  name="category_name"
                  type="text"
                  autoFocus
                  onChange={handleInputChange}
                />
                <p style={{ color: "red" }}>{error.msgCategory}</p>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Mô tả:</Form.Label>
                <Form.Control
                  name="describes"
                  type="text"
                  autoFocus
                  onChange={handleInputChange}
                />
                <p style={{ color: "red" }}>{error.msgDescribes}</p>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Size:</Form.Label>
                <Form.Control
                  name="size"
                  type="text"
                  autoFocus
                  onChange={handleInputChange}
                />
                <p style={{ color: "red" }}>{error.msgSize}</p>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Image</Form.Label>
                <Form.Control
                  id="file"
                  name="product_img"
                  type="file"
                  autoFocus
                  onChange={handleInputChange}
                />
                <p style={{ color: "red" }}>{error.msgImage}</p>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              HỦY
            </Button>
            <Button variant="primary" type="submit" onClick={hadleAddProduct}>
              {action}
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Modal hiển thị ảnh lớn */}
        {selectedImage && (
          <div className="image-modal-overlay" onClick={closeImageModal}>
            <div className="image-modal">
              <img src={selectedImage} alt="Large Image" />
              <button onClick={closeImageModal}>Close</button>
            </div>
          </div>
        )}

        {/* ... */}
      </div>
    </>
  );
};
export default ProductManager;
