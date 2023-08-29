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
import Inventory from "./views/store/Inventory.jsx";
import BulkTransfers from "./views/store/BulkTransfers.jsx";
import Transfers from "./views/store/Transfers.jsx";
import InventoryWarehouse from "./views/store/InventoryXWarehouse.jsx";
import Brands from "./views/store/Brands.jsx";
import FillOrders from "./views/store/FillOrders.jsx";
import Logistics from "./views/store/Logistics.jsx";
import WarehouseEntries from "./views/store/warehouseEntries.jsx";
import Categories from "./views/store/Categories.jsx";
import NewTransfer from "./views/store/NewTransfer.jsx";
import WarehouseOutputs from "./views/store/WarehouseOutputs.jsx";
import CatalogueofMotifs from "./views/store/CatalogueofMotifs.jsx";
import NewEntry from "./views/store/NewEntry.jsx";

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
          element: <ProductList/>
        },
        {
          path:"/home/VerAlmacen",
          element: <VerAlmacen />
        },
        {
          path:"/home/:id/VerAlmacen",
          element: <VerAlmacen />
        },
        {
          path:"/Sales",
          element: <ItemsSales />
        },
        {
          path:"/Billing",
          element: <ItemsBilling />
        },
        {
          path:"/Administration",
          element: <ItemsAdministration />
        },
        {
          path:"/Store",
          element: <ItemsStore />
        },
        {
          path:"/Marketing",
          element: <ItemsSMarketing />
        },
        {
          path:"/Web",
          element: <ItemsSWeb />
        },
        {
          path: "/Settings",
          element: <ItemsSettings />
        },
        {
          path: "/Customers",
          element: <ClientList />
        },
        {
          path: "/Sellers",
          element: <SellersList />
        },
        {
          path: "/Settings/Users",
          element: <Users />
        },
        
        {
          path: "/POS/Home",
          element: <PosHome />,
        },
        {
          path:"/Store/Transfers",
          element: <Transfers />
        },
        {
          path:"/Store/Transfers/NewTransfer",
          element: <NewTransfer />
        },
        {
          path:"/Store/BulkTransfers",
          element: <BulkTransfers />
        },
        {
          path:"/Store/Inventory",
          element: <Inventory />
        },
        {
          path:"/Store/InventoryXWarehouse",
          element: <InventoryWarehouse />
        },
        {
          path:"/Store/Capture/Brands",
          element: <Brands />
        },
        {
          path:"/Store/FillOrders",
          element: <FillOrders />
        },
        {
          path:"/Store/Logistics",
          element: <Logistics />
        },
        {
          path:"/Store/WarehouseEntries",
          element: <WarehouseEntries />
        },
        {
          path:"/Store/WarehouseEntries/CatalogueofMotifs",
          element: <CatalogueofMotifs />
        },
        {
          path:"/Store/WarehouseOutputs",
          element: <WarehouseOutputs />
        },
        {
          path:"/Store/WarehouseOutputs/NewEntry",
          element: <NewEntry />
        },
        {
          path:"/Store/Categories",
          element: <Categories />
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
