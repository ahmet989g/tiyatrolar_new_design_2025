"use client";

import React, { useState, useEffect } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isToday,
  addMonths,
  subMonths
} from 'date-fns';
import { tr } from 'date-fns/locale';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/Icons';

interface DateRangeProps {
  selectedDateRange: {
    startDate: Date | null;
    endDate: Date | null;
  };
  onDateRangeChange: (dateRange: { startDate: Date | null; endDate: Date | null }) => void;
  className?: string;
}

const DateRange: React.FC<DateRangeProps> = ({
  selectedDateRange,
  onDateRangeChange,
  className = '',
}) => {
  // Takvim için gerekli state'ler
  const [currentDate, setCurrentDate] = useState(new Date());
  const [nextMonthDate, setNextMonthDate] = useState(addMonths(new Date(), 1));
  const [internalDateRange, setInternalDateRange] = useState({
    startDate: selectedDateRange.startDate,
    endDate: selectedDateRange.endDate,
  });

  // Prop değiştiğinde internal state'i güncelle
  useEffect(() => {
    setInternalDateRange({
      startDate: selectedDateRange.startDate,
      endDate: selectedDateRange.endDate,
    });
  }, [selectedDateRange]);

  // Tarih seçimini güncelle
  const handleDateSelection = (date: Date) => {
    const newDateRange = { ...internalDateRange };

    // Henüz başlangıç tarihi seçilmemişse veya bitiş tarihi seçilmişse
    if (!newDateRange.startDate || newDateRange.endDate) {
      newDateRange.startDate = date;
      newDateRange.endDate = null;
    }
    // Başlangıç tarihi seçilmiş, bitiş tarihi seçilmemişse
    // ve seçilen tarih başlangıç tarihinden önce veya aynı ise
    else if (date <= newDateRange.startDate) {
      newDateRange.startDate = date;
      newDateRange.endDate = null;
    }
    // Başlangıç tarihi seçilmiş, bitiş tarihi seçilmemişse
    // ve seçilen tarih başlangıç tarihinden sonra ise
    else {
      newDateRange.endDate = date;
    }

    setInternalDateRange(newDateRange);
    onDateRangeChange(newDateRange);
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
            {format(currentMonth, 'MMMM yyyy', { locale: tr })}
          </h3>
        </div>
        <div className="days-header grid grid-cols-7 text-center mb-2">
          <div className="day font-semibold text-xs text-light-blue">Pzt</div>
          <div className="day font-semibold text-xs text-light-blue">Sal</div>
          <div className="day font-semibold text-xs text-light-blue">Çar</div>
          <div className="day font-semibold text-xs text-light-blue">Per</div>
          <div className="day font-semibold text-xs text-light-blue">Cum</div>
          <div className="day font-semibold text-xs text-light-blue">Cts</div>
          <div className="day font-semibold text-xs text-light-blue">Pz</div>
        </div>

        <div className="calendar-grid">
          <div className="grid grid-cols-7 gap-0">
            {/* Ayın ilk gününden önceki boş günler */}
            {emptyDays.map(i => (
              <div key={`empty-${i}`} className="h-10 w-full"></div>
            ))}

            {/* Ayın günleri */}
            {monthDays.map((day) => {
              const isStartDate = internalDateRange.startDate && isSameDay(day, internalDateRange.startDate);
              const isEndDate = internalDateRange.endDate && isSameDay(day, internalDateRange.endDate);
              const isInRange = internalDateRange.startDate && internalDateRange.endDate &&
                day >= internalDateRange.startDate && day <= internalDateRange.endDate;
              const isSelected = isStartDate || isEndDate;
              const isDayToday = isToday(day);

              // Arka plan ve sınır durumları için sınıflar
              let cellClasses = "relative h-10 w-full flex items-center justify-center";
              let dayClasses = "absolute inset-auto flex items-center justify-center text-sm font-semibold";

              // Tarih aralığının içindeyse gri arka plan ekle
              if (isInRange) {
                cellClasses += " bg-gray-100";
              }

              // Eğer başlangıç günüyse sol tarafı yuvarla
              if (isStartDate && internalDateRange.endDate) {
                cellClasses += " rounded-l-full";
              }

              // Eğer bitiş günüyse sağ tarafı yuvarla
              if (isEndDate) {
                cellClasses += " rounded-r-full";
              }

              // Seçili günler için yuvarlak arka plan ve text rengi
              if (isSelected) {
                dayClasses += " bg-secondary text-white rounded-full w-10 h-10";
              } else {
                dayClasses += " text-secondary hover:bg-gray-200 rounded-full w-10 h-10 cursor-pointer";
              }

              // Bugün için özel stil
              if (isDayToday && !isSelected) {
                dayClasses += " border border-secondary";
              }

              return (
                <div
                  key={day.toString()}
                  className={cellClasses}
                  onClick={() => handleDateSelection(day)}
                >
                  <div className={dayClasses}>
                    {format(day, 'd')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`date-range-container relative ${className}`}>
      {/* Ay değiştirme butonları */}
      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={goToPreviousMonth}
          className="absolute left-0 -top-0.5 p-1 rounded-full text-secondary hover:text-primary cursor-pointer"
          aria-label="Önceki ay"
        >
          <ChevronLeftIcon size={20} />
        </button>
        <button
          type="button"
          onClick={goToNextMonth}
          className="absolute right-0 -top-0.5 p-1 rounded-full text-secondary hover:text-primary cursor-pointer"
          aria-label="Sonraki ay"
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
  );
};

export default DateRange;