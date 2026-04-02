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
  players?: MatchPlayer[];
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
player : {
  id:string;
  username: string;
};
score: number;
victory: number;
draw: number;
defeat: number;
}

export interface MatchPlayer {
  id: string;
  username: string;
  gender: string;
  elo: number;
}

export interface Match {
  id: number;
  whitePlayer: MatchPlayer;
  blackPlayer: MatchPlayer;
  result: string | null;
  round: number;
}

export interface RoundMatches {
  data: {
    round: number;
    matches: Match[];
  };
}

export interface MyMatch {
  id: string;
  round: number;
  result: string | null;
  whitePlayer: { id: number; username: string };
  blackPlayer: { id: number; username: string };
  tournament: { id: number; name: string };
}
