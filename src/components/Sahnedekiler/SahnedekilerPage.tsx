// src/components/Sahnedekiler/SahnedekilerPage.tsx
'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { TheaterItem } from '@/types/theaterItem';
import TheaterList from './TheaterList';
import TheaterListSkeleton from './TheaterListSkeleton';

interface SahnedekilerPageProps {
  initialTheaters: TheaterItem[];
  totalCount: number;
}

const SahnedekilerPage: React.FC<SahnedekilerPageProps> = ({ initialTheaters, totalCount }) => {
  const [theaters, setTheaters] = useState<TheaterItem[]>(initialTheaters);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true); // İlk yükleme için state
  const [page, setPage] = useState(1);
  const [scrollCount, setScrollCount] = useState(0);
  const [shouldShowButton, setShouldShowButton] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Component mount olduğunda initial loading'i kaldır
  useEffect(() => {
    // İlk mounting sonrası çok kısa bir gecikme ile initialLoading false yapılır
    // Bu sayede skeleton görünüp hemen sonra veriler gösterilir
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Sayfa yüklendiğinde oyunların tamamını getirip olmadığını kontrol et
  useEffect(() => {
    setHasMore(theaters.length < totalCount);
  }, [theaters.length, totalCount]);

  // Daha fazla tiyatro oyunu yükle
  const loadMoreTheaters = useCallback(async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const nextPage = page + 1;

      const response = await fetch(`/api/theaters?page=${nextPage}&limit=6`);
      const data = await response.json();

      if (data.theaters.length === 0) {
        setHasMore(false);
      } else {
        setTheaters(prev => [...prev, ...data.theaters]);
        setPage(nextPage);

        // Scroll count artırılıyor
        const newScrollCount = scrollCount + 1;
        setScrollCount(newScrollCount);

        // 2 scroll sonra butona geçiş
        if (newScrollCount >= 2) {
          setShouldShowButton(true);
        }
      }
    } catch (error) {
      console.error('Tiyatro oyunları yüklenirken hata oluştu:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, scrollCount]);

  // Infinite scroll için Intersection Observer
  useEffect(() => {
    if (loading || !hasMore || shouldShowButton) return;

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !shouldShowButton) {
        loadMoreTheaters();
      }
    });

    if (loadMoreRef.current) {
      observer.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loading, hasMore, shouldShowButton, loadMoreTheaters]);

  // Daha Fazla Göster butonu ile manuel yükleme
  const handleLoadMore = () => {
    loadMoreTheaters();
  };

  return (
    <div className="sahnedekiler-page py-8 mt-30">
      <div className="container mx-auto px-4">

        {/* İlk yüklemede skeleton veya tiyatro listesi */}
        {initialLoading ? (
          <TheaterListSkeleton count={18} />
        ) : (
          <TheaterList theaters={theaters} />
        )}

        {/* Yükleniyor göstergesi */}
        {loading && (
          <div className="my-8">
            <TheaterListSkeleton count={6} />
          </div>
        )}

        {/* Infinite scroll için gözlemci elemanı */}
        {hasMore && !shouldShowButton && !loading && (
          <div ref={loadMoreRef} className="h-10 my-8" />
        )}

        {/* Daha fazla göster butonu */}
        {hasMore && shouldShowButton && !loading && (
          <div className="flex justify-center my-8">
            <button
              onClick={handleLoadMore}
              className="bg-primary hover:bg-secondary text-white font-bold py-3 px-6 rounded-full transition-colors cursor-pointer"
            >
              Daha Fazla Göster
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SahnedekilerPage;