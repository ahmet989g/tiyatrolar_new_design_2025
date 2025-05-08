import React from 'react';
import { Metadata } from 'next';
import { theaterService } from '@/services/theaterService';
import SahnedekilerPage from '@/components/Sahnedekiler/SahnedekilerPage';

// SEO için meta verileri
export const metadata: Metadata = {
  title: 'Sahnedeki Oyunlar | Tüm Tiyatro Oyunları - tiyatrolar.com.tr',
  description: 'Türkiye genelinde sahnelenen tüm tiyatro oyunları. Şehir, sahne ve tarihe göre filtreleyebilir, online bilet alabilirsiniz.',
  keywords: 'tiyatro oyunları, tiyatro biletleri, sahnedeki oyunlar, İstanbul tiyatroları, Ankara tiyatroları',
  alternates: {
    canonical: 'https://tiyatrolar.com.tr/sahnedekiler'
  },
  openGraph: {
    title: 'Sahnedeki Tiyatro Oyunları | tiyatrolar.com.tr',
    description: 'Türkiye genelinde sahnelenen tüm tiyatro oyunları. Şehir, sahne ve tarihe göre filtreleyebilir, online bilet alabilirsiniz.',
    url: 'https://tiyatrolar.com.tr/sahnedekiler',
    siteName: 'tiyatrolar.com.tr',
    images: ['/images/og/sahnedekiler.jpg'],
    locale: 'tr_TR',
    type: 'website',
  }
};

// Schema.org yapılandırılmış veri
const generateStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Sahnedeki Tiyatro Oyunları",
    "description": "Türkiye genelinde sahnelenen tüm tiyatro oyunları",
    "url": "https://tiyatrolar.com.tr/sahnedekiler",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        // Bu kısım gerçek verilerle doldurulacak
      ]
    }
  };
};

export default async function Sahnedekiler() {
  // İlk 20 oyunu server-side'da yükle
  const initialTheaters = await theaterService.getTheaters();
  // Tüm oyun sayısını getir (sayfalaması için)
  const totalCount = await theaterService.getTotalTheaterCount();

  return (
    <>
      {/* SEO için yapılandırılmış veri */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateStructuredData()) }}
      />

      {/* Ana sayfa içeriği */}
      <SahnedekilerPage initialTheaters={initialTheaters} totalCount={totalCount} />
    </>
  );
}