"use client";
import React, { FC, ReactNode, useEffect, useState, useRef } from 'react';
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { ChevronLeftIcon, ChevronRightIcon } from '../Icons';
import TheaterSliderContentSkeleton from '../Theater/TheaterDetail/Loading/TheaterSliderContentSkeleton';

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
  const [mounted, setMounted] = useState(false);
  const [childrenArray, setChildrenArray] = useState<ReactNode[]>([]);
  const initTimeoutRef = useRef<NodeJS.Timeout>(null);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "snap",
    rtl: false,
    slides: {
      perView: "auto",
      spacing: 20,
    },
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      // Slider oluşturulduktan sonra kısa bir gecikme ile loaded state'ini true yap
      initTimeoutRef.current = setTimeout(() => {
        setLoaded(true);
      }, 100);
    },
    destroyed() {
      setLoaded(false);
    }
  });

  // Component mount kontrolü
  useEffect(() => {
    setMounted(true);

    return () => {
      if (initTimeoutRef.current) {
        clearTimeout(initTimeoutRef.current);
      }
    };
  }, []);

  // Childrenı bir array olarak işleme
  useEffect(() => {
    if (children && mounted) {
      const childArray = React.Children.toArray(children);
      setChildrenArray(childArray);

      // Children yüklendikten sonra sliderı yeniden initialize et
      if (instanceRef.current) {
        // gecikme ile slider'ı update et
        const updateTimeout = setTimeout(() => {
          instanceRef.current?.update();
        }, 50);

        return () => clearTimeout(updateTimeout);
      }
    }
  }, [children, mounted, instanceRef]);

  return (
    <div className='relative'>
      {/* Eğer slider yüklenmemişse skeleton göster */}
      {!loaded && <TheaterSliderContentSkeleton />}

      {/* Slider bileşeni - sadece mount olduktan sonra göster */}
      <div
        ref={sliderRef}
        className={`keen-slider ${className}`}
        style={{
          maxWidth: '100%',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      >
        {childrenArray.map((child, index) => (
          <React.Fragment key={index} >
            {child}
          </React.Fragment>
        ))}
      </div>

      {/* Navigation - sadece loaded ve instance hazır olduğunda göster */}
      {(loaded && mounted && instanceRef.current && childrenArray.length > 1) && (
        <div className="navigation max-w-[calc(96rem-16px)] relative">
          <button
            className={`absolute -bottom-15 right-16 w-10 h-10 z-10 cursor-pointer flex items-center justify-center bg-white border border-light-blue text-secondary hover:bg-secondary hover:text-white hover:border-secondary rounded-full transition-all duration-300 ease-in-out ${currentSlide === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            onClick={() => instanceRef.current?.prev()}
            disabled={currentSlide === 0}
            aria-label="Önceki slayt"
          >
            <ChevronLeftIcon size={26} className="relative left-[5px]" />
          </button>

          <button
            className={`absolute -bottom-15 right-4 w-10 h-10 z-10 cursor-pointer flex items-center justify-center bg-white border border-light-blue text-secondary hover:bg-secondary hover:text-white hover:border-secondary rounded-full transition-all duration-300 ease-in-out`}
            onClick={() => instanceRef.current?.next()}
            aria-label="Sonraki slayt"
          >
            <ChevronRightIcon size={26} className="relative left-[2px]" />
          </button>
        </div>
      )}
    </div>
  )
}

export default KeenSlider