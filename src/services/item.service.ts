import {API_URL} from "./environment";
import {ItemTree} from "../model/item";

export const fetchItemTree = async (): Promise<ItemTree> => {
  return fetch(`${API_URL}/items`).then(r => r.json());
}

