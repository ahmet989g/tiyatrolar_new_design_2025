"use client"
import React, { FC, useEffect } from 'react';
import {
  fetchTheaterGroups,
  selectTheaterGroups,
  selectTheaterGroupStatus,
  selectTheaterGroupError
} from '@/store/features/home/theaterGroupSlice';
import { AppDispatch } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import TheaterGroupItem from '@/components/TheaterGroupItem/TheaterGroupItem';
import LoadingSkeletonItem from '@/components/TheaterGroupItem/LoadingSkeletonItem';
import HomeHeading from '@/components/HomeHeading';

interface TheaterGroupsProps {
  className?: string;
}

const TheaterGroups: FC<TheaterGroupsProps> = ({
  className = ''
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const theaterGroups = useSelector(selectTheaterGroups);
  const status = useSelector(selectTheaterGroupStatus);
  const error = useSelector(selectTheaterGroupError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTheaterGroups());
    }
  }, [status, dispatch]);

  if (status === 'failed') {
    return (
      <div className={`stage-and-galleries ${className}`}>
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
          <p className="font-bold">Hata</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const loadingComponent = (
    <div className="flex gap-4 overflow-x-hidden">
      {Array.from({ length: 7 }).map((_, index) => (
        <LoadingSkeletonItem key={index} />
      ))}
    </div>
  );

  return (
    <section className={`theater-groups mb-10 ${className}`}>
      <div className="container mx-auto py-8">
        <HomeHeading
          title={"Popüler Tiyatro Toplulukları"}
          description='1500+ tiyatro topluluğu hakkında detaylı bilgi'
          buttonTitle='Tüm Tiyatro Toplulukları'
          buttonLink='/tiyatro-topluluklari'
          isLoading={status !== 'succeeded'}
        />

        {status !== "succeeded" ? (
          loadingComponent
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-5 overflow-x-hidden">
            {theaterGroups.map((theaterGroup) => (
              <TheaterGroupItem
                key={theaterGroup.id}
                title={theaterGroup.title}
                slug={theaterGroup.slug}
                location={theaterGroup.location}
                image={theaterGroup.image}
                favoriteCount={theaterGroup.favoriteCount}
                isLoading={status !== 'succeeded'}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default TheaterGroups