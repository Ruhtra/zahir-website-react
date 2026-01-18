// import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import {
  Autoplay,
  EffectCoverflow,
  Keyboard,
  Navigation,
  Pagination,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Carousel.css";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Arrow } from "../../../assets/Icons/Icons";
import { Skeleton } from "@radix-ui/themes";
import { CarouselContext } from "../CarouselContext";

import { Country, State } from "country-state-city";
import { HomePage } from "../../../models/model";
export function Carousel() {
  const swiperRef = useRef(null);
  const { data, isLoading } = useContext(CarouselContext);

  // Estado para controlar se os dados estão realmente prontos
  const [isSwiperReady, setIsSwiperReady] = useState(false);

  // Efeito para monitorar quando os dados estão disponíveis
  useEffect(() => {
    if (data && data.length > 0) {
      // Pequeno delay para garantir que o DOM foi atualizado
      setTimeout(() => setIsSwiperReady(true), 100);
    }
  }, [data]);

  // Calcular o slide inicial
  const getInitialSlide = () => {
    if (!data || data.length === 0) return 0;
    return Math.floor(data.length / 2);
  };

  const getCountryName = (isoCode?: string) => {
    if (!isoCode) return null;
    const country = Country.getCountryByCode(isoCode);
    return country?.name || isoCode;
  };

  const getStateName = (countryCode?: string, stateCode?: string) => {
    if (!countryCode || !stateCode) return null;
    const state = State.getStateByCodeAndCountry(stateCode, countryCode);
    return state?.name || stateCode;
  };

  const getLocationString = (HomePage: HomePage) => {
    const profile = HomePage.profile;
    const country = getCountryName(profile.local?.country);
    const state = getStateName(profile.local?.country, profile.local?.uf);
    const city = profile.local?.city;

    if (!country) return null;

    if (city && state) {
      return `${country}, ${city}, ${state}`;
    } else if (state) {
      return `${country}, ${state}`;
    }
    return country;
  };

  return (
    <>
      {isLoading && (
        <Swiper
          effect={"coverflow"}
          loop={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 150,
            modifier: 1,
            scale: 1,
            slideShadows: false,
          }}
          watchSlidesProgress={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          spaceBetween={0}
          initialSlide={getInitialSlide()} // Usar função calculada
          pagination={true}
          navigation={false}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          onInit={(swiper) => {
            // Forçar atualização após inicialização
            swiper.update();
          }}
          keyboard={{
            enabled: true,
          }}
          modules={[
            Keyboard,
            EffectCoverflow,
            Pagination,
            Navigation,
            Autoplay,
          ]}
          className="mySwiper"
          key={data?.length} // Forçar re-render quando dados mudarem
        >
          {Array(1, 2, 3, 4, 5).map((e) => {
            return (
              <SwiperSlide className="swiper-slide" key={e}>
                <Link to={``} onClick={(e) => e.preventDefault()}>
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
            );
          })}

          <div className="buttons">
            <Skeleton loading={isLoading}>
              <div
                className="left"
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <Arrow
                  className="icon icon-arrow"
                  fillColor="purple"
                  side="left"
                />
              </div>
            </Skeleton>
            <Skeleton loading={isLoading}>
              <div
                className="rigth"
                onClick={() => swiperRef.current?.slideNext()}
              >
                <Arrow
                  className="icon icon-arrow"
                  fillColor="purple"
                  side="rigth"
                />
              </div>
            </Skeleton>
          </div>
        </Swiper>
      )}

      {isSwiperReady && (
        <Swiper
          effect={"coverflow"}
          loop={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 150,
            modifier: 1,
            scale: 1,
            slideShadows: false,
          }}
          watchSlidesProgress={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          spaceBetween={0}
          initialSlide={getInitialSlide()} // Usar função calculada
          pagination={true}
          navigation={false}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          onInit={(swiper) => {
            // Forçar atualização após inicialização
            swiper.update();
          }}
          keyboard={{
            enabled: true,
          }}
          modules={[
            Keyboard,
            EffectCoverflow,
            Pagination,
            Navigation,
            Autoplay,
          ]}
          className="mySwiper"
          key={data?.length} // Forçar re-render quando dados mudarem
        >
          {data?.map((e) => {
            return (
              <SwiperSlide className="swiper-slide" key={e.profile._id}>
                <Link to={`/profile/${e.profile._id}`}>
                  <div className="card">
                    {e.profile.promotion.active && (
                      <div className="promotion">
                        <div className="text">{e.profile.promotion.title}</div>
                      </div>
                    )}

                    <div className="informations">
                      <span className="name">{e.profile.name}</span>
                      <span className="local">
                        {/* fix this code for "e.local" in backendreturn */}
                        {getLocationString(e)}
                      </span>
                    </div>
                    <img src={e.profile.picture} />
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}

          <div className="buttons">
            <Skeleton loading={isLoading}>
              <div
                className="left"
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <Arrow
                  className="icon icon-arrow"
                  fillColor="purple"
                  side="left"
                />
              </div>
            </Skeleton>
            <Skeleton loading={isLoading}>
              <div
                className="rigth"
                onClick={() => swiperRef.current?.slideNext()}
              >
                <Arrow
                  className="icon icon-arrow"
                  fillColor="purple"
                  side="rigth"
                />
              </div>
            </Skeleton>
          </div>
        </Swiper>
      )}
    </>
  );
}
