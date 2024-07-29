import { Link, useSearchParams } from "react-router-dom";

import "./Profiles.css"
import { Skeleton } from "@radix-ui/themes";
import '@radix-ui/themes/styles.css';
import { clearFilter } from "../Filter/Filter";
import { useContext } from "react";
import { FilterContext } from "../Filter/FilterContext";


export function Profiles() {
    const { filtrado, isLoading } = useContext(FilterContext)
    const [_searchParams, setSearchParams] = useSearchParams(); // eslint-disable-line @typescript-eslint/no-unused-vars

    return (
        <>
            <ul className="profiles">
                {
                    isLoading
                        ? [...Array(6).keys()].map(e => {
                            return (
                                <li key={e}>
                                    <Skeleton key={e} width={"100%"} height={"100%"} loading={isLoading}>
                                        <div className="card">
                                            <img src="" />
                                            <div className="infoCard">
                                                <div className="">
                                                    { }
                                                </div>
                                                <div className="">
                                                    { } - { }
                                                </div>
                                            </div>
                                        </div>
                                    </Skeleton>
                                </li>
                            )
                        })
                        : filtrado != null && filtrado?.length == 0
                            ? <div className="nullProfile">
                                <h1 className="message">
                                    Nenhuma Review foi encontrada
                                    <br />
                                    Deseja Limpar o filtro de pesquisa?
                                </h1>
                                <br />
                                <button onClick={() => clearFilter(setSearchParams)} className="clearFilter">Sim</button>
                            </div>
                            : filtrado?.map((e) => {
                                return (
                                    <li key={e._id} className="item">
                                        <Link to={`/profile/${e._id}`}>
                                            <div className="card">
                                                <img src={e.picture} />
                                                <div className="infoCard">
                                                    <div className="">
                                                        {e.name}
                                                    </div>
                                                    <div className="">
                                                        {/* fix this code for "e.local" in backendreturn */}
                                                        {e.local.uf != undefined && (<>
                                                            {e.local.uf} - {e.local.city}
                                                        </>)}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                )
                            })
                }
            </ul>
        </>
    )
}