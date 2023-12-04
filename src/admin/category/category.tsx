import { useEffect, useState } from "react";
import SidebarAdmin from "../sidebar.admin/sidebar";

import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import removeUnicode from "../until/removeUnicode";
import ReactPaginate from "react-paginate";
import { API } from "../../common/ULR.common";
import axiosInstance from "../until/axiosConfig";

export default function Category() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [dataCategory, setDataCategory] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [status, setStatus] = useState<boolean>(false);


  useEffect(() => {
    const fetchdata = async () => {
      const reponse = await axiosInstance.get(API + `categories`);
      setDataCategory(reponse.data);
    };
    fetchdata();
  }, [searchQuery,status]);
  // ========================thêm danh mục ================================
  const [formData, setFormData] = useState<any>({
    category_name: "",
    status: true,
    description: "",
  });
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const hadleAddCategory = () => {
    axiosInstance.post(API + "categories", formData);
    setStatus(!status);
    handleClose();
  };
  //  ====================xóa danh mục========================================
  const handleDeleteCategory = (id: number) => {
    const dataDeleteProduct = dataCategory?.filter((item) => item.id !== id);
    setDataCategory(dataDeleteProduct);
    axiosInstance.delete(API + `categories/${id}`);
  };
  //  ================= tìm kiếm danh mục theo tên=============================

  const searchCategoryByName = (name: string) => {
    const filteredCategory = dataCategory?.filter((item) =>
      removeUnicode(item.category_name)
        .toLowerCase()
        .includes(name.toLowerCase())
    );
    setDataCategory(filteredCategory);
  };
  //  ==============số danh mục trong một trang===========
  const itemsPerPage = 4;
  const pageCount = Math.ceil(dataCategory.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);
  const currentCategory = dataCategory.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      <div className="product-container">
        <SidebarAdmin />

        <div className="manage-product">
          <h5>QUẢN LÝ DANH MỤC</h5>

          <div className="manage-product-input">
            <input
              id="manage-product-seach"
              type="text"
              placeholder="Nhập từ khóa"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={() => searchCategoryByName(searchQuery)}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <button
              className="btn-add"
              data-toggle="modal"
              data-target="#exampleModalCenter"
              onClick={handleShow}
            >
              Thêm
            </button>
          </div>
          <table className="list-product">
            <tbody>
              <tr>
                <th>Stt</th>
                <th>Tên danh mục</th>
                <th>Mô tả</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
              {currentCategory?.map((item, index) => (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{item.category_name}</td>
                  <td>{item.description}</td>
                  <td>{item.status}</td>

                  <td>
                    <button className="btn-detail">
                      <i className="fa-regular fa-eye"></i>
                    </button>
                    <button className="btn-edit">
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteCategory(item.id)}
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
            <Modal.Title>THÊM DANH MỤC</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
                onChange={handleInputChange}
              >
                <Form.Label>Tên danh mục:</Form.Label>
                <Form.Control name="category_name" type="text" autoFocus />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
                onChange={handleInputChange}
              >
                <Form.Label>Mô tả:</Form.Label>
                <Form.Control name="description" type="text" autoFocus />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              HỦY
            </Button>
            <Button variant="primary" type="button" onClick={hadleAddCategory}>
              THÊM
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
