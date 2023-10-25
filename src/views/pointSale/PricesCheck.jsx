import {Card, CardBody, useDisclosure,Spacer, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter
  } from "@nextui-org/react";
import { MdNumbers } from "react-icons/md";
const PriceCheck = ({isOpen,onClose}) => {
    const {onOpenChange } = useDisclosure();
    if (!isOpen) {
        return null;
      }
    return (
      <>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
          size="3xl"
        >
          <ModalContent>
            {() => (
              <>
                <ModalHeader>Checar Precios</ModalHeader>
                <ModalBody>
                  <div className="rounded px-4 md:p-8 mb-6">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1">
                      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                        <div className="md:col-span-12"></div>
                        <div className="md:col-span-6">
                        <div className="flex flex-wrap">
                          <Input
                            isClearable
                            type="text"
                            size="md"
                            className="w-[450px] sm:max-w-[44%]"
                            placeholder="Código"
                            startContent={<MdNumbers />}
                          />
                          </div>
                        </div>
                        <div className="lg:col-span-12">
                          <table className="bg-[#262837] min-w-600px w-full table-auto divide-gray-200">
                            <thead>
                              <tr class="bg-red-400 text-black uppercase text-sm leading-normal">
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
                              {/* {datos.map((item) => (
                        <tr key={item.id} class="border-b border-gray-200">
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.ticket}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.fecha}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.hora}
                          </td>
                        </tr>
                      ))} */}
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