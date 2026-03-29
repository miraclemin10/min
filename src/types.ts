export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  imageUrl: string;
  date: string;
}

export interface SiteSettings {
  siteName: string;
  slogan: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  instagramUrl: string;
  youtubeUrl: string;
}

export type View = 'home' | 'admin' | 'post';
