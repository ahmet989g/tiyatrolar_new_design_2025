import { SearchItem, searchData } from '@/mock/searchData';

// Kategori tipi
export interface SearchCategory {
  title: string;
  items: SearchItem[];
}

// Gruplanmış arama sonuçları
export interface GroupedSearchResults {
  categories: SearchCategory[];
  totalCount: number;
}

// Mock veride arama yapıp kategorilere ayıran fonksiyon
export const searchInMockData = async (query: string): Promise<GroupedSearchResults> => {
  // Boş sorgu için boş sonuç döndür
  if (!query || query.trim() === '') {
    return { categories: [], totalCount: 0 };
  }
  
  // API gecikmesini simüle etmek için
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Arama işlemini gerçekleştir
  const normalizedQuery = query.toLowerCase().trim();
  const filteredResults = searchData.filter(item => 
    item.title.toLowerCase().includes(normalizedQuery)
  );
  
  // Sonuçları kategorilere göre grupla
  const oyunlar = filteredResults.filter(item => item.type === 'oyun');
  const sanatcilar = filteredResults.filter(item => 
    item.type === 'sanatci'
  );
  const sahneler = filteredResults.filter(item => 
    item.type === 'sahne'
  );
  
  // Kategorileri oluştur
  const categories: SearchCategory[] = [];
  
  if (oyunlar.length > 0) {
    categories.push({
      title: 'OYUNLAR',
      items: oyunlar
    });
  }
  
  if (sanatcilar.length > 0) {
    categories.push({
      title: 'OYUNCULAR & KİŞİLER',
      items: sanatcilar
    });
  }
  
  if (sahneler.length > 0) {
    categories.push({
      title: 'SAHNELER',
      items: sahneler
    });
  }
  
  return {
    categories,
    totalCount: filteredResults.length
  };
};