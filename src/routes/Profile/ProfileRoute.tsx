import { useParams } from "react-router-dom";
import { Loading } from "../../components/Loading/Loading";
import { useGetProfile } from "../../services/Querys/Profiles";

import "./ProfileRoute.css"

export function ProfileRoute() {

    const { id } = useParams();
    const {data, isLoading} = useGetProfile(id);

    return (
        <>
            {isLoading && <Loading />}
            {
                <>
                <div className="up">
                    <div className="left">
                        <img src={data?.picture} alt="" />
                    </div>
                    <div className="back"></div>
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
                </div>
                <div className="middle"></div>
                {/* não tenho certeza se a classe é pra ser implementada dessa forma */}
                <div className={data?.movie == null ? "bottom noVideo": "bottom"}>
                    { data?.movie != null ?
                        <div className="movie">
                            <div className="inside">
                                <iframe src={data?.movie} style={{border: "none"}} scrolling="no" loading="lazy"></iframe>
                            </div>
                        </div> : <></>
                    }

                    <div className="text">{data?.resume}</div>
                    <div className="map">
                        {data?.local != null ? 
                            <iframe
                                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBPTco1Jre2e_OinSY0ew44I7UiIzNsRls&q=${data?.local.lat},${data?.local.lng}&zoom=15&maptype=roadmap`}
                            ></iframe> : <>Carregando</>
                        }
                    </div>
                </div>
                </>
            }
        </>
    )
}