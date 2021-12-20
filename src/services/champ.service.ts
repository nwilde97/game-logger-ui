import {Champ} from "../model/champ";

export const getChampList = async (): Promise<Champ[]> => {
    const response = await fetch(`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json`);
    const data: any[] = await response.json();
    return data.map(d => {
        return {...d, key: d.id.toString(), image: `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${d.id}.png`}
    });
}
