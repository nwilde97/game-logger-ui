import {API_URL} from "./environment";
import {RuneTree} from "../model/rune";

export const fetchRuneTree = async (): Promise<RuneTree[]> => {
  return fetch(`${API_URL}/runes`).then(r => r.json());
}

