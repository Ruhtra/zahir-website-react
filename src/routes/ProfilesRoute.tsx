import { Profiles } from "../components/Profiles/Profiles";
import { Filter } from "../components/Filter/Filter";
import { FilterProvider } from "../components/Filter/FilterContext";
import PageTitle from "../components/PageTitle";


export function ProfilesRoute() {
 

    return (
        <>
            <PageTitle title={"Perfis"} />
            <FilterProvider>
                <Filter />
                <Profiles />
            </FilterProvider>
          
        </>
    )
}