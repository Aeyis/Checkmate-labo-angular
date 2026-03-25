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
