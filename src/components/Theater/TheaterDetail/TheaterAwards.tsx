import React from 'react';
import { TheaterMockType } from '@/types/theatersMock';
import { AwardStarIcon } from '@/components/Icons';
import Link from 'next/link';

interface TheaterAwardsProps {
  theater: TheaterMockType;
}

/**
 * Tiyatro ödüllerini gösteren bileşen
 */
const TheaterAwards: React.FC<TheaterAwardsProps> = ({ theater }) => {
  if (!theater.awards || theater.awards.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold text-secondary mb-4">Ödüller</h2>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {theater.awards.map((award, index) => (
          <Link
            href={`/oduller/${award.id || index}`}
            key={award.id || index}
            className="bg-white rounded-lg p-4 border border-gray-300 text-secondary hover:text-primary transition-all duration-300 hover:border-current"
          >
            <AwardStarIcon size={32} />
            <h3 className="font-semibold text-md mt-2">{award.title}</h3>
            <p className="text-light-blue text-md font-medium">{award.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TheaterAwards;
