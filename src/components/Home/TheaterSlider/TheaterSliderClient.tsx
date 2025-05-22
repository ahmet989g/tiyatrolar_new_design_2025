'use client';

import React, { useState, useEffect } from 'react';
import { TheaterItem } from '@/types/theaterItem';
import TheaterListItem from '../../Theater/TheaterListItem';
import SwiperCustom from '../../SwiperSlider/SwiperCustom';
import ChevronLeftIcon from '../../Icons/ChevronLeftIcon';
import ChevronRightIcon from '../../Icons/ChevronRightIcon';
import LoadingSkeletonItem from './LoadingSkeletonItem';

interface TheaterSliderClientProps {
  slides: TheaterItem[];
}

const TheaterSliderClient: React.FC<TheaterSliderClientProps> = ({ slides }) => {
  const [swiperLoaded, setSwiperLoaded] = useState(false);

  // Swiper'ın yüklenmesini simüle etmek için
  useEffect(() => {
    const timer = setTimeout(() => {
      setSwiperLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Custom navigation buttons
  const renderPrevButton = (isDisabled: boolean) => (
    <div className={`absolute top-[36%] -left-5 w-10 h-10 z-10 cursor-pointer flex items-center justify-center bg-white border border-light-blue text-secondary hover:bg-secondary hover:text-white hover:border-secondary rounded-full transition-all duration-300 ease-in-out opacity-0 ${isDisabled ? "group-hover:opacity-50" : "group-hover:opacity-100"}`}>
      <ChevronLeftIcon size={26} className="relative left-1" />
    </div>
  );

  const renderNextButton = (isDisabled: boolean) => (
    <div className={`absolute top-[36%] -right-5 w-10 h-10 z-10 cursor-pointer flex items-center justify-center bg-white border border-light-blue text-secondary hover:bg-secondary hover:text-white hover:border-secondary rounded-full transition-all duration-300 ease-in-out opacity-0 ${isDisabled ? "group-hover:opacity-50" : "group-hover:opacity-100"}`}>
      <ChevronRightIcon size={26} />
    </div>
  );

  return (
    <div className="featured-slider-container relative group">
      {!swiperLoaded ? (
        // Swiper yüklenene kadar skeleton gösterimi
        <div className="flex gap-4 overflow-x-hidden">
          {Array.from({ length: 8 }).map((_, index) => (
            <LoadingSkeletonItem key={index} />
          ))}
        </div>
      ) : (
        // Swiper içeriği
        <SwiperCustom
          className="theater-slider-swiper"
          autoplay={{
            enabled: true,
            delay: 5000,
            pauseOnMouseEnter: true
          }}
          navigation={{
            customButtons: true,
            renderPrevButton,
            renderNextButton,
          }}
          loop={false}
          breakpoints={{
            320: { slidesPerView: 1.5, spaceBetween: 10 },
            640: { slidesPerView: 2.5, spaceBetween: 15 },
            1024: { slidesPerView: 6, spaceBetween: 20 },
            1280: { slidesPerView: 6, spaceBetween: 20 },
            1440: { slidesPerView: 8, spaceBetween: 20 },
          }}
          grabCursor={true}
          speed={600}
        >
          {slides.map((slide) => (
            <TheaterListItem
              key={slide.id}
              {...slide}
            />
          ))}
        </SwiperCustom>
      )}
    </div>
  );
};

export default React.memo(TheaterSliderClient);