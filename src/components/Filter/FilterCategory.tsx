import { useContext, useState } from "react"
import FilterContext from "./FilterContext"

interface CategoryProps {
    onCategoryChange: (category: string) => void;
}

export function FilterCategory({ onCategoryChange }: CategoryProps) {
    const {data} =  useContext(FilterContext)

    const [selectedCategory, setSelectedCategory] = useState("");

    function handleCategory(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedCategory(e.target.value);
        onCategoryChange(e.target.value)

    }
    return (
        <select value={selectedCategory} onChange={handleCategory}>
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