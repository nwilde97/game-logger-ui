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
