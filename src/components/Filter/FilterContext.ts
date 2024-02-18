import { createContext } from "react";
import { Profile } from "../../models/model";

export interface FilterContextProps {
    data?: Profile[];
    onFilter: (filtered: Profile[]) => void;

    
}
const FilterContext = createContext<FilterContextProps>({
    data: [],
    onFilter: () => {}
});
export default FilterContext;