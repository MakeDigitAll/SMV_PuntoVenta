import ImagesType from "./ImagesType";
import { Avatar, Image } from "@nextui-org/react";
import React from "react";
const Images = ({
  idImage,
  designType,
  ruta,
}: {
  idImage: string;
  designType: string;
  ruta: string;
}) => {
  const imagen = ImagesType(idImage, ruta);
  if (designType === "tabla") {
    return (
      <Image
        width={50}
        height={70}
        src={imagen}
        className="center"
        style={{ alignItems: "center" }}
      ></Image>
    );
  } else if (designType === "lista") {
    return (
      <Image src={imagen} width={50} height={70} className="center"></Image>
    );
  } else if (designType === "avatar") {
    return <Avatar src={imagen} className="center" ></Avatar>;
  } else if (designType === "avatarBig") {
    return <Avatar src={imagen} className="min-h-[250px] min-w-[250px]" ></Avatar>;    
  } else {
    return (
      <Image src={imagen} width={50} height={70} className="center"></Image>
    );
  }
};

export default Images;
