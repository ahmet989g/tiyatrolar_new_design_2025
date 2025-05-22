"use client";

import React from 'react';
import { FavoriteIcon, HelpIcon, PlusIcon, ShareIcon, StarIcon, VisibilityIcon } from '@/components/Icons';
import { usePathname, useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

interface TheaterActionButtonsProps {
  theaterId: string;
  theaterTitle: string;
  isFavorite?: boolean;
  isFollow?: boolean;
  isWatchlist?: boolean;
}

/**
 * Tiyatro detay sayfasında aksiyonları gösteren butonlar
 * İzledim, Listeme Ekledim, Favorilere Ekle, Paylaş, Siz de Değerlendirin
 */
const TheaterActionButtons: React.FC<TheaterActionButtonsProps> = ({
  theaterId,
  theaterTitle,
  isFavorite = false,
  isFollow = false,
  isWatchlist = false,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  // Buton aksiyonları (mock edilmiş, gerçek fonksiyonlar değil)
  const handleWatchedClick = () => {
    alert('İzledim butonuna tıklandı');
  };

  const handleWishlistClick = () => {
    alert('Listeme Ekledim butonuna tıklandı');
  };

  const handleFavoriteClick = () => {
    alert('Favorilere Ekle butonuna tıklandı');
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: theaterTitle,
        text: `${theaterTitle} tiyatro oyunu hakkında bilgiler ve bilet satışı`,
        url: `https://tiyatrolar.com.tr${pathname}`,
      }).catch(console.error);
    } else {
      alert('Bu tarayıcıda paylaşım özelliği kullanılamıyor');
    }
  };

  const handleRateClick = () => {
    // Değerlendirme formuna yönlendir veya modal aç
    alert('Değerlendirme butonuna tıklandı');
  };

  return (
    <div className="flex items-center space-x-4 mb-2 md:mb-0">
      <div className="flex items-center gap-1">
        <button
          type="button"
          className="text-secondary hover:text-primary transition-colors font-semibold text-md flex item-center gap-1 cursor-pointer"
          onClick={handleWishlistClick}
          aria-label="Oyunu takibe al"
        >
          <PlusIcon size={24} />
          <span className="underline">Oyunu takibe al</span>
        </button>
        <button type="button" className="text-secondary hover:text-primary transition-colors cursor-pointer"><HelpIcon size={20} className="relative -top-0.5" /></button>
      </div>

      {/* Favorilere Ekle butonu */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          className="text-secondary hover:text-primary transition-colors font-semibold text-md flex item-center gap-1 cursor-pointer"
          onClick={handleFavoriteClick}
          aria-label="Favorime ekle"
        >
          <FavoriteIcon size={24} />
          <span className="underline">Favorime ekle</span>
        </button>
      </div>

      {/* Oyunu İzledim butonu */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          className="text-secondary hover:text-primary transition-colors font-semibold text-md flex item-center gap-1 cursor-pointer"
          onClick={handleWatchedClick}
          aria-label="Oyunu İzledim"
        >
          <VisibilityIcon size={24} />
          <span className="underline">Oyunu İzledim</span>
        </button>
      </div>

      {/* Oyunu İzledim butonu */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          className="text-secondary hover:text-primary transition-colors font-semibold text-md flex item-center gap-1 cursor-pointer"
          onClick={handleShareClick}
          aria-label="Oyunu İzledim"
        >
          <ShareIcon size={24} className="relative bottom-0.5" />
          <span className="underline">Paylaş</span>
        </button>
      </div>

      {/* Siz de Değerlendirin butonu */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          className="text-secondary hover:text-primary transition-colors font-semibold text-md flex item-center gap-1 cursor-pointer"
          onClick={handleShareClick}
          aria-label="Oyunu İzledim"
        >
          <StarIcon size={24} />
          <span className="underline">Siz de Değerlendirin</span>
        </button>
      </div>

    </div>
  );
};

export default TheaterActionButtons;