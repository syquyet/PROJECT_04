import React, { useEffect, useState } from "react";
import "./product.css";
import "../product-detail/product-detail.css";
import { useNavigate } from "react-router-dom";
import BannerProduct from "./bannerProduct";
import ModalProductDetail from "../modal.util/modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store/configureStore";
import { getProduct } from "../../../redux/slice/productSlice";
import { ProductEntity } from "../../../entities/product.entity";
import ReactPaginate from "react-paginate";
import ProductService from "../../../service/product.service";


const listInput = [
  {
    name: "radio",
    min: 0,
    max: 200000,
    type: "radio",
    dataFilter: "price1",
  },
  {
    name: "radio",
    min: 200000,
    max: 400000,
    type: "radio",
    dataFilter: "price2",
  },
  {
    name: "radio",
    min: 400000,
    max: 600000,
    type: "radio",
    dataFilter: "price3",
  },
  {
    name: "radio",
    min: 600000,
    max: 800000,
    type: "radio",
    dataFilter: "price4",
  },
  {
    name: "radio",
    min: 800000,
    max: 1000000,
    type: "radio",
    dataFilter: "price5",
  },
];

export default function Product() {
  const dispatch = useDispatch();
  const [dataProduct, setDataProduct] = useState<ProductEntity[]>([]);
  const [dataView, setDataView] = useState<ProductEntity>();
  const [searchTerm, setSearchTerm] = useState("");
  const product = useSelector((state: RootState) => state.products.data);
  const productService = new ProductService();
  // ============render sản phẩm lần đầu ============================
  useEffect(() => {
    const fetchdata = async () => {
      const reponse = await productService.getProducts();
      setDataProduct(reponse);
      dispatch(getProduct(reponse));
    };
    fetchdata();
  }, [searchTerm]);

  // ================== truyền id product lên url ============================
  const navigate = useNavigate();
  const handleBuyNow = (id: string) => {
    navigate(`/user/product-detail/${id}`);
  };
  // =================== xem chi tiết sản phẩm ===============================
  const handleView = (id: string) => {
    const dataProductView = product.find((item) => item.id.toString() === id);
    setDataView(dataProductView);
  };
  // =================== tìm kiếm theo tên sản phẩm =========================
  const handleSearch = async () => {
    const seachProducts = await productService.getProductByName(searchTerm);
    setDataProduct(seachProducts.data);
  };
  // ==================== fillter theo giá sản phẩm =========================
  const handleFillter = (min: number, max: number) => {
    let dataFillter = product.filter(
      (item) => item.product_price >= min && item.product_price < max
    );
    setDataProduct(dataFillter);
  };
  // ================== số sp trong một trang,Xử lý sự kiện khi chuyển trang ======
  const itemsPerPage = 8;
  const pageCount = Math.ceil(dataProduct.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);
  const currentProducts = dataProduct.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // ================= Lọc sản phẩm theo danh mục ============
  const handleFillterCategory = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const reponse = await productService.fillByCategory(event.target.value);
    setDataProduct(reponse);
  };

  return (
    <>
      <BannerProduct />
      <h1>BỘ SƯU TẬP</h1>
      <div className="seach-product">
        <input
          type="text"
          name="tim kiếm"
          id="input-seach"
          placeholder="Tìm sản phẩm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      <hr />
      <section className="album-seach">
        <section className="filter-product">
          <h2>
            SẢN PHẨM <span className="total-product">({product.length})</span>
          </h2>
          <h4>Bộ lọc</h4>
          <hr />
          <div className="custom-select" style={{ width: 200 }}>
            <p>
              <b>GÍA SẢN PHẨM:</b>
            </p>
            {listInput.map((item: any) => (
              <div className="filter-group">
                <input
                  type={item.type}
                  name={item.name}
                  defaultValue={`${item.min}, ${item.max}`}
                  data-filter={item.dataFilter}
                  onChange={() => handleFillter(item.min, item.max)}
                />
                <span>{`${item.min.toLocaleString()} - ${item.max.toLocaleString()}đ`}</span>
              </div>
            ))}
          </div>
          <hr />
          <div>
            <p>
              <b>DANH MỤC SẢN PHẨM:</b>
            </p>
            <input
              type="radio"
              name="radio"
              defaultValue="áo thun"
              onChange={handleFillterCategory}
            />
            <span> Áo thun</span>
            <br />
            <input
              type="radio"
              name="radio"
              defaultValue="áo polo"
              onChange={handleFillterCategory}
            />
            <span> Áo polo</span>
            <br />
            <input
              type="radio"
              name="radio"
              defaultValue="áo sơ mi tay ngắn"
              onChange={handleFillterCategory}
            />
            <span> Áo sơ mi tay ngắn</span>
            <br />
            <input
              type="radio"
              name="radio"
              defaultValue="quần short"
              onChange={handleFillterCategory}
            />
            <span> Quần short</span>
            <br />
            <input
              type="radio"
              name="radio"
              defaultValue="áo khoác"
              onChange={handleFillterCategory}
            />
            <span> Áo khoác</span>
            <br />
            <input
              type="radio"
              name="radio"
              defaultValue="áo sơ mi"
              onChange={handleFillterCategory}
            />
            <span> Áo sơ mi</span>
          </div>
          <hr />
        </section>
        <section className="album-product">
          {currentProducts.map((product, index) => (
            <div className="card" key={index}>
              <div className="card-img">
                <img
                  src={product.product_img}
                  className="card-img-top"
                  alt="..."
                />
                <div className="btn-img">
                  <button
                    className="buy-now"
                    onClick={() => handleBuyNow(product.id)}
                  >
                    <i className="fa-solid fa-cart-shopping" />
                    Buy now
                  </button>
                  <button
                    className="view-now"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => handleView(`${product.id}`)}
                  >
                    <i className="fa-regular fa-eye" />
                    View now
                  </button>
                </div>
              </div>
              <div className="card-body">
                <h5 className="card-title">{product.product_name}</h5>
                <p className="card-text">
                  <i>{product.describe}</i>
                </p>
                <p className="card-text">
                  {product.product_price.toLocaleString()}đ
                </p>
              </div>
            </div>
          ))}
        </section>
      </section>
      {/* modal produc-detail */}
      <ModalProductDetail data={dataView} />
      <div className="pagination-product">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
}
