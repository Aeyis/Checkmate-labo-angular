export interface Tournament{
  id: number;
  name: string;
  location: string;
  minElo: number;
  maxElo: number;
  womenOnly: boolean;
  status: string;
  startDate: string;
}
export interface TournamentList{
  data: Tournament[];
  total: number;
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
