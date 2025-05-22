"use client"
import React, { useState, useMemo, useEffect } from 'react'
// import Swiper core and required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { SwiperCustomProps } from '@/types/customSwiper.types';

// Import NavigationButtons component
import SwiperNavigationButtons from './SwiperNavigationButtons';

/**
 * Özelleştirilebilir Swiper komponenti
 * Farklı ekran boyutları için ayarlanabilir, navigation, pagination ve autoplay özellikleri ile
 * @param props SwiperCustomProps tipinde komponent özellikleri
 * @returns React component
 */
const SwiperCustom: React.FC<SwiperCustomProps> = ({
  children,
  className = '',
  navigationClassName = '',
  breakpoints = {
    320: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
    1280: { slidesPerView: 4 }
  },
  autoplay = true,
  navigation = true,
  pagination = false,
  loop = true,
  speed = 500,
  grabCursor = true,
  spaceBetween = 20,
  slidesPerView,
  direction = 'horizontal',
  loadingComponent = null,
  slidesPerGroup,
  centeredSlides = false,
  hasPoster = false,
  onMouseEnter,
  onMouseLeave
}) => {
  // Swiper instance ve durum state'leri
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [childrenArray, setChildrenArray] = useState<React.ReactNode[]>([]);

  // Children'ı bir array olarak işleme ve yükleme durumunu kontrol etme
  useEffect(() => {
    // Children prop'u children array'e dönüştürme
    if (children) {
      const childArray = React.Children.toArray(children);
      setChildrenArray(childArray);

      // Eğer çocuklar var ise, yüklenmiş olarak işaretle
      if (childArray.length > 0) {
        // Sayfa yüklenme animasyonu için kısa gecikme ekleyebiliriz
        const timer = setTimeout(() => {
          setIsLoaded(true);
        }, 100);
        return () => clearTimeout(timer);
      } else {
        setIsLoaded(false);
      }
    } else {
      setChildrenArray([]);
      setIsLoaded(false);
    }
  }, [children]);

  // Autoplay options ayarları
  const autoplayOptions = useMemo(() => {
    if (typeof autoplay === 'object') {
      return {
        enabled: autoplay.enabled ?? true,
        delay: autoplay.delay ?? 3000,
        disableOnInteraction: autoplay.disableOnInteraction ?? false,
        pauseOnMouseEnter: autoplay.pauseOnMouseEnter ?? false
      };
    }
    return autoplay ? {
      enabled: true,
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: false
    } : false;
  }, [autoplay]);

  // Pagination options ayarları
  const paginationOptions = useMemo(() => {
    if (typeof pagination === 'object') {
      return pagination;
    }
    return pagination || false;
  }, [pagination]);

  // Eğer skeleton loading komponenti varsa ve henüz içerik yüklenmemişse göster
  if (loadingComponent && !isLoaded) {
    return <>{loadingComponent}</>;
  }

  return (
    <section className='relative'>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        breakpoints={breakpoints}
        autoplay={autoplayOptions}
        pagination={paginationOptions}
        loop={loop}
        speed={speed}
        grabCursor={grabCursor}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        direction={direction}
        slidesPerGroup={slidesPerGroup}
        centeredSlides={centeredSlides}
        className={`swiper-custom ${className}`}
        onSwiper={(swiperEl: SwiperClass) => {
          setSwiper(swiperEl);
        }}
        onSlideChange={() => {
          if (swiper) {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* Children prop'undan gelen içeriği SwiperSlide içinde göster */}
        {childrenArray.map((child, index) => (
          <SwiperSlide key={index} className={`${hasPoster && index === 0 ? "max-w-[320px]" : ""}`}>{child}</SwiperSlide>
        ))}
      </Swiper>

      {/* Ayrı bir komponent olarak navigasyon butonları - sadece içerik yüklendiğinde göster */}
      {isLoaded && (
        <SwiperNavigationButtons
          swiper={swiper}
          navigation={navigation}
          isBeginning={isBeginning}
          isEnd={isEnd}
          loop={loop}
          className={`${navigationClassName}`}
        />
      )}
    </section>
  );
};

export default SwiperCustom;