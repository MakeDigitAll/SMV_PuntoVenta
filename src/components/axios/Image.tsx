import http from "./Axios";

class UserService {
  //obtener la imagen de perfil
  getImage(idUsuario: string, ruta: string) {
    console.log(idUsuario + "h:" + ruta)
    return http.get(`${ruta}${idUsuario}`, {
      responseType: "blob",
    });
  }
}

const UserServiceInstance = new UserService();
export default UserServiceInstance;
