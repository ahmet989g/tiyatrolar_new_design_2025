'use client';

import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTheaterSlides,
  selectTheaterSlider,
  selectTheaterSliderStatus,
  selectTheaterSliderError
} from '@/store/features/slider/theaterSliderSlice';
import { AppDispatch } from '@/store';
import TheaterListItem from '../Theater/TheaterListItem';
import SwiperCustom from '../SwiperSlider/SwiperCustom';
import ChevronLeftIcon from '../Icons/ChevronLeftIcon';
import ChevronRightIcon from '../Icons/ChevronRightIcon';
import LoadingSkeletonItem from './LoadingSkeletonItem';
import HomeHeading from '../HomeHeading';

interface TheaterSliderProps {
  className?: string;
  title?: string;
}

const TheaterSlider: React.FC<TheaterSliderProps> = ({
  className = '',
  title = 'Biletler için tiyatrolar.com.tr'
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const slides = useSelector(selectTheaterSlider);
  const status = useSelector(selectTheaterSliderStatus);
  const error = useSelector(selectTheaterSliderError);
  const hasLoadedData = useRef(false);

  useEffect(() => {
    if (!hasLoadedData.current && (status === 'idle' || status === 'failed')) {
      hasLoadedData.current = true; // Birden fazla kez yüklemeyi önle
      dispatch(fetchTheaterSlides());
    }
  }, [status, dispatch]);

  if (status === 'failed') {
    return (
      <div className={`theater-slider ${className}`}>
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
          <p className="font-bold">Hata</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const loadingComponent = (
    <div className="flex gap-4 overflow-x-hidden">
      {Array.from({ length: 8 }).map((_, index) => (
        <LoadingSkeletonItem key={index} />
      ))}
    </div>
  );

  // Custom navigation buttons
  const renderPrevButton = (isDisabled: boolean) => (
    <div className={`absolute top-[36%] -left-5 w-10 h-10 z-10 cursor-pointer flex items-center justify-center bg-white border border-light-blue text-secondary hover:bg-secondary hover:text-white hover:border-secondary rounded-full transition-all duration-300 ease-in-out ${isDisabled ? "opacity-50" : ""}`}>
      <ChevronLeftIcon size={26} className="relative left-1" />
    </div>
  );

  const renderNextButton = (isDisabled: boolean) => (
    <div className={`absolute top-[36%] -right-5 w-10 h-10 z-10 cursor-pointer flex items-center justify-center bg-white border border-light-blue text-secondary hover:bg-secondary hover:text-white hover:border-secondary rounded-full transition-all duration-300 ease-in-out ${isDisabled ? "opacity-50" : ""}`}>
      <ChevronRightIcon size={26} />
    </div>
  );

  return (
    <section className={`theater-slider py-8 ${className}`}>
      <div className="@container-normal mx-auto px-10">
        <HomeHeading
          title={title}
          description='Hizmet bedeli ödemeden, gişe ile aynı fiyat üzerinden online bilet alabileceğiniz tüm oyunlar'
          buttonTitle='Tüm Oyunlar'
          buttonLink='/tiyatrolar'
          isLoading={status !== 'succeeded'}
        />

        {status !== "succeeded" ? (
          loadingComponent
        ) : (
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
    </section>
  );
};

export default React.memo(TheaterSlider);