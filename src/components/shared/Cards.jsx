import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import ProductsCatalogue from "./CardsProductsCatalogue";

const Cards = ({ onCategorySelect }) => {
  const [selectedCategory, setSelectedCategory] = useState("Sin categoría");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(false);
  const [initialModalOpen, setInitialModalOpen] = useState(false);
  const [showCardData, setShowCardData] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);

  const loadCategoriesFromAPI = async () => {
    try {
      const response = await fetch("https://localhost:4000/productos");

      if (response.ok) {
        const data = await response.json();
     

        const uniqueCategoriesSet = new Set(data.map((product) => product.categoria));
        const uniqueCategoriesArray = Array.from(uniqueCategoriesSet);
       
        setUniqueCategories(uniqueCategoriesArray);
        setShowCardData(Array(uniqueCategoriesArray.length).fill(false));
      }
    } catch (error) {
      console.error("Error al cargar datos desde la API:", error);
    }
  };

  const openModal = () => {
    if (!initialModalOpen) {
      setSelectedCategory("Sin categoría");
      setCategoriaSeleccionada(true);
      setInitialModalOpen(true);
    }
    setModalIsOpen(true);
    setShowCardData(Array(uniqueCategories.length).fill(true));
  };

  
  const handleCardClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setCategoriaSeleccionada(true);
    setModalIsOpen(true);
    setShowCardData(Array(uniqueCategories.length).fill(true));
  };

  useEffect(() => {
    loadCategoriesFromAPI();
  }, []);

  const showAllCards = () => {
   onCategorySelect("Sin categoria seleccionada")
    setModalIsOpen(false);
    setCategoriaSeleccionada(false);
    setShowCardData(Array(uniqueCategories.length).fill(false));
  };

  const handleCardPress = (categoryName) => {
    setSelectedCategory(categoryName);
    setCategoriaSeleccionada(true);
    setModalIsOpen(true);
    setShowCardData(Array(uniqueCategories.length).fill(true));

    // Pass the selected category to the prop callback
    onCategorySelect(categoryName);
  };
  const handleCategorySelection = (categoryName) => {
    setSelectedCategory(categoryName);
    setShowCardData(Array(uniqueCategories.length).fill(false));
    
      setShowCardData(Array(uniqueCategories.length).fill(true));
    
  };

  const Card = ({ imagen, categoria, id, inventario, index }) => {
   
    const [highlighted, setHighlighted] = useState(false);

    const cardStyle = {
      backgroundColor: highlighted ? "#ec7c6a" : "#1F1D2B",
      padding: "4px",
      borderRadius: "12px",
      marginBottom: "20px",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "180px",
      marginRight: "2px",
      gap: "1px",
      color: highlighted ? "#ffffff" : "#888888",
      cursor: "pointer",
      transition: "background-color 0.3s ease-in-out",
    };

    return (
      <div
        style={cardStyle}
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
        <p style={{ fontSize: "20px" }}>{categoria}</p>
        <span>{id}</span>
        <p style={{ color: "#666666" }}>{showCardData[index] ? inventario : "Datos ocultos"} Categoria</p>
      </div>
    );
  };

  const EmptyCard = () => {
    

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
        onClick={() => handleCardClick("Sin categoría")}
      >
        <div
          style={{
            width: "160px",
            marginBottom: "20px",
            height: "160px",
            padding: "8px",
            backgroundColor: "#888888",
            borderRadius: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2px",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: "20px", color: "#666666" }}>Sin categoría</span>
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
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: "10px",
            }}
          >
            {uniqueCategories.map((category, index) => (
              <Card
                key={index}
                imagen={category.imagen}
                categoria={category}
                id={category.id}
                inventario={category.inventory}
                index={index}
              />
            ))}
            <EmptyCard />
          </div>
        </div>
      )}

      <Button onClick={showAllCards}>Regresar</Button>
    </div>
  
  );
};

export default Cards;
