"use client";

import React, { FC } from 'react';
import Navbar from '@/components/layouts/Navbar';
import Logo from '@/components/ui/Logo';
import SearchBar from '@/components/ui/SearchBar';
import Button from '@/components/ui/Button';
import { AccountCircleIcon, HandshakeIcon, LoginIcon } from '@/components/Icons';
import { useScrollDirection } from '@/hooks/useScrollDirection';

interface HeaderProps {
  containerClassName?: string;
}

const Header: FC<HeaderProps> = ({
  containerClassName = '@container-normal mx-auto px-20'
}) => {
  const { scrollDirection, isAtTop } = useScrollDirection(50);

  // Header state'leri
  const shouldShowFullHeader = isAtTop || scrollDirection === 'up';

  return (
    <header className={`fixed bg-white z-50 w-full shadow-sm transition-transform duration-400 ease-in-out ${shouldShowFullHeader ? 'translate-y-0' : '-translate-y-[78px]'}`}>
      <div className={`${containerClassName} py-4`}>
        <div className="flex items-center justify-between flex-wrap md:flex-nowrap">
          <div className="flex-shrink-0">
            <Logo />
          </div>
          <div className="absolute left-0 right-0 mx-auto flex-grow max-w-sm md:max-w-md lg:max-w-lg order-3 w-full md:w-auto md:order-none mt-4 md:mt-0">
            <SearchBar placeholder="Oyun, tür, sanatçı, sahne, şehir, galeri arayın" />
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="text-dark" className="text-sm font-semibold !px-3"><HandshakeIcon className="mr-1" size={22} /> İş Ortağımız Olun</Button>
            <Button variant="text-dark" className="text-sm font-semibold !px-3"><LoginIcon className="mr-1" size={22} /> Giriş Yap</Button>
            <Button variant="text-dark" className="text-sm font-semibold !px-3 !pr-0"><AccountCircleIcon className="mr-1" size={22} /> Üye Ol</Button>
          </div>
        </div>
      </div>
      <Navbar containerClassName={containerClassName} />
    </header>
  )
}

export default Header;