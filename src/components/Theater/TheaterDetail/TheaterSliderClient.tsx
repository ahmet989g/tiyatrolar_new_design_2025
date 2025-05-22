"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import SwiperCustom from '@/components/SwiperSlider/SwiperCustom';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/Icons';
import { NavigationOptions } from '@/types/customSwiper.types';
import TheaterSliderSkeleton from './TheaterSliderSkeleton';

interface GalleryImage {
  id: string;
  image: string;
}

interface TheaterSliderClientProps {
  galleries: GalleryImage[];
}

/**
 * Tiyatro görselleri için CustomSwiper kullanan istemci tarafı slider bileşeni
 */
const TheaterSliderClient: React.FC<TheaterSliderClientProps> = ({ galleries }) => {
  const [swiperLoaded, setSwiperLoaded] = useState(false);

  // Swiper'ın yüklenmesini simüle etmek için
  useEffect(() => {
    const timer = setTimeout(() => {
      setSwiperLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Navigasyon düğmeleri
  const renderPrevButton = (isDisabled: boolean) => (
    <div className={`absolute -bottom-16 right-16 w-10 h-10 z-10 cursor-pointer flex items-center justify-center bg-white border border-light-blue text-secondary hover:bg-secondary hover:text-white hover:border-secondary rounded-full transition-all duration-300 ease-in-out ${isDisabled ? "opacity-50" : ""}`}>
      <ChevronLeftIcon size={26} className="relative left-[5px]" />
    </div>
  );

  const renderNextButton = (isDisabled: boolean) => (
    <div className={`absolute -bottom-16 right-4 w-10 h-10 z-10 cursor-pointer flex items-center justify-center bg-white border border-light-blue text-secondary hover:bg-secondary hover:text-white hover:border-secondary rounded-full transition-all duration-300 ease-in-out ${isDisabled ? "opacity-50" : ""}`}>
      <ChevronRightIcon size={26} className="relative left-[2px]" />
    </div>
  );

  const navigationOptions: NavigationOptions = {
    customButtons: true,
    renderPrevButton,
    renderNextButton
  };

  // Eğer galeri yoksa hiçbir şey gösterme
  if (!galleries || galleries.length === 0) {
    return null;
  }

  // Yükleme durumu
  if (!swiperLoaded) {
    return (
      <TheaterSliderSkeleton />
    );
  }

  // Galeri görsellerini SwiperCustom bileşenine ekle
  return (
    <SwiperCustom
      className="theater-gallery-slider"
      navigation={navigationOptions}
      loop={false}
      /*autoplay={galleries.length > 3 ? {
        enabled: true,
        delay: 5000,
        pauseOnMouseEnter: true
      } : false}*/
      autoplay={false}
      pagination={false}
      grabCursor={true}
      speed={600}
      spaceBetween={20}
      breakpoints={{
        320: { slidesPerView: 1.2 },
        640: { slidesPerView: 2.2 },
        1024: { slidesPerView: 3.2 },
      }}
      hasPoster={true}
      navigationClassName='max-w-[calc(96rem-16px)] relative'
    >
      {galleries.map((gallery, index) => (
        <div key={gallery.id} className="w-full h-full">
          <div className={`relative w-full h-[500px] rounded-xl overflow-hidden ${index === 0 ? "max-w-[320px]" : ""}`}>
            <Image
              src={gallery.image}
              alt="Tiyatro görseli"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority
            />
          </div>
        </div>
      ))}
    </SwiperCustom>
  );
};

export default TheaterSliderClient;