"use client";
import React, { FC, ReactNode, useEffect, useState } from 'react';
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { ChevronLeftIcon, ChevronRightIcon } from '../Icons';
import TheaterSliderSkeleton from '../Theater/TheaterDetail/TheaterSliderSkeleton';

interface KeenSliderProps {
  children: ReactNode;
  className?: string;
}

const KeenSlider: FC<KeenSliderProps> = ({
  children,
  className = '',
}) => {

  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [childrenArray, setChildrenArray] = useState<ReactNode[]>([]);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: false,
    mode: "snap",
    rtl: false,
    slides: { perView: "auto", spacing: 20, },
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true);
    },
  });

  // Children'ı bir array olarak işleme ve yükleme durumunu kontrol etme
  useEffect(() => {
    // Children prop'u children array'e dönüştürme
    if (children) {
      const childArray = React.Children.toArray(children);
      setChildrenArray(childArray);
    } else {
      setChildrenArray([]);
    }
  }, [children]);

  return (
    <div className='relative'>
      {/* Eğer slider yüklenmemişse skeleton göster */}
      {!loaded && <TheaterSliderSkeleton />}
      {/* Slider bileşeni */}
      <div ref={sliderRef} className={`keen-slider text-red-500 ${className}`} style={{ maxWidth: '100%' }}>
        {/* Children prop'undan gelen içeriği SwiperSlide içinde göster */}
        {childrenArray.map((child, index) => (
          <React.Fragment key={index}>{child}</React.Fragment>
        ))}
      </div>
      {(loaded && instanceRef.current) && (
        <div className="navigation max-w-[calc(96rem-16px)] relative">
          <button
            className={`absolute -bottom-16 right-16 w-10 h-10 z-10 cursor-pointer flex items-center justify-center bg-white border border-light-blue text-secondary hover:bg-secondary hover:text-white hover:border-secondary rounded-full transition-all duration-300 ease-in-out ${currentSlide === 0 ? "opacity-50" : ""}`}
            onClick={() => instanceRef.current?.prev()}
            disabled={currentSlide === 0}
          >
            <ChevronLeftIcon size={26} className="relative left-[5px]" />
          </button>
          <button className={`absolute -bottom-16 right-4 w-10 h-10 z-10 cursor-pointer flex items-center justify-center bg-white border border-light-blue text-secondary hover:bg-secondary hover:text-white hover:border-secondary rounded-full transition-all duration-300 ease-in-out ${currentSlide === instanceRef.current.track.details?.slides?.length - 1 ? "opacity-50" : ""}`}
            onClick={() => instanceRef.current?.next()}
            disabled={currentSlide === instanceRef.current.track.details?.slides?.length - 1}
          >
            <ChevronRightIcon size={26} className="relative left-[2px]" />
          </button>
        </div>
      )}
    </div>
  )
}

export default KeenSlider