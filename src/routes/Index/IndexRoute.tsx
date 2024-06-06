import { BackToTop } from "../../components/BackToTop/BackToTop";
import { Carousel } from "../../components/Index/Carousel/Carousel";
import { Followers } from "../../components/Index/Followers/Followers";
import { Info } from "../../components/Index/Info/Info";
import { Reviews } from "../../components/Index/Reviews/Reviews";
import { CarouselProvider } from "../../components/Index/CarouselContext";
import { Title } from "../../components/Index/Title/Title";
import PageTitle from "../../components/PageTitle";

export function Index() {

    return (
        <>
            <PageTitle title={"Zahir"} />

            <CarouselProvider>
                <Title />

                <Carousel />

                <Info />

                <Followers />

                <Reviews />

                <BackToTop />
            </CarouselProvider>
        </>
    )
}