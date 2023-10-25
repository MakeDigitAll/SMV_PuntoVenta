import React, { useState, useEffect } from "react";
import Catalogue from "../../views/pointSale/Catalogue";

const cards = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const loadCategoriesFromAPI = async () => {
    try {
      const response = await fetch("https://localhost:4000/Categorias"); // Se va a cambiar la URL
      const data = await response.json();
      if (response.ok) {
        setCategories(data);
      }
    } catch (error) {
      console.error("Error al cargar datos desde la API:", error);
    }
  };

  const handleCardClick = (categoryName, openModal) => {
    setSelectedCategory(categoryName);
    if (openModal) {
      setModalIsOpen(true);
    }
  };

  useEffect(() => {
    loadCategoriesFromAPI();
  }, []);

  const Card = ({ img, nombre, id, inventory, handleCardClick }) => {
    const [highlighted, setHighlighted] = useState(false);
    const [pressed, setPressed] = useState(false); // Nuevo estado para el card presionado

    const cardStyle = {
      backgroundColor: highlighted ? "#ec7c6a" : "#1F1D2B",
      padding: "8px",
      borderRadius: "12px",
      marginBottom: "20px",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "2px",
      color: highlighted ? "#ffffff" : "#888888",
      cursor: "pointer",
      transition: "background-color 0.3s ease-in-out",
    };

    const handleCardPress = (categoryName) => {
      handleCardClick(categoryName, true);
      setPressed(true); // Cambia el estado del card a presionado
      console.log("Se logró"); // Agrega el mensaje al hacer clic
    };

    return (
      <div
        style={pressed ? { ...cardStyle, color: "#00ff00" } : cardStyle} // Cambia el color del texto cuando se presiona
        onClick={() => handleCardPress(nombre)}
        onMouseEnter={() => setHighlighted(true)}
        onMouseLeave={() => setHighlighted(false)}
      >
        <img
          src={img}
          style={{
            width: "160px",
            height: "160px",
            objectFit: "cover",
            marginTop: "-20px",
            boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.5)",
            borderRadius: "50%",
          }}
          alt={img}
        />
        <p style={{ fontSize: "20px" }}>
          {pressed ? "Presionado" : nombre}
        </p>{" "}
        {/* Cambia el texto si se presionó el card */}
        <span>{id}</span>
        <p style={{ color: "#666666" }}>{inventory} Categoria</p>
      </div>
    );
  };

  const EmptyCard = ({ handleCardClick }) => (
    <div
      style={{
        backgroundColor: "#ec7c6a",
        padding: "8px",
        borderRadius: "12px",
        marginBottom: "20px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2px",
        color: "#ffffff", // Texto más oscuro
        cursor: "pointer",
      }}
      onClick={() => handleCardClick("Sin categoría", true)}
    >
      <div
        style={{
          width: "160px",
          height: "160px",
          backgroundColor: "#888888",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: "20px", color: "#666666" }}>
          Sin categoría
        </span>
      </div>
      <p style={{ color: "#666666" }}>Sin categoría</p>
    </div>
  );

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {categories.map((item, index) => (
          <Card key={index} {...item} handleCardClick={handleCardClick} />
        ))}
        <EmptyCard handleCardClick={handleCardClick} />
      </div>
      <Catalogue
        selectedCategory={selectedCategory}
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
    </div>
  );
};

export default cards;
