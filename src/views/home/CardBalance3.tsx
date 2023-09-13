import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { BiGroup } from "react-icons/bi";

export const CardBalance3 = () => {
  return (
    <Card className="xl:max-w-sm bg-success rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5">
        <div className="flex gap-2.5">
          <BiGroup />
          <div className="flex flex-col">
            <span className="text-white">Datos financieros</span>
            <span className="text-white text-xs">1311 Datos</span>
          </div>
        </div>
        <div className="flex gap-2.5 py-2 items-center">
          <span className="text-white text-xl font-semibold">$3,910</span>
          <span className="text-danger text-xs">- 4.5%</span>
        </div>
        <div className="flex items-center gap-6">
          <div>
            <div>
              <span className="font-semibold text-danger text-xs">{"↓"}</span>
              <span className="text-xs">100,930</span>
            </div>
            <span className="text-white text-xs">MXN</span>
          </div>

          <div>
            <div>
              <span className="font-semibold text-danger text-xs">{"↑"}</span>
              <span className="text-xs">4,120</span>
            </div>
            <span className="text-white text-xs">MXN</span>
          </div>

          <div>
            <div>
              <span className="font-semibold text-danger text-xs">{"⭐"}</span>
              <span className="text-xs">125</span>
            </div>
            <span className="text-white text-xs">VIP</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
