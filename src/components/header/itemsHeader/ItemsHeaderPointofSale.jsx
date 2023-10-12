import {
    Accordion,
    AccordionItem,
    Card,
    CardBody,
    useDisclosure,
  } from "@nextui-org/react";
  import {
    RiDashboard2Fill,
    RiGroupFill,
    RiUser2Fill,
  } from "react-icons/ri";
  import { TbMoneybag, TbReport, TbReportAnalytics, TbWorld } from "react-icons/tb";
  import { useNavigate } from "react-router-dom";
  import { useEffect, useState } from "react";
  
  const ItemsHeaderPointofSale = () => {
    const navigate = useNavigate();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
   
    const [selectedKeys, setSelectedKeys] = useState(new Set(["1"]));
    const items = [
      {
        id: 1,
        name: "Nueva Venta",
        icon: TbMoneybag,
        address: { onOpen },
        roleId: "0",
      },
      {
        id: 2,
        name: "Dashboard",
        icon: RiDashboard2Fill,
        address:() => navigate(`/${"PointofSale"}`),
        roleId: "0",
      },
      {
        id: 3,
        name: "Ventas",
        icon: TbReportAnalytics,
        address: { onOpen },
        roleId: "0",
      },
      {
        id: 4,
        name: "Clientes",
        icon: RiGroupFill,
        address: { onOpen },
        roleId: "0",
      },
      {
        id: 5,
        name: "Reportes",
        icon: RiUser2Fill,
        address: { onOpen },
        roleId: "0",
      },
    ];
    return (
        <Accordion
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
    );
  };
  
  export default ItemsHeaderPointofSale;
  