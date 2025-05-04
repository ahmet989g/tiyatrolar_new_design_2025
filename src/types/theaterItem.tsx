export interface TheaterItem {
  id: string;
  title: string;
  slug: string;
  location: string;
  date: string;
  time: string;
  image: string;
  isNew?: boolean;
  averageRating?: number; // ortalama puan
  ratingCount?: number; // puan veren kişi sayısı
}