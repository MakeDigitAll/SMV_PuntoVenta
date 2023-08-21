import { useEffect, useState, useCallback } from "react";
import db from "../axios/Database";

const TableImage = (idUsuario: string | undefined) => {
  const [imagenPerfil, setImagenPerfil] = useState<string | undefined>(
    undefined
  );

  const getImagenAfiliado = useCallback(async () => {
    try {
      if (idUsuario !== undefined) {
        const response = await db.getProfileImage(idUsuario);
        const image = response.data; // Obtener el Blob de imagen de la respuesta
        // Crear un objeto URL para la imagen de cualquier tipo
        const imageUrl = URL.createObjectURL(image);
        setImagenPerfil(imageUrl); // Actualizar el estado con la URL de la imagen
      } else {
         // Establecer la imagen por defecto si idUsuario es undefined
      }
    } catch (error) {
      console.log("Error:" + error);
       // Establecer la imagen por defecto en caso de error
    }
  }, [idUsuario]);

  useEffect(() => {
    getImagenAfiliado();
  }, [idUsuario, getImagenAfiliado]);
  return imagenPerfil;
};

export default TableImage;