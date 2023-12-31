import {
  RiHome6Line,
  RiGroup2Fill,
  RiUser2Fill,
  RiLoginBoxLine,
} from "react-icons/ri";
import { TbMoneybag, TbReportAnalytics } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { Image } from "@nextui-org/react";
import { useState } from 'react';
const Sidebar = (props) => {
  // eslint-disable-next-line react/prop-types
  const { showMenu } = props;
  const [activeMenuItem, setActiveMenuItem] = useState(null);

  const handleMenuItemClick = (item) => {
    if (activeMenuItem === item) {
      // Si el elemento ya está activo, desactívalo
      setActiveMenuItem(null);
    } else {
      // De lo contrario, establece el nuevo elemento como activo
      setActiveMenuItem(item);
    }
  };
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("tableId");
    navigate(`/POS/Access`);
  }
  
  return (
    <>
      <div
        className={`bg-[#1F1D2B] fixed lg:left-0 top-0 w-28 h-full flex flex-col justify-between py-6 rounded-tr-xl rounded-br-xl z-50 transition-all ${
          showMenu ? "left-0" : "-left-full"
        }`}
      >
        <div>
          <ul className="pl-4">
            <li>
              <h1 className="text-2xl text-gray-300 uppercase font-bold text-center my-4">
              <Image
                isZoomed
                src="../../../public/make-dark.png"
                alt=""
                width={80}
                height={70}
                href={"/"}
              />
              </h1>
            </li>
            <li className={`hover:bg-[#262837] p-3 rounded-tl-xl rounded-bl-xl group transition-colors ${activeMenuItem === 'inicio' ? 'bg-[#262837] text-white' : ''}`}>
              <a
                className="group-hover:bg-[#ec7c6a] p-4 flex justify-center rounded-xl text-[#ec7c6a] group-hover:text-white transition-colors"
                title="Inicio"
                onClick={() => {
                  handleMenuItemClick('inicio');
                  navigate('/PointofSale');
                }}
              >
                <RiHome6Line className="text-2xl"/>
              </a>
            </li>
            <li className={`hover:bg-[#262837] p-3 rounded-tl-xl rounded-bl-xl group transition-colors ${activeMenuItem === 'reportes' ? 'bg-[#262837] text-white' : ''}`}>
              <a
                className="group-hover:bg-[#ec7c6a] p-4 flex justify-center rounded-xl text-[#ec7c6a] group-hover:text-white transition-colors"
                title="Reportes"
                onClick={() => {
                  handleMenuItemClick('reportes');
                  navigate('/PointofSale/Reports')
                }}
              >
                <TbReportAnalytics className="text-2xl" />
              </a>
            </li>
            <li className={`hover:bg-[#262837] p-3 rounded-tl-xl rounded-bl-xl group transition-colors ${activeMenuItem === 'ventas' ? 'bg-[#262837] text-white' : ''}`}>
              <a
                className="group-hover:bg-[#ec7c6a] p-4 flex justify-center rounded-xl text-[#ec7c6a] group-hover:text-white transition-colors"
                title="Ventas"
                onClick={() => {
                  handleMenuItemClick('ventas');
                  navigate('/PointofSale/Sales')
                }}
              >
                <TbMoneybag className="text-2xl"/>
              </a>
            </li>
            <li className={`hover:bg-[#262837] p-3 rounded-tl-xl rounded-bl-xl group transition-colors ${activeMenuItem === 'clientes' ? 'bg-[#262837] text-white' : ''}`}>
              <a
                className="group-hover:bg-[#ec7c6a] p-4 flex justify-center rounded-xl text-[#ec7c6a] group-hover:text-white transition-colors"
                title="Clientes"
                onClick={() => {
                  handleMenuItemClick('clientes');
                  navigate("/PointofSale/Customers")
                }}
              >
                <RiGroup2Fill
                  className="text-2xl"
                />
              </a>
            </li>
            <li className={`hover:bg-[#262837] p-3 rounded-tl-xl rounded-bl-xl group transition-colors ${activeMenuItem === 'nuevaVenta' ? 'bg-[#262837] text-white' : ''}`}>
              <a
                href="#"
                className="group-hover:bg-[#ec7c6a] p-4 flex justify-center rounded-xl text-[#ec7c6a] group-hover:text-white transition-colors"
                title="Nueva Venta"
                onClick={()=>{
                  handleMenuItemClick('nuevaVenta');
                  navigate("/PointofSale/NewSale")}}
              >
                <RiUser2Fill className="text-2xl"/>
              </a>
            </li>
            <li className="hover:bg-[#262837] p-4 rounded-tl-xl rounded-bl-xl group transition-colors">
              <a
                href="#"
                className="group-hover:bg-[#ec7c6a] p-3 flex justify-center rounded-xl text-[#ec7c6a] group-hover:text-white transition-colors"
                title="Cerrar punto de venta"
              >
                <RiLoginBoxLine className="text-2xl" onClick={handleLogout} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      </>
  );
};

export default Sidebar;
