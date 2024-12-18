export interface ITeam {
  teamId: string;
  name: string;
  description: string;
  sport: string;
  captain: {
    _id: string;
    username: string;
  };
  members: Array<{
    _id: string;
    username: string;
    email: string;
  }>;
}
