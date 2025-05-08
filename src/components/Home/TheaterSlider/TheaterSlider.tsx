import React from 'react';
import { theaterSliderService } from '@/services/theaterSliderService';
import TheaterSliderClient from './TheaterSliderClient';
import HomeHeading from '../HomeHeading';

export default async function TheaterSlider({
  className = ''
}) {
  // Server tarafında veri çekme işlemi
  const theaterSlides = await theaterSliderService.getTheaterSlides();

  return (
    <section className={`theater-slider py-8 ${className}`}>
      <div className="@container-normal mx-auto px-20">
        <HomeHeading
          title='Biletler için tiyatrolar.com.tr'
          description='Hizmet bedeli ödemeden, gişe ile aynı fiyat üzerinden online bilet alabileceğiniz tüm oyunlar'
          buttonTitle='Tüm Oyunlar'
          buttonLink='/tiyatrolar'
        />

        {/* Client component'i çağırıyoruz ve veriyi prop olarak geçiyoruz */}
        <TheaterSliderClient slides={theaterSlides} />
      </div>
    </section>
  );
}