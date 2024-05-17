import { Profiles } from "../components/Profiles/Profiles";
import { Profile } from "../models/model";
import { useEffect, useState } from "react";
import { Filter } from "../components/Filter/Filter";
import FilterContext from "../components/Filter/FilterContext";
import { useProfiles } from "../services/Querys/Profiles";


export function ProfilesRoute() {
    const [filtrado, setFiltrado] = useState([])
    const { data, isLoading } = useProfiles()

    useEffect(() => {
        if (data) setFiltrado(data)
    }, [data])

    const handleFilter = (filtered: Profile[]) => {
        setFiltrado(filtered);
    };

    return (
        <>
            <FilterContext.Provider value={{data, onFilter: handleFilter}}>
                <Filter isLoading={isLoading} />
                <Profiles filtrado={filtrado} isLoading={isLoading} />
            </FilterContext.Provider>
          
        </>
    )
}