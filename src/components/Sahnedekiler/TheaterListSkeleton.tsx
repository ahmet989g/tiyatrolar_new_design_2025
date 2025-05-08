// src/components/Sahnedekiler/TheaterListSkeleton.tsx
import React from 'react';

interface TheaterListSkeletonProps {
  count?: number;
}

const TheaterListSkeleton: React.FC<TheaterListSkeletonProps> = ({ count = 10 }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="relative aspect-[2/3] bg-gray-200 rounded-xl mb-3"></div>
          <div className="h-5 bg-gray-200 rounded-xl w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded-xl w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded-xl w-2/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded-xl w-3/5"></div>
        </div>
      ))}
    </div>
  );
};

export default TheaterListSkeleton;