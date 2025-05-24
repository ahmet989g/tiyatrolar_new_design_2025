import React from 'react'

const TheaterHeaderSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-6">
        {/* Sol Taraf: Başlık ve Meta Bilgiler */}
        <div className="w-full lg:w-2/3">
          {/* Başlık Skeleton */}
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 bg-gray-200 rounded-lg w-2/4"></div>
          </div>

          {/* Info Liste Skeleton */}
          <div className="flex flex-wrap gap-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-6 bg-gray-200 rounded-full w-30"></div>
            ))}
          </div>
        </div>

        {/* Sağ Taraf: Puanlama Bilgileri */}
        <div className="w-full lg:w-1/3 flex justify-start lg:justify-end">
          <div className="w-full max-w-[180px]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="flex flex-col gap-1.5">
                  <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-18"></div>
                </div>
              </div>
              <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TheaterHeaderSkeleton