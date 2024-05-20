import { useContext } from "react"
import FilterContext from "./FilterContext"
import { SetURLSearchParams } from "react-router-dom";
interface CategoriesProps {
    categories: string
    onCategoriesChange: SetURLSearchParams;
}

export function FilterCategories({ categories, onCategoriesChange }: CategoriesProps) {
            const {data} = useContext(FilterContext)

            const categoriesSelected = categories
            ? (
                categories.split(',')[0] != ''
                ?  categories.split(',')
                : [])
            : []
    
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
                onCategoriesChange((params) => {
                    params.set('categories', updatedCategoriesSelected.join(','))
                    return params
                })
            }

    return (
        <div className="itenss categories scroll-style">
            {
            [...new Set(data?.flatMap(item => item.category.categories || []))].sort().sort().map((category, index) => (
                <button key={index} className="mybtn">
                <input
                        type="checkbox"
                        id={category}
                        name={category}
                        checked={categoriesSelected.includes(category) ? true : false}
                        onChange={handleCategories}
                    />
                    <label htmlFor={category}>{category}</label>
                </button>
            ))
            }
        </div>
    )
}