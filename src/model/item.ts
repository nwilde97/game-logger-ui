export interface ItemTree {
  basic: Item[];
  epic: Item[];
  legendary: Item[];
  mythic: Item[];
}

export interface Item {
  id: number;
  name: string;
  imageUrl?: string;
}

