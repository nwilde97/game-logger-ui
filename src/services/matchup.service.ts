import {Matchup} from "../model/matchup";
import {query} from "./graphql.service";

export const findMatchupsByAuthor = async (author: string): Promise<Matchup[]> => {
  const result = await query({
    query: `{
  getMatchupsByAuthor(author:"${author}"){
    id
    author
    champion
    opponent
    rating
    comments
  }
}`
  });
  return result.getMatchupsByAuthor;
}

export const findChampMatchups = async (champKey: string): Promise<Matchup[]> => {
  const result = await query({
    query: `{
  getMatchupsByChampion(champ:"${champKey}"){
    id
    author
    champion
    opponent
    rating
    comments
  }
}`
  });
  return result.getMatchupsByChampion;
}

export const persistMatchup = async (matchup: Matchup): Promise<any> => {
  const response = await query({
    query: `mutation {
  saveMatchup(matchup:${JSON.stringify(matchup).replace(/"([^"\d]+)":/g, '$1:')})
}
`
  });
  if(response.errors){
    console.log(response.errors);
    throw new Error("Unable to save matchup");
  }
}

export const removeMatchup = async (id: string): Promise<any> => {
  await query({
    query: `mutation {
  deleteMatchup(id:"${id}")
}
`
  });
}

