import React, { Suspense } from 'react'
import { notFound } from 'next/navigation';
import { theaterService } from '@/services/theaterService';
import { Metadata } from 'next';
import TheaterHeader from '@/components/Theater/TheaterDetail/TheaterHeader';
import TheaterInfoList from '@/components/Theater/TheaterDetail/TheaterInfoList';
import TheaterRating from '@/components/Theater/TheaterDetail/TheaterRating';
import TheaterDetailSkeleton from '@/components/Theater/TheaterDetail/TheaterDetailSkeleton';
import TheaterSlider from '@/components/Theater/TheaterDetail/TheaterSlider';
import TheaterContent from '@/components/Theater/TheaterDetail/TheaterContent';
import TheaterActionButtons from '@/components/Theater/TheaterDetail/TheaterActionButtons';

interface TheaterDetailPageProps {
  params: { slug: string };
}

// İsteğin çalışma zamanında değerlendirilmesi için
export const dynamic = 'force-dynamic';
// Her isteği yeni değerlendirmek için
export const revalidate = 0;

// Dinamik meta veri oluşturma
export async function generateMetadata(
  { params }: TheaterDetailPageProps,
): Promise<Metadata> {
  // Tiyatro verilerini getir
  const theater = await theaterService.getTheaterBySlug(params.slug);

  if (!theater) {
    return {
      title: 'Oyun Bulunamadı - tiyatrolar.com.tr',
      description: 'Aradığınız oyun bulunamadı. Başka bir tiyatro oyunu arayabilirsiniz.',
    };
  }

  // Kategorileri string olarak birleştir
  const categories = theater.categories.map(cat => cat.title).join(', ');
  const locations = theater.locations.map(loc => loc.title).join(', ');

  // OG image için tiyatro galeriden ilk resmi kullan
  const ogImage = theater.galleries && theater.galleries.length > 0
    ? theater.galleries[0].image
    : '/images/og/default-theater.jpg';

  return {
    title: `${theater.title} - Tiyatro Bilgileri, Seanslar, Biletler`,
    description: `${theater.title} tiyatro oyunu hakkında bilgiler, oyuncu kadrosu, seanslar ve bilet satın alma. ${categories} türündeki oyun ${locations} sahnesinde!`,
    keywords: `${theater.title}, ${categories}, tiyatro bileti, tiyatro oyunu, ${locations}`,
    openGraph: {
      title: `${theater.title} - Tiyatro Bilgileri ve Biletler | tiyatrolar.com.tr`,
      description: `${theater.title} tiyatro oyunu hakkında bilgiler, oyuncu kadrosu, seanslar ve bilet satın alma.`,
      images: [ogImage],
    },
    alternates: {
      canonical: `https://tiyatrolar.com.tr/oyun/${params.slug}`,
    },
  };
}

export default async function TheaterDetailPage({ params }: TheaterDetailPageProps) {
  // Tiyatro verisini getir
  const theater = await theaterService.getTheaterBySlug(params.slug);

  // Eğer tiyatro bulunamazsa 404 sayfasına yönlendir
  if (!theater) {
    notFound();
  }

  return (
    <div className="theater-detail-page pb-16 mt-32">
      <div className="container mx-auto px-4 pt-6">
        <Suspense fallback={<TheaterDetailSkeleton />}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* Sol Taraf: Başlık ve Meta Bilgiler */}
            <div className="w-full lg:w-2/3">
              <TheaterHeader title={theater.title} isNew={theater.is_new} />
              <TheaterInfoList theater={theater} />
            </div>

            {/* Sağ Taraf: Puanlama Bilgileri */}
            <div className="w-full lg:w-1/3 flex justify-start lg:justify-end">
              <TheaterRating
                averageRating={theater.average_rating}
                ratingCount={theater.rating_count}
                commentCount={theater.comment_count}
              />
            </div>
          </div>

          {/* Slider */}
          <TheaterSlider theater={theater} />

          <div className="mt-7 flex flex-wrap items-center justify-between">
            <TheaterActionButtons
              theaterId={theater.id}
              theaterTitle={theater.title}
              isFavorite={theater.is_favorite}
              isFollow={theater.is_follow}
              isWatchlist={theater.is_watchlist}
            />
          </div>

          {/* İçerik */}
          <TheaterContent theater={theater} />
        </Suspense>

        {/* Slider ve diğer içerikler burada eklenecek */}
      </div>
    </div>
  );
}