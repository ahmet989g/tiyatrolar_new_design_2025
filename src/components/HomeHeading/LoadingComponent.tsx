import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingComponent = () => {
  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-start">
        <div className="inline-flex flex-col gap-1 w-full">
          <Skeleton width="20%" height={30} borderRadius={12} />
          <Skeleton width="40%" height={18} borderRadius={12} />
        </div>
        <Skeleton width="150px" height={36} borderRadius={20} />
      </div>
    </div>
  )
}

export default LoadingComponent