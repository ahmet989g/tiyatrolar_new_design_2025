import React from 'react';

interface TheaterListSkeletonProps {
  count?: number;
}

const TheaterListSkeleton: React.FC<TheaterListSkeletonProps> = ({ count = 10 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="relative aspect-[2/3] bg-gray-200 rounded-xl mb-3"></div>
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/5"></div>
        </div>
      ))}
    </div>
  );
};

export default TheaterListSkeleton;