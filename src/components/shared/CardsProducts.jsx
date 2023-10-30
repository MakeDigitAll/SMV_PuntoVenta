import React, { useState, useEffect } from "react";

const Card = ({ imagen, nombre, cantidad, precio, tienePromocion,descuento }) => (
  <div className="bg-[#1F1D2B] p-8 rounded-xl flex flex-col items-center gap-2 text-center text-gray-300" style={{ marginBottom: "20px" }}>
    <img src={imagen} className="w-40 h-40 object-cover -mt-20 shadow-2xl rounded-full" alt={imagen} />
    <p className="text-xl">{nombre}</p>
    <span className="text-gray-400">Cantidad: {cantidad}</span>
    <p className="text-gray-600">Precio: ${precio}</p>
    <p className="text-gray-600">Descuento: ${descuento}</p>
    {tienePromocion === 1 && <span className="text-yellow-500">★ Tiene Promoción</span>}
  </div>
);


const CardList = ({ data }) => (
  <div className="grid grid-cols-3 gap-4">
    {data.map((item, index) => (
      <Card key={index} {...item} />
    ))}
  </div>
);

const ProductsCards = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);

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
  console.log(selectedCategory);
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.nombre == selectedCategory)
    : products;

  return (
    <div>
      <CardList data={filteredProducts} />
    </div>
  );
};
export default ProductsCards;