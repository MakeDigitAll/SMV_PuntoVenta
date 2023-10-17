import React from "react";

const Card = (props) => {
  const { sales, price } = props;
  
  
  // Establece estilos personalizados para el componente Card
  const cardStyles = {
    backgroundColor: "#1F1D2B", // Color de fondo
    padding: "16px", // Padding (espaciado interior)
    borderRadius: "12px", // Borde redondeado
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px", // Espacio entre elementos internos
    textAlign: "center",
    minWidth: "200px", // Ancho mínimo
    maxWidth: "350px", // Ancho máximo
    height: "250px", // Altura del Card
    width: "100%",
    margin: "15px", // Margen exterior
  };

  // Establece estilos para el cuadro resaltado del texto "sales"
  const salesStyles = {
    backgroundColor: "#e96853", // Color de fondo del cuadro resaltado
    padding: "12px", // Padding del cuadro resaltado
    borderRadius: "12px", // Borde redondeado del cuadro resaltado
    width: "100%", // Ancho del cuadro resaltado igual al de la Card
  };


  return (
    <div style={{ ...cardStyles }}>
      <div style={salesStyles}>
        <p className="text-xl">{sales}</p>
      </div>
      <span className="text-gray-400">${price}</span>
    </div>
  );
};

export default Card;