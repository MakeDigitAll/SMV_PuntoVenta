import {
  RiHome6Line,
  RiGroup2Fill,
  RiUser2Fill,
  RiLoginBoxLine,
} from "react-icons/ri";
import { TbMoneybag, TbReportAnalytics } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { Image } from "@nextui-org/react";
const Sidebar = (props) => {
  // eslint-disable-next-line react/prop-types
  const { showMenu } = props;
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("tableId");
    navigate(`/POS/Access`);
  }
  return (
    <>
      <div
        className={`bg-[#1F1D2B] fixed lg:left-0 top-15 w-28 h-full flex flex-col justify-between py-6 rounded-tr-xl rounded-br-xl z-50 transition-all ${
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
            <li className="bg-[#262837] p-3 rounded-tl-xl rounded-bl-xl">
              <a
                className="bg-[#ec7c6a] p-4 flex justify-center rounded-xl text-white"
                title="Inicio"
              >
                <RiHome6Line className="text-2xl" 
                 onClick={()=>navigate("/PointofSale")}/>
              </a>
            </li>
            <li className="hover:bg-[#262837] p-3 rounded-tl-xl rounded-bl-xl group transition-colors">
              <a
                href="#"
                className="group-hover:bg-[#ec7c6a] p-4 flex justify-center rounded-xl text-[#ec7c6a] group-hover:text-white transition-colors"
                title="Reportes"
              >
                <TbReportAnalytics className="text-2xl" />
              </a>
            </li>
            <li className="hover:bg-[#262837] p-3 rounded-tl-xl rounded-bl-xl group transition-colors}">
              <a
                className="group-hover:bg-[#ec7c6a] p-4 flex justify-center rounded-xl text-[#ec7c6a] group-hover:text-white transition-colors"
                title="Ventas"
              >
                <TbMoneybag className="text-2xl"
                 onClick={()=>navigate("/PointofSale/Sales")} />
              </a>
            </li>
            <li className="hover:bg-[#262837] p-3 rounded-tl-xl rounded-bl-xl group transition-colors">
              <a
                className="group-hover:bg-[#ec7c6a] p-4 flex justify-center rounded-xl text-[#ec7c6a] group-hover:text-white transition-colors"
                title="Clientes"
              >
                <RiGroup2Fill
                  className="text-2xl"
                  onClick={() => navigate("/PointofSale/Customers")}
                />
              </a>
            </li>
            <li className="hover:bg-[#262837] p-3 rounded-tl-xl rounded-bl-xl group transition-colors">
              <a
                href="#"
                className="group-hover:bg-[#ec7c6a] p-4 flex justify-center rounded-xl text-[#ec7c6a] group-hover:text-white transition-colors"
                title="Nueva Venta"
              >
                <RiUser2Fill className="text-2xl" 
                onClick={()=>navigate("/PointofSale/NewSale")}/>
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
