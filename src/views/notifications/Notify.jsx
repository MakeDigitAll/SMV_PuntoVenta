import React, { useState, useEffect } from "react";
import "./Notify.css";

const Notify = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose(); // Llama a la función onClose para eliminar la notificación cuando se cierre
    }, 3000); // Ocultar la notificación después de 3 segundos

    return () => clearTimeout(timer);
  }, [onClose]);

  return isVisible ? <div className="notification">{message}</div> : null;
};

export default Notify;
