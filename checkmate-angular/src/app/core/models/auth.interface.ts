export interface loginResponse {
  token: string;
}
export interface JwtDecoded{
  id: number;
  role: string;
  exp: number;
  gender: string;
}
export interface RegisterData{
  email: string;
  password: string;
  username: string;
  birthdate: string;
  gender: string;
  elo: number;
}

