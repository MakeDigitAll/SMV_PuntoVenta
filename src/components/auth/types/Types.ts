export interface AuthResponse {
    body: {
      userInfo: User;
      accessToken: string;
      refreshToken: string;
    };
  }
  
  export interface AuthResponseError {
    body: {
      error: string;
    };
  }
  export interface User {
      _id:string;
      nombre:string;
      idPerfilSeguridad:string;
      apellido:string;
      email:string;
      idPerfilSeguridad:string;
  }
  export interface AccessTokenResponse{
    statusCode: number;
    body:{
      accessToken:string;
    };
    error?: string;
  }
  