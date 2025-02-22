import { useContext, useEffect, useMemo } from "react";
import { Profile } from "../../models/model";
import { FilterSearch } from "./FilterSearch";
import { FilterCategory } from "./FilterCategory";
import { FilterCategories } from "./FilterCategories";
import { FilterUf } from "./FilterUf";
import { SetURLSearchParams, useSearchParams } from "react-router-dom";

import * as Dialog from "@radix-ui/react-dialog";
import "./Filter.css";

import * as Switch from "@radix-ui/react-switch";
import { Lupa, Filtro } from "../../assets/Icons/Icons";
import { Skeleton } from "@radix-ui/themes";
import { FilterContext } from "./FilterContext";
import { FilterOrder } from "./FilterOrder";

export function clearFilter(setSearchParams: SetURLSearchParams) {
  setSearchParams((params) => {
    params.set("search", "");
    params.set("promotion", "");
    params.set("category", "");
    params.set("uf", "");
    params.set("categories", "");
    params.set("order", "");

    return params;
  });
}

function removeDiacritcs(str:string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  
}

export function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading, onFilter } = useContext(FilterContext);

  const filteredData: Profile[] = useMemo(() => {
    if (!data) return [];
    let filteredData = [...data];
    const search = searchParams.get("search");
    const promotion = searchParams.get("promotion") === "true";
    const uf = searchParams.get("uf");
    const category =
      searchParams.get("category")?.split(",").filter(Boolean) || [];
    const categories =
      searchParams.get("categories")?.split(",").filter(Boolean) || [];
    const order = searchParams.get("order");

    if (search) {
      filteredData = filteredData.filter((e) =>
        removeDiacritcs(e.name.toLocaleLowerCase()).includes(removeDiacritcs(search.toLocaleLowerCase()))
      );
    }
    if (promotion) {
      filteredData = filteredData.filter((e) => e.promotion.active);
    }
    if (uf) {
      filteredData = filteredData.filter((e) => e.local?.uf === uf);
    }

    const isAscending = !order?.startsWith("-");
    const orderType = order?.replace("-", "") || "alphabetical";

    if (orderType === "createdAt") {
      filteredData.sort((a, b) => {
        const comparison =
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        return isAscending ? comparison : -comparison;
      });
    } else {
      // Ordenado alfabeticamente por e.name
      filteredData.sort((a, b) => {
        const comparison = a.name.localeCompare(b.name);
        return isAscending ? comparison : -comparison;
      });
    }

    if (category.length > 0) {
      filteredData = filteredData.filter((e) =>
        category.every((cat) => e.category.type?.includes(cat))
      );
    }
    if (categories.length > 0) {
      filteredData = filteredData.filter((e) =>
        categories.every((cat) => e.category.categories?.includes(cat))
      );
    }

    return filteredData;
  }, [searchParams, data]);

  useEffect(() => {
    onFilter(filteredData);
  }, [filteredData, onFilter]);

  return (
    <>
      <div className="filter">
        <Skeleton width={"100%"} height={"100%"} loading={isLoading}>
          <div className="NavigationMenuRoot">
            <ul className="NavigationMenuList">
              <li className="searchList">
                <div className="search">
                  <Lupa className="icon icon-lupa"></Lupa>
                  <FilterSearch
                    search={searchParams.get("search") ?? ""}
                    onSearchChange={setSearchParams}
                    placeholder="Pesquise"
                  />
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

                    <Dialog.Content className="DialogContent scroll-style">
                      <Dialog.Title>Filtro</Dialog.Title>
                      <section className="promotion">
                        <label htmlFor="promotionCheck">
                          Apenas Promocional
                        </label>
                        <Switch.Root
                          id="promotionCheck"
                          checked={searchParams.get("promotion") === "true"}
                          onCheckedChange={(checked) =>
                            setSearchParams((params) => {
                              params.set("promotion", `${checked}`);
                              return params;
                            })
                          }
                          className="SwitchRoot"
                        >
                          <Switch.Thumb className="SwitchThumb" />
                        </Switch.Root>
                      </section>
                      <section className="mmiddle">
                        <div>

                        <h3>Ordenar Por</h3>
                        <FilterOrder
                          order={searchParams.get("order") ?? ""}
                          onOrderChange={setSearchParams}
                        />
                        </div>
                        <div>

                        <h3>Região</h3>
                        <FilterUf
                          uf={searchParams.get("uf") ?? ""}
                          onUfChange={setSearchParams}
                        />
                        </div>
                        {/* </section>
                          <section> */}
                      </section>
                      <section>
                        <h3>Locais</h3>
                        <FilterCategory
                          category={searchParams.get("category") ?? ""}
                          onCategoryChange={setSearchParams}
                        />
                      </section>
                      <section className="categories scroll-style">
                        <h3>Categorias</h3>
                        <FilterCategories
                          categories={searchParams.get("categories") ?? ""}
                          onCategoriesChange={setSearchParams}
                        />
                      </section>

                      <section>
                        <div className="options">
                          <button
                            className="mybtn-2"
                            onClick={() => clearFilter(setSearchParams)}
                          >
                            Limpar
                          </button>
                          <Dialog.Close asChild>
                            <button
                              className="mybtn-2"
                              onClick={() => console.log("Aplicar clicked")}
                            >
                              Aplicar
                            </button>
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
      </div>
    </>
  );
}
