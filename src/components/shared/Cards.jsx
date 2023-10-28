import React, { useState, useEffect } from "react";
import Catalogue from "../../views/pointSale/Catalogue";
import { Button } from "@nextui-org/react";
import ProductsCards from "../../components/shared/CardsProducts";
const Cards = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Sin categoría seleccionada");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(false);
  const [initialModalOpen, setInitialModalOpen] = useState(false);
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
  const openModal = () => {
    if (!initialModalOpen) {
      setSelectedCategory("Sin categoría seleccionada");
      setInitialModalOpen(true);
    }
    setModalIsOpen(true);
  };

  const handleClearCategory = () => {
    setSelectedCategory("Sin categoría seleccionada");
    setModalIsOpen(false);
  };

  const handleCardClick = (categoryName) => {
    console.log("Categoría seleccionada:", categoryName);
    setSelectedCategory(categoryName);
    setCategoriaSeleccionada(true);
    setModalIsOpen(true); // Abre el modal aquí
  };
  
  useEffect(() => {
    loadCategoriesFromAPI();
  }, []);

  const Card = ({ img, nombre, id, inventory, handleCardClick }) => {
    const [highlighted, setHighlighted] = useState(false);
    const [pressed, setPressed] = useState(false);

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
      handleCategorySelection(categoryName);
      setPressed(true);
      console.log("Se logró");
    };
    const handleCategorySelection = (categoryName) => {
      setSelectedCategory(categoryName);
   
    };
    
    return (
      <div
        style={pressed ? { ...cardStyle, color: "#00ff00" } : cardStyle}
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
          {pressed ? "Seleccionado" : nombre}
        </p>
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
        color: "#ffffff",
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
      {categoriaSeleccionada ? (
        <ProductsCards selectedCategory={selectedCategory} />
      ) : (
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
        </div>
      )}
      
      <Catalogue
  selectedCategory={selectedCategory}
  modalIsOpen={modalIsOpen}
  setModalIsOpen={setModalIsOpen}
  buttonText="Catalogo"
  handleCardClick={handleCardClick}
/>
    </div>
  );
};
export default Cards;
