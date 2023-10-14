import React from 'react';
import ItemsHeaderPointofSale from '../../components/header/itemsHeader/ItemsHeaderPointofSale';
import { Breadcrumbs, Typography } from "@mui/material";
import {
    Link,
    Spacer,
    TableHeader,
    TableColumn,
    TableRow,
    TableBody,
    Table,
    TableCell,
    Card,
    CardBody,
    Button
  } from "@nextui-org/react";
  import { RiDashboard2Fill } from "react-icons/ri";
  import { MdDashboard, MdScale } from "react-icons/md";
  import { useNavigate } from 'react-router-dom';
const ProductCard = ({ product }) => {
  return (
    <Card className="xl:max-w-md  rounded-xl shadow-md px-3 w-full h-80">
    <CardBody className="py-5">
    <div className="card">
        <div className='width: 100% height: 100%'>
      <img src={product.image} alt={product.name} />
      </div>
      <h3>{product.name}</h3>
      <p>Precio: ${product.price}</p>
      <Button >Agregar</Button>
    </div>
    </CardBody>
    </Card>
  );
};

const ProductList = ({ products }) => {
  return (
    <div className="flex flex-wrap">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

const NewSale = () => {
  const navigate = useNavigate(); 
  const products = [
    {
      id: 1,
      name: 'Producto 1',
      price: 19.99,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnfLWWL46rfeRvtmfWMnACmuiGG9GnzNrkGizmLHCpYRvM9YtrrbG7sjvC7U48HmbaRdc&usqp=CAU',
    },
    {
      id: 2,
      name: 'Producto 2',
      price: 29.99,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX_BZbudYl6mgk7WIlKRxnm-1yL25Svw4trQ&usqp=CAU',
    },
    {
        id: 3,
        name: 'Producto 3',
        price: 29.99,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtm159icSNU_cOGMYhizJ-aXAJvE1SYL476fhIeFysoZOzRuDFV3TLQIlkZhsoGMSG54c&usqp=CAU',
      },
    // Agrega más productos aquí
  ];

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
                  <MdScale sx={{ mr: 0.5 }} fontSize="inherit" />
                  Nueva Venta
                </Typography>
              </Breadcrumbs>
      </div>
    <div>
      <h1>Lista de Productos</h1>
      <ProductList products={products} />
    </div>
    </div>
  );
};

export default NewSale;
