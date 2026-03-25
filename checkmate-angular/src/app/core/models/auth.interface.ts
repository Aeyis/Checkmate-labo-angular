export interface loginResponse {
  token: string;
}
export interface JwtDecoded{
  id: number;
  role: string;
  exp: number;
}
export interface RegisterData{
  email: string;
  password: string;
  username: string;
}

