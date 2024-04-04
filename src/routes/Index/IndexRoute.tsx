import { Loading } from "../../components/Loading/Loading";   
import { useCarousel } from "../../services/Querys/HomePage";
import { useRecents } from "../../services/Querys/Profiles";

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css'

// import required modules
import { EffectCoverflow, Keyboard, Navigation, Pagination } from 'swiper/modules';

export function Index() {
    const {data, isLoading} = useCarousel(true)
    const {data: dataRecents, isLoading: isLoadingRecents} = useRecents()
    

    return (
        <>
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
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
            // spaceBetween={-20}
            pagination={true}
            navigation={true}
            keyboard={{
                enabled: true,
              }}
            modules={[Keyboard, EffectCoverflow, Pagination, Navigation]}
            className="mySwiper"
            
        >
            <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
            </SwiperSlide>
            <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
            </SwiperSlide>
            <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
            </SwiperSlide>
            <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
            </SwiperSlide>
            <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
            </SwiperSlide>
            <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
            </SwiperSlide>
            <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
            </SwiperSlide>
            <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
            </SwiperSlide>
            <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
            </SwiperSlide>
        </Swiper>


        <h1>Carousel</h1>
            {isLoading && <Loading />}
             {
                data?.map(e => {
                    return <h1 key={e.profile._id}>{e.profile._id}</h1>
                })
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