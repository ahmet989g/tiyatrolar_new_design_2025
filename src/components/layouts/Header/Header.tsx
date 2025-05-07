import React from 'react';
import Navbar from '@/components/layouts/Navbar';
import Logo from '@/components/ui/Logo';
import SearchBar from '@/components/ui/SearchBar';
import Button from '@/components/ui/Button';
import { AccountCircleIcon, HandshakeIcon, LoginIcon } from '@/components/Icons';

const Header = () => {
  return (
    <header className="w-full shadow-sm">
      <div className="@container-normal mx-auto px-20 py-4">
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
      <Navbar />
    </header>
  )
}

export default Header;