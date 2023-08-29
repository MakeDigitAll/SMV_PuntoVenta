import TableImage from "../../components/table/TableImage";
import { Avatar, Image } from "@nextui-org/react";
import React from "react";
const ProductImage = ({
  idUsuario,
  nombres,
  designType,
}: {
  idUsuario: string;
  nombres?: string;
  apellidos?: string;
  correoElectronico?: string;
  designType?: string;
}) => {
  const imagenPerfil = TableImage(idUsuario);
  if (designType === "tabla") {
    return (
      <Image
        width={50}
        height={70}
        src={imagenPerfil}
        className="center"
        style={{ alignItems: "center" }}
      ></Image>
    );
  } else if (designType === "lista") {
    return (
      <Image
        src={imagenPerfil}
        width={50}
        height={70}
        className="center"
      ></Image>
    );
  } else {
    return (
      <Image
        src={imagenPerfil}
        width={50}
        height={70}
        className="center"
      ></Image>
    );
  }
};

export default ProductImage;
