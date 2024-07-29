import { Profiles } from "../../components/Profiles/Profiles";
import { Filter } from "../../components/Filter/Filter";
import { FilterProvider } from "../../components/Filter/FilterContext";
import PageTitle from "../../components/PageTitle";

import './ProfilesRoute.css'


export function ProfilesRoute() {
 

    return (
        <>
            <PageTitle title={"Perfis"} />
            <FilterProvider>
                <div className="profilesRoutesPage">
                    <Filter />
                    <Profiles />
                </div>
            </FilterProvider>
          
        </>
    )
}