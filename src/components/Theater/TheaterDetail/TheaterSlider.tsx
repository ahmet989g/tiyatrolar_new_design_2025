import React from 'react';
import { Suspense } from 'react';
import { TheaterMockType } from '@/types/theatersMock';
import TheaterSliderSkeleton from './TheaterSliderSkeleton';
import TheaterActionButtons from './TheaterActionButtons';
import TheaterGallery from './TheaterGallery';

interface TheaterSliderProps {
  theater: TheaterMockType;
}

/**
 * Tiyatro detay sayfasındaki slider ve altındaki aksiyonları gösteren bileşen
 * CustomSwiper bileşenini kullanarak sağlanan galerileri gösterir
 * Slider tam ekran genişliğinde olurken, diğer içerikler container içinde kalır
 */
const TheaterSlider: React.FC<TheaterSliderProps> = ({ theater }) => {
  if (!theater.galleries || theater.galleries.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <Suspense fallback={<TheaterSliderSkeleton />}>
        {/* Özel container yapısı: sol taraf boşluklu, sağ taraf ekranın kenarına kadar */}
        <div className="relative ml-[calc(-50vw+50%+var(--container-padding,1rem))] mr-[calc(-50vw+50%)] lg:ml-0 lg:mr-[calc(-50vw+50%+var(--container-padding,8px))]">
          {/* CustomSwiper kullanan client bileşeni */}
          <div className="pl-[var(--container-padding,1rem)] lg:pl-0">
            <TheaterGallery galleries={theater.galleries} />
          </div>
        </div>

        {/* Slider altındaki aksiyon butonları - bunlar normal container içinde */}
        <div className="mt-6 flex flex-wrap items-center justify-between">
          <TheaterActionButtons
            theaterId={theater.id}
            theaterTitle={theater.title}
            isFavorite={theater.is_favorite}
            isFollow={theater.is_follow}
            isWatchlist={theater.is_watchlist}
          />
        </div>
      </Suspense>
    </div>
  );
};

// CSS değişkeni ekle
// Bu sadece component yüklendiğinde çalışacak
if (typeof document !== 'undefined') {
  document.documentElement.style.setProperty('--container-padding', '1rem');
}

export default TheaterSlider;