import React from 'react'
import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import { FacebookIcon, InstagramIcon, XIcon, YoutubeIcon } from '@/components/Icons';

const Footer = () => {

  const footerLinks = {
    kurumsal: [
      { name: 'Hakkımızda', path: '/hakkimizda' },
      { name: 'İletişim', path: '/iletisim' },
      { name: 'İş Ortağımız Olun', path: '/is-ortagimiz-olun' },
      { name: 'Yazar Menşeliği', path: '/yazar-menseligi' },
      { name: 'Logo Kullanımları', path: '/logo-kullanimlari' },
      { name: 'Reklam & İş Birlikleri', path: '/reklam-is-birlikleri' },
    ],
    destek: [
      { name: 'Müşteri Hizmetleri', path: '/musteri-hizmetleri' },
      { name: 'Biletiniz Hakkında', path: '/biletiniz-hakkinda' },
      { name: 'Üyeliğiniz Hakkında', path: '/uyeliginiz-hakkinda' },
      { name: 'Premium Hesap Hakkında', path: '/premium-hesap-hakkinda' },
      { name: 'Sıkça Sorulan Sorular', path: '/sikca-sorulan-sorular' },
    ],
    sozlesmeler: [
      { name: 'Satış Sözleşmesi', path: '/satis-sozlesmesi' },
      { name: 'Kullanım Sözleşmesi', path: '/kullanim-sozlesmesi' },
      { name: 'Çerez Politikaları', path: '/cerez-politikalari' },
      { name: 'Kişisel Verilerin Korunması', path: '/kisisel-verilerin-korunmasi' },
    ],
  };

  return (
    <footer className="bg-slate-50 border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo ve açıklama */}
          <div>
            <Logo />
          </div>

          {/* Kurumsal */}
          <div>
            <h3 className="text-secondary font-semibold mb-4">Kurumsal</h3>
            <ul className="space-y-2">
              {footerLinks.kurumsal.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.path}
                    className="text-light-blue hover:text-primary text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destek */}
          <div>
            <h3 className="text-secondary font-semibold mb-4">Destek</h3>
            <ul className="space-y-2">
              {footerLinks.destek.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.path}
                    className="text-light-blue hover:text-primary text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sözleşmeler & Politikalar */}
          <div>
            <h3 className="text-secondary font-semibold mb-4">Sözleşmeler & Politikalar</h3>
            <ul className="space-y-2">
              {footerLinks.sozlesmeler.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.path}
                    className="text-light-blue hover:text-primary text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bizi Takip Edin */}
          <div>
            <h3 className="text-secondary font-semibold mb-4">Bizi Takip Edin</h3>
            <div className="flex space-x-4">
              {/* Sosyal medya ikonları */}
              <a href="https://www.instagram.com/tiyatrolar" className="text-light-blue hover:text-primary" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <InstagramIcon size={24} />
              </a>
              <a href="https://x.com/tiyatrolarcomtr" className="text-light-blue hover:text-primary" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <XIcon size={24} />
              </a>
              <a href="https://www.facebook.com/tiyatrolarcomtr" className="text-light-blue hover:text-primary" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <FacebookIcon size={24} />
              </a>
              <a href="https://www.youtube.com/channel/UCa67WYMxMyQNtRogsxxXBnA" className="text-light-blue hover:text-primary" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                <YoutubeIcon size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Alt kısım - telif hakkı */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-light-blue text-xs">
          <p>© {new Date().getFullYear()} - 2023 tiyatrolar.com.tr | Tiyatrolar Bilgi Teknolojileri Yazılım Pazarlama ve Tic. Ltd. Şti. Her Hakkı Saklıdır.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer