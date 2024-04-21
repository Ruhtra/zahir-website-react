

import { useRecents } from "../../../services/Querys/Profiles";
import { Loading } from "../../Loading/Loading";

import './Reviews.css'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Navigation } from 'swiper/modules';


export function Reviews() {
    const { data: dataRecents, isLoading: isLoadingRecents } = useRecents()

    return (<>
        
        <div className="reviews">
            <div className="grid">
                {isLoadingRecents ? <Loading /> :
                    dataRecents?.map(e => {
                        return <div key={e._id} className="movie">
                            <div className="inside">
                                <iframe src={e.movie} width="320px" height="610px" style={{border: "none"}} scrolling="no" loading="lazy"></iframe>
                            </div>
                        </div>
                    })
                }
            </div>
            <div className="carousel" style={{display: "none"}}>
                {isLoadingRecents ? <Loading /> :
                    <Swiper
                        slidesPerView={'auto'}
                        navigation={true}
                        centeredSlides={true}
                        // spaceBetween={"20px"}
                        grabCursor={true}
                        freeMode={false}
                        // pagination={true}
                        modules={[Navigation]}
                        loop={true}
                        initialSlide={dataRecents ? Math.floor(dataRecents.length / 2) : 0}
                        className="eeee"
                    >
                        {
                            dataRecents?.map((e) => {
                                return (
                                    <SwiperSlide key={e._id} className="movie">
                                            <div className="inside">
                                                <iframe src={e.movie} style={{border: "none"}} scrolling="no" loading="lazy"></iframe>
                                            </div>
                                    </SwiperSlide>
                                )
                            })
                            
                        }
                    </Swiper>
                }
            </div>
        </div>      
    </>)
}