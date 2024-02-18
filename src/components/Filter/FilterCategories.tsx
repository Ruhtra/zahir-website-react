import { useContext, useState } from "react"
import FilterContext from "./FilterContext"
interface CategoriesProps {
    onCategoriesChange: (categories: string[]) => void;
}

export function FilterCategories({ onCategoriesChange }: CategoriesProps) {
        const {data} = useContext(FilterContext)
        const [categoriesSelected, setCategoriesSelected] = useState([])

        function handleCategories(e: React.ChangeEvent<HTMLInputElement>) {
            const categoryName = e.target.name;
            const isChecked = e.target.checked;
        
            let updatedCategoriesSelected = [ ...categoriesSelected ];
        
            if (isChecked) {
                if (!categoriesSelected.includes(categoryName))
                    updatedCategoriesSelected.push(categoryName)
            } else {        
                if (categoriesSelected.includes(categoryName))
                    updatedCategoriesSelected = updatedCategoriesSelected.filter(e => e !== categoryName);
            }
        
            // Atualize o estado das categorias selecionadas com a cópia atualizada
            setCategoriesSelected(updatedCategoriesSelected);
            onCategoriesChange(updatedCategoriesSelected)
        }
        

    return (
        <div>
            <h2>categories</h2>
            <div className="listCategories">
            {
            [...new Set(data?.flatMap(item => item.category.categories || []))].sort().sort().map((category, index) => (
                <div key={index}>
                <input
                        type="checkbox"
                        id={category}
                        name={category}
                        checked={categoriesSelected.includes(category) ? true : false}
                        onChange={handleCategories}
                    />
                    <label htmlFor={category}>{category}</label>
                </div>
            ))
            }

            </div>
        </div>
    )
}