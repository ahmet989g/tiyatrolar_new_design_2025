"use client"
import React, { FC, useEffect, useState, useRef } from 'react'

interface LazyLoadComponentProps {
  children: React.ReactNode;
  placeholder?: React.ReactNode;
  rootMargin?: string;
}

const LazyLoadComponent: FC<LazyLoadComponentProps> = ({
  children,
  placeholder = <div className="h-40 w-full bg-gray-100 animate-pulse rounded-xl"></div>,
  rootMargin = '200px'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin, // Elemento bu kadar mesafe kala yüklemeye başla
        threshold: 0.01, // %1'i görünür olduğunda tetikle
      }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [rootMargin]);

  // Görselin yüklenmesi tamamlandığında
  useEffect(() => {
    if (isVisible) {
      // Kısa bir gecikme ile yükleme efekti
      const timer = setTimeout(() => {
        setHasLoaded(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div ref={componentRef} className="min-h-[100px]">
      {isVisible ? (
        <div className={`transition-opacity duration-300 ${hasLoaded ? 'opacity-100' : 'opacity-0'}`}>
          {children}
        </div>
      ) : (
        placeholder
      )}
    </div>
  );
};

export default LazyLoadComponent;