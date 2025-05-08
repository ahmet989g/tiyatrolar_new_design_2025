import Link from 'next/link';
import React, { FC } from 'react'

interface NavbarProps {
  containerClassName?: string;
}

const Navbar: FC<NavbarProps> = ({
  containerClassName = '@container-normal px-20'
}) => {

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

  return (
    <div className="border-t border-gray-100">
      <div className={`${containerClassName}`}>
        <nav className="">
          <ul className="flex md:overflow-x-auto scrollbar-hide whitespace-nowrap gap-x-6">
            {navItems.map((item) => (
              <li key={item.id} className="py-2">
                <Link href={item.path} prefetch={true} className="text-sm font-semibold text-light-blue hover:text-primary transition-colors duration-200">{item.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Navbar;