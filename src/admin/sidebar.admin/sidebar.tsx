import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./sidebar.css";
import axios from "axios";
import { API } from "../../common/ULR.common";



export default function SidebarAdmin() {
  const navigate = useNavigate();
  const [dataAdmin, setDataAdmin] = useState<any[]>([]);
  const auth: any = localStorage.getItem("admin");
  const adminLocal = JSON.parse(auth);

  useEffect(() => {
    const fetchdata = async () => {
      const reponse = await axios.get(API + `users`);
      setDataAdmin(reponse.data);
    };
    fetchdata();
  }, []);
  const data = dataAdmin.find((item: any) => item.id === adminLocal);
  // ================== logout admin ========================
  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/login");
  };

  return (<>
   
   <div className="sidenav-admin">
      <div className="sidenav">
        <div className="sidenav-avatar">
          <img src={data?.avatar} alt="" />
          <p>Role: Admin</p>
          <p><b>{data?.user_name}</b></p>
          <button className="btn btn-primary">Edit</button>
          <hr />
        </div>
        <div className="sidenav-content">
          <div>
            <Link to="/">
              <i className="fa-solid fa-list" />
              <a href="">Dashboard</a>
            </Link>
          </div>
          <div>
            <Link to="/customer.manager">
              <i className="fa-solid fa-users" />
              <a href="">Customer</a>
            </Link>
          </div>
          <div>
            <Link to="/product.manager">
              <i className="fa-solid fa-shirt" />
              <a href="">Products</a>
            </Link>
          </div>
          <div>
            <Link to="/category">
              <i className="fa-solid fa-shirt" />
              <a href="">Categories</a>
            </Link>
          </div>
          <div>
            <Link to="/order.manager">
              <i className="fa-solid fa-file-invoice" />
              <a href="">Orders</a>
            </Link>
          </div>
          <div>
            <Link to="">
              <i className="fa-solid fa-comments" />
              <a href="">Reviews</a>
            </Link>
          </div>
          <div>
            <Link to="">
              <i className="fa-solid fa-award" />
              <a href="">Vouchers</a>
            </Link>
          </div>
          <div>
            <i className="fa-solid fa-right-from-bracket" />
            <a onClick={handleLogout}>Log out</a>
          </div>
        </div>
      </div>
    </div>

  </>
     );
}
