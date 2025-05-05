'use client';

import React, { useEffect, useRef } from 'react';
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
  const hasLoadedData = useRef(false);

  useEffect(() => {
    // Sadece bir kez veri yükle
    if (!hasLoadedData.current && (status === 'idle' || status === 'failed')) {
      hasLoadedData.current = true; // Birden fazla kez yüklemeyi önle
      dispatch(fetchTheatersByStage(stageName));
    }
  }, [dispatch, stageName, status]);

  return (
    <ThisMonthTheaterList
      title={`${stageName}'de Bu Ay`}
      description={`Bu ay ${stageName}'de izleyebileceğiniz tüm oyunlar`}
      items={items}
      status={status}
      error={error}
      showAllLink={`/sahne/${stageName}`}
      className={className}
      columns={8}
    />
  );
};

export default TheatersByStage;