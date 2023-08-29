import {
  Button,
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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const POS_Modal = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const navigate = useNavigate();
    const [tasks, setTask] = useState([]);
    const loadTask = async () => {
        try {
          const response = await fetch(`http://ec2-18-118-164-218.us-east-2.compute.amazonaws.com:4000/Almacenes`);
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
  return (
    <div>
        <Button color="primary" onPress={onOpen}>
          Almacenes
        </Button>
      <Modal
        backdrop={"blur"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {" "}
                Seleccione un Almacén
              </ModalHeader>
              <ModalBody>
                <Dropdown backdrop="blur">
                  <DropdownTrigger>
                    <Button variant="bordered">Almacén</Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    name="almacenes"
                    variant="faded"
                    aria-label="Static Actions"
                  >
                    <DropdownItem
                      onClick={() =>
                        navigate(`/home/${tasks[0].id}/VerAlmacen`)
                      }
                    >
                      Almacén de Transferencia
                    </DropdownItem>
                    <DropdownItem
                      onClick={() =>
                        navigate(`/home/${tasks[1].id}/VerAlmacen`)
                      }
                    >
                      Tarjeta de Almacén
                    </DropdownItem>
                    <DropdownItem
                      onClick={() =>
                        navigate(`/home/${tasks[2].id}/VerAlmacen`)
                      }
                    >
                      Inventario por Almacén{" "}
                    </DropdownItem>
                    <DropdownItem
                      onClick={() =>
                        navigate(`/home/${tasks[3].id}/VerAlmacen`)
                      }
                    >
                      Listado de Productos
                    </DropdownItem>
                    <DropdownItem
                      onClick={() =>
                        navigate(`/home/${tasks[4].id}/VerAlmacen`)
                      }
                    >
                      Datos de La Sucursal
                    </DropdownItem>
                    <DropdownItem
                      onClick={() =>
                        navigate(`/home/${tasks[5].id}/VerAlmacen`)
                      }
                    >
                      Almacén de la Sucursal
                    </DropdownItem>
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
  );
};

export default POS_Modal;
