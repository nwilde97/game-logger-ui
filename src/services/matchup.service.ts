import {Matchup} from "../model/matchup";
import {API_URL} from "./environment";

export const findMatchupsByAuthor = async (author: string): Promise<Matchup[]> => {
  return fetch(`${API_URL}/matchups/${author}`).then(r => r.json());
}

export const persistMatchup = async (author: string, matchup: Matchup): Promise<any> => {
  return fetch(`${API_URL}/matchups/${author}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(matchup)
  });
}

export const removeMatchup = async (author: string, matchup: Matchup): Promise<any> => {
  return fetch(`${API_URL}/matchups/${author}/${matchup.champion}/${matchup.opponent}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(matchup)
  });
}
