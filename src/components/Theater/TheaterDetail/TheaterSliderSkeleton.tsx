import React from 'react';

/**
 * Tiyatro sliderının yüklenmesi sırasında gösterilecek skeleton
 */
const TheaterSliderSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="flex gap-5">
        <div className="relative h-[600px] w-full max-w-[400px] rounded-xl bg-gray-200"></div>
        <div className="relative h-[600px] w-full rounded-xl bg-gray-200"></div>
        <div className="relative h-[600px] w-full rounded-xl bg-gray-200"></div>
        <div className="relative h-[600px] max-w-20 w-full rounded-xl bg-gray-200"></div>
      </div>
    </div>
  );
};

export default TheaterSliderSkeleton;