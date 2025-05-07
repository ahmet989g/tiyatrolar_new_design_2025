import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingSkeletonItem = () => {
  return (
    <div className="w-full">
      {/* Aspect ratio alanı (2:3 oran) */}
      <div className="relative w-full aspect-[2/3]">
        <Skeleton className="w-full h-full" borderRadius={12} />
      </div>

      <div className="mt-4 space-y-2">
        <Skeleton height={16} width="80%" borderRadius={8} />
        <Skeleton height={16} width="60%" borderRadius={8} />
        <Skeleton height={16} width="40%" borderRadius={8} />
        <Skeleton height={16} width="70%" borderRadius={8} />
      </div>
    </div>
  )
}

export default LoadingSkeletonItem;