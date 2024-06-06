import { createContext, useEffect, useState } from "react";
import { Profile } from "../../models/model";
import { useProfiles } from "../../services/Querys/Profiles";

export interface FilterContextType {
    data?: Profile[];
    isLoading: boolean
    filtrado: Profile[]
    onFilter: (filtered: Profile[]) => void;
}
export const FilterContext = createContext<FilterContextType>({} as FilterContextType);

export function FilterProvider({ children }) {
    const [filtrado, setFiltrado] = useState<Profile[]>([])
    const { data, isLoading } = useProfiles()

    useEffect(() => {
        if (data) setFiltrado(data)
    }, [data])

    const handleFilter = (filtered: Profile[]) => {
        setFiltrado(filtered);
    };
    return (
        <FilterContext.Provider value={{ data, isLoading, filtrado, onFilter: handleFilter }}>
            { children }
        </FilterContext.Provider>
    )
}