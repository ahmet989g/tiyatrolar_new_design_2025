"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from '@/components/Icons';

interface LightboxImage {
  id: string;
  src: string;
  alt?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  isOpen: boolean;
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

/**
 * Lightbox komponenti - galeriler için tam ekran görüntüleme
 */
const Lightbox: React.FC<LightboxProps> = ({
  images,
  isOpen,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance (px)
  const minSwipeDistance = 50;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrev();
          break;
        case 'ArrowRight':
          onNext();
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose, onNext, onPrev]);

  // Touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      onNext();
    } else if (isRightSwipe) {
      onPrev();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Handle backdrop click
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  // Image load handler
  const handleImageLoad = useCallback(() => {
    setImageLoading(false);
  }, []);

  // Reset loading state when index changes
  useEffect(() => {
    if (isOpen) {
      setImageLoading(true);
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [isOpen, currentIndex]);

  if (!isOpen || !isLoaded) return null;

  const currentImage = images[currentIndex];
  //const hasPrev = currentIndex > 0;
  const hasPrev = true;
  //const hasNext = currentIndex < images.length - 1;
  const hasNext = true;

  return createPortal(
    <div
      ref={lightboxRef}
      className="fixed inset-0 z-50 bg-black/95 bg-opacity-20 flex items-center justify-center"
      onClick={handleBackdropClick}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Loading spinner */}
      {imageLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-12 h-12 bg-white bg-opacity-50 text-secondary rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all cursor-pointer"
        aria-label="Kapat"
      >
        <CloseIcon size={36} />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-4 z-10 text-white px-4 py-2 rounded-full text-sm font-medium">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Previous button */}
      {hasPrev && (
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white bg-opacity-50 text-secondary rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all cursor-pointer"
          aria-label="Önceki resim"
        >
          <ChevronLeftIcon size={30} className='relative left-[5px]' />
        </button>
      )}

      {/* Next button */}
      {hasNext && (
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white bg-opacity-50 text-secondary rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all cursor-pointer"
          aria-label="Sonraki resim"
        >
          <ChevronRightIcon size={30} />
        </button>
      )}

      {/* Main image */}
      <div className="relative w-full h-full max-w-[90vw] max-h-[90vh] flex items-center justify-center">
        <Image
          src={currentImage.src}
          alt={currentImage.alt || `Gallery image ${currentIndex + 1}`}
          fill
          className="max-w-full max-h-full object-contain"
          onLoad={handleImageLoad}
          priority
          sizes="90vw"
        />
      </div>

      {/* Thumbnail navigation */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black bg-opacity-50 p-2 rounded-lg max-w-[90vw] overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => {
                setImageLoading(true);
                // Parent component'te index güncellenmesi için callback gerekebilir
              }}
              className={`relative w-12 h-12 rounded overflow-hidden flex-shrink-0 ${index === currentIndex ? 'ring-2 ring-white' : 'opacity-60 hover:opacity-80'
                } transition-all`}
            >
              <Image
                src={image.src}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="48px"
              />
            </button>
          ))}
        </div>
      )}
    </div>,
    document.body
  );
};

export default Lightbox;