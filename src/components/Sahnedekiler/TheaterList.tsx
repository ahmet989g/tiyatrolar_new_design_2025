import React from 'react';
import { TheaterItem } from '@/types/theaterItem';
import TheaterListItem from '@/components/Theater/TheaterListItem';

interface TheaterListProps {
  theaters: TheaterItem[];
}

const TheaterList: React.FC<TheaterListProps> = ({ theaters }) => {
  if (!theaters || theaters.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Gösterilecek oyun bulunamadı.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {theaters.map((theater, index) => (
        <TheaterListItem key={index} {...theater} />
      ))}
    </div>
  );
};

export default TheaterList;