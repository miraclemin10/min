import { Post, SiteSettings } from './types';

export const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    title: '극건성 인생템 Top 5: 속건조 탈출기',
    excerpt: '사계절 내내 갈라지는 피부를 위한 구원템들을 소개합니다.',
    content: '극건성 피부를 가진 분들이라면 공감하실 속건조... 제가 직접 써보고 정착한 인생템 5가지를 공개합니다.',
    category: '제품리뷰',
    imageUrl: 'https://picsum.photos/seed/beauty1/800/600',
    date: '2024-03-20',
  },
  {
    id: '2',
    title: '속광 만드는 3단계 나이트 루틴',
    excerpt: '자고 일어나면 꿀피부 완성! 초간단 루틴 공유',
    content: '아침에 일어났을 때 푸석함 대신 광이 나는 피부를 만드는 저만의 비법 루틴입니다.',
    category: '꿀템공유',
    imageUrl: 'https://picsum.photos/seed/beauty2/800/600',
    date: '2024-03-18',
  },
  {
    id: '3',
    title: '봄철 미세먼지 대비 클렌징 가이드',
    excerpt: '민감해진 피부를 달래주는 저자극 클렌징 방법',
    content: '미세먼지가 심한 요즘, 피부 장벽을 지키면서 깨끗하게 세안하는 법을 알려드려요.',
    category: '뷰티팁',
    imageUrl: 'https://picsum.photos/seed/beauty3/800/600',
    date: '2024-03-15',
  },
];

export const INITIAL_SETTINGS: SiteSettings = {
  siteName: '뚜로잉 뷰리플',
  slogan: '광에 진심인 극건성 뷰티로그, 제품리뷰 & 꿀템 공유',
  primaryColor: '#FFC0CB',
  secondaryColor: '#4A4A4A',
  fontFamily: 'Inter',
  instagramUrl: 'https://instagram.com',
  youtubeUrl: 'https://youtube.com',
};
