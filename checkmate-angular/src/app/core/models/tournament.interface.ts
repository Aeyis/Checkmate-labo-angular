export interface Tournament {
  id: number;
  name: string;
  location: string;
  minElo: number;
  maxElo: number;
  womenOnly: boolean;
  status: string;
  endRegistrationDate: string;
  currentRound: number;
  nbrOfPlayers: number;
  minPlayers: number;
  maxPlayers: number;
  categories: string[];
  isRegistered: boolean;
  canRegister: boolean;
}
export interface TournamentList{
  data: Tournament[];
  total: number;
}

export interface TournamentDetail {
  data: Tournament;
}

export interface CreateTournament {
  name: string;
  location?: string;
  minPlayers: number;
  maxPlayers: number;
  minElo?: number;
  maxElo?: number;
  womenOnly?: boolean;
  endRegistrationDate: string;
  categories: number[];
}

export interface PlayerScore {
  memberId: number;
  username: string;
  score: number;
}

export interface Match {
  id: number;
  whiteMemberId: number;
  blackMemberId: number;
  result:string | null;
}
