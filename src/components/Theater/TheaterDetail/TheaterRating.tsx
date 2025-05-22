import { ChatIcon, CheerIcon } from '@/components/Icons';
import Link from 'next/link';
import React from 'react';

interface TheaterRatingProps {
  averageRating: number;
  ratingCount: number;
  commentCount?: number;
}

/**
 * Tiyatro oyunu puanlama bilgilerini gösteren komponent
 */
const TheaterRating: React.FC<TheaterRatingProps> = ({
  averageRating,
  ratingCount,
  commentCount
}) => {
  return (
    <div className="w-full max-w-[180px]">
      <div className="flex items-center justify-between mb-4">
        {/* Alkış ve yorum bilgileri */}
        <div className="flex flex-col gap-1.5">
          {ratingCount !== undefined && (
            <Link href={"/"} className="flex items-center gap-2 text-secondary hover:text-primary transition-colors">
              <CheerIcon size={24} />
              <span className="text-md font-semibold underline">{ratingCount} alkış</span>
            </Link>
          )}

          {commentCount !== undefined && (
            <Link href={"/"} className="flex items-center gap-2 text-secondary hover:text-primary transition-colors">
              <ChatIcon size={24} />
              <span className="text-md font-semibold underline">{commentCount} yorum</span>
            </Link>
          )}
        </div>
        {/* Puan */}
        <div className="w-14 h-14 flex items-center justify-center bg-secondary rounded-full">
          <span className="text-2xl font-bold text-white">{averageRating.toFixed(1)}</span>
        </div>
      </div>


    </div>
  );
};

export default TheaterRating;