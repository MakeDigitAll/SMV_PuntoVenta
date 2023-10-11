import ItemsHeader from "../../components/header/itemsHeader/ItemsHeader";
import { Card, CardBody } from "@nextui-org/react";
import {
  BiArchiveIn,
  BiArchiveOut,
  BiCalendarAlt,
  BiCheckCircle,
  BiCheckDouble,
  BiClipboard,
  BiListUl,
  BiSolidTruck,
  BiTag,
  BiTransfer,
  BiTransferAlt,
  BiVerticalBottom,
} from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { RiDashboard2Fill, RiListCheck } from "react-icons/ri";
import Typography from "@mui/material/Typography";

const itemsStoreAlmacen = [
  {
    id: 1,
    name: "Surtir Pedidos",
    icon: BiCalendarAlt,
    address: "Cotizaciones",
  },
  {
    id: 2,
    name: "Logistica",
    icon: BiSolidTruck,
    address: "Pedidos",
    roleId: "0",
  },
  {
    id: 3,
    name: "Entradas de Almacén",
    icon: BiArchiveIn,
    address: "SurtirPedidos",
    roleId: "0",
  },
  {
    id: 4,
    name: "Salidas de Almacén",
    icon: BiArchiveOut,
    address: "SurtirPedidos",
    roleId: "0",
  },
  {
    id: 5,
    name: "Inventario",
    icon: BiCheckCircle,
    address: "SurtirPedidos",
    roleId: "0",
  },
  {
    id: 6,
    name: "Inv. X Almacén",
    icon: BiCheckDouble,
    address: "SurtirPedidos",
    roleId: "0",
  },
  {
    id: 7,
    name: "Transferencias",
    icon: BiTransfer,
    address: "SurtirPedidos",
    roleId: "0",
  },
  {
    id: 8,
    name: "Transferencias Masivas",
    icon: BiTransferAlt,
    address: "SurtirPedidos",
    roleId: "0",
  },
];

const itemsStoreCompras = [
  {
    id: 1,
    name: "Ordenes de Compra",
    icon: BiClipboard,
    address: "Cotizaciones",
    roleId: "0",
  },
];

const itemsStorecaptura = [
  {
    id: 1,
    name: "Marcas",
    icon: BiTag,
    address: "Cotizaciones",
  },
  {
    id: 2,
    name: "Categorías",
    icon: BiListUl,
    address: "Pedidos",
    roleId: "0",
  },
  {
    id: 3,
    name: "Importar Datos",
    icon: BiVerticalBottom,
    address: "SurtirPedidos",
    roleId: "0",
  },
];

const ItemsStore = () => {
  const navigate = useNavigate();
  return (
    <>
      <ItemsHeader />
      <div className="place-content-center" style={{ marginLeft: "30px" }}>
        <div style={{ marginBottom: "30px" }}>
          <Breadcrumbs aria-label="breadcrumb" color="foreground">
            <Link
              className="text-foreground"
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              color="foreground"
              href="#"
              onClick={() => navigate(`/Home`)}
            >
              <RiDashboard2Fill sx={{ mr: 0.5 }} fontSize="inherit" />
              Inicio
            </Link>
            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              className="text-foreground"
            >
              <RiListCheck sx={{ mr: 0.5 }} fontSize="inherit" />
              Almacén
            </Typography>
          </Breadcrumbs>
        </div>
        <div style={{ display: "inline-block", marginRight: "10px" }}>
          <h6>Almacén</h6>
          <br />
          <div
            className="gap-2 sm:grid-cols flex flex-wrap justify-center space-x-1"
            style={{ width: "550px" }}
          >
            {itemsStoreAlmacen.map((item, index) => (
              <Card
                className="w-[115px] h-[65px] col-span-15 sm:col-span-7"
                shadow="md"
                key={index}
                isPressable
                onPress={() => {
                  if (item.name === "Inv. X Almacén") {
                    navigate("/Store/InventoryXWarehouse");
                  } else if (item.name == "Transferencias") {
                    navigate(`/Store/Transfers`);
                  } else if (item.name == "Transferencias Masivas") {
                    navigate(`/Store/BulkTransfers`);
                  } else if (item.name == "Inventario") {
                    navigate("/Store/Inventory");
                  } else if (item.name == "Surtir Pedidos") {
                    navigate("/Store/FillOrders");
                  } else if (item.name == "Logistica") {
                    navigate("/Store/Logistics");
                  } else if (item.name == "Entradas de Almacén") {
                    navigate("/Store/WarehouseEntries");
                  } else if (item.name == "Salidas de Almacén") {
                    navigate("/Store/WarehouseOutputs");
                  }
                }}
              >
                <CardBody className="overflow-visible py-2">
                  <div className="flex justify-center items-center">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="text-center" style={{ marginTop: "3px" }}>
                    <h6 style={{ fontSize: "11px" }}>{item.name}</h6>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
        <div style={{ display: "inline-block" }}>
          {" "}
          <h6>Captura</h6>
          <br />
          <div
            className="gap-2 sm:grid-cols flex flex-wrap justify-center"
            style={{ width: "410px" }}
          >
            {itemsStorecaptura.map((item, index) => (
              <Card
                className="w-[115px] h-[65px] col-span-15 sm:col-span-7"
                shadow="md"
                key={index}
                isPressable
                onPress={() => {
                  if (item.name === "Marcas") {
                    navigate("/Store/Capture/Brands");
                  } else if (item.name === "Categorías") {
                    navigate(`/Store/Categories`);
                  }
                }}
              >
                <CardBody className="overflow-visible py-2">
                  <div className="flex justify-center items-center">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="text-center" style={{ marginTop: "3px" }}>
                    <h6 style={{ fontSize: "11px" }}>{item.name}</h6>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
        <div style={{ display: "inline-block", marginRight: "10px" }}>
          {" "}
          <h6>Compras</h6>
          <br />
          <div className="gap-1 sm:grid-cols flex flex-wrap justify-center">
            {itemsStoreCompras.map((item, index) => (
              <Card
                className="w-[115px] h-[65px] col-span-15 sm:col-span-7"
                shadow="md"
                key={index}
                isPressable
                onPress={() => {
                  if (item.name === "Ordenes de Compra") {
                    navigate("/Store/PurchaseOrdes");
                  }
                  // else if (item.name === "Proveedores") {
                  //    navigate(`/Store/Categories`); }
                }}
              >
                <CardBody className="overflow-visible py-2">
                  <div className="flex justify-center items-center">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="text-center" style={{ marginTop: "3px" }}>
                    <h6 style={{ fontSize: "11px" }}>{item.name}</h6>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemsStore;
