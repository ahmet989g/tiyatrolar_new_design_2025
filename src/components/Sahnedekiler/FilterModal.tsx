// src/components/Sahnedekiler/FilterModal.tsx
"use client";

import React, { FC, useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, addMonths, subMonths } from 'date-fns';
import { tr } from 'date-fns/locale';
import { ChevronLeftIcon, ChevronRightIcon, CurtainsIcon, FavoriteIcon, StarIcon, TheaterMaskIcon } from '@/components/Icons';
import FilterRadioCard from './FilterRadioCard';
import Checkbox from '../ui/Checkbox';

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

  // Takvim için gerekli state'ler
  const [currentDate, setCurrentDate] = useState(new Date());
  const [nextMonthDate, setNextMonthDate] = useState(addMonths(new Date(), 1));
  const [selectedDateRange, setSelectedDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: filters.startDate,
    endDate: filters.endDate,
  });

  // initialFilters değiştiğinde state'i güncelle
  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
      setSelectedDateRange({
        startDate: initialFilters.startDate,
        endDate: initialFilters.endDate,
      });
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

  // Tarih seçimini güncelle
  const handleDateSelection = (date: Date) => {
    setSelectedDateRange(prev => {
      // Henüz başlangıç tarihi seçilmemişse veya bitiş tarihi seçilmişse
      if (!prev.startDate || prev.endDate) {
        return {
          startDate: date,
          endDate: null,
        };
      }

      // Başlangıç tarihi seçilmiş, bitiş tarihi seçilmemişse
      // ve seçilen tarih başlangıç tarihinden önce veya aynı ise
      if (date <= prev.startDate) {
        return {
          startDate: date,
          endDate: null,
        };
      }

      // Başlangıç tarihi seçilmiş, bitiş tarihi seçilmemişse
      // ve seçilen tarih başlangıç tarihinden sonra ise
      return {
        startDate: prev.startDate,
        endDate: date,
      };
    });

    // Filtreleri güncelle
    setFilters(prev => ({
      ...prev,
      startDate: selectedDateRange.startDate,
      endDate: selectedDateRange.endDate,
    }));
  };

  // Önceki aya git
  const goToPreviousMonth = () => {
    setCurrentDate(prevDate => subMonths(prevDate, 1));
    setNextMonthDate(prevDate => subMonths(prevDate, 1));
  };

  // Sonraki aya git
  const goToNextMonth = () => {
    setCurrentDate(prevDate => addMonths(prevDate, 1));
    setNextMonthDate(prevDate => addMonths(prevDate, 1));
  };

  // Bir gün için sınıf belirle
  const getDayClass = (day: Date) => {
    const isSelected =
      (selectedDateRange.startDate && isSameDay(day, selectedDateRange.startDate)) ||
      (selectedDateRange.endDate && isSameDay(day, selectedDateRange.endDate)) ||
      (selectedDateRange.startDate &&
        selectedDateRange.endDate &&
        day > selectedDateRange.startDate &&
        day < selectedDateRange.endDate);

    const isRangeStart = selectedDateRange.startDate && isSameDay(day, selectedDateRange.startDate);
    const isRangeEnd = selectedDateRange.endDate && isSameDay(day, selectedDateRange.endDate);

    let dayClasses = "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold cursor-pointer";

    if (isToday(day)) {
      dayClasses += " border border-secondary";
    }

    if (isSelected) {
      dayClasses += " bg-secondary text-white";
    } else {
      dayClasses += " hover:bg-secondary hover:text-white";
    }

    if (isRangeStart) {
      dayClasses += " rounded-l-full";
    }

    if (isRangeEnd) {
      dayClasses += " rounded-r-full";
    }

    if (isRangeStart && isRangeEnd) {
      dayClasses += " rounded-full";
    }

    return dayClasses;
  };

  // Filtreleri temizle
  const handleClearFilters = () => {
    setFilters({
      list: 'new',
      theaterType: 'private',
      startDate: null,
      endDate: null,
      cities: [],
      categories: [],
    });
    setSelectedDateRange({
      startDate: null,
      endDate: null,
    });
  };

  // Filtreleri uygula
  const handleApplyFilters = () => {
    // Güncelleme: son tarih seçimi state'i filtrelere ekle
    const updatedFilters = {
      ...filters,
      startDate: selectedDateRange.startDate,
      endDate: selectedDateRange.endDate,
    };
    onApplyFilters(updatedFilters);
    onClose();
  };

  // Aktif filtre sayısını hesapla
  const getActiveFilterCount = () => {
    let count = 0;

    // Default olmayan liste seçilmişse
    if (filters.list !== 'new') count++;

    // Default olmayan tiyatro türü seçilmişse
    if (filters.theaterType !== 'private') count++;

    // Tarih seçilmişse
    if (selectedDateRange.startDate) count++;

    // Şehirler seçilmişse
    if (filters.cities.length > 0) count += filters.cities.length;

    // Kategoriler seçilmişse
    if (filters.categories.length > 0) count += filters.categories.length;

    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  // Takvim oluşturma fonksiyonu
  const renderCalendar = (currentMonth: Date) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // Ayın ilk gününün haftanın hangi günü olduğunu belirle (Pazartesi: 1, Pazar: 7)
    const firstDayOfMonth = monthStart.getDay() || 7;

    // Boş günler için dizi oluştur
    const emptyDays = Array.from({ length: firstDayOfMonth - 1 }, (_, i) => i);

    return (
      <div className="calendar">
        <div className="month-header flex justify-center items-center mb-4">
          <h3 className="text-center font-semibold text-secondary">
            {format(currentMonth, 'LLLL yyyy', { locale: tr })}
          </h3>
        </div>
        <div className="days-header grid grid-cols-7 text-center mb-1">
          <div className="day font-medium text-xs text-gray-500">Pzt</div>
          <div className="day font-medium text-xs text-gray-500">Sal</div>
          <div className="day font-medium text-xs text-gray-500">Çar</div>
          <div className="day font-medium text-xs text-gray-500">Per</div>
          <div className="day font-medium text-xs text-gray-500">Cum</div>
          <div className="day font-medium text-xs text-gray-500">Cts</div>
          <div className="day font-medium text-xs text-gray-500">Pz</div>
        </div>
        <div className="days-grid grid grid-cols-7 gap-1">
          {/* Ayın ilk gününden önceki boş günler */}
          {emptyDays.map(i => (
            <div key={`empty-${i}`} className="empty-day"></div>
          ))}

          {/* Ayın günleri */}
          {monthDays.map(day => (
            <button
              key={day.toString()}
              type="button"
              onClick={() => handleDateSelection(day)}
              className={getDayClass(day) + " text-secondary"}
              aria-label={format(day, 'd MMMM yyyy', { locale: tr })}
            >
              {format(day, 'd')}
            </button>
          ))}
        </div>
      </div>
    );
  };

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
          <div className="relative">
            {/* Ay değiştirme butonları */}
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={goToPreviousMonth}
                className="absolute left-0 -top-1 p-1 cursor-pointer rounded-full text-secondary hover:text-primary transition-colors"
              >
                <ChevronLeftIcon size={20} />
              </button>
              <div className="flex-grow"></div>
              <button
                type="button"
                onClick={goToNextMonth}
                className="absolute right-0 -top-1 p-1 cursor-pointer rounded-full text-secondary hover:text-primary transition-colors"
              >
                <ChevronRightIcon size={20} />
              </button>
            </div>

            {/* İki aylık takvim */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>{renderCalendar(currentDate)}</div>
              <div>{renderCalendar(nextMonthDate)}</div>
            </div>
          </div>
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