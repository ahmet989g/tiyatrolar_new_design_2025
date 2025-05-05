'use client'
import React, { FC, useEffect, useRef } from 'react'
import {
  fetchStagesAndGalleries,
  selectStagesAndGalleries,
  selectStagesAndGalleriesStatus,
  selectStagesAndGalleriesError
} from '@/store/features/home/stagesAndGalleriesSlice'
import { AppDispatch } from '@/store';
import { useDispatch, useSelector } from 'react-redux'
import ListItem from './ListItem';
import HomeHeading from '@/components/HomeHeading';
import LoadingSkeletonItem from './LoadingSkeletonItem';

interface StageAndGalleriesProps {
  className?: string;
}

const StageAndGalleries: FC<StageAndGalleriesProps> = ({
  className = ''
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const stagesAndGalleries = useSelector(selectStagesAndGalleries);
  const status = useSelector(selectStagesAndGalleriesStatus);
  const error = useSelector(selectStagesAndGalleriesError);
  const hasLoadedData = useRef(false);

  useEffect(() => {
    if (!hasLoadedData.current && (status === 'idle' || status === 'failed')) {
      hasLoadedData.current = true; // Birden fazla kez yüklemeyi önle
      dispatch(fetchStagesAndGalleries());
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
      {Array.from({ length: 3 }).map((_, index) => (
        <LoadingSkeletonItem key={index} />
      ))}
    </div>
  );

  return (
    <section className={`stage-and-galleries ${className}`}>
      <div className="container mx-auto py-8">
        <HomeHeading
          title={"Popüler Sahneler ve Galeriler"}
          description='1200+ sahne ve galeri hakkında güncel seans ve gösterim bilgileri'
          buttonTitle='Tüm Sahneler & Galeriler'
          buttonLink='/sahneler'
          isLoading={status !== 'succeeded'}
        />

        {status !== "succeeded" ? (
          loadingComponent
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 overflow-x-hidden">
            {stagesAndGalleries.map((item) => (
              <ListItem
                key={item.slug}
                title={item.title}
                slug={item.slug}
                location={item.location}
                image={item.image}
                theaterCount={item.theaterCount}
                favoriteCount={item.favoriteCount}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default StageAndGalleries