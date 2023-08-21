import http from "./Axios";

class UserService {
  //obtener la imagen de perfil
  getProfileImage(idUsuario: string) {
    return http.get(`/api/userImage/${idUsuario}`, {
      responseType: "blob",
    });
  }
}

const UserServiceInstance = new UserService();
export default UserServiceInstance;
