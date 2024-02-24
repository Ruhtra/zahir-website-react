import { useContext } from "react"
import FilterContext from "./FilterContext"
import { SetURLSearchParams } from "react-router-dom";

interface CategoryProps {
    category: string
    onCategoryChange: SetURLSearchParams;
}

export function FilterCategory({ category, onCategoryChange }: CategoryProps) {
    const {data} =  useContext(FilterContext)

    function handleCategory(e: React.ChangeEvent<HTMLSelectElement>) {
        onCategoryChange((params) => {
            params.set('category', e.target.value)
            return params
        })

    }
    return (
        <select value={category} onChange={handleCategory}>
            <option value="">Todos</option>
            {
                data?.map(e => e.category.type)
                    .filter((value, index, self) => self.indexOf(value) === index) 
                    .map(a => (
                        <option key={a} value={a}>{a}</option>
                    ))
            }
        </select>
    )
}