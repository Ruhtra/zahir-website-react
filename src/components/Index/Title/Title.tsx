import { Skeleton } from "@radix-ui/themes";
import { useContext } from "react";
import { CarouselContext } from "../CarouselContext";

import TitlePromotion from "../../../assets/titlePromotion.svg?react";
import './Title.css'

export function Title() {
    const { isLoading } = useContext(CarouselContext)

    return (
        <Skeleton loading={isLoading}>
            <TitlePromotion className="titulo" />
        </Skeleton>
    )
}