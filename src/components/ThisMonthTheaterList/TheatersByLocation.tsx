'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store';
import ThisMonthTheaterList from './ThisMonthTheaterList';
import {
  fetchTheatersByLocation,
  selectTheatersByLocation
} from '@/store/features/home/thisMonthTheaterListSlice';

interface TheatersByLocationProps {
  locationName: string;
  className?: string;
}

const TheatersByLocation: React.FC<TheatersByLocationProps> = ({ locationName, className }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error } = useSelector(selectTheatersByLocation);

  useEffect(() => {
    dispatch(fetchTheatersByLocation(locationName));
  }, [dispatch, locationName]);

  return (
    <ThisMonthTheaterList
      title={`${locationName}'ta Bu Ay`}
      description={`Bu ay ${locationName}'ta izleyebileceğiniz tüm oyunlar`}
      items={items}
      status={status}
      error={error}
      showAllLink={`/lokasyon/${locationName}`}
      className={className}
      columns={8}
    />
  );
};

export default TheatersByLocation;