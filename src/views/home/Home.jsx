import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useAuth } from "../../components/auth/AuthProvider";
import Header from "../../components/header/headerC/Header";
import { useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ItemsHeader from "../../components/header/ItemsHeader/ItemsHeader";


const Home = () => {
  const auth = useAuth();

  const {isOpen, onOpen, onOpenChange} = useDisclosure();



  const navigate = useNavigate();
  const [tasks, setTask] = useState([]);

  
  const loadTask = async (id) => {
    try{
    const response = await fetch(`http://localhost:4000/Almacenes`)
    const data = await  response.json()
    setTask(data)
    console.log(data)
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
    loadTask();
  }, [])

  

  return (
    <>
      <Header />
      <ItemsHeader />
      <div>
        Dashboard de{" "}
        {auth.getUser()?.nombre +
          " " +
          auth.getUser()?.apellido +
          " Su correo es" +
          auth.getUser()?.email}{" "}
      </div>
      <div className="flex flex-wrap gap-4 items-center">
        <Button color="default">Default</Button>
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="success">Success</Button>
        <Button color="warning">Warning</Button>
        <Button color="danger">Danger</Button>
        <br />
        <Button color='primary' onPress={onOpen}>Almacenes</Button>
      </div>
   
      <div>
      <Modal backdrop={"blur"} isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"> Seleccione un Almacén</ModalHeader>
              <ModalBody>
              <Dropdown backdrop="blur">
                <DropdownTrigger>
                  <Button 
                    variant="bordered" 
                  >
                    Almacén
                  </Button>
                </DropdownTrigger>
                <DropdownMenu name="almacenes" variant="faded" aria-label="Static Actions"> 
                  {tasks.map((warehouse) => (
                    <DropdownItem onClick={() => navigate(`/home/${warehouse.id}/VerAlmacen`)}  >{warehouse.nombre}</DropdownItem>
                  ))}                 
                </DropdownMenu>
              </Dropdown>

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      </div>

      
    </>
  );
};

export default Home;
