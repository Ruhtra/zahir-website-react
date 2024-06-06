import { useContext, useEffect, useMemo } from "react";
import { Profile } from "../../models/model";
import { FilterSearch } from "./FilterSearch";
// import { FilterPromotion } from "./FilterPromotion";
import { FilterCategory } from "./FilterCategory";
import { FilterCategories } from "./FilterCategories";
import { FilterUf } from "./FilterUf";
import { SetURLSearchParams, useSearchParams } from "react-router-dom";

import * as Dialog from '@radix-ui/react-dialog';
import "./Filter.css"

import * as Switch from "@radix-ui/react-switch";
import { Lupa, Filtro } from "../../assets/Icons/Icons";
import { Skeleton } from "@radix-ui/themes";
import { FilterContext } from "./FilterContext";

export function clearFilter(setSearchParams: SetURLSearchParams){
    setSearchParams(params => {
        params.set('search', '')
        params.set('promotion', '')
        params.set('category', '')
        params.set('uf', '')
        params.set('categories', '')

        return params
    })
}

export function Filter() {
    const [searchParams, setSearchParams] = useSearchParams()
    const {data, isLoading, onFilter} =  useContext(FilterContext)

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
    }, [filteredData, onFilter]);

    // }

    return (
        <>
            <div>
                <Skeleton width={"100%"} height={"100%"} loading={isLoading}>
                <div className="NavigationMenuRoot" >
                    <ul className="NavigationMenuList">
                        <li className="searchList">
                            <div className="search">
                                <Lupa className="icon icon-lupa"></Lupa>
                                <FilterSearch search={searchParams.get('search') ?? ''} onSearchChange={setSearchParams} placeholder="Pesquise" />
                            </div>
                        </li>
                        <li>
                            <Dialog.Root>
                                <Dialog.Trigger asChild>
                                <div className="dropDown">
                                    <Filtro className="icon icon-filtro"></Filtro>
                                </div>
                                </Dialog.Trigger>
                                <Dialog.Portal>
                                    <Dialog.Overlay className="DialogOverlay" />

                                    <Dialog.Content className="DialogContent">
                                        <Dialog.Title>Filtro</Dialog.Title>
                                        <section className="promotion">
                                            <label htmlFor="promotionCheck">Apenas Promocional</label>
                                            <Switch.Root id="promotionCheck" checked={searchParams.get('promotion') == 'true' ? true : false} onCheckedChange={(checked) => setSearchParams((params) => {params.set("promotion", `${checked}`); return params})} className="SwitchRoot">
                                                <Switch.Thumb className="SwitchThumb" />
                                            </Switch.Root>
                                        </section>
                                        {/* <section>
                                            <h3>Organizaro por</h3>
                                            <div className="itenss">
                                                <button className="mybtn">preço u</button>
                                                <button className="mybtn">preço d</button>
                                            </div>
                                        </section> */}
                                        <section>
                                            <h3>Região</h3>
                                            <FilterUf uf={searchParams.get("uf") ?? ''} onUfChange={setSearchParams} />
                                        </section>
                                        <section>
                                            <h3>Locais</h3>
                                            <FilterCategory category={searchParams.get('category') ?? ''} onCategoryChange={setSearchParams} />
                                        </section>
                                        <section>
                                            <h3>Categorias</h3>                                 
                                            <FilterCategories categories={searchParams.get('categories')} onCategoriesChange={setSearchParams} />
                                        </section>

                                        <section>
                                            <div className="options">
                                                <button className="mybtn-2" onClick={() => clearFilter(setSearchParams)}>Limpar</button>
                                                <Dialog.Close asChild>
                                                    <button className="mybtn-2" onClick={() => console.log()}>Aplicar</button>
                                                </Dialog.Close>
                                            </div>
                                        </section>
                                    </Dialog.Content>
                                </Dialog.Portal>
                            </Dialog.Root>
                        </li>
                    </ul>
                </div>
                </Skeleton>
                
                {/* <FilterPromotion promotion={searchParams.get('promotion') == 'true'? true : false } onPromotionChange={setSearchParams} /> */}
            </div>
        </>
    )
}