import { Profiles } from "../components/Profiles/Profiles";
import { Profile } from "../models/model";
import { useEffect, useState } from "react";
import { Filter } from "../components/Filter/Filter";
import FilterContext from "../components/Filter/FilterContext";
import { Loading } from "../components/Loading/Loading";
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

    if (isLoading) return <Loading />

    return (
        <>
            <FilterContext.Provider value={{data, onFilter: handleFilter}}>
                <Filter />
                <Profiles filtrado={filtrado} />
            </FilterContext.Provider>
          
        </>
    )
}