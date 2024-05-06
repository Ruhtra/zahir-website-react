import { BackToTop } from "../../components/BackToTop/BackToTop";
import { Carousel } from "../../components/Index/Carousel/Carousel";
import { Followers } from "../../components/Index/Followers/Followers";
import { Info } from "../../components/Index/Info/Info";
import { Reviews } from "../../components/Index/Reviews/Reviews";

import './IndexRoute.css'

export function Index() {
    return (
        <>
            <h1 className="titulo">Promoções</h1>

            <Carousel />

            <Info />
            
            <Followers />

            <Reviews />   

            <BackToTop /> 
        </>
    )
}