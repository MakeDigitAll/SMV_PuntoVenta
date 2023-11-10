import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalContent,
  ModalFooter,
  useDisclosure,
  Spacer,
} from "@nextui-org/react";
import Cards from "../../components/shared/Cards";
import ProductsCards from "../../components/shared/CardsProducts";

const modalStyle = {
  position: "fixed",
  width: "100%", // Ajusta el ancho
};
const contentStyle = {
  width: "100%", // Ajusta el ancho del contenido dentro del modal
};

const Catalogue = () => {
  const [productos, setProductos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [originalProductos, setOriginalProductos] = useState([]);
  const [categorySelected, setCategorySelected] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const openModal = () => {
    setCategorySelected(true);
    setIsModalOpen(true);
    console.log("Modal abierto");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  async function loadProductosFromDB() {
    try {
      const response = await fetch("https://localhost:4000/Productos");
      const data = await response.json();
      if (response.ok) {
        setProductos(data);
        setOriginalProductos(data);
      }
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  }

  useEffect(() => {
    loadProductosFromDB();
    if (isModalOpen) {
      setCategorySelected(true);
    }
  }, [isModalOpen]);

  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <Button className="custom-button" size="sm" onClick={onOpen}>
          Catálogo
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onClose={closeModal}
          blockScroll
          size="5xl"
          closeOnEsc
          style={modalStyle}
        >
          <div style={contentStyle}>
            <ModalHeader>
             
            </ModalHeader>
            <ModalContent>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ borderBottom: "2px solid orange", padding: "10px" }}>
          
                <h2>Catálogo</h2>
              </div>
              </div>
              
              <Spacer></Spacer>
              <Spacer></Spacer>
              <Spacer></Spacer>
              <Spacer></Spacer>
              <Spacer></Spacer>
              <Cards />
              {categorySelected && <ProductsCards />}
            </ModalContent>
            <ModalFooter>
              <Button className="custom-button" size="sm" onClick={closeModal}>
                Cerrar
              </Button>
            </ModalFooter>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Catalogue;
