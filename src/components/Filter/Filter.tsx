import { useContext, useEffect, useMemo } from "react";
import { Profile } from "../../models/model";
import FilterContext from "./FilterContext";
import { FilterSearch } from "./FilterSearch";
// import { FilterPromotion } from "./FilterPromotion";
// import { FilterCategory } from "./FilterCategory";
// import { FilterCategories } from "./FilterCategories";
// import { FilterUf } from "./FilterUf";
import { useSearchParams } from "react-router-dom";

import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import "./Filter.css"
import {  MagnifyingGlassIcon, PlusCircledIcon } from "@radix-ui/react-icons";

export function Filter() {
    const [searchParams, setSearchParams] = useSearchParams()
    const {data, onFilter} =  useContext(FilterContext)

    // logica {

    // function clearFilter() {
    //     setSearchParams(params => {
    //         params.set('search', '')
    //         params.set('promotion', '')
    //         params.set('category', '')
    //         params.set('uf', '')
    //         params.set('categories', '')

    //         return params
    //     })
    // }

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
                <NavigationMenu.Root className="NavigationMenuRoot">
                    <NavigationMenu.List className="NavigationMenuList">
                        <NavigationMenu.Item className="searchList">
                            <div className="search">
                                <MagnifyingGlassIcon className="searchIcon" />
                                <FilterSearch search={searchParams.get('search') ?? ''} onSearchChange={setSearchParams} placeholder="Pesquise" />
                            </div>
                        </NavigationMenu.Item>

                        <NavigationMenu.Item>
                            <NavigationMenu.Trigger asChild
                                onPointerMove={(e => e.preventDefault())}
                                onPointerLeave={(e) => e.preventDefault()}
                            >
                                <div className="dropDown">
                                    <PlusCircledIcon className="dropdownIcon" /> 
                                </div>
                            </NavigationMenu.Trigger>
                            <NavigationMenu.Content
                                className="content"
                                onPointerEnter={(e) => e.preventDefault()}
                                onPointerLeave={(e) => e.preventDefault()}
                            >
                                <section>
                                    <h2>Filtros</h2>
                                </section>
                                <section>
                                    <h3>Organizaro por</h3>
                                    <div className="itenss">
                                        <button className="mybtn">preço u</button>
                                        <button className="mybtn">preço d</button>
                                    </div>
                                </section>
                                <section>
                                    <h3>Região</h3>
                                    <div className="itenss">
                                        <button className="mybtn">ce</button>
                                        <button className="mybtn">rj</button>
                                        <button className="mybtn">rn</button>
                                    </div>
                                </section>
                                <section>
                                    <h3>Locais</h3>
                                    <div className="itenss">
                                        <button className="mybtn active">Restaurante</button>
                                        <button className="mybtn">lugares</button>
                                        <button className="mybtn">Hospedagem</button>
                                    </div>
                                </section>
                                <section>
                                    <h3>Categorias</h3>
                                    <div className="itenss">
                                        <button className="mybtn">Comida Gigant3e</button>
                                        <button className="mybtn">Pipocas</button>
                                        <button className="mybtn">Carnes</button>
                                        <button className="mybtn">Sorvetes</button>
                                    </div>
                                </section>

                                <section>
                                    <div className="options">
                                        <button className="mybtn-2">Limpar</button>
                                        <button className="mybtn-2">Aplicar</button>
                                    </div>
                                </section>
                            </NavigationMenu.Content>
                        </NavigationMenu.Item>

                        {/* <NavigationMenu.Indicator className="NavigationMenuIndicator">
                            <div className="Arrow" />
                        </NavigationMenu.Indicator> */}
                    </NavigationMenu.List>

                    <div className="ViewportPosition">
                        <NavigationMenu.Viewport className="NavigationMenuViewport" />
                    </div>
                </NavigationMenu.Root>
                

                {/* <FilterPromotion promotion={searchParams.get('promotion') == 'true'? true : false } onPromotionChange={setSearchParams} />
                <FilterCategory category={searchParams.get('category') ?? ''} onCategoryChange={setSearchParams} />
                <FilterUf uf={searchParams.get("uf") ?? ''} onUfChange={setSearchParams} />
                <FilterCategories categories={searchParams.get('categories')} onCategoriesChange={setSearchParams} /> */}
                {/* <button onClick={clearFilter}>clear</button> */}

                
            </div>
        </>
    )
}