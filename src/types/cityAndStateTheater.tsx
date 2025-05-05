export interface CityAndStateTheater {
  id: string;
  title: string;
  slug: string;
  location: string;
  date: string;
  time: string;
  image: string;
  theaterType: 'city' | 'state'; // şehir veya eyalet tiyatrosu
}