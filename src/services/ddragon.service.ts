export interface Champ {
    id: number;
    name: string;
}

export const getChampList = async (): Promise<Champ[]> => {
    const response = await fetch(`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json`);
    const data: Champ[] = await response.json();
    return data;
}
