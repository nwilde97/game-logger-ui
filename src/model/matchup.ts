export interface MatchupList {
    author: string;
    key: string;
    matchups: {
       rating: number;
       opponents: {
          key: string;
       }[];
    }[];
}

export interface Matchup {
    author: string;
    champion: string;
    opponent: string;
    rating: number;
    comments: string;
}
