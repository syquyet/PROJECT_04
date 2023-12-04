import { useSelector } from "react-redux";
import "./personal_information.css";
import { RootState } from "../../../redux/store/configureStore";
import { useEffect, useState } from "react";
import axiosInstance from "../../../api/config/config.axios";
import { API } from "../../../api/common";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import UserService from "../../../service/user.service";

export default function Personal() {
  const userService = new UserService();
  const userLogin = useSelector((state: RootState) => state.auth.user);
  const [user, setUser] = useState<any>({});
  const [status, setStatus] = useState<boolean>(false);
  useEffect(() => {
    const fetchdata = async () => {
      const reponse = await userService.getUserById(userLogin?.id);
      setUser(reponse);
    };
    fetchdata();
  }, [userLogin, status]);

  //   ================ update avatar user =================
  const [fileAvatar, setAvatar] = useState<any>();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (name === "avatar" && files && files.length > 0) {
      setAvatar({ [name]: files[0] });
    }
  };
  const handleUpdateAvatar = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!fileAvatar || !fileAvatar.avatar) {
      toast.error("Bạn phải chọn avatar mới", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }
    const bodyformData = new FormData();
    bodyformData.append("avatar", fileAvatar.avatar);
    try {
      await userService.updateAvatar(userLogin?.id, bodyformData);
      setAvatar({});
      toast.success("Cập nhật avatar thành công", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      toast.success("Lỗi khi tải lên ảnh đại diện:" + error, {
        position: "top-right",
        autoClose: 2000,
      });
    }
    setStatus(!status);
  };

  return (
    <>
      <ToastContainer />
      <main className="information">
        <div className="information-container">
          <div className="information-avatar">
            <div>
              <img
                src={
                  user.avatar !== null
                    ? user.avatar
                    : "https://facebookninja.vn/wp-content/uploads/2023/06/anh-dai-dien-mac-dinh-zalo.jpg"
                }
                alt=""
                width="150px"
                height="150px"
              />
              <form onSubmit={handleUpdateAvatar}>
                <input
                  type="file"
                  name="avatar"
                  id="fileInput"
                  onChange={handleInputChange}
                />
                <label htmlFor="fileInput">Chọn avatar mới</label>
                <br />
                <button type="submit">Cập Nhật</button>
              </form>
              <hr />
              <a href="/user/history">Lịch sử mua hàng</a>
            </div>
          </div>
          <div className="information-form">
            <form action="">
              <h5>THÔNG TIN CÁ NHÂN</h5>
              <p>Tên:</p>
              <input type="text" value={user.user_name} />
              <p>Email:</p>
              <input type="email" value={user.email} readOnly />
              <p>Số điện thoại:</p>
              <input type="number" value={user.phone} />
              <p>Đại chỉ:</p>
              <input type="text" value={user.address} />
            </form>
            <button>Thay đổi thông tin</button>
          </div>
        </div>
      </main>
    </>
  );
}
