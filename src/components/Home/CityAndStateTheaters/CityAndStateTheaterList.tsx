'use client';

import React from 'react';
import HomeHeading from '../HomeHeading';
import LoadingSkeletonItem from './LoadingSkeletonItem';
import { CityAndStateTheater } from '@/types/cityAndStateTheater';
import CityAndStateItem from './CityAndStateItem';

interface CityAndStateTheaterListProps {
  title: string;
  description?: string;
  items: CityAndStateTheater[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string | null;
  className?: string;
  showAllButton?: boolean;
  showAllLink?: string;
}

const CityAndStateTheaterList: React.FC<CityAndStateTheaterListProps> = ({
  title,
  description,
  items,
  status,
  error = null,
  className = '',
  showAllButton = true,
  showAllLink = '#',
}) => {
  if (error) {
    return (
      <div className={`city-and-state-section ${className}`}>
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
          <p className="font-bold">Hata</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <section className={`city-and-state-section w-full py-8 ${className}`}>
      <div className="">
        <HomeHeading
          title={title}
          description={description}
          buttonTitle={showAllButton ? `${items.length} Oyun` : undefined}
          buttonLink={showAllLink}
          isLoading={status !== 'succeeded'}
        />

        {status !== "succeeded" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
            {Array.from({ length: 4 }).map((_, index) => (
              <LoadingSkeletonItem key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {items.map((item) => (
              <CityAndStateItem
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

export default React.memo(CityAndStateTheaterList);