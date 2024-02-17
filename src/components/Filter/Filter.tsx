import React, { useContext, useState } from "react"
import { ExampleContext } from "../../routes/Index";
import { Profile } from "../../routes/model";


export interface propsFilter {
    setFiltrado: React.Dispatch<React.SetStateAction<Profile[]>>
}
export function Filter({ setFiltrado }: propsFilter) {
    const { data } = useContext(ExampleContext)

    const [search, setSearch] =  useState("");
    const [promotion, setPromotion] =  useState(false);

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value)
        if (data && e.target.value)
            setFiltrado(data.filter(a => a.name.toLowerCase().includes(e.target.value.toLowerCase())))
        else setFiltrado([])
    }

    function handlePromotion(e: React.ChangeEvent<HTMLInputElement>) {
        setPromotion(e.target.checked)
        if (data) {
            console.log(data);
            
            if (!promotion) setFiltrado(data.filter(a => a.promotion.description))
            else setFiltrado(data)
        }
       
    }

    return (
        <>
        <div>
            <input type="checkbox" checked={promotion} onChange={handlePromotion} />
            <input type="search" value={search} onChange={handleSearch}/>
        </div>
        </>
    )
}