export interface RuneTree extends Rune {
  keystones: Rune[];
  runes: Rune[][];
}

export interface Rune {
  id: number;
  name?: string;
  imageUrl: string;
}

