import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LoadingSkeletonItem = () => {
  return (
    <div className="w-full">
      {/* Kare alan */}
      <div className="relative w-full aspect-16/10">
        <Skeleton className="absolute top-0 left-0 w-full h-full" borderRadius={12} />
        {/* Alt çubuklar */}
        <div className="absolute bottom-4 left-0 w-full flex flex-col justify-center px-4 gap-4">
          <div className="inline-flex justify-center">
            <SkeletonTheme baseColor="#d0d0d0" highlightColor="#e0e0e0">
              <Skeleton width="200px" height={20} borderRadius={10} />
            </SkeletonTheme>
          </div>
          <div className="inline-flex justify-center gap-4">
            <SkeletonTheme baseColor="#d0d0d0" highlightColor="#e0e0e0">
              <Skeleton width="160px" height={16} borderRadius={8} />
              <Skeleton width="160px" height={16} borderRadius={8} />
            </SkeletonTheme>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingSkeletonItem;