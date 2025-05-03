import React from 'react'

const LoadingSkeletonItem = () => {
  return (
    <div className="animate-pulse w-full">
      <div className="relative aspect-[1/1] bg-gray-300 rounded-lg">
        <div className="flex justify-center absolute bottom-5 left-0 right-0 w-60 mx-auto">
          <div className="h-4 bg-gray-200 rounded-lg w-1/2 mr-5"></div>
          <div className="h-4 bg-gray-200 rounded-lg w-1/2"></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingSkeletonItem;