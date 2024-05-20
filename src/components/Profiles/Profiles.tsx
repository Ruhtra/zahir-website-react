import { Link, useSearchParams } from "react-router-dom";
import { Profile } from "../../models/model"


import "./Profiles.css"
import { Skeleton } from "@radix-ui/themes";
import '@radix-ui/themes/styles.css';
import { clearFilter } from "../Filter/Filter";


export interface PropsProfile {
    filtrado?: Profile[];
    isLoading: boolean;
}
export function Profiles({ filtrado, isLoading }: PropsProfile) {
    const [_searchParams, setSearchParams] = useSearchParams()
    return (
        <>
        <ul className="profiles">


        {
            isLoading
            ? Array(0,1,2,3,4,5).map(e => {
                return (
                    <li key={e}>
                        <Skeleton key={e} width={"100%"} height={"100%"} loading={isLoading}>
                            <div className="card">
                            <img src={""} alt="" />
                                <div className="infos">
                                    <div className="name">
                                        {}
                                    </div>
                                    <div className="local">
                                        {} - {}
                                    </div>
                                </div>
                            </div>
                        </Skeleton>
                    </li>
                )
            })
            :  filtrado != null && filtrado?.length == 0
                ? <div>
                    <h1 className="message">Nenhuma Review foi encontrada <br/>
                    Deseja Limpar o filtro de pesquisa?</h1>

                    <br />

                    <button onClick={() => clearFilter(setSearchParams)} className="clearFilter">Sim</button>
                </div>
                : filtrado?.map((e) => {
                    return (
                        <li key={e._id}>
                            <Link to={`/profile/${e._id}`} style={{all: "inherit"}}>
                                <div className="card">
                                    <img src={e.picture} alt="" />
                                    <div className="infos">
                                        <div className="name">
                                            {e.name}
                                        </div>
                                        <div className="local">
                                            {e.local.uf} - {e.local.city}
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