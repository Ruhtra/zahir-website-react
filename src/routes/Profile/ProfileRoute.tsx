import { useParams } from "react-router-dom";
import { useGetProfile } from "../../services/Querys/Profiles";

import "./ProfileRoute.css"
import { Skeleton } from "@radix-ui/themes";
import PageTitle from "../../components/PageTitle";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { EditProfile } from "../../components/EditProfile/EditProfile";
import { Confirmation } from "../../components/Confirmation/Confirmations";

export function ProfileRoute() {

    const { dataUser, statusUser } = useContext(AuthContext)

    const { id } = useParams();
    const { data, isLoading } = useGetProfile(id);

    console.log(data);


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
                                {/* solve this for "data?.promotion" in backendn */}
                                {data?.promotion.description != undefined &&
                                    <div className="promotion">
                                        <span>Produto em promoção</span>
                                        <div className="text">
                                            {data?.promotion.description}
                                        </div>
                                    </div>
                                }

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
                        <div className="middle">
                            {
                                statusUser == "success"
                                    && dataUser
                                    && dataUser.role == "admin"
                                    ? <div className="btns">
                                        <EditProfile>
                                            <div className="editar btn">
                                                Editar
                                            </div>
                                        </EditProfile>
                                        <Confirmation>
                                            <div className="delete btn">
                                                Excluir
                                            </div>
                                        </Confirmation>
                                    </div>
                                    : <></>
                            }

                        </div>
                    </Skeleton>

                    <div className={"bottom"}>
                        <Skeleton loading={isLoading} minHeight={"610px"} minWidth={"320px"}>
                            <div className="movie">
                                <div className="inside">
                                    {
                                        data?.movie == null
                                            ? <div className="noVideo">Video não disponivel</div>
                                            : <iframe className="content" src={data?.movie} style={{ border: "none" }} scrolling="no" loading="lazy"></iframe>
                                    }
                                </div>
                            </div>
                        </Skeleton>
                        <Skeleton loading={isLoading} minHeight={"3em"}>
                            <div className="text">{data?.resume}</div>
                        </Skeleton>
                        <Skeleton loading={isLoading}>
                            <div className="map">
                                {data?.local != undefined ?
                                    <iframe
                                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyD-E3xnEJoVAtUs2Ln5aOIr6JaPi0e6kUE&q=${data?.local.lat},${data?.local.lng}&zoom=15&maptype=roadmap`}
                                    ></iframe>
                                    : <>Não existe local para esse perfil</>
                                }
                            </div>
                        </Skeleton>
                    </div>
                </>
            }
        </>
    )
}