// src/components/CityAndStateItem/CityAndStateItem.tsx
import React from 'react';
import Image from 'next/image';
import CalendarIcon from '../../Icons/CalendarIcon';
import LocationIcon from '../../Icons/LocationIcon';
import { CityAndStateTheater } from '@/types/cityAndStateTheater';
import Link from 'next/link';

const CityAndStateItem: React.FC<CityAndStateTheater> = ({
  title,
  slug,
  date,
  time,
  location,
  image,
}) => {
  return (
    <Link href={`/oyun/${slug}`}>
      <div className={`relative w-full overflow-hidden rounded-xl`}>
        {/* Arka plan resmi */}
        <div className="relative aspect-[16/10] md:aspect-[16/10]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            priority
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* İçerik */}
          <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center justify-center text-white">
            <h4 className="text-xl font-bold text-center whitespace-nowrap mb-2">
              {title}
            </h4>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4">
              {/* Tarih ve Saat */}
              <span className="inline-flex items-center whitespace-nowrap gap-1 max-w-[50%]">
                <CalendarIcon size={24} className="text-white min-w-[24px]" />
                <span className="text-sm font-semibold">
                  {date} / {time}
                </span>
              </span>

              {/* Lokasyon */}
              <span className="inline-flex items-center overflow-hidden gap-1 max-w-[60%]">
                <LocationIcon size={24} className="text-white min-w-[24px]" />
                <span className="text-sm font-semibold truncate whitespace-nowrap">
                  {location}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CityAndStateItem;