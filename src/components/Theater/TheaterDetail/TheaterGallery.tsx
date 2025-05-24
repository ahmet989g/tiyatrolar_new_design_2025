"use client";

import KeenSlider from '@/components/KeenSlider';
import Lightbox from '@/components/ui/Lightbox';
import Image from 'next/image';
import React, { FC, useState, useCallback } from 'react'

interface TheaterGalleryProps {
  galleries: GalleryImage[];
}

interface GalleryImage {
  id: string;
  image: string;
}

const TheaterGallery: FC<TheaterGalleryProps> = ({ galleries }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Lightbox için image formatını dönüştür
  const lightboxImages = galleries.map(gallery => ({
    id: gallery.id,
    src: gallery.image,
    alt: `Tiyatro görseli ${gallery.id}`
  }));

  // Resme tıklandığında lightbox aç
  const handleImageClick = useCallback((index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  }, []);

  // Lightbox navigation handlers
  const handleNext = useCallback(() => {
    setCurrentImageIndex(prev =>
      prev < galleries.length - 1 ? prev + 1 : 0
    );
  }, [galleries.length]);

  const handlePrev = useCallback(() => {
    setCurrentImageIndex(prev =>
      prev > 0 ? prev - 1 : galleries.length - 1
    );
  }, [galleries.length]);

  const handleClose = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  return (
    <>
      <div>
        <KeenSlider>
          {galleries.map((gallery, index) => (
            <div
              key={gallery.id}
              className={`keen-slider__slide h-[600px] w-full cursor-pointer group`}
              style={{
                maxWidth: index === 0 ? 418 : 700,
                minWidth: index === 0 ? 418 : 700
              }}
              onClick={() => handleImageClick(index)}
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image
                  fill
                  src={gallery.image}
                  alt={`Gallery image ${gallery.id}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 700px"
                />
              </div>
            </div>
          ))}
        </KeenSlider>
      </div>

      {/* Lightbox */}
      <Lightbox
        images={lightboxImages}
        isOpen={lightboxOpen}
        currentIndex={currentImageIndex}
        onClose={handleClose}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </>
  )
}

export default TheaterGallery