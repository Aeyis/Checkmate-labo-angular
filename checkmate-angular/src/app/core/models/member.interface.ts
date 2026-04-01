export interface Member {
  id: number;
  username: string;
  email: string;
  birthDate: string;
  gender: string;
  elo: number;
  role: string;
  tournaments?: { id: number; name: string }[];
}
export interface updateMember {
  username?: string;
  email?: string;
  password?: string;
  birthdate?: string;
  gender?: string;
}
export interface MemberDetails {
  data:Member;
}
