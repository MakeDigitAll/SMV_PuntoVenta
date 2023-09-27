import React, { useState } from "react";
import Notify from "./Notify";
import { Button } from "@nextui-org/react";

const TestNotify = () => {
  const [notifications, setNotifications] = useState([]);

  // Función para agregar una nueva notificación
  const addNotification = (message) => {
    setNotifications([...notifications, message]);
  };

  // Función para cerrar una notificación
  const closeNotification = (index) => {
    const updatedNotifications = [...notifications];
    updatedNotifications.splice(index, 1);
    setNotifications(updatedNotifications);
  };

  return (
    <div className="TestNotify">
      <h1>Notificaciones</h1>
      {/* Lista de notificaciones */}
      <div className="notification-list">
        {notifications.map((message, index) => (
          <Notify
            key={index}
            message={message}
            onClose={() => closeNotification(index)}
          />
        ))}
      </div>
      {/* Botón de prueba para agregar notificaciones */}
      <Button
        color="primary"
        onClick={() => addNotification("Nueva notificación")}
      >
        Agregar Notificación
      </Button>
    </div>
  );
};

export default TestNotify;
