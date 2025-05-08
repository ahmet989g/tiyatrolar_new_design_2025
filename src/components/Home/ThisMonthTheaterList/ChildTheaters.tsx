'use client';

import React, { useEffect, useRef } from 'react';
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
  const hasLoadedData = useRef(false);

  useEffect(() => {
    if (!hasLoadedData.current && (status === 'idle' || status === 'failed')) {
      hasLoadedData.current = true; // Birden fazla kez yüklemeyi önle
      dispatch(fetchChildTheaters());
    }
  }, [dispatch, status]);

  return (
    <ThisMonthTheaterList
      title={`Çocuk Tiyatrolarında Bu Ay`}
      description={`Bu ay izleyebileceğiniz çocuk tiyatroları`}
      items={items}
      status={status}
      error={error}
      showAllLink={`/cocuk-tiyatrolari`}
      className={className}
      columns={7}
      containerClassName='container mx-auto'
    />
  );
};

export default ChildTheaters;