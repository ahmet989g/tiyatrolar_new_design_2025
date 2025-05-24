import TheaterHeaderSkeleton from '@/components/Theater/TheaterDetail/Loading/TheaterHeaderSkeleton'
import TheaterSliderSkeleton from '@/components/Theater/TheaterDetail/Loading/TheaterSliderSkeleton'
import React from 'react'

const loading = () => {
  return (
    <div className="theater-detail-loading mt-32">
      <div className="container mx-auto px-4 pt-7">
        <TheaterHeaderSkeleton />
        <div className="relative ml-[calc(-50vw+50%+var(--container-padding,1rem))] mr-[calc(-50vw+50%)] lg:ml-0 lg:mr-[calc(-50vw+50%+var(--container-padding,8px))]">
          <div className="pl-[var(--container-padding,1rem)] lg:pl-0">
            <TheaterSliderSkeleton />
          </div>
        </div>
      </div>
    </div>
  )
}

export default loading