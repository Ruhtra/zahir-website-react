import { Loading } from "../../components/Loading/Loading";
import { useCarousel } from "../../services/Querys/HomePage";
import { useRecents } from "../../services/Querys/Profiles";

// import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './IndexRoute.css'

// import required modules
import { EffectCoverflow, Keyboard, Navigation, Pagination } from 'swiper/modules';

export function Index() {
    const { data, isLoading } = useCarousel(true)
    const { data: dataRecents, isLoading: isLoadingRecents } = useRecents()


    return (
        <>
            {
                isLoading ? <Loading /> :
                    <Swiper
                        effect={'coverflow'}
                        loop={true}
                        centeredSlides={true}
                        
                        slidesPerView={'auto'}
                        coverflowEffect={{
                            rotate: 40,
                            stretch: 40,
                            depth: 100,
                            modifier: .8,
                            scale: 0.8,
                            slideShadows: true,
                        }}
                        initialSlide={data ? Math.floor(data.length / 2) : 0}
                        // spaceBetween={-20}
                        pagination={true}
                        navigation={true}
                        keyboard={{
                            enabled: true,
                        }}
                        modules={[Keyboard, EffectCoverflow, Pagination, Navigation]}
                        className="mySwiper"

                    >
                        {
                            data?.map(e => {
                                return (
                                    <SwiperSlide>
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
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
            }

            <h1>Recents</h1>

            {isLoadingRecents && <Loading />}
            {
                dataRecents?.map(e => {
                    return <h1 key={e._id}>{e._id}</h1>
                })
            }
        </>
    )
}