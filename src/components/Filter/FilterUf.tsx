import { useContext, useState } from "react";
import FilterContext from "./FilterContext";

interface UfProps {
    onUfChange: (uf: string) => void;
}

export function FilterUf({ onUfChange }: UfProps) {
    const {data} =  useContext(FilterContext)

    const [selectedUf, setSelectedUf] = useState("");

    function handleUf(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedUf(e.target.value);
        onUfChange(e.target.value)
    }

    return (
        <select value={selectedUf} onChange={handleUf}>
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