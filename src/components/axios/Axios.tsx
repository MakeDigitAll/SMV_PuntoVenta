import axios, { AxiosInstance } from "axios";

// Función para seleccionar la URL basada en la condición de ejecución
function getBaseUrl() {
  // Verifica si la aplicación se está ejecutando en localhost
 return "http://ec2-18-118-164-218.us-east-2.compute.amazonaws.com:4000/"
}
// Crea la instancia de Axios
const instance: AxiosInstance = axios.create({
  baseURL: getBaseUrl(), // Usa la función getBaseUrl para obtener la URL
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
  },
  withCredentials: false,
});

export default instance