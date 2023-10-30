import { Spacer } from "@nextui-org/spacer";
import React from "react";
import { RiCloseLine, RiDeleteBin6Line } from "react-icons/ri";
const Car = (props) => {
  const { showOrder, setShowOrder } = props;
  return (
    <div
      className={`lg:col-span-2 fixed top-0 bg-[#1F1D2B] w-full lg:w-96 lg:right-0 h-full transition-all z-50 overflow-auto ${
        showOrder ? "right-0" : "-right-full"
      }`}
    >
      {/* Orders */}
      <div className="relative pt-16 lg:pt-8 text-gray-300 p-8 h-full">
        <RiCloseLine
          onClick={() => setShowOrder(false)}
          className="lg:hidden absolute left-4 top-4 p-3 box-content text-gray-300 bg-[#262837] rounded-full text-xl"
        />
        <div className="bg-[#262837] p-4 rounded-xl mb-4">
          <div className="grid grid-cols-6 mb-4">
            {/* Product description */}
            <div className="col-span-4 flex items-center gap-3">
              <div>
                <h1 className="text-md">Vendedor</h1>
                <p className="text-xs text-gray-400">Vendedor:Sitio Web</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#262837] p-4 rounded-xl mb-4">
          <div className="grid grid-cols-6 mb-2">
            <div className="col-span-2 flex flex-col items-center justify-center gap-3">
              <div className="text-center">
                <h1 className="text-md">Imagen Producto</h1>
              </div>
              <div className="flex flex-col items-center justify-center">
                <img
                  src="https://somosmamas.com.ar/wp-content/uploads/2020/06/00-1320x743.jpg"
                  className="w-26 h-24 object-cover rounded-full"
                  alt="Imagen del producto"
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          {/* <div className="h-[300px] md:h-[600px] lg:h-[540px] overflow-y-auto">
  
          </div> */}
        </div>
        <div className="grid grid-cols-2 mb-4">
          {/* Product description */}
          <div className="col-span-4 flex items-center gap-3">
            <div>
              <h1 className="text-md">Total de Venta</h1>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Neto</span>
                  <span className="text-right">$0.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Descuentos</span>
                  <span className="text-right">$0.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-right">$0.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Impuestos</span>
                  <span className="text-right">$0.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#262837] w-full bottom-0 left-0 p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400 text-medium">Total</span>
            <span>$201.03</span>
          </div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-gray-400">Pagado</span>
            <span>$201.03</span>
          </div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-gray-400">Falta</span>
            <span>$201.03</span>
          </div>
          <div className="flex justify-between">
            <button className="bg-[#ec7c6a] py-2 px-4 rounded-lg mx-4">
              Pagar
            </button>
            <button className="bg-red-500 py-2 px-4 rounded-lg mx-4">
              Descuento
            </button>
          </div>
          <div>
            <button className="bg-red-400 w-full py-2 px-4 rounded-lg my-4">
              Imp. Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Car;