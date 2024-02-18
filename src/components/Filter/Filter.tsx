import { useContext, useEffect, useMemo, useState } from "react";
import { Profile } from "../../routes/model";
import FilterContext from "./FilterContext";

export function Filter() {
    const {data, onFilter} =  useContext(FilterContext)

    const [search, setSearch] =  useState("");
    const [promotion, setPromotion] =  useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categoriesSelected, setCategoriesSelected] = useState([])

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value)
    }
    function handlePromotion(e: React.ChangeEvent<HTMLInputElement>) {
        setPromotion(e.target.checked)
    }
    function handleCategory(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedCategory(e.target.value);
    }
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
    }
    

    const filteredData: Profile[] = useMemo(() => {
        let filteredData = data;
        if (search) {
          filteredData = filteredData.filter(e => e.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
        }
        if (promotion) {
          filteredData = filteredData.filter(e => Object.keys(e.promotion).length > 1);
        }
        if (selectedCategory) {
            filteredData = filteredData.filter(e => e.category.type == selectedCategory)
        }
        
        categoriesSelected.forEach(category => {
            filteredData = filteredData.filter(e => e.category.categories?.includes(category))
        })



        return filteredData;
    }, [search, promotion, selectedCategory, categoriesSelected, data]);
    


    useEffect(() => {
        onFilter(filteredData);
    }, [filteredData, onFilter]);


    return (
        <>
        <div>
            <input type="checkbox" checked={promotion} onChange={handlePromotion} />
            <input type="search" value={search} onChange={handleSearch}/>
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
        </div>
        </>
    )
}