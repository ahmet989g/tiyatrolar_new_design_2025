import { homeBoxSliderItem } from '@/types/homeBoxSliderItem';
import { homeSlider1 } from '@/mock/homeSlider1';

/**
 * Slider servisi
 * 
 * API çağrılarını ve veri işleme işlemlerini içerir
 */
export const sliderService = {
  /**
   * Anasayfa kutu slider verilerini getirir
   * @returns Promise<homeBoxSliderItem[]>
   */
  getHomeBoxSlides: async (): Promise<homeBoxSliderItem[]> => {
    try {
      // Gerçek API çağrısını burada yapacağız
      // Şimdilik, API çağrısını simüle etmek için bir gecikme ekleyeceğiz
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock veriyi dön
      return homeSlider1;
      
      // Gerçek API çağrısı şöyle olabilir:
      // const response = await fetch('/api/home-slides');
      // if (!response.ok) throw new Error('Veriler alınamadı');
      // return await response.json();
    } catch (error) {
      console.error('Slider verileri getirilirken hata:', error);
      throw error;
    }
  }
};