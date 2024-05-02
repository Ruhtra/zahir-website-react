import { useContext } from "react"
import FilterContext from "./FilterContext"
import { SetURLSearchParams } from "react-router-dom";

interface CategoryProps {
    category: string
    onCategoryChange: SetURLSearchParams;
}

export function FilterCategory({ category, onCategoryChange }: CategoryProps) {
    const {data} =  useContext(FilterContext)

    
    const categorySelected = category
    ? (
        category.split(',')[0] != ''
        ?  category.split(',')
        : [])
    : []


    function handleCategory(e: React.ChangeEvent<HTMLInputElement>) {

        const categoryName = e.target.name;
        const isChecked = e.target.checked;
    
        let updatedCategorySelected = [ ...categorySelected ];
    
        if (isChecked) {
            if (!categorySelected.includes(categoryName))
                updatedCategorySelected.push(categoryName)
        } else {        
            if (categorySelected.includes(categoryName))
                updatedCategorySelected = updatedCategorySelected.filter(e => e !== categoryName);
        }

        // Atualize o estado da Category selecionadas com a cópia atualizada
        onCategoryChange((params) => {
            params.set('category', updatedCategorySelected.join(','))
            return params;
        })
    }
    return (
        <div className="itenss">
            {
            [...new Set(data?.flatMap(item => item.category.type || []))].sort().sort().map((category, index) => (
                <button key={index} className="mybtn">
                <input
                        type="checkbox"
                        id={category}
                        name={category}
                        checked={categorySelected.includes(category) ? true : false}
                        onChange={handleCategory}
                    />
                    <label htmlFor={category}>{category}</label>
                </button>
            ))
            }
        </div>
    )
}