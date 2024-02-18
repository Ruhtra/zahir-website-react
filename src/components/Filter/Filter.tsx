import { useContext, useEffect, useMemo, useState } from "react";
import { Profile } from "../../models/model";
import FilterContext from "./FilterContext";
import { FilterSearch } from "./FilterSearch";
import { FilterPromotion } from "./FilterPromotion";
import { FilterCategory } from "./FilterCategory";
import { FilterCategories } from "./FilterCategories";

export function Filter() {
    const {data, onFilter} =  useContext(FilterContext)

    const [search, setSearch] =  useState("");
    const [promotion, setPromotion] =  useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categoriesSelected, setCategoriesSelected] = useState([])


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
                <FilterPromotion onPromotionChange={setPromotion} />
                <FilterSearch onSearchChange={setSearch} />
                <FilterCategory onCategoryChange={setSelectedCategory} />
                <FilterCategories onCategoriesChange={setCategoriesSelected} />
            </div>
        </>
    )
}