export interface RuneTree extends Rune {
  keystones: Rune[];
  runes: Rune[][];
  mods: Rune[][];
}

export interface Rune {
  id: number;
  name?: string;
  imageUrl: string;
}

