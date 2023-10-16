import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  Spacer,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tabs,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { MdSave } from "react-icons/md";
import { TbDotsVertical, TbPlus } from "react-icons/tb";
const Facturation = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [datosE, setDatosE] = useState([]);
  const handleCreateClick = () => {
    onOpen();
  };
  async function handleSubmitModal(e, nuevosDatos) {
    e.preventDefault();
    setDatosE([...datosE, nuevosDatos]);
    // if (!task2.nombre || !task2.direccion || !task2.colonia || !task2.ciudad || !task2.estado
    //     || !task2.apellido || !task2.codigoPostal) {
    //     // Puedes mostrar un mensaje de error o tomar otra acción apropiada aquí
    //     toast.warning('Por favor, complete todos los campos requeridos.', { theme: "colored" });
    //     return; // Detiene la ejecución de la función si hay campos vacíos
    //   }
    // const formData = new FormData();
    // const document = JSON.stringify({
    //   nombre: task2.nombre,
    //   direccion: task2.direccion,
    //   colonia: task2.colonia,
    //   ciudad: task2.ciudad,
    //   estado: task2.estado,
    //   apellido: task2.apellido,
    //   codigoPostal: task2.codigoPostal,
    // });
    // formData.append("document", document);
    // try {
    //   const result = await http.post(
    //     `https://localhost:443/ClientesDireccionEnvio`,
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   );
    //   if (response.status == 200 ? true : false) {
    //     toast.success("Dirección de envío creado correctamente", {
    //       theme: "colored",
    //     });
    //     onClose(true);
    //     setDatosE([...datosE, result]);
    //     loadDireccionesE();
    //   }
    // } catch (error) {
    //   null;
    // }
  }
  return (
    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
      <Spacer y={6} />
      <div className="md:col-span-6"></div>
      <div className="md:col-span-11"></div>
      <div className="md:col-span-1">
        <Button
          id="BTN3"
          size="sm"
          color="primary"
          endContent={<TbPlus />}
          className="text-align: right justify-end"
          onClick={handleCreateClick}
        >
          Nuevos datos fiscales
        </Button>
      </div>
      <div className="md:col-span-12">
        <Table removeWrapper>
          <TableHeader>
            <TableColumn className="min-w-[70px]">RFC</TableColumn>
            <TableColumn>Razón Social</TableColumn>
            <TableColumn>Dirección</TableColumn>
            <TableColumn>Forma Pago</TableColumn>
            <TableColumn>Método Pago</TableColumn>
            <TableColumn>Uso CFDI</TableColumn>
          </TableHeader>
          <TableBody>
            {datosE.map((data, index) => (
              <TableRow key={index}>
                <TableCell>{data.nombre}</TableCell>
                <TableCell>{data.direccion}</TableCell>
                <TableCell>{data.colonia}</TableCell>
                <TableCell>{data.ciudad}</TableCell>
                <TableCell>{data.estado}</TableCell>
                <TableCell>
                  <div className="relative flex justify-center items-center gap-2">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button isIconOnly size="sm" variant="light">
                          <TbDotsVertical className="text-default-300" />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu>
                        <DropdownItem>View</DropdownItem>
                        <DropdownItem>Edit</DropdownItem>
                        <DropdownItem>Delete</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="center"
          size="5xl"
          scrollBehavior="inside"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Datos Fiscales</ModalHeader>
                <ModalBody>
                  <Tabs
                    key="underlined"
                    variant="underlined"
                    aria-label="Tabs variants"
                  >
                    <Tab key="Generales" title="Generales">
                      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                          <div className="md:col-span-6"></div>
                          <div className="md:col-span-8">
                            <Input
                              label="RFC"
                              type="text"
                              placeholder=" "
                              size="md"
                            ></Input>
                          </div>
                          <div className="md:col-span-4">
                            <Select
                              label="Predeterminado"
                              placeholder=" "
                              size="md"
                            ></Select>
                          </div>
                          <div className="md:col-span-8">
                            <Input
                              label="Razón Social"
                              type="text"
                              placeholder=" "
                              size="md"
                            ></Input>
                          </div>
                          <div className="md:col-span-4">
                            <Input
                              label="Capital"
                              type="text"
                              placeholder=" "
                              size="md"
                            ></Input>
                          </div>
                          <div className="md:col-span-6">
                            <Select
                              label="Régimen Fiscal"
                              placeholder=" "
                              size="md"
                            ></Select>
                          </div>
                          <div className="md:col-span-6">
                            <Select
                              label="Uso de CFDI"
                              placeholder=" "
                              size="md"
                            ></Select>
                          </div>
                          <div className="md:col-span-6">
                            <Select
                              label="Método de Pago"
                              placeholder=" "
                              size="md"
                            ></Select>
                          </div>
                          <div className="md:col-span-6">
                            <Select
                              label="Forma de Pago"
                              placeholder=" "
                              size="md"
                            ></Select>
                          </div>
                        </div>
                      </div>
                    </Tab>
                    <Tab key="DireccionF" title="Dirección Fiscal">
                      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                          <div className="md:col-span-12"></div>
                          <div className="md:col-span-6">
                            <Input
                              label="Calle"
                              type="text"
                              placeholder=" "
                              size="md"
                            ></Input>
                          </div>
                          <div className="md:col-span-3">
                            <Input
                              label="# Ext."
                              type="text"
                              placeholder=" "
                              size="md"
                            ></Input>
                          </div>
                          <div className="md:col-span-3">
                            <Input
                              label="# Int."
                              type="text"
                              placeholder=" "
                              size="md"
                            ></Input>
                          </div>
                          <div className="md:col-span-6">
                            <Input
                              label="Colonia"
                              type="text"
                              placeholder=" "
                              size="md"
                            ></Input>
                          </div>
                          <div className="md:col-span-6">
                            <Input
                              label="Municipio/Ciudad"
                              type="text"
                              placeholder=" "
                              size="md"
                            ></Input>
                          </div>
                          <div className="md:col-span-6">
                            <Select
                              label="Estado"
                              placeholder=" "
                              size="md"
                            ></Select>
                          </div>
                          <div className="md:col-span-6">
                            <Input
                              label="C.P."
                              type="text"
                              placeholder=" "
                              size="md"
                            ></Input>
                          </div>
                          <div className="md:col-span-6">
                            <Input
                              label="Correo Electrónico"
                              type="text"
                              placeholder=" "
                              size="md"
                            ></Input>
                          </div>
                        </div>
                      </div>
                    </Tab>
                  </Tabs>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button
                    id="BTN2guardar"
                    endContent={<MdSave />}
                    color="primary"
                    onClick={handleSubmitModal}
                  >
                    Guardar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default Facturation;
