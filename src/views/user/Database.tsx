import http from "../../components/axios/Axios";

class UserService {
 
  //obtener la imagen de perfil
  getProfileImage(idUsuario: string) {
    return http.get(`/ImagenUsuario/${idUsuario}`, {
      responseType: "blob",
    });
  }

  //Subir imagen de perfil
  uploadProfileImage( image: any) {
    console.log(image);
    return http.post(
    `/ImagenUsuario`,
      image,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }
}

const UserServiceInstance = new UserService();
export default UserServiceInstance;