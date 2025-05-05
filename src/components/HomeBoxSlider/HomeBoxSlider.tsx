'use client';

import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchHomeBoxSlides,
  selectHomeBoxSlides,
  selectSliderStatus,
  selectSliderError
} from '@/store/features/slider/sliderSlice';
import { AppDispatch } from '@/store';
import HomeBoxSliderItem from './HomeBoxSliderItem';
import LoadingSkeletonItem from './LoadingSkeletonItem';
import ChevronLeftIcon from '../Icons/ChevronLeftIcon';
import ChevronRightIcon from '../Icons/ChevronRightIcon';
import SwiperCustom from '../SwiperSlider/SwiperCustom';
import { NavigationOptions } from '@/types/customSwiper.types';

interface HomeBoxSliderProps {
  /**
   * Komponentin dış container'ına eklenecek sınıf
   */
  className?: string;
  /**
   * Komponentin başlığı (opsiyonel)
   */
  title?: string;
}

/**
 * Ana sayfa kutu slider komponenti
 * 
 * Redux bağlantılı, tiyatro afişlerini gösteren slider
 */
const HomeBoxSlider: FC<HomeBoxSliderProps> = ({
  className = '',
  title
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const slides = useSelector(selectHomeBoxSlides);
  const status = useSelector(selectSliderStatus);
  const error = useSelector(selectSliderError);

  // Verileri yükleme
  useEffect(() => {
    // Eğer veriler henüz yüklenmediyse
    if (status === 'idle') {
      dispatch(fetchHomeBoxSlides());
    }
    console.log("status", status);
  }, [status, dispatch]);

  // Özel navigasyon düğmeleri
  const renderPrevButton = (isDisabled: boolean) => (
    <div className={`absolute top-1/2 -left-5 -translate-y-1/2 w-10 h-10 z-10 cursor-pointer flex items-center justify-center bg-white border border-light-blue text-secondary hover:bg-secondary hover:text-white hover:border-secondary rounded-full transition-all duration-300 ease-in-out ${isDisabled ? "opacity-50" : ""}`}>
      <ChevronLeftIcon size={26} className="relative left-1" />
    </div>
  );

  const renderNextButton = (isDisabled: boolean) => (
    <div className={`absolute top-1/2 -right-5 -translate-y-1/2 w-10 h-10 z-10 cursor-pointer flex items-center justify-center bg-white border border-light-blue text-secondary hover:bg-secondary hover:text-white hover:border-secondary rounded-full transition-all duration-300 ease-in-out ${isDisabled ? "opacity-50" : ""}`}>
      <ChevronRightIcon size={26} className="" />
    </div>
  );

  // NavigationOptions nesnesi oluşturuyoruz
  const navigationOptions: NavigationOptions = {
    customButtons: true,
    renderPrevButton,
    renderNextButton,
    // İsterseniz ek özellikleri de burada belirleyebilirsiniz
    prevButtonClass: 'home-slider-prev-button',
    nextButtonClass: 'home-slider-next-button'
  };

  // Hata durumu
  if (status === 'failed') {
    return (
      <div className={`home-box-slider ${className}`}>
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
          <p className="font-bold">Hata</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Skeleton veya içerik hazırlama
  const content = slides.length > 0
    ? slides.map((slide) => (
      <HomeBoxSliderItem
        key={slide.id}
        {...slide}
      />
    ))
    : [];

  // Skeleton loading komponenti
  const loadingComponent = (
    <div className="flex gap-4 overflow-x-hidden">
      {Array.from({ length: 5 }).map((_, index) => (
        <LoadingSkeletonItem key={index} />
      ))}
    </div>
  );

  return (
    <section className={`home-box-slider py-8 ${className}`}>
      <div className="@container-normal mx-auto px-10">
        {title && (
          <h2 className="text-2xl font-bold mb-6">{title}</h2>
        )}
        <div className="featured-slider-container relative">
          {status !== "succeeded" ? (
            loadingComponent
          ) : (
            <SwiperCustom
              className="home-box-slider-swiper"
              autoplay={{
                enabled: true,
                delay: 5000,
                pauseOnMouseEnter: true
              }}
              navigation={navigationOptions}
              loop={false}
              breakpoints={{
                320: { slidesPerView: 2.2, spaceBetween: 10 },
                640: { slidesPerView: 3.2, spaceBetween: 15 },
                1024: { slidesPerView: 4.2, spaceBetween: 20 },
                1280: { slidesPerView: 5, spaceBetween: 20 }
              }}
              grabCursor={true}
              speed={600}
            >
              {content}
            </SwiperCustom>
          )}
        </div>
      </div>
    </section>
  );
};

export default React.memo(HomeBoxSlider);