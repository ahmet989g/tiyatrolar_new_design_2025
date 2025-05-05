'use client';

import React, { useEffect } from 'react';
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

  useEffect(() => {
    dispatch(fetchCityTheaters());
  }, [dispatch]);

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