"use client";

import React, { FC, useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { CurtainsIcon, FavoriteIcon, StarIcon, TheaterMaskIcon } from '@/components/Icons';
import FilterRadioCard from './FilterRadioCard';
import Checkbox from '../ui/Checkbox';
import DateRange from '../ui/DateRange';

// Mock veri - gerçek uygulamada bu veriler bir API'dan gelebilir
const CITIES = [
  { id: '1', name: 'İstanbul' },
  { id: '2', name: 'Ankara' },
  { id: '3', name: 'İzmir' },
  { id: '4', name: 'Bursa' },
  { id: '5', name: 'Adana' },
  { id: '6', name: 'Antalya' },
];

const CATEGORIES = [
  { id: '1', name: 'Trajedi & Dram' },
  { id: '2', name: 'Komedi' },
  { id: '3', name: 'Deneysel & Absürd' },
  { id: '4', name: 'Müzikal & Kabare' },
  { id: '5', name: 'Gösteri' },
];

const LISTS = [
  { id: 'new', name: 'Sezonun Yenileri', description: 'Yeni sezona başlayan tüm oyunlara göz atın', icon: <StarIcon /> },
  { id: 'ongoing', name: 'Sahnedekiler', description: 'Sahnelenmeye devam eden tüm oyunlara göz atın', icon: <CurtainsIcon /> },
  { id: 'popular', name: 'Puana Göre', description: 'Seyircilerin en çok beğendiği oyunlara göz atın', icon: <FavoriteIcon /> },
];

const THEATER_TYPES = [
  { id: 'private', name: 'Özel Tiyatrolar', description: 'Yeni sezona başlayan tüm oyunlara göz atın', icon: <TheaterMaskIcon /> },
  { id: 'state', name: 'Devlet Tiyatroları', description: 'Sahnelenmeye devam eden tüm oyunlara göz atın', icon: <TheaterMaskIcon /> },
  { id: 'city', name: 'Şehir Tiyatroları', description: 'Seyircilerin en çok beğendiği oyunlara göz atın', icon: <FavoriteIcon /> },
];

export interface FilterValues {
  list: string;
  theaterType: string;
  startDate: Date | null;
  endDate: Date | null;
  cities: string[];
  categories: string[];
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFilters?: FilterValues;
  onApplyFilters: (filters: FilterValues) => void;
}

const FilterModal: FC<FilterModalProps> = ({
  isOpen,
  onClose,
  initialFilters,
  onApplyFilters,
}) => {
  // Yerel filtre state'i
  const [filters, setFilters] = useState<FilterValues>({
    list: initialFilters?.list || 'new',
    theaterType: initialFilters?.theaterType || '',
    startDate: initialFilters?.startDate || null,
    endDate: initialFilters?.endDate || null,
    cities: initialFilters?.cities || [],
    categories: initialFilters?.categories || [],
  });

  // initialFilters değiştiğinde state'i güncelle
  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
    }
  }, [initialFilters]);

  // Liste seçimini güncelle
  const handleListChange = (listId: string) => {
    setFilters(prev => ({
      ...prev,
      list: listId,
    }));
  };

  // Tiyatro türü seçimini güncelle
  const handleTheaterTypeChange = (typeId: string) => {
    setFilters(prev => ({
      ...prev,
      theaterType: typeId,
    }));
  };

  // Şehir seçimini güncelle
  const handleCityChange = (cityId: string) => {
    setFilters(prev => {
      if (prev.cities.includes(cityId)) {
        return {
          ...prev,
          cities: prev.cities.filter(id => id !== cityId),
        };
      } else {
        return {
          ...prev,
          cities: [...prev.cities, cityId],
        };
      }
    });
  };

  // Kategori seçimini güncelle
  const handleCategoryChange = (categoryId: string) => {
    setFilters(prev => {
      if (prev.categories.includes(categoryId)) {
        return {
          ...prev,
          categories: prev.categories.filter(id => id !== categoryId),
        };
      } else {
        return {
          ...prev,
          categories: [...prev.categories, categoryId],
        };
      }
    });
  };

  // Tarih aralığı değişimi
  const handleDateRangeChange = (dateRange: { startDate: Date | null; endDate: Date | null }) => {
    setFilters(prev => ({
      ...prev,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    }));
  };

  // Filtreleri temizle
  const handleClearFilters = () => {
    setFilters({
      list: 'new',
      theaterType: '',
      startDate: null,
      endDate: null,
      cities: [],
      categories: [],
    });
  };

  // Filtreleri uygula
  const handleApplyFilters = () => {
    if (onApplyFilters) {
      onApplyFilters(filters);
    }
    onClose();
  };

  // Aktif filtre sayısını hesapla
  const getActiveFilterCount = () => {
    let count = 0;

    // Default olmayan liste seçilmişse
    if (filters.list !== 'new') count++;

    // Default olmayan tiyatro türü seçilmişse
    if (filters.theaterType) count++;

    // Tarih seçilmişse
    if (filters.startDate) count++;

    // Şehirler seçilmişse
    if (filters.cities.length > 0) count += filters.cities.length;

    // Kategoriler seçilmişse
    if (filters.categories.length > 0) count += filters.categories.length;

    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Filtreler"
      contentClassName="w-full"
      size="3xl"
      showCloseButton={true}
    >
      <div className="divide-y divide-gray-200">
        {/* Listeler */}
        <div className="pb-4">
          <h3 className="text-base font-semibold text-primary mb-3">Listeler</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {LISTS.map(list => (
              <FilterRadioCard
                key={list.id}
                className={`border border-primary ${filters.list === list.id ? 'bg-primary text-white' : 'text-primary'}`}
                title={list.name}
                description={list.description}
                isSelected={filters.list === list.id}
                onClick={() => handleListChange(list.id)}
                iconComponent={list.icon} />
            ))}
          </div>
        </div>

        {/* Tiyatro Türü */}
        <div className="py-4">
          <h3 className="text-base font-semibold text-primary mb-3">Tiyatro Türü</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {THEATER_TYPES.map(type => (
              <FilterRadioCard
                key={type.id}
                className={`border border-secondary ${filters.theaterType === type.id ? 'bg-secondary text-white' : 'text-secondary'}`}
                title={type.name}
                description={type.description}
                isSelected={filters.list === type.id}
                onClick={() => handleTheaterTypeChange(type.id)}
                iconComponent={type.icon} />
            ))}
          </div>
        </div>

        {/* Takvim */}
        <div className="py-4">
          <h3 className="text-base font-semibold text-primary mb-3">Takvim</h3>
          <DateRange
            selectedDateRange={{
              startDate: filters.startDate,
              endDate: filters.endDate,
            }}
            onDateRangeChange={handleDateRangeChange}
          />
        </div>

        {/* Şehirler */}
        <div className="py-4">
          <h3 className="text-base font-semibold text-primary mb-3">Şehirler</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {CITIES.map(city => (
              <Checkbox
                key={city.id}
                label={city.name}
                isChecked={filters.cities.includes(city.id)}
                onChange={() => handleCityChange(city.id)}
              />
            ))}
          </div>
        </div>

        {/* Kategoriler */}
        <div className="py-4">
          <h3 className="text-base font-semibold text-primary mb-3">Kategoriler</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {CATEGORIES.map(category => (
              <Checkbox
                key={category.id}
                label={category.name}
                isChecked={filters.categories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
              />
            ))}
          </div>
        </div>

        {/* Aktif filtre sayısı ve butonlar */}
        <div className="pt-4 flex items-center justify-between">
          <Button
            variant="text-dark"
            onClick={handleClearFilters}
            disabled={activeFilterCount === 0}
            className="text-gray-500"
          >
            Tümünü sil
          </Button>

          <Button
            onClick={handleApplyFilters}
            className="px-6 rounded-xl"
          >
            {activeFilterCount > 0 ? (
              <>Filtreleri Uygula ({activeFilterCount})</>
            ) : (
              <>Filtreleri Uygula</>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default FilterModal;