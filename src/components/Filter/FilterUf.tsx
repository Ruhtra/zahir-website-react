import { useContext } from "react";
import FilterContext from "./FilterContext";
import { SetURLSearchParams } from "react-router-dom";

interface UfProps {
    uf: string;
    onUfChange: SetURLSearchParams;
}

export function FilterUf({ uf, onUfChange }: UfProps) {
    const {data} =  useContext(FilterContext)

    
    const ufSelected = uf
    ? (
        uf.split(',')[0] != ''
        ?  uf.split(',')
        : [])
    : []


    function handleUf(e: React.ChangeEvent<HTMLInputElement>) {
        const ufName = e.target.name;
        const isChecked = e.target.checked;
    
        let updatedUfSelected = [ ...ufSelected ];
    
        if (isChecked) {
            if (!ufSelected.includes(ufName))
                updatedUfSelected.push(ufName)
        } else {        
            if (ufSelected.includes(ufName))
                updatedUfSelected = updatedUfSelected.filter(e => e !== ufName);
        }
    
        // Atualize o estado da uf selecionadas com a cópia atualizada
        onUfChange((params) => {
            params.set('uf', updatedUfSelected.join(','))
            return params;
        })
    }

    return (
        <div className="itenss">
            {
            [...new Set(data?.flatMap(item => item.local.uf || []))].sort().sort().map((uf, index) => (
                <button key={index} className="mybtn">
                <input
                        type="checkbox"
                        id={uf}
                        name={uf}
                        checked={ufSelected.includes(uf) ? true : false}
                        onChange={handleUf}
                    />
                    <label htmlFor={uf}>{uf}</label>
                </button>
            ))
            }
        </div>
    )
}