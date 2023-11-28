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
    width: "180px",
    
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
    <div className="grid grid-cols-6 gap-2" style={{ marginBottom: "20px" }}>
      {sortedData.map((item, index) => (
        <Card key={index} {...item} />
      ))}
    </div>
  );
};
const ProductsCards = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [nameSearchQuery, setNameSearchQuery] = useState("");
  const [idSearchQuery, setIdSearchQuery] = useState("");
 
  const filteredProductsById = selectedCategory
    ? products.filter((product) => product.id && product.id.toString() === selectedCategory)
    : products;

  const filteredProductsByIdSearch = filteredProductsById.filter((product) =>
    product.id.toString().includes(idSearchQuery)
  );

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

  const handleNameSearchChange = (event) => {
    setNameSearchQuery(event.target.value);
  };

  const handleIdSearchChange = (event) => {
    setIdSearchQuery(event.target.value);
  };

  const handleAgregarProductoAOrden = (selectedProduct) => {
    const productoEnLista = {
      id: selectedProduct.id,
      nombre: selectedProduct.nombre,
      cantidad: 1,
      precio: selectedProduct.precio,
      descuento: selectedProduct.descuento,
    };

    setProductosSeleccionados([...productosSeleccionados, productoEnLista]);

    
  };
  const filteredProductsByNameSearch = products.filter((product) =>
  product.nombre.toLowerCase().includes(nameSearchQuery.toLowerCase())
);
  return (
    <div>
      <div className="mb-8">
        <div style={{ marginBottom: "16px" }}>
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-col w-[450px] sm:max-w-[44%]">
              <Input
                type="text"
                size="sm"
                placeholder="Buscar por nombre"
                startContent={<MdSearch />}
                value={nameSearchQuery}
                onChange={handleNameSearchChange}
              />
            </div>
            <div className="flex flex-col w-[450px] sm:max-w-[44%]">
              <Input
                type="text"
                size="sm"
                placeholder="SKU"
                startContent={<MdSearch />}
                value={idSearchQuery}
                onChange={handleIdSearchChange}
              />
            </div>
          </div>
         <Spacer></Spacer>
         <Spacer></Spacer>
         <Spacer></Spacer>
         <Spacer></Spacer>
         <Spacer></Spacer>
         <Spacer></Spacer>
         <Spacer></Spacer>
         <Spacer></Spacer>
          <CardList data={nameSearchQuery ? filteredProductsByNameSearch : filteredProductsByIdSearch} />
        </div>
      </div>
    </div>
  );
}
export default ProductsCards;
