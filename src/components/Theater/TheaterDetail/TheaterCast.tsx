import React, { FC } from 'react';
import { TheaterMockType } from '@/types/theatersMock';
import ContributerItem from '@/components/Contributer/ContributerItem';

interface TheaterCastProps {
  theater: TheaterMockType;
  limit?: number;
}

/**
 * Tiyatro oyuncuları ve ekibini gösteren bileşen
 */
const TheaterCast: FC<TheaterCastProps> = ({ theater, limit }) => {
  // Oyuncuları ve ekibi ayır
  const actors = theater.cast.filter(item => item.role === 1);
  const contributer = theater.cast.filter(item => item.role === 2);

  // Limitleme işlemi (isteğe bağlı)
  const displayedActors = limit ? actors.slice(0, limit) : actors;
  const displayedContributer = limit ? contributer.slice(0, limit) : contributer;

  // Tüm görüntülenen kadrolar ve devamı olup olmadığı
  const hasMoreActors = actors.length > displayedActors.length;
  const hasMoreContributer = contributer.length > displayedContributer.length;

  return (
    <div className="mt-8">
      {/* Oyuncular */}
      {displayedActors.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-secondary mb-4">Oyuncular</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {displayedActors.map(actor => (
              <ContributerItem
                key={actor.id}
                name={actor.name}
                slug={actor.slug}
                image={actor.image || '/images/avatar-placeholder.jpg'}
                role={actor.role}
                role_title={actor.role_title}
              />
            ))}
          </div>

          {hasMoreActors && (
            <div className="text-center mt-4">
              <button className="text-primary hover:text-secondary transition-colors font-semibold">
                Tüm Oyuncuları Gör
              </button>
            </div>
          )}
        </div>
      )}

      {/* Ekip */}
      {displayedContributer.length > 0 && (
        <>
          <hr className='text-gray-300 mt-10' />
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-secondary mb-4">Sahne Arkası</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-6">
              {displayedContributer.map(member => (
                <ContributerItem
                  key={member.id}
                  name={member.name}
                  slug={member.slug}
                  image={member.image || '/images/avatar-placeholder.jpg'}
                  role={member.role}
                  role_title={member.role_title}
                />
              ))}
            </div>

            {hasMoreContributer && (
              <div className="mt-4 -ml-4">
                <button className="text-secondary text-md rounded-xl hover:bg-[#f1f7ff] px-4 py-2 transition-all font-semibold underline cursor-pointer">
                  Sahne Arkası Tüm Kadro
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TheaterCast;