import React from 'react'
import Skeleton from 'react-loading-skeleton'

const LoadingSkeletonItem = () => {
  return (
    <div>
      <Skeleton count={1} width={200} height={30} className="mb-2" />
    </div>
  )
}

export default LoadingSkeletonItem