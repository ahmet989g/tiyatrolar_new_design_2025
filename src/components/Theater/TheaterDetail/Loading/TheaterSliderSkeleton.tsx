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
      <div className="mt-7">
        <div className="flex flex-wrap gap-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-6 bg-gray-200 rounded-full w-30"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TheaterSliderSkeleton;