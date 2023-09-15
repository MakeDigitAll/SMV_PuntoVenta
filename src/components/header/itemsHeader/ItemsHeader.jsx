import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
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
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ItemsHeader = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [tasks, setTask] = useState([]);
    const loadTask = async () => {
        try {
          const response = await fetch(`http://localhost:4000/Almacenes`);
          const data = await response.json();
          setTask(data);
        } catch (error) {
          toast.error("¡Error al Cargar lo Datos!", {
            position: "bottom-right",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            autoClose: 5000,
            theme: "colored",
          });
        }
      };
      useEffect(() => {
        loadTask();
      }, []);
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
      address: {onOpen},
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
  return (
    <div className="place-content-center">
      <div>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          isDismissable={false}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-center">
                  Punto de Venta
                </ModalHeader>
                <ModalBody>
                  <Dropdown>
                    <DropdownTrigger>
                      <DropdownMenu
                        name="almacenes"
                        variant="faded"
                        aria-label="Static Actions"
                      >
                        {tasks.map((warehouse) => (
                          <DropdownItem
                            key={warehouse.id}
                            onClick={() =>
                              navigate(`/home/${warehouse.id}/VerAlmacen`)
                            }
                          >
                            {warehouse.nombre}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </DropdownTrigger>
                  </Dropdown>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
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
