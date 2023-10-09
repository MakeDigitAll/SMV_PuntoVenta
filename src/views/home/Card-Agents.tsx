import { Avatar, AvatarGroup, Card, CardBody } from "@nextui-org/react";
import React from "react";
import UserImage from "../user/UserImage";
export const CardAgents = ({ dataInf }: { dataInf: any[] }) => {
  
  return (
    <Card className=" bg-default-50 rounded-xl shadow-md px-4 py-6 w-full">
      <CardBody className="py-5 gap-6">
        <div className="flex gap-2.5 justify-center">
          <div className="flex flex-col border-dashed border-2 border-divider py-2 px-6 rounded-xl">
            <span className="text-default-900 text-xl font-semibold">
              {" "}
              {"⭐"}Socios
            </span>
          </div>
        </div>
        <div className="flex items-center gap-6 flex-col">
          <span className="text-xs">Conoce a nuestro equipo.</span>
          {/* {dataInf.map((item) => (
            <AvatarGroup isBordered>
              <UserImage idUsuario={item.id} designType="avatar" />
            </AvatarGroup>
          ))} */}
        </div>
      </CardBody>
    </Card>
  );
};
