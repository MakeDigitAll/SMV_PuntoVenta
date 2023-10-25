import { useState } from "react";
import {
  RiMenu3Fill,
  RiUser3Line,
  RiAddLine,
  RiPieChartLine,
  RiCloseLine,
  RiCarFill,
  RiNumbersLine,
} from "react-icons/ri";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import Car from "./Car";
const SidebarMovil = () => {
    const navigate = useNavigate();
    const [showCar, setShowCar] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showOrder, setShowOrder] = useState(false);
    const toggleCar = () => {
      setShowCar(!showCar);
      toggleOrders();
    };
    const toggleMenu = () => {
        setShowMenu(!showMenu);
        setShowOrder(false);
      };
    
      const toggleOrders = () => {
        setShowOrder(!showOrder);
        setShowMenu(false);
      };
    return (
      <div>
        <Sidebar showMenu={showMenu} />
        <nav className="bg-[#1F1D2B] lg:hidden fixed w-full bottom-0 left-0 text-3xl text-gray-400 py-2 px-8 flex items-center justify-between rounded-tl-xl rounded-tr-xl">
          <button
            className="p-2"
            onClick={() => navigate("/PointofSale/Customers")}
          >
            <RiUser3Line />
          </button>
          <button className="p-2">
            <RiAddLine />
          </button>
          <button onClick={toggleCar} className="p-2">
                <RiNumbersLine />
          </button>
          {showCar && <Car />}
          <button onClick={toggleMenu} className="text-white p-2">
            {showMenu ? <RiCloseLine /> : <RiMenu3Fill />}
          </button>
        </nav>
      </div>
    );}

export default SidebarMovil;