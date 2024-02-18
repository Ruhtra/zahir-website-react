import { Profiles } from "../components/Profiles/Profiles";
import { Profile } from "./model";
import { useEffect, useState } from "react";
import { Filter } from "../components/Filter/Filter";
import { useProfiles } from "../services/QueryClient";
import FilterContext from "../components/Filter/FilterContext";


export function Index() {
    const [filtrado, setFiltrado] = useState([])
    const { data, isFetching } = useProfiles()

    useEffect(() => {
        if (data) setFiltrado(data)
    }, [data])

    const handleFilter = (filtered: Profile[]) => {
        setFiltrado(filtered);
    };

    return (
        <>
            <FilterContext.Provider value={{data, onFilter: handleFilter}}>
                {isFetching && <p>loadinnng...</p>}

                <Filter />
                <Profiles filtrado={filtrado} />
            </FilterContext.Provider>
          
        </>
    )
}