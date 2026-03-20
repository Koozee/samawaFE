"use client"

import React, { Children } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Props = { children: React.ReactNode, swiperClassName: string, swiperSliderClassName: string }

export default function Slider({ children, swiperClassName, swiperSliderClassName }: Props) {
    const childArray = Children.toArray(children);

    return (
        <Swiper
            a11y={true}
            centeredSlides={true}
            slidesPerView="auto"
            spaceBetween={16}
            modules={[Navigation, Pagination, Autoplay, A11y]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className={swiperClassName}
        >
            {childArray.map((item: any, index: number) => (
                <SwiperSlide key={index} className={swiperSliderClassName}>{item}</SwiperSlide>
            ))}
            {childArray.map((item: any, index: number) => (
                <SwiperSlide key={index} className={swiperSliderClassName}>{item}</SwiperSlide>
            ))}
        </Swiper>
    )
}