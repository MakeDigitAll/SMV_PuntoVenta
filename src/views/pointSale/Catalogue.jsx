import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import Modal from 'react-modal';
import Cards from "../../components/shared/Cards";

Modal.setAppElement('#root');

const Catalogue = ({ selectedCategory }) => { 
  const [productos, setProductos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => {
    setModalIsOpen(false);
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
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <style>
        {`
          .table {
            border-spacing: 0 10px;
          }

          i {
            font-size: 1rem !important;
          }

          .table tr {
            border-radius: 20px;
          }

          tr td:nth-child(n+8),
          tr th:nth-child(n+8) {
            border-radius: 0 .625rem .625rem 0;
          }

          tr td:nth-child(1),
          tr th:nth-child(1) {
            border-radius: .625rem 0 0 .625rem;
          }
          .custom-button {
            background-color: #ec7c6a;
           font-size: 14px;
            color: white;
          }
        `}
      </style>
      
    <div style={{ position: 'relative', zIndex: '0' }}>
      <Button className="custom-button" size="sm" onClick={() => setModalIsOpen(true)}>Catalogo</Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: '1000',
          },
          content: {
            width: '100%',
            maxWidth: '800px',
            maxHeight: '80vh',
            margin: '0 auto',
            border: 'none',
            background: '#262837',
            overflow: 'auto',
          },
        }}
      >
        
         <div style={{ background: "#ec7c6a", padding: "10px", textAlign: "center" }}>
          <h2 style={{ color: "white" }}>
            Catalogo: {selectedCategory}
          </h2>
        </div>
      <br></br>
      <br></br>
      <br></br>
        <Cards/>
      </Modal>
    </div>
    </div>
  );
};

export default Catalogue;
