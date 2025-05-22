"use client"
import Link from 'next/link';
import React, { FC, useState } from 'react'
import { usePathname } from 'next/navigation';
import { FilterIcon } from '@/components/Icons';
import FilterModal from '@/components/Sahnedekiler/FilterModal';

interface NavbarProps {
  containerClassName?: string;
}

const Navbar: FC<NavbarProps> = ({
  containerClassName = '@container-normal px-20'
}) => {
  const pathname = usePathname();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const navItems = [
    { id: 1, name: 'Tiyatrolar', path: '/sahnedekiler' },
    { id: 2, name: 'Çocuk Tiyatroları', path: '/cocuk-tiyatrolari' },
    { id: 3, name: 'Sahneler', path: '/sahneler' },
    { id: 4, name: 'Atölyeler', path: '/atolyeler' },
    { id: 5, name: 'Oyun Metinleri', path: '/oyun-metinleri' },
    { id: 6, name: 'Arşiv', path: '/arsiv' },
    { id: 7, name: 'Topluluklar', path: '/topluluklar' },
    { id: 8, name: 'Ödüller', path: '/oduller' },
    { id: 9, name: 'Sergiler', path: '/sergiler' },
    { id: 10, name: 'Haberler', path: '/haberler' },
  ];

  const showFilterButton = pathname === '/sahnedekiler';
  const activeFilterCount = 3; // Örnek olarak aktif filtre sayısı

  return (
    <div className="border-t border-gray-100">
      <div className={`${containerClassName}`}>
        <nav className="flex items-center justify-between">
          <ul className="flex md:overflow-x-auto scrollbar-hide whitespace-nowrap gap-x-6">
            {navItems.map((item) => (
              <li key={item.id} className="py-3">
                <Link href={item.path} prefetch={true} className="text-sm font-semibold text-light-blue hover:text-primary transition-colors duration-200">{item.name}</Link>
              </li>
            ))}
          </ul>
          {/* Filtre Butonu */}
          {showFilterButton && (
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="relative flex items-center gap-1 px-3 py-1 text-sm font-semibold text-light-blue hover:text-primary transition-colors duration-200 rounded-full cursor-pointer"
            >
              <FilterIcon size={22} />
              Filtreler
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-2 inline-flex items-center justify-center w-5 h-5 text-xs text-white bg-primary rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </button>
          )}
        </nav>
      </div>

      {/* Filtre Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
      />
    </div>
  )
}

export default Navbar;