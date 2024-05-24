import { Skeleton } from "@radix-ui/themes";
import { BackToTop } from "../../components/BackToTop/BackToTop";
import { Carousel } from "../../components/Index/Carousel/Carousel";
import { Followers } from "../../components/Index/Followers/Followers";
import CarouselContext from "../../components/Index/IndexContext";
import { Info } from "../../components/Index/Info/Info";
import { Reviews } from "../../components/Index/Reviews/Reviews";
import { useCarousel } from "../../services/Querys/HomePage";

import './IndexRoute.css'
import PageTitle from "../../components/PageTitle";

export function Index() {
    const { data, isLoading } = useCarousel(true)

    // const responseMessage = (response) => {
    //     console.log(response);
    // };
    // const errorMessage = (error) => {
    //     console.log(error);
    // };

    return (
        <>
            <PageTitle title={"Zahir"} />

            {/* <div>
                <h2>React Google Login</h2>
                <br />
                <br />
                <GoogleLogin onSuccess={responseMessage} onError={() => console.log("error") } />
            </div> */}

            <CarouselContext.Provider value={{data, isLoading}}>

            {/* optimize skeleton */}
            <Skeleton loading={isLoading}>
                <h1 className={`titulo ${isLoading ? '' : 'stroke'}`}> Promoções </h1>
            </Skeleton>

            <Carousel />

            <Info />
            
            <Followers />

            <Reviews />   

            <BackToTop /> 
        </CarouselContext.Provider>
        </>
    )
}