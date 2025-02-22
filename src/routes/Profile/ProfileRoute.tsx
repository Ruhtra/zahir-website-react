import { Link, useParams } from "react-router-dom";
import { useGetProfile } from "../../services/Querys/Profiles";

import "./ProfileRoute.css";
import { Skeleton } from "@radix-ui/themes";
import PageTitle from "../../components/PageTitle";
// import { useContext } from "react";
// import { AuthContext } from "../../Contexts/AuthContext";
// import { EditProfile } from "../../components/EditProfile/EditProfile";
// import { Confirmation } from "../../components/Confirmation/Confirmations";

export function ProfileRoute() {
  // const { dataUser, statusUser } = useContext(AuthContext)

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
                {data?.promotion.active && (
                  <div className="promotion">
                    <span>Produto em promoção: </span>
                    <div className="text">{data?.promotion.description}</div>
                  </div>
                )}
                {
                  data?.informations && (<>

                    <div className="informations">
                      <div className="text">                        
                        {data.informations.split("\\n").map((line, index) => {
                          return (
                            <span key={index}>
                              {line}
                              <br />
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </>)
                }
              </div>
            </Skeleton>
          </div>
          <Skeleton loading={isLoading}>
            <div className="middle">
              {/* {statusUser == "success" &&
              dataUser &&
              dataUser.role == "admin" ? (
                <div className="btns">
                  <EditProfile>
                    <div className="editar btn">Editar</div>
                  </EditProfile>
                  <Confirmation>
                    <div className="delete btn">Excluir</div>
                  </Confirmation>
                </div>
              ) : (
                <></>
              )} */}
            </div>
          </Skeleton>

          <div className={"bottom"}>
            <Skeleton
              loading={isLoading}
              minHeight={"610px"}
              minWidth={"320px"}
            >
              <div className="movie">
                <div className="inside">
                  {data?.movie == null ? (
                    <div className="noVideo">Video não disponivel</div>
                  ) : (
                    <iframe
                      className="content"
                      src={data?.movie}
                      style={{ border: "none" }}
                      scrolling="no"
                      loading="lazy"
                    ></iframe>
                  )}
                </div>
              </div>
            </Skeleton>
            <Skeleton loading={isLoading} minHeight={"3em"}>
              <div className="text">{data?.resume}</div>
            </Skeleton>
            <Skeleton loading={isLoading}>
              <div className={data?.local && "map"}>
                {data?.local != undefined ? (
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyD-E3xnEJoVAtUs2Ln5aOIr6JaPi0e6kUE&q=${data?.local.lat},${data?.local.lng}&zoom=15&maptype=roadmap`}
                    style={{ width: "100%", height: "400px", border: "0", borderRadius: "10px" }}
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div
                    className="no-location"
                    style={{
                      textAlign: "center",
                      padding: "20px",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "10px",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <p style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}>
                      Localização não disponível para este vídeo.
                    </p>
                    <p style={{ fontSize: "14px", color: "#666", marginTop: "10px" }}>
                      Parece que este vídeo ainda não tem um local. Fique ligado para futuras atualizações!
                    </p>
                    <div
                      className="feedback"
                      style={{ marginTop: "20px", padding: "15px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}
                    >
                      <p style={{ fontSize: "16px", fontWeight: "bold", color: "#333" }}>
                        Gostou do vídeo?
                      </p>
                      <p style={{ fontSize: "14px", color: "#666" }}>
                        Siga-nos nas redes sociais para ver mais conteúdo incrível!
                      </p>
                      <div style={{ marginTop: "10px" }}>
                        <Link style={{ marginRight: "10px", textDecoration: "none", color: "#ff0050", fontWeight: "bold" }} to={"https://www.tiktok.com/@dozahir"} target="_blank">
                          TikTok
                        </Link>
                        <Link style={{ marginRight: "10px", textDecoration: "none", color: "#E1306C", fontWeight: "bold" }} to={"https://www.instagram.com/dozahir/"} target="_blank">
                          Instagram
                        </Link>
                        <Link style={{ textDecoration: "none", color: "#FF0000", fontWeight: "bold" }} to={"https://www.youtube.com/@doZahir"} target="_blank">
                          YouTube
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </Skeleton>
          </div>
        </>
      }
    </>
  );
}
