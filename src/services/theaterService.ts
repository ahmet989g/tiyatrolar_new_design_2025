import { TheaterItem } from '@/types/theaterItem';
import { theaterData } from '@/mock/theaterData';
import { TheaterMockType } from '@/types/theatersMock';
import { theatersData } from '@/mock/theatersData';

interface FilterParams {
  location?: string | null;
  category?: string | null;
  date?: string | null;
}

export const theaterService = {
  // Tüm tiyatro verilerini getir
  getTheaters: async (): Promise<TheaterItem[]> => {
    try {
      // API çağrısını simüle etmek için gecikme ekledik
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return theaterData;
    } catch (error) {
      console.error('Theater slider verileri getirilirken hata:', error);
      throw error;
    }
  },
  
  // Sayfalama ve filtreleme ile tiyatro verilerini getir
  getTheatersPaginated: async (
    page: number = 1, 
    limit: number = 18,
    filters: FilterParams = {}
  ): Promise<TheaterItem[]> => {
    try {
      // API çağrısını simüle etmek için gecikme ekledik
      await new Promise(resolve => setTimeout(resolve, 400));
      
      let filteredData = [...theaterData];
      
      // Filtreleme işlemleri
      if (filters.location) {
        filteredData = filteredData.filter(item => 
          item.location.toLowerCase().includes(filters.location!.toLowerCase())
        );
      }
      
      if (filters.category) {
        // Kategoriye göre filtreleme - mock data'da kategori yok, eklenebilir
      }
      
      if (filters.date) {
        filteredData = filteredData.filter(item => 
          item.date === filters.date
        );
      }
      
      // Sayfalama
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      
      return filteredData.slice(startIndex, endIndex);
    } catch (error) {
      console.error('Theater slider verileri getirilirken hata:', error);
      throw error;
    }
  },
  
  // Toplam tiyatro sayısını getir
  getTotalTheaterCount: async (filters: FilterParams = {}): Promise<number> => {
    try {
      // API çağrısını simüle etmek için gecikme ekledik
      await new Promise(resolve => setTimeout(resolve, 100));
      
      let filteredData = [...theaterData];
      
      // Filtreleme işlemleri
      if (filters.location) {
        filteredData = filteredData.filter(item => 
          item.location.toLowerCase().includes(filters.location!.toLowerCase())
        );
      }
      
      if (filters.category) {
        // Kategoriye göre filtreleme - mock data'da kategori yok, eklenebilir
      }
      
      if (filters.date) {
        filteredData = filteredData.filter(item => 
          item.date === filters.date
        );
      }
      
      return filteredData.length;
    } catch (error) {
      console.error('Theater sayısı getirilirken hata:', error);
      throw error;
    }
  },

  // Slug'a göre tiyatro detaylarını getir
  getTheaterBySlug: async (slug: string): Promise<TheaterMockType | null> => {
    try {
      // API çağrısını simüle etmek için gecikme
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Mock veri üzerinde slug'a göre filtreleme yap
      const theater = theatersData.find(item => item.slug === slug);
      
      return theater || null;
    } catch (error) {
      console.error(`Theater "${slug}" verileri getirilirken hata:`, error);
      throw error;
    }
  },
};