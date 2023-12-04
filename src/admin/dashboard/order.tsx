import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { API } from "../../common/ULR.common";
import ReactPaginate from "react-paginate";
import OrdersService from "../../service/order.service";

export default function Orders() {
  const ordersService = new OrdersService();
  const [dataListOrder, setListOrder] = React.useState<any[]>([]);
  React.useEffect(() => {
    const fetchdata = async () => {
      const reponse = await ordersService.getOrders();
      setListOrder(reponse);
    };
    fetchdata();
  }, []);
  // ======== số sp trong một trang,Xử lý sự kiện khi chuyển trang===========
  const itemsPerPage = 3;
  const pageCount = Math.ceil(dataListOrder.length / itemsPerPage);
  const [currentPage, setCurrentPage] = React.useState(0);
  const currentListOrders = dataListOrder.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };
  return (
    <React.Fragment>
      <h3>List Order</h3>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Stt</strong>
            </TableCell>
            <TableCell>
              <strong>Tên khách hàng</strong>
            </TableCell>
            <TableCell>
              <strong>Ngày order</strong>
            </TableCell>
            <TableCell>
              <strong>Số đt đặt hàng</strong>
            </TableCell>
            <TableCell>
              <strong>Địa chỉ</strong>
            </TableCell>
            <TableCell>
              <strong>Trạng thái</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Tổng order</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentListOrders.map((order, index) => (
            <TableRow>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{order.user_name}</TableCell>
              <TableCell>{order.createdAt}</TableCell>
              <TableCell>{order.phone}</TableCell>
              <TableCell>{order.delivery_address}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell align="right">
                {order.total.toLocaleString()}đ
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="/order.manager">
        Xem chi tiết order
      </Link>
      <ReactPaginate
        className="page-order"
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </React.Fragment>
  );
}
