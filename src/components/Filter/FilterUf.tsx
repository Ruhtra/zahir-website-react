import { useContext } from "react";
import FilterContext from "./FilterContext";
import { SetURLSearchParams } from "react-router-dom";

interface UfProps {
    uf: string;
    onUfChange: SetURLSearchParams;
}

export function FilterUf({ uf, onUfChange }: UfProps) {
    const {data} =  useContext(FilterContext)


    function handleUf(e: React.ChangeEvent<HTMLSelectElement>) {
        onUfChange((params) => {
            params.set('uf', e.target.value)
            return params;
        })
    }

    return (
        <select value={uf} onChange={handleUf}>
            <option value="">Todos</option>
            {
                data?.map(e => e.local.uf)
                    .filter((value, index, self) => self.indexOf(value) === index) 
                    .map(a => (
                        <option key={a} value={a}>{a}</option>
                    ))
            }
        </select>
    )
}