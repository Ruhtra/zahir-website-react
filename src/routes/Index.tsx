import { Profiles } from "../components/Profiles/Profiles";
import { Profile } from "./model";
import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";


export function Index() {
    const { data } = useQuery<Profile[]>('profiles', async () => {
        const response = await axios.get<Profile[]>(
            `http://localhost:4000/api/profile/getlist`
        );                        
        
        return response.data
    })
    const filtrado = data ? [...data] : []

    const [search, setSearch] = useState('')
    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value);
    }
    const [promotion, setPromotion] = useState(false)
    function handlePromotion() {
        setPromotion(!promotion)


    }

    const newfilter = filtrado.filter(e => e.name.toLocaleLowerCase().includes(search.toLowerCase()))
    const filterdofilter = newfilter.filter(e => {
        if (promotion) return Object.keys(e.promotion).length > 1
        else return true
    })

    return (
        <>
            <input type="checkbox" checked={promotion} onChange={handlePromotion} />
            <input type="search" value={search} onChange={handleSearch}/>

            <Profiles data={data} filtrado={filterdofilter} />
        </>
    )
}