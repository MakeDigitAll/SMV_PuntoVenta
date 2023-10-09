import { useEffect, useState, useCallback } from "react";
import db from "../axios/Image";

const TableImage = (idImage: string, ruta: string) => {
  const [image, setImage] = useState<string | undefined>(undefined);

  const getImage = useCallback(async () => {
    try {
      if (idImage !== undefined) {
        const response = await db.getImage(idImage, ruta);
        const image = response.data; // Obtener el Blob de imagen de la respuesta
        // Crear un objeto URL para la imagen de cualquier tipo
        const imageUrl = URL.createObjectURL(image);
        setImage(imageUrl); // Actualizar el estado con la URL de la imagen
      } else {
        // Establecer la imagen por defecto si idImage es undefined
      }
    } catch (error) {
      
      // Establecer la imagen por defecto en caso de error
    }
  }, [idImage]);

  useEffect(() => {
    getImage();
  }, [idImage, getImage]);
  return image;
};

export default TableImage;
