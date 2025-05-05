import { stageAndGalleriesType } from "@/types/stageAndGalleries";
import { stagesAndGalleriesData } from "@/mock/stagesAndGalleriesData";

export const stageAndGalleriesService = {
  getStageAndGalleries: async (): Promise<stageAndGalleriesType[]> => {
    try {
      // Gerçek API çağrısını burada yapacağız
      // Şimdilik, API çağrısını simüle etmek için bir gecikme ekleyeceğiz
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock veriyi dön
      return stagesAndGalleriesData;
      
      // Gerçek API çağrısı şöyle olabilir:
      // const response = await fetch('/api/stage-and-galleries');
      // if (!response.ok) throw new Error('Veriler alınamadı');
      // return await response.json();
    } catch (error) {
      console.error('Sahne verileri getirilirken hata:', error);
      throw error;
    }
  }
}