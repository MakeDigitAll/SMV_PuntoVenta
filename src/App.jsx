import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./views/login/Login.jsx";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import Home from "./views/home/Home.jsx";
import User from "./views/user/User.jsx";
import ProductList from "./views/products/ProductList.jsx";
import VerAlmacen from "./views/warehouses/Viewwarehouse.jsx";
import ItemsSales from "./views/sales/ItemsSales.jsx";
import ItemsBilling from "./views/billing/ItemsBlling.jsx";
import ItemsAdministration from "./views/administration/ItemsAdministration.jsx";
import ClientList from "./views/client/ClientList.jsx";
import SellersList from "./views/sellers/SellersList.jsx";
import ItemsStore from "./views/store/ItemsStore.jsx";
import ItemsSMarketing from "./views/marketing/ItemsMarketig.jsx";
import ItemsSWeb from "./views/web/ItemsWeb.jsx";
import ItemsSettings from "./views/settings/ItemsSettings.jsx";
import Users from "./views/user/Users.jsx";
import PosHome from "./views/pos/PosHome.jsx";
import Quotes from "./views/sales/quotes.jsx";
import Orders from "./views/sales/Orders.jsx";
import AddExcelBrands from "./views/Excel/addExcel/addExcelBrands.jsx";
import Payment from "./views/sales/Payment.jsx";
import PurchaseOrders from "./views/store/PurchaseOrders.jsx";


const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      onError: <div>Error</div>,
    },
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/settings/user",
          element: <User />,
        },
        {
          path: "/Products/ProductList",
          element: <ProductList />,
        },
        {
          path: "/home/VerAlmacen",
          element: <VerAlmacen />,
        },
        {
          path: "/home/:id/VerAlmacen",
          element: <VerAlmacen />,
        },
        {
          path: "/Sales",
          element: <ItemsSales />,
        },
        {
          path: "/Billing",
          element: <ItemsBilling />,
        },
        {
          path: "/Administration",
          element: <ItemsAdministration />,
        },
        {
          path: "/Store",
          element: <ItemsStore />,
        },
        {
          path: "/Marketing",
          element: <ItemsSMarketing />,
        },
        {
          path: "/Web",
          element: <ItemsSWeb />,
        },
        {
          path: "/Settings",
          element: <ItemsSettings />,
        },
        {
          path: "/Customers",
          element: <ClientList />,
        },
        {
          path: "/Sellers",
          element: <SellersList />,
        },
        {
          path: "/Settings/Users",
          element: <Users />,
        },
        {
          path: "/POS/Home",
          element: <PosHome />,
        },
        {
          path: "/Sales/Quotes",
          element: <Quotes />,
        },
        {
          path: "/Sales/Orders",
          element: <Orders />,
        },
        {
          path: "/test/añadir",
          element: <AddExcelBrands />,
        },
        {
          path: "/Sales/Payment",
          element: <Payment />,
        },
        {
          path: "/Store/PurchaseOrdes",
          element: <PurchaseOrders />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
