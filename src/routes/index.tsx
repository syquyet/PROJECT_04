import Category from "../admin/category/category";
import CustomerManager from "../admin/customer.manager/customer.manager";
import Dashboard from "../admin/dashboard/dashboad";
import Login from "../admin/login/login";
import OrderManager from "../admin/order.manager/order.manager";
import ProductManager from "../admin/product.manager/product.manager";
import { I_Routes } from "../type/type";

export const routes: I_Routes[] = [
  {
    titles: "Dashboard",
    path: "/",
    element: <Dashboard />,
  },
  {
    titles: "ProductManager",
    path: "/product.manager",
    element: <ProductManager />,
  },
  {
    titles: "OrderManager",
    path: "/order.manager",
    element: <OrderManager />,
  },
  {
    titles: "CustomerManager",
    path: "/customer.manager",
    element: <CustomerManager />,
  },
  {
    titles: "Category",
    path: "/category",
    element: <Category/>
  },
];
