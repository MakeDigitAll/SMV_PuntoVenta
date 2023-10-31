import React, { useState, useEffect } from "react";

const Card = ({ imagen, nombre, cantidad, precio, tienePromocion, descuento }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    backgroundColor: isHovered ? "#FFA500" : "#1F1D2B",
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
      {tienePromocion === 1 && (
        <span className="text-yellow-500">★ Tiene Promoción</span>
      )}
    </div>
  );
};

const CardList = ({ data }) => (
  <div className="grid grid-cols-6 gap-2" style={{ marginBottom: "20px" }}>
    {data.map((item, index) => (
      <Card key={index} {...item} />
    ))}
  </div>
);

const ProductsCards = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [nameSearchQuery, setNameSearchQuery] = useState(""); // Término de búsqueda por nombre
  const [idSearchQuery, setIdSearchQuery] = useState(""); // Término de búsqueda por ID

  const loadProductsFromAPI = async () => {
    try {
      const response = await fetch("https://localhost:4000/Productos");
      const data = await response.json();
      if (response.ok) {
        setProducts(data);
      }
    } catch (error) {
      console.error("Error al cargar datos desde la API:", error);
    }
  };

  useEffect(() => {
    loadProductsFromAPI();
  }, []);

  // Filtrar productos por nombre
  const filteredProductsByName = selectedCategory
    ? products.filter((product) => product.nombre === selectedCategory)
    : products;

  // Filtrar productos por ID
  const filteredProductsById = selectedCategory
    ? products.filter((product) => product.id.toString() === selectedCategory)
    : products;

  // Función para manejar cambios en el campo de búsqueda por nombre
  const handleNameSearchChange = (event) => {
    setNameSearchQuery(event.target.value);
  };

  // Función para manejar cambios en el campo de búsqueda por ID
  const handleIdSearchChange = (event) => {
    setIdSearchQuery(event.target.value);
  };

  // Filtrar productos por nombre en función del término de búsqueda
  const filteredProductsByNameSearch = filteredProductsByName.filter((product) =>
    product.nombre.toLowerCase().includes(nameSearchQuery.toLowerCase())
  );

  // Filtrar productos por ID en función del término de búsqueda
  const filteredProductsByIdSearch = filteredProductsById.filter((product) =>
    product.id.toString().includes(idSearchQuery)
  );

  return (
    <div>
      <div className="mb-8">
        <div style={{ marginBottom: "16px" }}>
          <input
            type="text"
            placeholder="Nombre..."
            className="p-2 rounded-lg border border-orange-500"
            value={nameSearchQuery}
            onChange={handleNameSearchChange}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="SKU"
            className="p-2 rounded-lg border border-orange-500"
            value={idSearchQuery}
            onChange={handleIdSearchChange}
          />
        </div>
      </div>

      <CardList data={nameSearchQuery ? filteredProductsByNameSearch : filteredProductsByIdSearch} />
    </div>
  );
};

export default ProductsCards;
