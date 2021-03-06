import {Item} from "./item";

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
  id?: string;
  author: string;
  champion: string;
  opponent: string;
  rating: number;
  comments: string;
  runes: RuneSelection;
  items: Item[]
  f?: string;
  d?: string;
}

export interface RuneSelection {
  primary?: number;
  secondary?: number;
  primarySelected: number[];
  secondarySelected: number[];
  modSelected: number[];
}
