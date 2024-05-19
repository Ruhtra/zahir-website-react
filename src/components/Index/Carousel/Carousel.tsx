// import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Autoplay, EffectCoverflow, Keyboard, Navigation, Pagination } from 'swiper/modules';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './Carousel.css'
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Arrow } from "../../../assets/Icons/Icons";
import { Skeleton } from "@radix-ui/themes";
import CarouselContext from '../IndexContext';



export function Carousel() {
    const swiperRef = useRef(null)
    const {data, isLoading} =  useContext(CarouselContext)

    return <>
    {
        // isLoading ? <Loading /> :
        <Swiper
            effect={'coverflow'}
            loop={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 150,
                modifier: 1,
                scale: 1,
                slideShadows: false,
            }}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            spaceBetween={0}
            initialSlide={data ? Math.floor(data.length / 2) : 0}
            // spaceBetween={-20}
            pagination={true}
            navigation={false}
            onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
            }}
            keyboard={{
                enabled: true,
            }}
            modules={[Keyboard, EffectCoverflow, Pagination, Navigation, Autoplay]}
            className="mySwiper"
            
        >
            {
                isLoading ? Array(1,2,3,4,5).map(e => {
                    return (
                        <SwiperSlide className="swiper-slide" key={e}>
                            
                        <Link to={``} onClick={(e) => e.preventDefault()} >
                        <Skeleton loading={true}>
                            <div className="card">
                                <div className="promotion">
                                    <div className="text"></div>
                                </div>
                                <div className="informations">
                                    <span className="name"></span>
                                    <span className="local"> - </span>
                                </div>
                                <img src={""} />
                            </div>
                        </Skeleton>
                        </Link>
                    </SwiperSlide>
                    )
                })
                : data?.map(e => {
                    return (
                        <SwiperSlide className="swiper-slide" key={e.profile._id}>
                            
                            <Link to={`/profile/${e.profile._id}`} >
                                <div className="card">
                                    <div className="promotion">
                                        <div className="text">{e.profile.promotion.title}</div>
                                    </div>
                                    <div className="informations">
                                        <span className="name">{e.profile.name}</span>
                                        <span className="local">{e.profile.local.uf} - {e.profile.local.city}</span>
                                    </div>
                                    <img src={e.profile.picture} />
                                </div>
                            </Link>
                        </SwiperSlide>
                    )
                })
            }
            
            <div className="buttons">
                <Skeleton loading={isLoading}>
                <div className="left" onClick={() => swiperRef.current?.slidePrev()}>
                    <Arrow className="icon icon-arrow" fillColor="purple" side="left" />
                </div>
                </Skeleton>
                <Skeleton loading={isLoading}>
                <div className="rigth" onClick={() => swiperRef.current?.slideNext()}>
                    <Arrow className="icon icon-arrow" fillColor="purple" side="rigth" />
                </div>
                </Skeleton>
            </div>
        </Swiper>
        }
</>
}