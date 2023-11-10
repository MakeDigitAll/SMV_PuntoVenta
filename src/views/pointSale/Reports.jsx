import { Breadcrumbs, Typography } from "@mui/material";
import {
  AccordionItem, Accordion, Card, CardBody,
  Link, Spacer,
} from "@nextui-org/react";
import { RiDashboard2Fill } from "react-icons/ri";
import { MdAttachMoney, MdDashboard, MdMoneyOffCsred, MdPageview, MdReport } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Sidebar from "../../components/shared/Sidebar";
import SidebarMovil from "../../components/shared/SidebarMovill";
import { useState } from "react";
import HeaderPointofSale from "../../components/header/headerC/HederPointofSale";
const itemsReports = [
  {
      id: 1,
      name: "Cortes de Caja",
      icon: MdPageview,
      roleId: "0",
  },
  {
      id: 2,
      name: "Reporte de Ventas",
      icon: MdAttachMoney,
      roleId: "0",
  },
  {
    id: 3,
    name: "Corte de ventas General",
    icon: MdMoneyOffCsred,
    roleId: "0",

},]
const Reports = () => {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["1"]));
  const navigate = useNavigate(); 
  return (
    <>
      <div className="bg-[#262837] w-full min-h-screen">
        <Sidebar />
        <SidebarMovil />
        <main className="lg:pl-28 lg:pr-90 pb-15">
          <div className="p-12">
          <HeaderPointofSale/>
            {/* <div className="p-12 bg-gray-100"> */}
            <div className="">
              <div>
                <div>
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
                    <Link
                      className="text-foreground"
                      underline="hover"
                      sx={{ display: "flex", alignItems: "center" }}
                      color="foreground"
                      href="#"
                      onClick={() => navigate(`/PointofSale`)}
                    >
                      <MdDashboard sx={{ mr: 0.5 }} fontSize="inherit" />
                      Dashboard
                    </Link>
                    <Typography
                      sx={{ display: "flex", alignItems: "center" }}
                      className="text-foreground"
                    >
                      <MdReport sx={{ mr: 0.5 }} fontSize="inherit" />
                      Reportes
                    </Typography>
                  </Breadcrumbs>
                </div>
                <Spacer y={4} />
                <Accordion
                  selectedKeys={selectedKeys}
                  onSelectionChange={setSelectedKeys}
                  variant="light"
                >
                  <AccordionItem key="1" aria-label="Menu">
                    <div className="gap-2 sm:grid-cols-13 flex flex-wrap justify-center">
                      {itemsReports.map((item, index) => (
                        <Card
                          className="w-[115px] h-[65px] col-span-15 sm:col-span-7 hover:bg-red-400"
                          shadow="md"
                          key={index}
                          isPressable
                           onPress={() => {
                            if (item.name === "Cortes de Caja") {
                            navigate("/PointofSale/Reports/ListofCashCuts")
                            }
                           }}
                        >
                          <CardBody className="overflow-visible py-2">
                            <div className="flex justify-center items-center">
                              <item.icon className="h-5 w-5" />
                            </div>
                            <div
                              className="text-center"
                              style={{ marginTop: "3px" }}
                            >
                              <h6 style={{ fontSize: "11px" }}>{item.name}</h6>
                            </div>
                          </CardBody>
                        </Card>
                      ))}
                    </div>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Reports;