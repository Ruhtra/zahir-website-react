import { useContext, useEffect, useMemo } from "react";
import { Profile } from "../../models/model";
import FilterContext from "./FilterContext";
import { FilterSearch } from "./FilterSearch";
import { FilterPromotion } from "./FilterPromotion";
import { FilterCategory } from "./FilterCategory";
import { FilterCategories } from "./FilterCategories";
import { FilterUf } from "./FilterUf";
import { useSearchParams } from "react-router-dom";

export function Filter() {
    const [searchParams, setSearchParams] = useSearchParams()
    const {data, onFilter} =  useContext(FilterContext)


    const filteredData: Profile[] = useMemo(() => {
        if (!data) return
        let filteredData = data;
            const search = searchParams.get('search')
            const promotion = searchParams.get('promotion') == 'true' ? true : false
            const category = searchParams.get('category')
            const uf = searchParams.get('uf')
            const categories = searchParams.get('categories')
                ? (
                    searchParams.get('categories').split(',')[0] != ''
                    ?  searchParams.get('categories').split(',')
                    : [])
                : []
        

            if (search) {            
            filteredData = filteredData.filter(e => e.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
            }
            if (promotion) {
                filteredData = filteredData.filter(e => Object.keys(e.promotion).length > 1);
            }
            if (category) {
                filteredData = filteredData.filter(e => e.category.type == category)
            }
            if (uf) {            
                filteredData = filteredData.filter(e => e.local.uf == uf)
            }
            
            if (categories.length > 0) {
                categories.forEach(category => {
                    filteredData = filteredData.filter(e => e.category.categories?.includes(category))
                })
            }
        
        return filteredData;
    }, [searchParams, data]);

    useEffect(() => {
        onFilter(filteredData)
    }, [filteredData]);

    return (
        <>
            <div>
                <FilterPromotion promotion={searchParams.get('promotion') == 'true'? true : false } onPromotionChange={setSearchParams} />
                <FilterSearch search={searchParams.get('search') ?? ''} onSearchChange={setSearchParams} />
                <FilterCategory category={searchParams.get('category') ?? ''} onCategoryChange={setSearchParams} />
                <FilterUf uf={searchParams.get("uf") ?? ''} onUfChange={setSearchParams} />
                <FilterCategories categories={searchParams.get('categories')} onCategoriesChange={setSearchParams} />
            </div>
        </>
    )
}