import { Accordion, AccordionItem, Card, CardBody } from "@nextui-org/react";
import {
  RiAdminFill,
  RiDashboard2Fill,
  RiGroup2Line,
  RiGroupFill,
  RiLightbulbFill,
  RiStore3Line,
  RiUser2Fill,
} from "react-icons/ri";
import { TbReport, TbReportAnalytics, TbWorld } from "react-icons/tb";
import { MdSettings, MdShoppingCart, MdStorefront } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { toast } from "react-toastify";

const ItemsHeader = () => {
  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState(new Set(["1"]));
  const items = [
    {
      id: 1,
      name: "Dashboard",
      icon: RiDashboard2Fill,
      address: () => navigate(`/${"Home"}`),
    },
    {
      id: 2,
      name: "Ventas",
      icon: TbReport,
      address: () => navigate(`/${"Sales"}`),
    },
    {
      id: 3,
      name: "Facturación",
      icon: TbReportAnalytics,
      address: () => navigate(`/${"Billing"}`),
      roleId: "0",
    },
    {
      id: 4,
      name: "Administración",
      icon: RiAdminFill,
      address: () => navigate(`/${"Administration"}`),
      roleId: "0",
    },
    {
      id: 5,
      name: "Clientes",
      icon: RiGroupFill,
      address: () => navigate(`/${"Customers"}`),
      roleId: "0",
    },
    {
      id: 6,
      name: "Vendedores",
      icon: RiUser2Fill,
      address: () => navigate(`/${"Sellers"}`),
      roleId: "0",
    },
    {
      id: 7,
      name: "Proveedores",
      icon: RiGroup2Line,
      address: () => navigate(`/${"Providers"}`),
      roleId: "0",
    },
    {
      id: 8,
      name: "Productos",
      icon: MdShoppingCart,
      address: () => navigate(`/${"Products/ProductList"}`),
      roleId: "0",
    },
    {
      id: 9,
      name: "Almacén",
      icon: MdStorefront,
      address: () => navigate(`/${"Store"}`),
      roleId: "0",
    },
    {
      id: 10,
      name: "Mercadotecnia",
      icon: RiLightbulbFill,
      address: () => navigate(`/${"Marketing"}`),
      roleId: "0",
    },
    {
      id: 11,
      name: "Punto de venta",
      icon: RiStore3Line,
      address: () => navigate(`/${"POS/Access"}`),
      roleId: "0",
    },
    {
      id: 12,
      name: "Web",
      icon: TbWorld,
      address: () => navigate(`/${"WEB"}`),
      roleId: "0",
    },
    {
      id: 13,
      name: "Ajustes",
      icon: MdSettings,
      address: () => navigate(`/${"Settings"}`),
      roleId: "0",
    },
  ];
  //Permisos que se van a guardar temoralmente por 5 minutos en el localstorage
  // Función para establecer un elemento en el localStorage con tiempo de expiración
  function setItemWithExpiry(key, value, expiryInMinutes) {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + expiryInMinutes * 60 * 1000
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  // Función para obtener un elemento del localStorage
  function getItemWithExpiry(key) {
    const itemString = localStorage.getItem(key);
    if (!itemString) {
      return null;
    }
    const item = JSON.parse(itemString);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      // Si el elemento ha expirado, lo eliminamos del localStorage
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  }


  useEffect(() => {
    setData();
  }, []);


  const setData = async () => {
    const miValor = getItemWithExpiry('permisos');
    if (miValor) {
      //no hacer nada
    } else {
      //obtener el idPerfilSeguridad del localstorage
      const idPerfilSeguridad = Number(localStorage.getItem('idPerfilSeguridad'));

      try {
        const response = await fetch(`https://localhost:4000/PerfilesSeguridad/${idPerfilSeguridad}`);
        const data = await response.json();
        if (response.ok) {
          setItemWithExpiry('permisos', data, 5);
        }
      } catch {
        toast.error("Error al cargar los datos", {
          position: "bottom-right",
          theme: "colored",
        });
      }
    }
  }


  return (
    <div className="place-content-center">
      <Accordion
        isCompact
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        variant="light"
      >
        <AccordionItem key="1" aria-label="Menu">
          <div className="gap-1 sm:grid-cols-16 flex flex-wrap justify-center">
            {items.map((item, index) => (
              <Card
                className="min-w-[90px]"
                shadow="sm"
                key={index}
                isPressable
                onPress={item.address}
                radius="sm"
              >
                <CardBody className="overflow-visible flex py-3">
                  <div className="flex justify-center">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div className="text-center" style={{ marginTop: "3px" }}>
                    <h6 style={{ fontSize: "10px" }}>{item.name}</h6>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ItemsHeader;
