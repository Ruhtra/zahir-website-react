import { createContext } from "react";
import { HomePage } from "../../models/model";
import { useCarousel } from "../../services/Querys/HomePage";

export interface CarouselContextType {
    data?: HomePage[];
    isLoading?: boolean
}

export const CarouselContext = createContext<CarouselContextType>({} as CarouselContextType);
export function CarouselProvider({ children }) {
    
    const { data, isLoading } = useCarousel(true)
    return (
        <CarouselContext.Provider value={{ data, isLoading }}>
            {children}
        </CarouselContext.Provider>
    )
}