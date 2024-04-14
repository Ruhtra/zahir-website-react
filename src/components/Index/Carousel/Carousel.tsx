import { useCarousel } from "../../../services/Querys/HomePage"
import { Loading } from "../../Loading/Loading";

// import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { EffectCoverflow, Keyboard, Navigation, Pagination } from 'swiper/modules';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './Carousel.css'
import { useRef } from "react";
import { ArrowIcon } from "../../../assets/Icons/Arrow";
import { Link } from "react-router-dom";

export function Carousel() {
    const { data, isLoading } = useCarousel(true)
    const swiperRef = useRef(null)

    return <>{
        isLoading ? <Loading /> :
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
                modules={[Keyboard, EffectCoverflow, Pagination, Navigation]}
                className="mySwiper"

            >
                {
                    data?.map(e => {
                        return (
                            <SwiperSlide key={e.profile._id}>
                                <Link to={`/profile/${e.profile._id}`} style={{all: "inherit"}} >
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
                        <div className="left" onClick={() => swiperRef.current?.slidePrev()}>
                            <ArrowIcon />
                        </div>
                        <div className="rigth" onClick={() => swiperRef.current?.slideNext()}>
                            <ArrowIcon />
                        </div>
                    </div>
            </Swiper>
    }
    </>
}