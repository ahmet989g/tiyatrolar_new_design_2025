export interface TheaterMockType {
  id: string;
  title: string;
  slug: string;
  locations: TheaterLocation[];
  theater_groups: TheaterGroup[];
  categories: TheaterCategory[];
  type: string;
  duration_info: string;
  first_date: string;
  comment_count: number;
  rating_count: number;
  average_rating: number;
  is_new: boolean;
  is_favorite: boolean;
  is_follow: boolean;
  is_watchlist: boolean;
  description: string;
  fragman_video: string;
  galleries: TheaterGallery[];
  sessions: TheaterSession[];
  awards: TheaterAward[];
  view_count?: number;
  ticket_count?: number;
  cast: TheaterCast[];
}

interface TheaterLocation {
  id: string;
  title: string;
  slug: string;
}

interface TheaterGroup {
  id: string;
  title: string;
  slug: string;
}

interface TheaterCategory {
  id: string;
  title: string;
  slug: string;
}

interface TheaterGallery {
  id: string;
  image: string;
}

interface TheaterSession {
  id: string;
  session_date: string;
  location: string;
  status: number; // 1: satışta, 2: tükendi, 3: iptal
  session_detail?: string;
}

interface TheaterAward {
  id: string;
  title: string;
  description: string;
}

interface TheaterCast {
  id: string;
  name: string;
  slug: string;
  image: string;
  role: number; // 1: oyuncu, 2: cast
  role_title?: string;
}