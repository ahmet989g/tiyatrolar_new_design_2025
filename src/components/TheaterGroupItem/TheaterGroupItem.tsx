import { FavoriteIcon } from '@/components/Icons';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC, memo } from 'react'
import LoadingSkeletonItem from './LoadingSkeletonItem';

interface TheaterGroupItemProps {
  title: string;
  slug: string;
  location: string;
  image: string;
  favoriteCount: number;
  className?: string;
  isLoading?: boolean;
}

const TheaterGroupItem: FC<TheaterGroupItemProps> = ({
  title,
  slug,
  location,
  image,
  favoriteCount,
  className = '',
  isLoading = false,
}) => {
  if (isLoading) {
    return <LoadingSkeletonItem />;
  }
  return (
    <div>
      <Link href={`tiyatro-toplulugu/${slug}`} className={`theater-group-card block relative ${className}`}>
        <div className="relative rounded-xl overflow-hidden group">
          {/* Resim Container */}
          <div className="relative aspect-[1/1]">
            <Image
              src={image}
              alt={`${title} logosu`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>
        </div>
      </Link>
      <div className="flex flex-col gap-0.5 mt-2">
        <h3 className="">
          <Link href={`tiyatro-toplulugu/${slug}`} className="text-md font-semibold text-light-blue hover:text-primary whitespace-nowrap overflow-hidden truncate w-full block">
            {title}
          </Link>
        </h3>
        <div className="">
          <span className="text-sm font-medium text-primary">
            @{slug}
          </span>
        </div>
        <div className="">
          <span className="text-sm font-medium text-light-blue">
            {location}
          </span>
        </div>
        <div className="">
          <span className="text-sm font-medium text-secondary flex items-center gap-1">
            <FavoriteIcon size={24} /> {favoriteCount} kullanıcının favorisi
          </span>
        </div>
      </div>
    </div>
  )
}

export default memo(TheaterGroupItem)