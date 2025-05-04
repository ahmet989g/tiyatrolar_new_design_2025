import { TheaterItem } from '@/types/theaterItem';
import { theaterSliderData } from '@/mock/theaterSliderData';

export const theaterSliderService = {
  getTheaterSlides: async (): Promise<TheaterItem[]> => {
    try {
      // API çağrısını simüle etmek için mock verileri kullanıyoruz
      // Burada gerçek bir API çağrısı yapacağız.
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return theaterSliderData;
      
      // Gerçek API çağrısı:
      // const response = await fetch('/api/theater-slides');
      // if (!response.ok) throw new Error('Veriler alınamadı');
      // return await response.json();
    } catch (error) {
      console.error('Theater slider verileri getirilirken hata:', error);
      throw error;
    }
  }
};