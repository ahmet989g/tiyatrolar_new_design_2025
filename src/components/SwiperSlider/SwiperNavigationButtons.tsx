"use client"
import React from 'react';
import { SwiperNavigationButtonsProps } from '@/types/customSwiper.types';

/**
 * Swiper için navigasyon butonları komponenti
 * Özelleştirilebilir veya varsayılan navigasyon butonları sağlar
 */
const SwiperNavigationButtons: React.FC<SwiperNavigationButtonsProps> = ({
  swiper,
  navigation,
  isBeginning,
  isEnd,
  loop = false,
}) => {
  // Navigasyon devre dışıysa hiçbir şey render etme
  if (!navigation) return null;

  // Özel butonlar için kontrol
  if (typeof navigation === 'object' && navigation.customButtons) {
    // Özel butonlar için JSX
    const PrevButtonComponent = navigation.renderPrevButton
      ? () => (
        <button className={``} onClick={() => swiper?.slidePrev()}>
          {navigation.renderPrevButton?.(isBeginning)}
        </button>
      )
      : () => (
        <button
          className={navigation.prevButtonClass || 'default-prev-button'}
          disabled={isBeginning && !loop}
          onClick={() => swiper?.slidePrev()}
          aria-label="Önceki slide"
        >
          Geri
        </button>
      );

    const NextButtonComponent = navigation.renderNextButton
      ? () => (
        <button className={``} onClick={() => swiper?.slideNext()}>
          {navigation.renderNextButton?.(isEnd)}
        </button>
      )
      : () => (
        <button
          className={navigation.nextButtonClass || 'default-next-button'}
          disabled={isEnd && !loop}
          onClick={() => swiper?.slideNext()}
          aria-label="Sonraki slide"
        >
          İleri
        </button>
      );

    return (
      <div className="custom-navigation-container h-0">
        {navigation.showPrevButton !== false && <PrevButtonComponent />}
        {navigation.showNextButton !== false && <NextButtonComponent />}
      </div>
    );
  }

  // Varsayılan butonlar
  return (
    <div className="flex gap-5">
      <button
        className={`p-4 ${isBeginning && !loop ? 'bg-gray-700' : 'bg-black'} text-white absolute top-1/2 -translate-y-1/2 left-0 z-10`}
        onClick={() => swiper?.slidePrev()}
        disabled={isBeginning && !loop}
        aria-label="Önceki slide"
      >
        Geri
      </button>
      <button
        className={`p-4 ${isEnd && !loop ? 'bg-gray-700' : 'bg-black'} text-white absolute top-1/2 -translate-y-1/2 right-0 z-10`}
        onClick={() => swiper?.slideNext()}
        disabled={isEnd && !loop}
        aria-label="Sonraki slide"
      >
        İleri
      </button>
    </div>
  );
};

export default SwiperNavigationButtons;