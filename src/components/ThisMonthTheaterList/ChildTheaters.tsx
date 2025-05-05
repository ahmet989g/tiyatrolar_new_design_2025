'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store';
import ThisMonthTheaterList from './ThisMonthTheaterList';
import {
  fetchChildTheaters,
  selectChildTheaters
} from '@/store/features/home/thisMonthTheaterListSlice';

interface ChildTheatersProps {
  className?: string;
}

const ChildTheaters: React.FC<ChildTheatersProps> = ({ className }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error } = useSelector(selectChildTheaters);

  useEffect(() => {
    dispatch(fetchChildTheaters());
  }, [dispatch]);

  return (
    <ThisMonthTheaterList
      title={`Çocuk Tiyatrolarında Bu Ay`}
      description={`Bu ay izleyebileceğiniz çocuk tiyatroları`}
      items={items}
      status={status}
      error={error}
      showAllLink={`/tiyatro/cocuk-tiyatrolari`}
      className={className}
      columns={7}
      containerClassName='container mx-auto'
    />
  );
};

export default ChildTheaters;