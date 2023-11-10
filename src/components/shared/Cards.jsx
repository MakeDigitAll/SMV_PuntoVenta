import React, { useState, useEffect } from "react";
import Catalogue from "../../views/pointSale/Catalogue";
import { Button } from "@nextui-org/react";
import ProductsCatalogue from "./CardsProductsCatalogue";

const Cards = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Sin categoría");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(false);
  const [initialModalOpen, setInitialModalOpen] = useState(false);
  const [showCardData, setShowCardData] = useState(Array(3).fill(false));
  const [uniqueCategories, setUniqueCategories] = useState([]);

  const loadCategoriesFromAPI = async () => {
    try {
      const response = await fetch("https://localhost:4000/productos");
      
      if (response.ok) {
        const data = await response.json();
        console.log("Datos desde la API:", data); // Agregado para depuración
        // Obtén solo las categorías únicas
        const uniqueCategories = Array.from(new Set(data.map((product) => product.categoria)));
        console.log("Categorías únicas:", uniqueCategories); // Agregado para depuración
        setUniqueCategories(data);
       
      }
    } catch (error) {
      console.error("Error al cargar datos desde la API:", error);
    }
    setShowCardData(Array(uniqueCategories.length).fill(false));
  };
  
  
  const openModal = () => {
    if (!initialModalOpen) {
      setSelectedCategory("Sin categoría");
      setCategoriaSeleccionada(true); // Asegúrate de que categoriaSeleccionada sea true al abrir el modal
      setInitialModalOpen(true);
    }
    setModalIsOpen(true);
    setShowCardData(Array(uniqueCategories.length).fill(true));
  };

  const handleClearCategory = () => {
    setSelectedCategory("Sin categoría");
    setModalIsOpen(false);
    setShowCardData(Array(uniqueCategories.length).fill(false));
  };

  const handleCardClick = (categoryName) => {
    console.log("Categoría seleccionada:", categoryName);
    setSelectedCategory(categoryName);
    setCategoriaSeleccionada(true);
    setModalIsOpen(true);
    setShowCardData(Array(uniqueCategories.length).fill(true));
  };

  useEffect(() => {
    loadCategoriesFromAPI();
  }, []);
  const showAllCards = () => {
    console.log("Mostrando todas las tarjetas");
    setModalIsOpen(false); 
    setCategoriaSeleccionada(false); 
    setShowCardData(Array(uniqueCategories.length).fill(false)); 
  };

  const handleCardPress = (categoryName) => {
    handleCategorySelection(categoryName);
    setPressed(true);
  };

  const handleCategorySelection = (categoryName) => {
    setSelectedCategory(categoryName);
    if (selectedCategory == "Sin categoría") {
      setShowCardData(Array(uniqueCategories.length).fill(true));
    } else {
      setShowCardData(Array(uniqueCategories.length).fill(false));
    }
  };
 
    
  const Card = ({ imagen, categoria, id, inventario, index, showCardData, handleCardPress }) => {
    console.log("Datos en la tarjeta:", { imagen, categoria, id, inventario, index });
    const [highlighted, setHighlighted] = useState(false);
    const [pressed, setPressed] = useState(false);
  
    const cardStyle = {
      backgroundColor: highlighted ? "#ec7c6a" : "#1F1D2B",
      padding: "4px",
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
      width: "180px",
    };
  
    return (
      <div
        style={pressed ? { ...cardStyle, color: "#00ff00" } : cardStyle}
        onClick={() => handleCardPress(categoria)}
        onMouseEnter={() => setHighlighted(true)}
        onMouseLeave={() => setHighlighted(false)}
      >
        <img
          src={imagen}
          style={{
            width: "160px",
            height: "160px",
            objectFit: "cover",
            marginTop: "-20px",
            boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.5)",
            borderRadius: "50%",
          }}
          alt={imagen}
        />
        <p style={{ fontSize: "20px" }}>
          {pressed ? "Seleccionado" : categoria}
        </p>
        <span>{id}</span>
        <p style={{ color: "#666666" }}>
          {showCardData[index] ? inventario : "Datos ocultos"} Categoria
        </p>
      </div>
    );
  };

  const EmptyCard = ({ handleCardClick, selectedCategory }) => {
    
    if (selectedCategory == "Sin categoría") {
      
      return null;
      
    }

    return (
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
  };

  return (
    <div>
      {categoriaSeleccionada ? (
        <ProductsCatalogue selectedCategory={selectedCategory} />
      ) : (
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "10px", // Ajusta el valor de gap para reducir el espacio
            }}
          >
            {uniqueCategories.map((category, index) => (
              <Card
                key={index}
                imagen={category.imagen}
                categoria={category.categoria}
                id={category.id}
                inventario={category.inventory}
                index={index}
                showCardData={showCardData}
                handleCardPress={handleCardPress}
              />
            ))}
            <EmptyCard
              handleCardClick={handleCardClick}
              selectedCategory={selectedCategory}
            />
          </div>
        </div>
      )}
  
      <Button onClick={showAllCards}>Regresar</Button>
    </div>
  );};

export default Cards;
