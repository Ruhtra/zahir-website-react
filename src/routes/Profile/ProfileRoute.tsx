import { useParams } from "react-router-dom";
import { useGetProfile } from "../../services/Querys/Profiles";

import "./ProfileRoute.css"
import { Skeleton } from "@radix-ui/themes";
import PageTitle from "../../components/PageTitle";

export function ProfileRoute() {

    const { id } = useParams();
    const {data, isLoading} = useGetProfile(id);

    return (
        <>
            {
                <>
                <PageTitle title={"Perfil"} />
                <div className="up">
                    <Skeleton loading={isLoading}>
                    <div className="left">
                        <img src={data?.picture} alt="" />
                    </div>
                    </Skeleton>
                    <Skeleton loading={isLoading}>
                    <div className="back"></div>
                    </Skeleton>
                    <Skeleton loading={isLoading}>
                    <div className="rigth">
                        <div className="promotion">
                            <span>Produto Em promoção</span>
                            <div className="text">
                                {data?.promotion.description}
                            </div>
                        </div>
                        <div className="informations">
                            <span>Informações</span>
                            <div className="text">
                                {data?.informations}
                            </div>
                        </div>
                    </div>
                    </Skeleton>
                </div>
                <Skeleton loading={isLoading}>
                <div className="middle"></div>
                </Skeleton>

                <div className={"bottom"}>
                    <Skeleton loading={isLoading} minHeight={"610px"} minWidth={"320px"}>
                    <div className="movie">
                        <div className="inside">
                            {
                                data?.movie == null
                                ? <div className="noVideo">Video não disponivel</div>
                                : <iframe className="content" src={data?.movie} style={{border: "none"}} scrolling="no" loading="lazy"></iframe>
                            }
                        </div>
                    </div>
                    </Skeleton>
                    <Skeleton loading={isLoading} minHeight={"3em"}>
                    <div className="text">{data?.resume}</div>
                    </Skeleton>
                    <Skeleton loading={isLoading}>
                    <div className="map">
                        {data?.local != null ? 
                            <iframe
                                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBPTco1Jre2e_OinSY0ew44I7UiIzNsRls&q=${data?.local.lat},${data?.local.lng}&zoom=15&maptype=roadmap`}
                            ></iframe> : <>Carregando</>
                        }
                    </div>
                    </Skeleton>
                </div>
                </>
            }
        </>
    )
}