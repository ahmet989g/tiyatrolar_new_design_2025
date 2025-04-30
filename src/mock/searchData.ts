// src/mock/searchData.ts
export interface SearchItem {
  id: string;
  title: string;
  location?: string;
  type: 'oyun' | 'sahne' | 'sanatci';
  image?: string;
}

export const searchData: SearchItem[] = [
  {
    id: '1',
    title: 'Alice Müzikali',
    location: 'BKM',
    type: 'oyun',
  },
  {
    id: '2',
    title: 'Alice Harikalar Diyarında',
    location: 'Ankara Devlet Tiyatrosu',
    type: 'oyun',
  },
  {
    id: '3',
    title: 'Alice Harikalar Diyarında',
    location: 'Sivas Devlet Tiyatrosu',
    type: 'oyun',
  },
  {
    id: '4',
    title: 'Ali Babanın Çiftliği',
    location: 'Sarıyer Sanat Tiyatrosu',
    type: 'oyun',
  },
  {
    id: '5',
    title: 'Ali Babanın Çiftliği',
    location: 'Vali Şehri Macerası',
    type: 'oyun',
  },
  {
    id: '6',
    title: 'Ali Poyrazoğlu',
    type: 'sanatci',
  },
  {
    id: '7',
    title: 'Ali Sunal',
    type: 'sanatci',
  },
  {
    id: '8',
    title: 'Ali Cem Kocaoğlu',
    type: 'sanatci',
  },
  {
    id: '9',
    title: 'Ali Poyrazoğlu Tiyatrosu',
    type: 'sahne',
  }
];