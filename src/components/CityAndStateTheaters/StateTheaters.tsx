'use client';

import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store';
import CityAndStateTheaterList from './CityAndStateTheaterList';
import {
  fetchStateTheaters,
  selectStateTheaters
} from '@/store/features/home/thisMonthTheaterListSlice';

interface StateTheatersProps {
  className?: string;
}

const StateTheaters: React.FC<StateTheatersProps> = ({ className }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error } = useSelector(selectStateTheaters);
  const hasLoadedData = useRef(false);

  useEffect(() => {
    if (!hasLoadedData.current && (status === 'idle' || status === 'failed')) {
      hasLoadedData.current = true; // Birden fazla kez yüklemeyi önle
      dispatch(fetchStateTheaters());
    }
  }, [dispatch, status]);

  return (
    <CityAndStateTheaterList
      title={`Devlet Tiyatrolarında Bu Ay`}
      description={`Bu ay Devlet Tiyatrolarında izleyebileceğiniz tüm oyunlar`}
      items={items}
      status={status}
      error={error}
      showAllLink={`/sahne/test`}
      className={className}
    />
  );
};

export default StateTheaters;