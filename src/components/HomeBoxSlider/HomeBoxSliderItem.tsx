import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { homeBoxSliderItem } from '@/types/homeBoxSliderItem';
import CalendarIcon from '../Icons/CalendarIcon';
import LocationIcon from '../Icons/LocationIcon';

export interface HomeBoxSliderItemProps extends homeBoxSliderItem {
  /**
   * Özel CSS sınıfı
   */
  className?: string;
}

/**
 * Tiyatro afiş kartı komponenti
 * 
 * Tiyatro afişlerini göstermek için kullanılan kart tasarımı
 */
const HomeBoxSliderItem: React.FC<HomeBoxSliderItemProps> = ({
  title,
  slug,
  location,
  date,
  image,
  className = '',
}) => {

  const link = `/oyun/${slug}`;

  return (
    <Link href={link} className={`theater-poster-card block relative ${className}`}>
      <div className="aspect-[1/1] relative overflow-hidden rounded-lg">
        {/* Resim */}
        <Image
          src={image}
          alt={`${title} afişi`}
          fill
          className="object-cover w-full h-full"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          // Performans için lazy loading ve öncelik ayarları
          loading="lazy"
          priority={false}
        />

        {/* Başlık */}
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center justify-center mt-2 text-white/90">
            <span className="inline-flex items-center mr-4 whitespace-nowrap text-sm font-semibold">
              <CalendarIcon size={22} className="mr-1" />
              {date}
            </span>
            <span className="inline-flex items-center overflow-hidden text-sm font-semibold">
              <LocationIcon size={22} className="mr-1 min-w-[22px]" />
              <span className="truncate whitespace-nowrap">{location}</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default React.memo(HomeBoxSliderItem); // Gereksiz render'ları önlemek için memo kullanıyoruz