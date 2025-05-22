import React from 'react';

interface TheaterHeaderProps {
  title: string;
  isNew?: boolean;
}

/**
 * Tiyatro detay sayfası başlığını gösteren komponent
 * 
 * @param title Tiyatro oyunu başlığı
 * @param isNew Yeni oyun olup olmadığı bilgisi
 */
const TheaterHeader: React.FC<TheaterHeaderProps> = ({ title, isNew = false }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-secondary leading-tight">
          {title}
        </h1>

        {isNew && (
          <span className="bg-primary text-white px-3 py-2 text-xs font-semibold rounded-full whitespace-nowrap">
            YENİ OYUN
          </span>
        )}
      </div>
    </div>
  );
};

export default TheaterHeader;