import { Input, Spacer } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { MdSearch } from "react-icons/md";

const Card = ({ imagen, nombre, cantidad, precio, tienePromoción, descuento }) => {
  const [isHovered, setIsHovered] = useState(false);

  const agregarProductoAOrden = () => {
    // Crea un objeto con los detalles del producto seleccionado
    const selectedProduct = {
      id: "ID_DEL_PRODUCTO", // Reemplaza con el ID correcto
      nombre: nombre,
      cantidad: 1,
      precio: precio,
      descuento: descuento,
    };

    // Llama a la función para agregar el producto a la lista del código 1
  
  };

  const cardStyle = {
    backgroundColor: isHovered ? "#ec7c6a" : "#1F1D2B",
    padding: "4px",
    borderRadius: "12px",
    marginBottom: "20px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2px",
    color: isHovered ? "#ffffff" : "#888888",
    cursor: "pointer",
    transition: "background-color 0.3s ease-in-out",
    width: "200px",
    
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={agregarProductoAOrden}
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
      <p style={{ fontSize: "20px" }}>{nombre}</p>
      <span>{cantidad}</span>
      <p style={{ color: "#666666" }}>Precio: ${precio}</p>
      <p style={{ color: "#666666" }}>
        Descuento: {descuento}%
      </p>
      {tienePromoción === 1 && (
        <span className="text-yellow-500">★ Tiene Promoción</span>
      )}
    </div>
  );
};

const CardList = ({ data }) => {
  const sortedData = [...data].sort((a, b) => a.nombre.localeCompare(b.nombre));

  return (
    <div
      className="grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", // Ajusta este valor según tus necesidades
        gap: "10px",
      }}
    >
      {sortedData.map((item, index) => (
        <Card key={index} {...item} />
      ))}
    </div>
  );
};
const ProductsCatalogue = ({ selectedCategory }) => {
    const [products, setProducts] = useState([]);
    const [nameSearchQuery, setNameSearchQuery] = useState("");
    const [idSearchQuery, setIdSearchQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]); // Agrega esta línea
  
    const loadProductsFromAPI = async () => {
      try {
        const response = await fetch("https://localhost:4000/Productos");
        const data = await response.json();
        if (response.ok) {
          // Filtrar productos por categoría
          const filteredProducts = data.filter(product => product.categoria == selectedCategory);
          console.log("Categoría del producto:", selectedCategory);
          
          setProducts(filteredProducts);
        }
      } catch (error) {
        console.error("Error al cargar datos desde la API:", error);
      }
    };
    useEffect(() => {
      loadProductsFromAPI();
    }, [selectedCategory]);
   
  
    useEffect(() => {
      // Filtrar productos por nombre e ID
      const filteredProducts = products.filter((product) => {
        const isNameMatch = product.nombre.toLowerCase().includes(nameSearchQuery.toLowerCase());
        const isIdMatch = String(product.id).includes(idSearchQuery);
        return isNameMatch && isIdMatch;
      });
      setFilteredProducts(filteredProducts);
    }, [nameSearchQuery, idSearchQuery, products]);
  
   
    return (
      <div>
        <div className="mb-8">
          <div style={{ marginBottom: "16px" }}>
            
            <Spacer y={2} />
  
            {/* Mostrar la lista filtrada de productos */}
            <CardList data={filteredProducts} />
          </div>
        </div>
      </div>
    );
  };
  
  export default ProductsCatalogue;