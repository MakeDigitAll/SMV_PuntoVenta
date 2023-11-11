import {Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter
  } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { MdNumbers } from "react-icons/md";
const PriceCheck = ({isOpen,onClose}) => {
  const [data1, setData] = useState([]);
  async function loadTask() {
    try {
      const response = await fetch("https://localhost:4000/Productos");
      const data = await response.json();
      if (response.ok) {
        setData(data);
        
      }
    } catch {
      toast.error("Error al cargar los datos", {
        position: "bottom-right",
        theme: "colored",
      });
    }
  }

  useEffect(() => {
    loadTask();
  }, []);

  const [searchCodigo, setSearchCodigo] = useState('');
  const handleSearchCodigo = (e) => {
    setSearchCodigo(e.target.value);
  };

    const filteredItems = data1.filter((item) =>
    item.codigoEmpresa.toString().includes(searchCodigo.toString())
  );

    return (
      <>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          placement="top-center"
          size="3xl"
          style={{ marginTop: "250px", width: "80%" }}
        >
          <ModalContent>
            {() => (
              <>
                <ModalHeader>Checar Precios</ModalHeader>
                <ModalBody>
                  <div className="rounded px-4 md:p-6 mb-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1">
                      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-8 space-x-2 space-y-2 content-end">
                        <div className="md:col-span-8"></div>
                        <div className="md:col-span-6">
                          <div className="flex flex-wrap">
                            <Input
                              isClearable
                              type="text"
                              size="md"
                              className="w-[450px] sm:max-w-[44%]"
                              placeholder="Código"
                              startContent={<MdNumbers />}
                              onChange={handleSearchCodigo}
                            />
                          </div>
                        </div>
                        <div className="lg:col-span-12 overflow-auto">
                          <table className="bg-[#262837] min-w-600px w-full table-auto divide-gray-200">
                            <thead>
                              <tr class="bg-red-400 text-black uppercase text-sm leading-normal">
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                                  Imagén
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                                  Código
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                                  Nombre
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                                  Existencia
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                                  P.Regular Neto
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                                  P.Oferta Neto
                                </th>
                              </tr>
                            </thead>
                            <tbody class="text-white text-sm font-light">
                              {filteredItems.map((item) => (
                                <tr
                                  key={item.id}
                                  class="border-b border-gray-200"
                                >
                                  <td>
                                  <img src={item.imagen} width="60" />
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {item.codigoEmpresa}
                                    </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {item.nombre}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {item.existencia}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {item.precio}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {item.descuento}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <button
                    onClick={onClose}
                    className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Cerrar
                  </button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
}
export default PriceCheck;