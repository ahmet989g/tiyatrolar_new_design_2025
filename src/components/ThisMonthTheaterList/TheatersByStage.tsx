'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store';
import ThisMonthTheaterList from './ThisMonthTheaterList';
import {
  fetchTheatersByStage,
  selectTheatersByStage
} from '@/store/features/home/thisMonthTheaterListSlice';

interface TheatersByStageProps {
  stageName: string;
  className?: string;
}

const TheatersByStage: React.FC<TheatersByStageProps> = ({ stageName, className }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error } = useSelector(selectTheatersByStage);

  useEffect(() => {
    dispatch(fetchTheatersByStage(stageName));
  }, [dispatch, stageName]);

  return (
    <ThisMonthTheaterList
      title={`${stageName}'de Bu Ay`}
      description={`Bu ay ${stageName}'de izleyebileceğiniz tüm oyunlar`}
      items={items}
      isLoading={status === 'loading'}
      error={error}
      showAllLink={`/sahne/${stageName}`}
      className={className}
    />
  );
};

export default TheatersByStage;