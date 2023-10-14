import dynamic from "next/dynamic";
// import { TableWrapper } from "../table/table";
import { CardBalance1 } from "./CardBalance1";
import { CardBalance2 } from "./CardBalance2";
import { CardBalance3 } from "./CardBalance3";
import { CardAgents } from "./Card-Agents";
import { CardTransactions } from "./card-transactions";
import ItemsHeader from "../../components/header/ItemsHeader/ItemsHeader";
import { toast } from "react-toastify";
import React from "react";
const Chart = dynamic(() => import("./Steam").then((mod) => mod.Steam), {
  ssr: false,
});
const Home = () => {
  const [data, setData] = React.useState(null);
  async function loadTask() {
    try {
      const response = await fetch(
        "http://localhost:4000/api/auth/lastestusers"
      );
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
  React.useEffect(() => {
    loadTask();
  }, []);
  return (
    <>
      <ItemsHeader />
      {data != null ? (
        <div className=" h-full">
          <div className="flex justify-center gap-4 xl:gap-12 pt-3 px-4 lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
            <div className="mt-6  gap-6 flex flex-col w-full">
              {/* Card Section Top */}
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold">Datos</h3>
                <div className="grid md:grid-cols-2 grid-cols-1 2xl:grid-cols-3 gap-5  justify-center w-full">
                  <CardBalance1 />
                  <CardBalance2 />
                  <CardBalance3 />
                </div>
              </div>

              {/* Chart */}
              <div className="h-full flex flex-col gap-2">
                <h3 className="text-xl font-semibold">Estadisticas</h3>
                <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6 ">
                  <Chart/>
                </div>
              </div>
            </div>

            {/* Left Section */}
            <div className="mt-4 gap-2 flex flex-col xl:max-w-md w-full">
              <h3 className="text-xl font-semibold">Usuarios</h3>
              <div className="flex flex-col justify-center gap-4 flex-wrap md:flex-nowrap md:flex-col">
                <CardAgents dataInf={data} />
                <CardTransactions dataInf={data} />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Home;
