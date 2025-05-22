import React from 'react';
import { TheaterMockType } from '@/types/theatersMock';
import TheaterSummary from './TheaterSummary';
import TheaterTrailer from './TheaterTrailer';
import TheaterCast from './TheaterCast';
import TheaterAwards from './TheaterAwards';
import TheaterSessionsList from './TheaterSessionsList';

interface TheaterContentProps {
  theater: TheaterMockType;
}

/**
 * Tiyatro detay içeriğini gösteren ana bileşen
 * Sol tarafta: Özet, Fragman, Ödüller, Oyuncular ve Ekip
 * Sağ tarafta: Güncel Seanslar ve diğer yan panel öğeleri
 */
const TheaterContent: React.FC<TheaterContentProps> = ({ theater }) => {
  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-7 gap-20">
      {/* Sol taraf - Ana içerik */}
      <div className="lg:col-span-5">
        <TheaterSummary theater={theater} />

        {/* Ödüller */}
        {theater.awards && theater.awards.length > 0 && (
          <>
            <hr className='text-gray-300 mt-10' />
            <TheaterAwards theater={theater} />
          </>
        )}

        {/* Tiyatro fragmanı */}
        {theater.fragman_video && (
          <>
            <hr className='text-gray-300 mt-10' />
            <TheaterTrailer trailerUrl={theater.fragman_video} />
          </>
        )}

        <hr className='text-gray-300 mt-10' />

        {/* Oyuncular ve Sahne Arkası Ekibi */}
        <TheaterCast theater={theater} limit={8} />

      </div>

      {/* Sağ taraf - Yan panel */}
      <div className="lg:col-span-2">
        <div className="space-y-6 h-full">
          <TheaterSessionsList theater={theater} isSticky={true} />

          {/* İsteğe bağlı ek bileşenler buraya */}
        </div>
      </div>
    </div>
  );
};

export default TheaterContent;