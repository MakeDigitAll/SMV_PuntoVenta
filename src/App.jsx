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
import CreditNotes from "./views/administration/CreditNotes.jsx";
import AccountStates from "./views/administration/AccountStates.jsx";
import CollectionDay from "./views/administration/CollectionDay.jsx";
import MarginSales from "./views/administration/MarginSales.jsx";
import SalesReport from "./views/administration/SalesReport.jsx";
import PriceList from "./views/administration/PriceList.jsx";
import Discounts from "./views/administration/Discounts.jsx";
import DiscountToken from "./views/administration/discountToken.jsx";
import ExchangeRate from "./views/administration/ExchangeRate.jsx";
import Commissions from "./views/administration/Commissions.jsx";
import ReportCommissions from "./views/administration/ReportCommissions.jsx";
import GroupedCommissions from "./views/administration/GroupedCommissions.jsx";
import Quotes from "./views/sales/quotes.jsx";
import Orders from "./views/sales/Orders.jsx";
import AddExcelBrands from "./views/Excel/addExcel/addExcelBrands.jsx";
import Payment from "./views/sales/Payment.jsx";
import PurchaseOrders from "./views/store/PurchaseOrders.jsx";
import Inventory from "./views/store/Inventory.jsx";
import BulkTransfers from "./views/store/BulkTransfers.jsx";
import Transfers from "./views/store/Transfers.jsx";
import InventoryWarehouse from "./views/store/InventoryXWarehouse.jsx";
import Brands from "./views/store/Brands.jsx";
import FillOrders from "./views/store/FillOrders.jsx";
import Logistics from "./views/store/Logistics.jsx";
import WarehouseEntries from "./views/store/WarehouseEntries.jsx";
import Categories from "./views/store/Categories.jsx";
import NewTransfer from "./views/store/NewTransfer.jsx";
import WarehouseOutputs from "./views/store/WarehouseOutputs.jsx";
import CatalogueofMotifs from "./views/store/CatalogueofMotifs.jsx";
import NewEntry from "./views/store/NewEntry.jsx";
import PaymentMethodList from "./views/settings/PaymentMethods.jsx";
import BranchOffices from "./views/settings/BranchOffices.jsx";
import NewBranch from "./views/settings/NewBranch.jsx";
import Chat from "./views/chat/chat.jsx";
import SecuritProfiles from "./views/settings/perfilesSeguridad/SecuritProfiles.jsx";
import ConfigureAccess from "./views/settings/ConfigureAccess.jsx";
import Quote from "./views/sales/Quote.jsx";
import Seller from "./views/sellers/Seller.jsx";
import FillOrder from "./views/sales/FillOrder.jsx";
import Promotions from "./views/sales/promotions.jsx";
import Visits from "./views/sales/Views.jsx";
import SalesCustomer from "./views/marketing/SalesperCustomer.jsx";
import ClientReport from "./views/marketing/ClientReport.jsx";
import NewClient from "./views/client/NewClientList.jsx";
import ProviderList from "./views/providers/ProviderList.jsx";
import Provider from "./views/providers/Provider.jsx";
import PointofSale from "./views/pointSale/PointofSales.jsx";
import Reports from "./views/pointSale/Reports.jsx";
import Customers from "./views/pointSale/Customers.jsx";
import NewSale from "./views/pointSale/NewSale.jsx";
import Product from "./views/products/Product.jsx";
import AccesPoint from "./views/pointSale/AccesPointOfSale.jsx";
import PointsaleSales from "./views/pointSale/PointsaleSales.jsx";
import AccesPointProductosView from "./views/pointSale/AccesPoint.Products.jsx";
import Customer from "./views/pointSale/Customer.jsx";
import ListCashCuts from "./views/pointSale/CashCuts.jsx";
import CustomerDebts from "./views/pointSale/CustomerDebts.jsx";
import Unautorized from "../src/components/routes/Unauthorized.jsx";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const App = () => {


  useEffect(() => {
    setData();
  }, []);


  const [permisos, setPermisos] = useState([]);

  const setData = async () => {

    //obtener el idPerfilSeguridad del localstorage
    const idPerfilSeguridad = Number(localStorage.getItem('idPerfilSeguridad'));

    try {
      const response = await fetch(`https://localhost:4000/PerfilesSeguridad/${idPerfilSeguridad}`);
      const data = await response.json();
      if (response.ok) {
        setPermisos(data);
      }
    } catch {
      toast.error("Error al cargar los datos", {
        position: "bottom-right",
        theme: "colored",
      });
    }
  }

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
          element: permisos.ver_catalogo_de_productos ? <ProductList /> : <Unautorized />,
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
          path: "/Administration/CreditNotes",
          element: <CreditNotes />,
        },
        {
          path: "/Administration/AccountStates",
          element: permisos.ver_estado_de_cuenta ? <AccountStates /> : <Unautorized />,
        },
        {
          path: "/Administration/CollectionDay",
          element: <CollectionDay />,
        },
        {
          path: "/Administration/MarginSales",
          element: permisos.consultar_reporte_de_margen_de_ventas ? <MarginSales /> : <Unautorized />,
        },
        {
          path: "/Administration/SalesReport",
          element: <SalesReport />,
        },
        {
          path: "/Administration/PriceList",
          element: permisos.crear_lista_de_precios ? <PriceList /> : <Unautorized />,
        },
        {
          path: "/Administration/Discounts",
          element: <Discounts />,
        },
        {
          path: "/Administration/DiscountToken",
          element: <DiscountToken />,
        },
        {
          path: "/Administration/ExchangeRate",
          element: <ExchangeRate />,
        },
        {
          path: "/Administration/Commissions",
          element: <Commissions />,
        },
        {
          path: "/Administration/ReportCommissions",
          element: <ReportCommissions />,
        },
        {
          path: "/Administration/GroupedCommissions",
          element: <GroupedCommissions />,
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
          path: "/Marketing/SalesCustomer",
          element: <SalesCustomer />,
        },
        {
          path: "/Marketing/ClientReport",
          element: <ClientReport />,
        },
        {
          path: "/Web",
          element: <ItemsSWeb />,
        },
        {
          path: "/PointofSale",
          element: permisos.punto_de_venta ? <PointofSale /> : <Unautorized />,
        },
        {
          path: "/PointofSale/Reports",
          element: <Reports />,
        },
        {
          path: "/PointofSale/Customers",
          element: <Customers />,
        },
        {
          path: "/PointofSale/Customers/Customer",
          element: <Customer />,
        },
        {
          path: "/PointofSale/Customers/CustomerDebts",
          element: <CustomerDebts />,
        },
        {
          path: "/PointofSale/NewSale",
          element: permisos.nueva_venta ? <NewSale /> : <Unautorized />,
        },
        {
          path: "/PointofSale/Sales",
          element: <PointsaleSales />,
        },
        {
          path: "/PointofSale/Reports/ListofCashCuts",
          element: <ListCashCuts />,
        },
        {
          path: "/Settings",
          element: <ItemsSettings />,
        },
        {
          path: "/Settings/BranchOffices",
          element: <BranchOffices />,
        },
        {
          path: "/Settings/BranchOffices/NewBranch",
          element: <NewBranch />,
        },
        {
          path: "/Customers",
          element: permisos.consultar_lista_de_clientes ? <ClientList /> : <Unautorized />,
        },
        {
          path: "/Sellers",
          element: permisos.ver_catalogo_de_vendedores ? <SellersList /> : <Unautorized />,
        },
        {
          path: "/Sellers/Seller",
          element: permisos.crear_nuevo_vendedor ? <Seller /> : <Unautorized />,
        },
        {
          path: "/Sellers/:id/ViewSeller",
          element: <Seller />,
        },
        {
          path: "/Sellers/:id/EditSeller",
          element: permisos.editar_vendedor ? <Seller /> : <Unautorized />,
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
        {
          path: "/Store/Transfers",
          element: <Transfers />,
        },
        {
          path: "/Store/Transfers/NewTransfer",
          element: <NewTransfer />,
        },
        {
          path: "/Store/BulkTransfers",
          element: <BulkTransfers />,
        },
        {
          path: "/Store/Inventory",
          element: <Inventory />,
        },
        {
          path: "/Sales/Inventory",
          element: <Inventory />,
        },
        {
          path: "/Store/InventoryXWarehouse",
          element: permisos.consultar_reporte_de_inventario_x_almacen ? <InventoryWarehouse /> : <Unautorized />,
        },
        {
          path: "/Store/Capture/Brands",
          element: <Brands />,
        },
        {
          path: "/Store/FillOrders",
          element: <FillOrders />,
        },
        {
          path: "/Store/Logistics",
          element: <Logistics />,
        },
        {
          path: "/Store/WarehouseEntries",
          element: <WarehouseEntries />,
        },
        {
          path: "/Store/WarehouseEntries/CatalogueofMotifs",
          element: <CatalogueofMotifs />,
        },
        {
          path: "/Store/WarehouseOutputs",
          element: <WarehouseOutputs />,
        },
        {
          path: "/Store/WarehouseOutputs/NewEntry",
          element: <NewEntry />,
        },
        {
          path: "/Store/Categories",
          element: <Categories />,
        },
        {
          path: "/Settings/PaymentMethod",
          element: <PaymentMethodList />,
        },
        {
          path: "/Chat",
          element: <Chat />,
        },
        {
          path: "/Settings/SecuritProfiles",
          element: <SecuritProfiles />,
        },
        {
          path: "/Settings/SecuritProfiles/ConfigureAccess",
          element: <ConfigureAccess />,
        },
        {
          path: "/Sales/Quotes/NewQuote",
          element: permisos.crear_cotizaciones ? <Quote /> : <Unautorized />,
        },
        {
          path: "/Sales/Quotes/:id/ViewQuote",
          element: permisos.ver_cotizaciones ? <Quote /> : <Unautorized />,
        },
        {
          path: "/Sales/Quotes/:id/EditQuote",
          element: permisos.editar_cotizaciones ? <Quote /> : <Unautorized />,
        },
        {
          path: "/Sales/fillOrder",
          element: <FillOrder />,
        },
        {
          path: "/Sales/Promotions",
          element: <Promotions />,
        },
        {
          path: "/Sales/Visits",
          element: <Visits />,
        },
        {
          path: "/Customers/NewClient",
          element: <NewClient />,
        },
        {
          path: "/Customers/:id/ViewClient",
          element: <NewClient />,
        },
        {
          path: "/Customers/:id/EditClient",
          element: <NewClient />,
        },
        {
          path: "/Providers",
          element: <ProviderList />,
        },
        {
          path: "/Provider/NewProvider",
          element: <Provider />,
        },
        {
          path: "/Products/NewProduct",
          element: <Product />,
        },
        {
          path: "/POS/Access",
          element: <AccesPoint />,
        },
        {
          path: "/PointOfSaleProducts",
          element: <AccesPointProductosView />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
