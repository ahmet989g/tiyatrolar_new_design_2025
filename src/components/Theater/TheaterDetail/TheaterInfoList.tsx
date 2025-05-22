import React from 'react';
import { TheaterMockType } from '@/types/theatersMock';
import { format, parseISO } from 'date-fns';
import { tr } from 'date-fns/locale';
import Link from 'next/link';
import { CurtainsIcon, LabelIcon, TheaterMaskIcon, TimerIcon } from '@/components/Icons';
import CalendarIcon from '@/components/Icons/CalendarIcon';
import LocationIcon from '@/components/Icons/LocationIcon';

interface TheaterInfoListProps {
  theater: TheaterMockType;
}

/**
 * Tiyatro oyunu hakkında meta bilgileri gösteren komponent
 * Id Tiyatro, Trajedi & Dram, Tek Kişilik, Tek Perde / 60 Dakika, 24.11.2021, Alan Kadıköy  
 */
const TheaterInfoList: React.FC<TheaterInfoListProps> = ({ theater }) => {
  // Trajedi & Dram gibi kategorileri birleştir
  const categoryText = theater.categories.map(cat => cat.title).join(' & ');

  // Tarih formatını düzenle
  const formattedDate = theater.first_date ?
    format(parseISO(theater.first_date), 'dd.MM.yyyy', { locale: tr }) : '';

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 my-3 text-md">
      {/* Tiyatro Grupları */}
      <div className="flex items-center text-light-blue">
        {theater.theater_groups.map((group) => (
          <Link
            key={group.id}
            href={`/topluluk/${group.slug}`}
            className="flex items-center gap-1 text-light-blue hover:text-primary transition-colors"
          >
            <CurtainsIcon size={22} />
            <span>{group.title}</span>
          </Link>
        ))}
      </div>

      {/* Kategoriler */}
      {categoryText && (
        <Link
          href={`/kategori/${theater.categories[0]?.slug || ''}`}
          className="flex items-center gap-1 text-light-blue hover:text-primary transition-colors"
        >
          <TheaterMaskIcon size={22} />
          <span>{categoryText}</span>
        </Link>
      )}

      {/* Tiyatro Tipi (Tek Kişilik vs) */}
      {theater.type && (
        <div className="flex items-center gap-1 text-light-blue">
          <LabelIcon size={22} />
          <span>{theater.type}</span>
        </div>
      )}

      {/* Süre Bilgisi */}
      {theater.duration_info && (
        <div className="flex items-center gap-1 text-light-blue">
          <TimerIcon size={22} />
          <span>{theater.duration_info}</span>
        </div>
      )}

      {/* İlk Gösterim Tarihi */}
      {formattedDate && (
        <div className="flex items-center gap-1 text-light-blue">
          <CalendarIcon size={22} />
          <span>{formattedDate}</span>
        </div>
      )}

      {/* Lokasyon */}
      {theater.locations.map((location) => (
        <Link
          key={location.id}
          href={`/sahne/${location.slug}`}
          className="flex items-center gap-1 text-light-blue hover:text-primary transition-colors"
        >
          <LocationIcon size={22} />
          <span>{location.title}</span>
        </Link>
      ))}
    </div>
  );
};

export default TheaterInfoList;