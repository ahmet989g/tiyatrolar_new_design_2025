import { theaterGroupType } from "@/types/theaterGroup";
import { theaterGroupData } from "@/mock/theaterGroupData";

export const theaterGroupService = {
  gettheaterGroups: async (): Promise<theaterGroupType[]> => {
    try {
      // Gerçek API çağrısını burada yapacağız
      // Şimdilik, API çağrısını simüle etmek için bir gecikme ekleyeceğiz
      await new Promise(resolve => setTimeout(resolve, 500));
      // Mock veriyi dön
      return theaterGroupData;
      
      // Gerçek API çağrısı şöyle olabilir:
      // const response = await fetch('/api/theater-group');
      // if (!response.ok) throw new Error('Veriler alınamadı');
      // return await response.json();
    } catch (error) {
      console.error('Tiyatro Grubu verileri getirilirken hata:', error);
      throw error;
    }
  }
}