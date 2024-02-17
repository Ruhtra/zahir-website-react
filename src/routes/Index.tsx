import { createContext, useState } from "react";
import { Filter } from "../components/Filter/Filter";
import { Profiles } from "../components/Profiles/Profiles";
import { Profile } from "./model";
import { useQuery } from "react-query";
import axios from "axios";

interface contextProps {
    data?: Profile[];
    filtrado: Profile[];
}
export const ExampleContext = createContext<contextProps>({data: [], filtrado: []});

export function Index() {
    const { data } = useQuery<Profile[]>('profiles', async () => {
        const response = await axios.get<Profile[]>(
            `http://localhost:4000/api/profile/getlist`
        );                        
        
        return response.data
    })
    const [filtrado, setFiltrado] = useState<Profile[]>([])
    

    return (
        <>
        <ExampleContext.Provider value={{data, filtrado}}>
            <Filter setFiltrado={setFiltrado} />
            <Profiles />
        </ExampleContext.Provider>
        </>
    )
}