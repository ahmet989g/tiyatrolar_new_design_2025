'use client';

import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store';
import CityAndStateTheaterList from './CityAndStateTheaterList';
import {
  fetchCityTheaters,
  selectCityTheaters
} from '@/store/features/home/thisMonthTheaterListSlice';

interface CityTheatersProps {
  className?: string;
}

const CityTheaters: React.FC<CityTheatersProps> = ({ className }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error } = useSelector(selectCityTheaters);
  const hasLoadedData = useRef(false);

  useEffect(() => {
    if (!hasLoadedData.current && (status === 'idle' || status === 'failed')) {
      hasLoadedData.current = true; // Birden fazla kez yüklemeyi önle
      dispatch(fetchCityTheaters());
    }
  }, [dispatch, status]);

  return (
    <CityAndStateTheaterList
      title={`Şehir Tiyatrolarında Bu Ay`}
      description={`Bu ay Şehir Tiyatrolarında izleyebileceğiniz tüm oyunlar`}
      items={items}
      status={status}
      error={error}
      showAllLink={`/sahne/test`}
      className={className}
    />
  );
};

export default CityTheaters;