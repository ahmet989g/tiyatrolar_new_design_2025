import React from 'react';
import { TheaterMockType } from '@/types/theatersMock';
import { TicketIcon } from '@/components/Icons';
import Link from 'next/link';
import GradientButton from '@/components/ui/GradientButton';
import CalendarIcon from '@/components/Icons/CalendarIcon';

interface TheaterSessionsListProps {
  theater: TheaterMockType;
  isSticky?: boolean;
}

/**
 * Tiyatro seanslarını gösteren bileşen
 */
const TheaterSessionsList: React.FC<TheaterSessionsListProps> = ({ theater, isSticky = false }) => {
  if (!theater.sessions || theater.sessions.length === 0) {
    return null;
  }

  // Sessionları durumlarına göre grupla
  const availableSessions = theater.sessions.filter(session => session.status === 1);
  const soldOutSessions = theater.sessions.filter(session => session.status === 2);
  const cancelledSessions = theater.sessions.filter(session => session.status === 3);

  // Durum CSS sınıfları
  const statusClasses = {
    available: "bg-blue-50 border-blue-200 text-blue-800",
    soldOut: "bg-red-50 border-red-200 text-red-800",
    cancelled: "bg-gray-50 border-gray-200 text-gray-800"
  };

  // Durum etiket metinleri
  const statusLabels = {
    1: { text: "Satışta", className: "bg-green-500" },
    2: { text: "Tükendi", className: "bg-red-500" },
    3: { text: "İptal", className: "bg-gray-500" }
  };

  return (
    <div className={`p-6 bg-white rounded-xl shadow-[0px_0px_10px_2px_rgba(0,_0,_0,_0.1)] ${isSticky ? "sticky top-4" : ""}`}>
      <h2 className="text-2xl font-semibold text-secondary mb-4">Güncel Seanslar</h2>

      <div className="space-y-3">
        {/* Mevcut seanslar */}
        {theater.sessions.map(session => (
          <div
            key={session.id}
            className="relative border rounded-lg"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold text-secondary text-md">{session.session_date}</div>
                {session.status === 1 && (
                  <div className="text-md text-light-blue">{session.location}</div>
                )}
                {(session.session_detail && session.status === 1) && (
                  <div className="text-sm font-medium text-primary mt-1">{session.session_detail}</div>
                )}
                {session.status === 2 && (
                  <div className="text-sm font-medium text-red-500 mt-1">BİLETLER TÜKENMİŞTİR!</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 -ml-2 text-left w-max">
        <Link
          href='/'
          className="flex items-center gap-2 text-secondary hover:bg-[#f1f7ff] font-semibold text-md p-2 rounded-xl underline transition-all"
        >
          <CalendarIcon size={20} />
          Tüm Seanslar
        </Link>
      </div>

      <div className="mt-4 text-center">
        <GradientButton
          href='/'
          text="Bilet Al"
          className="!rounded-4xl"
        />
      </div>
    </div>
  );
};

export default TheaterSessionsList;