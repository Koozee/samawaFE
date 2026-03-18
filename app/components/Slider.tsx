"use client"

import React, { Children } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Props = { children: React.ReactNode, swiperClassName: string, swiperSliderClassName: string }

export default function Slider({ children, swiperClassName, swiperSliderClassName }: Props) {
    return (
        <Swiper a11y={true} loop={true} centeredSlides={true} modules={[Navigation, Pagination, A11y]} navigation={true} pagination={{ clickable: true, dynamicBullets: true }} className={swiperClassName}>
            {Children.toArray(children).map((item: any, index: number) => (
                <SwiperSlide key={index} className={swiperSliderClassName}>{item}</SwiperSlide>
            ))}
        </Swiper>
    )
}