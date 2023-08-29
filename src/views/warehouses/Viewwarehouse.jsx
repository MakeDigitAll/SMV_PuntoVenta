import React from "react";
import { useEffect,useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Button, Input} from "@nextui-org/react";
import {useParams, useNavigate} from 'react-router-dom';
import Header from "../../components/header/headerC/Header";
import ItemsHeader from "../../components/header/ItemsHeader/ItemsHeader";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import { ToastContainer } from "react-toastify";
import Breadcrumbs from "@mui/material/Breadcrumbs"; 
import Link from "@mui/material/Link";
import { RiDashboard2Fill, RiListCheck } from "react-icons/ri";
import Typography from "@mui/material/Typography";
import { MdHomeFilled } from "react-icons/md";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";


const VerAlmacen = () => {

    const params = useParams();
    const navigate = useNavigate();

    const [task, setTask] = useState({
        nombre: '',
        tipo: '',
      })

      
      const handleChange = e => {
        setTask({ ...task, [e.target.name]: e.target.value })
      }

    const loadTask = async (id) => {
        try{
        const response = await fetch(`http://ec2-18-118-164-218.us-east-2.compute.amazonaws.com:4000/Almacenes/${id}`)
        const data = await  response.json()
        setTask({nombre: data.nombre, tipo: data.tipo})
       
        } catch (error) {
          toast.error('¡Error al Cargar lo Datos!', {
            position: "bottom-right",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            autoClose: 5000,
            theme: "colored"
          });
        }
      }
    
      useEffect(() => {
        console.log(params)
        if (params.id) {
          loadTask(params.id)
        }
      }, [params.id ])




    return(
        <>
        <Header />
        <div style={{  width: "100%", height: "800px", overflow: "hidden", marginTop: "10px" }}>
          
          <div style={{  width: "280px", height: "600px", float: "right", marginTop: "20px", marginRight: "5px" }}>
            Ejemplo para informacion adicional para el contenido que tengan los almacenes 
            <Table aria-label="Example static collection table">
              <TableHeader>
                <TableColumn>NAME</TableColumn>
                <TableColumn>ROLE</TableColumn>
                <TableColumn>STATUS</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow key="1">
                  <TableCell>Tony Reichert</TableCell>
                  <TableCell>CEO</TableCell>
                  <TableCell>Active</TableCell>
                </TableRow>
                <TableRow key="2">
                  <TableCell>Zoey Lang</TableCell>
                  <TableCell>Technical Lead</TableCell>
                  <TableCell>Paused</TableCell>
                </TableRow>
                <TableRow key="3">
                  <TableCell>Jane Fisher</TableCell>
                  <TableCell>Senior Developer</TableCell>
                  <TableCell>Active</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div style={{ background: "gray", width: "230px", height: "600px", float: "left", marginTop: "20px", marginLeft: "5px", marginRight: "20px" }}>
            div de contenido izquierdo
          </div>

          <div style={{ width: "800px", height: "100px", display: "flex", marginLeft: "10px", marginTop: "20px"}}>
              <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"> 
            <Input
              type="almacen"
              label="Buscar Almacén"
              placeholder="Almacen de Ejemplo"
              labelPlacement="outside"
              startContent={
                <MdHomeFilled className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
            />
            </div>          
          </div>

          <div className="gap-2 sm:grid-cols-13 flex flex-wrap">
            <Card className="py-2" style={{ marginRight: "5px"}}>
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">Precio Unidad</p>
                <small className="text-default-500">$ 100.00</small>
                <h4 className="font-bold text-large">Producto Almacén Prueba</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2" style={{justifyContent: "center"}}>
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                  width={180}
                />
                <br />
                <Button color="primary" variant="ghost">
                  Botón Prueba
                </Button>
              </CardBody>
            </Card>
            <Card className="py-4" style={{ marginRight: "5px"}}>
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">Precio Unidad</p>
                <small className="text-default-500">$ 100.00</small>
                <h4 className="font-bold text-large">Producto Almacén Prueba</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2" style={{justifyContent: "center"}}>
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                  width={180}
                />
                <br />
                <Button color="primary" variant="ghost">
                  Botón Prueba
                </Button>
              </CardBody>
            </Card>
            <Card className="py-4" >
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">Precio Unidad</p>
                <small className="text-default-500">$ 100.00</small>
                <h4 className="font-bold text-large">Producto Almacén Prueba</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2" style={{justifyContent: "center"}}>
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                  width={180}
                />
                <br />
                <Button color="primary" variant="ghost">
                  Botón Prueba
                </Button>
              </CardBody>
            </Card>
            <Card className="py-4">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">Precio Unidad</p>
                <small className="text-default-500">$ 100.00</small>
                <h4 className="font-bold text-large">Producto Almacén Prueba</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2" style={{justifyContent: "center"}}>
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                  width={180}
                />
                <br />
                <Button color="primary" variant="ghost">
                  Botón Prueba
                </Button>
              </CardBody>
            </Card>
            <Card className="py-4" >
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">Precio Unidad</p>
                <small className="text-default-500">$ 100.00</small>
                <h4 className="font-bold text-large">Producto Almacén Prueba</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2" style={{justifyContent: "center"}}>
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                  width={180}
                />
                <br />
                <Button color="primary" variant="ghost">
                  Botón Prueba
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>

        <Button color="primary" style={{float: "right"}} onPress={() => navigate("/Home")}>
          Regresar
        </Button>



        {/* <form onChange={handleChange}>
        <div>
            <Input  width="100px"
            value={task.nombre}></Input>
            <br />
            <Input
            value={task.tipo}></Input>
        </div>
        </form> */}
        
        {/* <div>
            <Button color="danger" onPress={() => navigate("/home")}>Regresar</Button>
        </div> */}
        </>
    )

 } 
 
 export default VerAlmacen;
