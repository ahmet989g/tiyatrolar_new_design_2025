import React from 'react';
import TheaterListSkeleton from '@/components/Sahnedekiler/TheaterListSkeleton';

export default function Loading() {
  return (
    <div className="sahnedekiler-page py-8">
      <div className="container mx-auto px-4">

        {/* Tiyatro listesi skeleton */}
        <TheaterListSkeleton count={18} />
      </div>
    </div>
  );
}