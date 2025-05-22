import KeenSlider from '@/components/KeenSlider';
import Image from 'next/image';
import React, { FC } from 'react'

interface TheaterGalleryProps {
  galleries: GalleryImage[];
}

interface GalleryImage {
  id: string;
  image: string;
}

const TheaterGallery: FC<TheaterGalleryProps> = ({ galleries }) => {
  return (
    <div>
      <KeenSlider>
        {galleries.map((gallery, index) => (
          <div key={gallery.id} className={`keen-slider__slide h-[600px] w-full`} style={{ maxWidth: index === 0 ? 418 : 700, minWidth: index === 0 ? 418 : 700 }}>
            <Image fill src={gallery.image} alt={`Gallery image ${gallery.id}`} className="w-full h-auto rounded-xl" />
          </div>
        ))}
      </KeenSlider>
    </div>
  )
}

export default TheaterGallery