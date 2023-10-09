import { Button } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



const Notifications = () => {


    async function sendNotification() {
        if (!("Notification" in window)) {
            // El navegador no admite notificaciones.
            
        } else if (Notification.permission === "granted") {
            // Permiso para mostrar notificaciones ya concedido.
            const notification = new Notification("¡Notificación enviada!", { body: "Esto es un mensaje de notificación." });

            // Registrar un evento de clic en la notificación
            notification.addEventListener("click", () => {
                // Redirigir cuando se hace clic en la notificación
                viewNotification();
                // Cierra la notificación si es necesario
                notification.close();
            });
        } else if (Notification.permission !== "denied") {
            // El navegador solicitará permiso para mostrar notificaciones.
            const permission = await Notification.requestPermission();
            if (permission === "granted") {
                const notification = new Notification("¡Notificación enviada!", { body: "Esto es un mensaje de notificación." });

                // Registrar un evento de clic en la notificación
                notification.addEventListener("click", () => {
                    // Redirigir cuando se hace clic en la notificación
                    viewNotification();
                    // Cierra la notificación si es necesario
                    notification.close();
                });
            }
        } else {
            // El usuario ha denegado el permiso para mostrar notificaciones.
            
        }
    }

    // Función para redirigir
    const navigate = useNavigate();

    async function viewNotification() {
        navigate('/home');
    }




    return (
        <>
            <p>Aqui van las notificaciones</p>

            <Button
                size="lg"
                color="primary"
                onPress={sendNotification}
            >
                Mandar Notificacion
            </Button>
            <Button
                size="lg"
                color="primary"
                onPress={viewNotification}
            >
                Ver Notificacion
            </Button>
        </>
    );
};


export default Notifications;