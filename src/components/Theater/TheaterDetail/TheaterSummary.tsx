import React from 'react';
import { TheaterMockType } from '@/types/theatersMock';

interface TheaterSummaryProps {
  theater: TheaterMockType;
}

/**
 * Tiyatro oyun özeti bileşeni
 */
const TheaterSummary: React.FC<TheaterSummaryProps> = ({ theater }) => {
  return (
    <div className="">
      <h2 className="text-2xl font-semibold text-secondary mb-4">Oyun Özeti</h2>

      <div
        className="prose prose-sm max-w-none text-text text-md"
        dangerouslySetInnerHTML={{ __html: theater.description }}
      />

      {theater.description.length > 500 && (
        <button
          className="mt-4 text-md font-semibold text-secondary hover:text-primary transition-colors focus:outline-none cursor-pointer underline"
        >
          Özetin Devamı
        </button>
      )}
    </div>
  );
};

export default TheaterSummary;