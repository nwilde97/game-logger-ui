export interface User {
  id: string;
  description?: string;
  nickname: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  twitch?: string;
  youtube?: string;
  email?: string;
}

export interface DiscordInfo {
  id: string;
  username: string;
  avatar: string;
  token: string;
}
