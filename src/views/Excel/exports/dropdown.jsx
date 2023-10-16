import React, { useState } from 'react';

function MyDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const dropdownStyles = {
    position: 'relative',
  };

  const buttonStyles = {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
  };

  const menuStyles = {
    position: 'absolute',
    top: '100%',
    left: 0,
    background: isOpen ? 'rgba(0, 0, 0, 0.5)' : 'transparent', // Fondo gris cuando está abierto
    border: '1px solid #333',
    borderRadius: '4px',
    width: '150px',
    padding: '8px',
    display: isOpen ? 'block' : 'none', // Mostrar solo cuando está abierto
    zIndex: 9999, // Z-index alto para superponerse a otros elementos
  };

  const optionStyles = {
    padding: '8px',
    cursor: 'pointer',
  };

  return (
    <div style={dropdownStyles}>
      <button onClick={toggleDropdown} style={buttonStyles}>
        Abrir Menú
      </button>
      <div style={menuStyles}>
        <div style={optionStyles}>Opción 1</div>
        <div style={optionStyles}>Opción 2</div>
        <div style={optionStyles}>Opción 3</div>
      </div>
    </div>
  );
}

export default MyDropdown;
