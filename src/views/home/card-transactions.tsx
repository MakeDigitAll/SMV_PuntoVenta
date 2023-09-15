import { Avatar, Card, CardBody } from "@nextui-org/react";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import UserImage from "../user/UserImage";

export const CardTransactions = ({ dataInf }: { dataInf: any[] }) => {
  return (
    <Card className=" bg-default-50 rounded-xl shadow-md px-3">
      <CardBody className="py-5 gap-4">
        <div className="flex gap-2.5 justify-center">
          <div className="flex flex-col border-dashed border-2 border-divider py-2 px-6 rounded-xl">
            <span className="text-default-900 text-xl font-semibold">
              Últimos usuarios creados
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4 ">
          {dataInf.map((item) => (
            <div key={item.id} className="grid grid-cols-2 w-full">
              <div className="w-full">                
                <UserImage idUsuario={item.id} designType="avatar" />                
              </div>

              <span className="text-default-800  font-semibold">
                {item.nombre} {item.apellido}
              </span>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
