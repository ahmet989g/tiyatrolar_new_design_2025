'use client';

import React, { useEffect } from 'react';
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

  useEffect(() => {
    dispatch(fetchStateTheaters());
  }, [dispatch]);

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