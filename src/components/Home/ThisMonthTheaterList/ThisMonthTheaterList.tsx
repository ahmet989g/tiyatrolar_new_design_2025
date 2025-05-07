'use client';

import React from 'react';
import TheaterListItem from '../../Theater/TheaterListItem';
import HomeHeading from '../HomeHeading';
import { TheaterItem } from '@/types/theaterItem';
import LoadingSkeletonItem from './LoadingSkeletonItem';
import clsx from 'clsx';

interface ThisMonthTheaterListProps {
  title: string;
  description?: string;
  items: TheaterItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; // isLoading yerine status
  error?: string | null;
  className?: string;
  showAllButton?: boolean;
  showAllLink?: string;
  columns?: number;
  containerClassName?: string;
}

const ThisMonthTheaterList: React.FC<ThisMonthTheaterListProps> = ({
  title,
  description,
  items,
  status,
  error = null,
  className = '',
  showAllButton = true,
  showAllLink = '#',
  columns = 6,
  containerClassName = '@container-normal mx-auto px-20',
}) => {

  const gridCols: Record<string, string> = {
    '1': 'lg:grid-cols-1',
    '2': 'lg:grid-cols-2',
    '3': 'lg:grid-cols-3',
    '4': 'lg:grid-cols-4',
    '5': 'lg:grid-cols-5',
    '6': 'lg:grid-cols-6',
    '7': 'lg:grid-cols-7',
    '8': 'lg:grid-cols-8',
    '9': 'lg:grid-cols-9',
    '10': 'lg:grid-cols-10',
    '11': 'lg:grid-cols-11',
    '12': 'lg:grid-cols-12',
  };

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
      <div className={containerClassName}>
        <HomeHeading
          title={title}
          description={description}
          buttonTitle={showAllButton ? `${items.length} Oyun` : undefined}
          buttonLink={showAllLink}
          isLoading={status !== 'succeeded'}
        />

        {status !== "succeeded" ? (
          <div className={clsx('grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5', gridCols[columns])}>
            {Array.from({ length: columns }).map((_, index) => (
              <LoadingSkeletonItem key={index} />
            ))}
          </div>
        ) : (
          <div className={clsx('grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5', gridCols[columns])}>
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