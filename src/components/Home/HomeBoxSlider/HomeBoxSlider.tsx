// src/components/Home/HomeBoxSlider/HomeBoxSlider.tsx
import React from 'react';
import { sliderService } from '@/services/sliderService';
import HomeBoxSliderClient from './HomeBoxSliderClient';

export default async function HomeBoxSlider() {
  // Server tarafında veri çekme
  const slides = await sliderService.getHomeBoxSlides();

  return (
    <section className="home-box-slider py-8">
      <div className="@container-normal mx-auto px-20">
        {/* Client component'e veriyi geçme */}
        <HomeBoxSliderClient slides={slides} />
      </div>
    </section>
  );
}