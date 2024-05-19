import { createContext } from "react";
import { HomePage } from "../../models/model";

export interface IntexContextProps {
    data?: HomePage[];
    isLoading?: boolean
}
const CarouselContext = createContext<IntexContextProps>({
    data: [],
    isLoading: null
});
export default CarouselContext;