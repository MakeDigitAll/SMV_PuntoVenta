import {Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter
} from "@nextui-org/react";
import { useEffect, useState } from "react";


const CashReceipts = ({isOpen,onClose,modalMode}) => {
    const modalTitle =
    modalMode === "entry" ? "Entradas Anteriores" : "Salidas Anteriores";
    return (
      <>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          placement="top-center"
          size="3xl"
        //   style={{ marginTop: "250px", width: "80%" }}
        >
          <ModalContent>
            {() => (
              <>
                <ModalHeader>
                  {modalTitle}
                </ModalHeader>
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
                              placeholder="Fecha"
                              // startContent={< />}
                            />
                          </div>
                        </div>
                        <div className="lg:col-span-12 overflow-auto">
                          <table className="bg-[#262837] min-w-600px w-full table-auto divide-gray-200">
                            <thead>
                              <tr class="bg-red-400 text-black uppercase text-sm leading-normal">
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                                  Cantidad
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                                  Fecha
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                                  Comentario
                                </th>
                              </tr>
                            </thead>
                            <tbody class="text-white text-sm font-light">
                              {/* {filteredItems.map((item) => (
                                  <tr
                                    key={item.id}
                                    class="border-b border-gray-200"
                                  >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      {item.codigoEmpresa}
                                      </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      {item.nombre}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      {item.existencia}
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
export default CashReceipts;

