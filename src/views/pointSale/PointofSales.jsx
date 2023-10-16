import ItemsHeaderPointofSale from "../../components/header/itemsHeader/ItemsHeaderPointofSale";
import React from "react";
import { RiBox1Fill, RiDashboard2Fill } from "react-icons/ri";
import { BiColumns, BiGroup } from "react-icons/bi";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, Spacer,Tab,Tabs, } from "@nextui-org/react";
import { MdClose } from "react-icons/md";

const PointofSale = () => {
 const navigate = useNavigate(); 
  return (
    <div className="place-content-center">
      <ItemsHeaderPointofSale />
      <div>
        <Breadcrumbs aria-label="breadcrumb" color="foreground">
          <Link
            className="text-foreground"
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="foreground"
            href="#"
            onClick={() => navigate(`/${"/Home"}`)}
          >
            <RiDashboard2Fill sx={{ mr: 0.5 }} fontSize="inherit" />
            Inicio
          </Link>
          <Link
            className="text-foreground"
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="foreground"
          >
            <RiBox1Fill sx={{ mr: 0.5 }} fontSize="inherit" />
            Almacén
          </Link>
          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            className="text-foreground"
          >
            <BiColumns sx={{ mr: 0.5 }} fontSize="inherit" />
            Punto de venta
          </Typography>
        </Breadcrumbs>
      </div>
      <Spacer y={10} />
      <div className="bg-card rounded shadow-2xl px-4 md:p-8 mb-6">
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3"></div>
        <div>
          <div className="lg:col-span-2">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
              <div className="md:col-span-12">
                <Tabs
                  key="underlined"
                  variant="underlined"
                  aria-label="Tabs variants"
                >
                  <Tab key="photos" title="Resúmen del Día">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                      <div className="md:col-span-2">
                        <Spacer y={4}/>
                        <div className="flex flex-wrap space-x-2 justify-end">
                          <Button
                            size="sm"
                            color="danger"
                            endContent={<MdClose />}
                          >
                            Cerrar Turno
                          </Button>
                        </div>
                      </div>
                      <div className="md:col-span-4">
                        <Card className="xl:max-w-md bg-success rounded-xl shadow-md px-3 w-full h-64">
                          <CardBody className="py-5">
                            <div className="flex gap-2.5">
                              <BiGroup />
                              <div className="flex flex-col">
                                <span className="text-white" style={{ fontSize: '25px' }}>
                                  Ventas en el turno
                                </span>
                                <span className="text-white" style={{ fontSize: '10px' }}>
                                  1311 Datos
                                </span>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </div>
                      <div className="md:col-span-4">
                        <Card className="xl:max-w-md bg-primary rounded-xl shadow-md px-3 w-full h-64">
                          <CardBody className="py-5">
                            <div className="flex gap-2.5">
                              <BiGroup />
                              <div className="flex flex-col">
                                <span className="text-white" style={{ fontSize: '25px' }}>
                                  Operaciones en el turno
                                </span>
                                <span className="text-white" style={{ fontSize: '10px' }}>
                                  1311 Datos
                                </span>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointofSale;
