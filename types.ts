export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  author: string;
  views: string;
  date: string;
  duration: string;
  category: string;
  avatar: string;
}

export interface Comment {
  id: string;
  user: string;
  avatar: string;
  content: string;
  likes: number;
  date: string;
}

export enum Category {
  RECOMMENDED = 'Recommended',
  ANIME = 'Anime',
  GAMING = 'Gaming',
  TECH = 'Tech',
  MUSIC = 'Music',
  DANCE = 'Dance',
}
