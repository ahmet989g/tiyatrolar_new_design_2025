import React, { FC, memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TheaterItem } from '@/types/theaterItem';

export interface TheaterSliderItemProps extends TheaterItem {
  className?: string;
}

const TheaterSliderItem: FC<TheaterSliderItemProps> = ({
  title,
  slug,
  location,
  date,
  time,
  image,
  isNew,
  averageRating,
  ratingCount,
  className = '',
}) => {
  const link = `/oyun/${slug}`;

  return (
    <article className="group/item">
      <Link href={link} className={`theater-item-card block relative ${className}`}>
        <div className="relative rounded-xl overflow-hidden">
          {/* Resim Container */}
          <div className="relative aspect-[2/3]">
            <Image
              src={image}
              alt={`${title} afişi`}
              fill
              className="object-cover transition-transform duration-300 group-hover/item:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />

            {/* YENİ OYUN etiketi */}
            {isNew && (
              <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-10">
                <span className="bg-primary text-white px-6 py-2 rounded-full text-xs font-bold whitespace-nowrap">
                  YENİ OYUN
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
      <div className="flex flex-col gap-0.5 mt-2">
        <h3 className="">
          <Link href={link} className="text-md font-semibold text-light-blue group-hover/item:text-primary whitespace-nowrap overflow-hidden truncate w-full block">
            {title}
          </Link>
        </h3>
        <div className="">
          <span className="text-sm font-medium text-light-blue">
            {date} / {time}
          </span>
        </div>
        <div className="">
          <span className="text-sm font-medium text-primary whitespace-nowrap overflow-hidden truncate w-full block">
            {location}
          </span>
        </div>
        <div className="">
          {typeof ratingCount !== "undefined" && ratingCount > 9
            ? (
              <span className="text-sm font-medium text-light-blue">
                <span className="font-bold text-secondary">{averageRating}</span> / {ratingCount} kullanıcı alkışı
              </span>
            )
            : (
              <span className="text-sm font-medium text-light-blue">
                -.- / Yeterli kullanıcı alkışı yok
              </span>
            )}
        </div>
      </div>
    </article>
  );
};

export default memo(TheaterSliderItem);