export interface Member {
  id: number;
  username: string;
  email: string;
  birthdate: string;
  gender: string;
  elo: number;
  role: string;
}
export interface updateMember {
  username?: string;
  email?: string;
  password?: string;
  birthdate?: string;
  gender?: string;
}
