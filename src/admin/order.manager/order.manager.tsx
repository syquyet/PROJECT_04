import "./order.manager.css";
import SidebarAdmin from "../sidebar.admin/sidebar";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import OrdersService from "../../service/order.service";

export default function OrderManager() {
  const ordersService = new OrdersService();
  const [dataListOrder, setListOrder] = useState<any[]>([]);
  useEffect(() => {
    const fetchdata = async () => {
      const reponse = await ordersService.getOrders();
      setListOrder(reponse);
    };
    fetchdata();
  }, []);

  // ======== số sp trong một trang,Xử lý sự kiện khi chuyển trang===========
  const itemsPerPage = 5;
  const pageCount = Math.ceil(dataListOrder.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);
  const currentListOrders = dataListOrder.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };
  return (
    <div className="order-container">
      <SidebarAdmin />
      <div className="manager-order">
        <h5>QUẢN LÝ ORDER</h5>
        <div className="manage_order-input">
          <input
            id="manage-order-seach"
            type="text"
            placeholder="Nhập từ khóa"
          />
          <button>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <table className="list-order">
          <tbody>
            <tr>
              <th>##</th>
              <th>Tên Khách hàng</th>
              <th>Ngày</th>
              <th>Số đt đặt hàng</th>
              <th>Tổng giá</th>
              <th>Địa chỉ</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
            {currentListOrders.map((order, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{order.user_name}</td>
                <td>{order.createdAt}</td>
                <td>{order.phone}</td>
                <td>{order.total.toLocaleString()}đ</td>
                <td>{order.delivery_address}</td>
                <td>{order.status}</td>
                <td>
                  <button className="btn-detail">
                    <i className="fa-regular fa-eye"></i>
                  </button>
                  <button className="btn-edit">
                    <i className="fa-solid fa-pen-to-square"></i>
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
    </div>
  );
}
