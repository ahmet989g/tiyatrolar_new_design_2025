"use client";
import { PlayCircleIcon } from '@/components/Icons';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

interface TheaterTrailerProps {
  trailerUrl: string;
}

/**
 * Tiyatro fragmanı için video oynatıcı bileşeni
 */
const TheaterTrailer: React.FC<TheaterTrailerProps> = ({ trailerUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = extractYouTubeId(trailerUrl);
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // YouTube URL'inden video ID'sini çıkarma
  function extractYouTubeId(url: string): string | null {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  // Videoyu oynatma fonksiyonu
  const playVideo = () => {
    setIsPlaying(true);
    if (iframeRef.current) {
      // YouTube iframe API ile videoyu oynat
      iframeRef.current.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
  };

  if (!videoId) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold text-secondary mb-4">Oyun Fragmanı</h2>

      <div className="relative aspect-video overflow-hidden rounded-xl">
        {!isPlaying ? (
          <>
            {/* Thumbnail */}
            <div className="w-full h-full">
              <Image
                src={thumbnailUrl}
                alt="Video önizleme"
                fill
                className="w-full h-full object-cover"
              />
            </div>

            {/* Play butonu overlay */}
            <div
              className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer"
              onClick={playVideo}
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center">
                <PlayCircleIcon size={128} />
              </div>
            </div>
          </>
        ) : (
          <iframe
            ref={iframeRef}
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0"
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default TheaterTrailer;