'use client';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { CamperDetails } from '@/types/types';
import Image from 'next/image';
import css from './Gallery.module.css';
interface GalleryProps {
  camper: CamperDetails;
}

export default function Gallery(info: GalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const gallery = info.camper.gallery;

  return (
    <div className={css.swiperWrap}>
      <Swiper
        loop={true}
        spaceBetween={10}
        slidesPerView={1}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {gallery.map(item => {
          return (
            <SwiperSlide className={css.img} key={item.id}>
              <Image
                src={item.original}
                alt={item.camperId}
                fill
                sizes="100%"
                style={{ objectFit: 'cover' }}
                loading={'eager'}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={32}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
        style={{ objectFit: 'cover' }}
      >
        {gallery.map(item => {
          return (
            <SwiperSlide className={css.thumb} key={item.id}>
              <Image
                src={item.thumb}
                alt={item.camperId}
                fill
                style={{ objectFit: 'cover' }}
                sizes="136px"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
