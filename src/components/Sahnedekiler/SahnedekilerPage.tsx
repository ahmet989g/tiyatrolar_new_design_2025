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
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Sayfa yüklendiğinde oyunların tamamını getirip olmadığını kontrol et
  useEffect(() => {
    setHasMore(theaters.length < totalCount);
  }, [theaters.length, totalCount]);

  // Infinite scroll için Intersection Observer
  useEffect(() => {
    if (loading) return;

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
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
  }, [loading, hasMore]);

  // Daha fazla tiyatro oyunu yükle
  const loadMoreTheaters = useCallback(async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const nextPage = page + 1;

      const response = await fetch(`/api/theaters?page=${nextPage}&limit=20`);
      const data = await response.json();

      if (data.theaters.length === 0) {
        setHasMore(false);
      } else {
        setTheaters(prev => [...prev, ...data.theaters]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error('Tiyatro oyunları yüklenirken hata oluştu:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page]);

  // Daha Fazla Göster butonu ile manuel yükleme
  const handleLoadMore = () => {
    loadMoreTheaters();
  };

  return (
    <div className="sahnedekiler-page py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Sahnedeki Oyunlar</h1>
        </div>

        <div className="mb-4">
          <p className="text-gray-600">
            Toplam <span className="font-bold">{totalCount}</span> oyun listeleniyor
          </p>
        </div>

        {/* Tiyatro listesi */}
        <TheaterList theaters={theaters} />

        {/* Yükleniyor göstergesi */}
        {loading && (
          <div className="my-8">
            <TheaterListSkeleton count={8} />
          </div>
        )}

        {/* Infinite scroll için gözlemci elemanı */}
        {hasMore && <div ref={loadMoreRef} className="h-10 my-8" />}

        {/* Daha fazla göster butonu */}
        {hasMore && !loading && (
          <div className="flex justify-center my-8">
            <button
              onClick={handleLoadMore}
              className="bg-primary hover:bg-secondary text-white font-bold py-3 px-6 rounded-full transition-colors"
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