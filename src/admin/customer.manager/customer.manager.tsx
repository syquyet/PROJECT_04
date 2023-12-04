import { useEffect, useState } from "react";
import axios from "axios";
import SidebarAdmin from "../sidebar.admin/sidebar";
import "./customer.manager.css";
import removeUnicode from "../until/removeUnicode";
import ReactPaginate from "react-paginate";
import { API } from "../../common/ULR.common";
import UserService from "../../service/user.service";

export default function CustomerManager() {
  const userService = new UserService();
  const [dataUser, setDataUser] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [status, setStatus] = useState<boolean>(false);

  useEffect(() => {
    const fetchdata = async () => {
      const response = await userService.getAllUsers();
      setDataUser(response);
    };

    fetchdata();
  }, [searchQuery]);

  // =======================tìm user theo tên==========================
  const searchUserByName = (name: string) => {
    const filteredUsers = dataUser.filter((user) =>
      removeUnicode(user.user_name).toLowerCase().includes(name.toLowerCase())
    );
    setDataUser(filteredUsers);
  };
  // ================= thay đổi trạng thái user ==========================
  const handleEditUser = async (user: any) => {
    const { id } = user;
    let newdata;
    if (user?.status === "activate") {
      newdata = {
        status: "inactive",
      };
    } else {
      newdata = {
        status: "activate",
      };
    }
    await axios.patch(API + `users/${id}`, newdata);
    setStatus(!status);
  };
  // =========== số sp trong một trang,Xử lý sự kiện khi chuyển trang =========
  const itemsPerPage = 4;
  const pageCount = Math.ceil(dataUser?.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);
  const currentUser = dataUser?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="customer-container">
      <SidebarAdmin />
      <div className="manage-user">
        <h5>QUẢN LÝ NGƯỜI DÙNG</h5>
        <div className="manage_users-input">
          <input
            id="manage-user-seach"
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Nhập từ khóa"
          />
          <button onClick={() => searchUserByName(searchQuery)}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <table className="list-users">
          <tbody>
            <tr>
              <th>Stt</th>
              <th>avatar</th>
              <th>Tên người dùng</th>
              <th>Email</th>
              <th>address</th>
              <th>created_at</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
            {currentUser?.map((user, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>
                  <img src={user.avatar} alt="" width="50px" height="50px" />
                </td>
                <td>{user.user_name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.createdAt}</td>
                <td>{user.role == 0 ? "User" : "Admin"}</td>
                <td>
                  {user.status === "activate" ? (
                    <select name="" id="">
                      <option value="activate">{user.status}</option>
                      <option value="inactive">inactive</option>
                    </select>
                  ) : (
                    <select name="" id="">
                      <option value="inactive">{user.status}</option>
                      <option value="activate">activate</option>
                    </select>
                  )}
                </td>
                <td>
                  <button type="button" onClick={() => handleEditUser(user)}>
                    {/* <i className="fa-solid fa-pen-to-square"></i> */}
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
