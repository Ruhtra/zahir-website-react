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
             <h1 className="titulo">Promoções</h1>
            {
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

            <div className="bloco">
                <div className="img">
                </div>
                    <div className="texto">
                    <div className="msg">
                    Oi, meu nome é Ramon Sanmir, tenho 34 anos e moro em Fortaleza, desde que eu era muito novo já gostava do meio artistico e internet no geral, com 12 anos fiz um canal no YouTube com amigos e depois comecei a gravar vídeos para as redes sociais, no tempo sem muito apoio e por ser novo acabei sem dar continuidade. Já vendi dindim alcoólico na praia para conseguir comprar meu computador e iniciar a vida na internet, tive alguns planos atrasados pela pandemia e comecei a fazer transmissões na twitch, após esse período tendo como única fonte de renda os jogos e streams, comecei a fazer conteúdo de experiências e estou me reiventando a cada dia.
                    </div>
                    </div>
            </div>

            <h1>Recents</h1>

            {/* {isLoadingRecents && <Loading />}
            {
                dataRecents?.map(e => {
                    return <h1 key={e._id}>{e._id}</h1>
                })
            } */}
        </>
    )
}