import {API_URL} from "./environment";

export const query = async (query: {query: string, variables?: {[key:string]: any}}): Promise<any> => {
  const results: any = await fetch(`${API_URL}/graphql`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(query)
  }).then(r => r.json());
  if(results.errors) throw results.errors;
  return results.data;
}

