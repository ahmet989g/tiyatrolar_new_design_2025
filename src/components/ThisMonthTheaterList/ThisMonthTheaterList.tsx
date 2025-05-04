'use client';

import React from 'react';
import TheaterListItem from '../Theater/TheaterListItem';
import HomeHeading from '../HomeHeading';
import { TheaterItem } from '@/types/theaterItem';
import LoadingSkeletonItem from './LoadingSkeletonItem';

interface ThisMonthTheaterListProps {
  title: string;
  description?: string;
  items: TheaterItem[];
  isLoading?: boolean;
  error?: string | null;
  className?: string;
  showAllButton?: boolean;
  showAllLink?: string;
  columns?: number;
}

const ThisMonthTheaterList: React.FC<ThisMonthTheaterListProps> = ({
  title,
  description,
  items,
  isLoading = false,
  error = null,
  className = '',
  showAllButton = true,
  showAllLink = '#',
  columns = 5 // Fotoğrafta 5'er tane görünüyor
}) => {
  if (error) {
    return (
      <div className={`theater-list-section ${className}`}>
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
          <p className="font-bold">Hata</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <section className={`theater-list-section py-8 ${className}`}>
      <div className="@container-normal mx-auto px-10">
        <HomeHeading
          title={title}
          description={description}
          buttonTitle={showAllButton ? `${items.length} Oyun` : undefined}
          buttonLink={showAllLink}
          isLoading={isLoading}
        />

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <LoadingSkeletonItem key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {items.map((item) => (
              <TheaterListItem
                key={item.id}
                {...item}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default React.memo(ThisMonthTheaterList);